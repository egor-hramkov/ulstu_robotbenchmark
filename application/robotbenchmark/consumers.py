import asyncio

import django
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from django.utils.timezone import now
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "application.settings")
django.setup()

from .models import Tournament
from asgiref.sync import sync_to_async


class TournamentConsumer(AsyncJsonWebsocketConsumer):
    tournament_id: int

    async def connect(self):
        # Получаем ID турнира из URL
        self.tournament_id = self.scope['url_route']['kwargs']['tournament_id']

        # Проверяем существование турнира
        tournament = await sync_to_async(Tournament.objects.filter(id=self.tournament_id).first)()
        if not tournament:
            await self.close()
            return

        # Подключаем пользователя к WebSocket
        await self.accept()
        self.running = True  # Флаг для проверки цикла задачи
        await self.start_status_checking()

    async def disconnect(self, close_code):
        # Останавливаем проверку при закрытии соединения
        self.running = False

    async def start_status_checking(self):
        while self.running:  # Пока соединение активно
            # Получаем турнир из базы данных
            tournament = await sync_to_async(Tournament.objects.get)(id=self.tournament_id)

            # Проверяем, завершился ли турнир
            if tournament.date_end <= now():
                # Отправляем через WebSocket уведомление клиенту
                await self.send_json({
                    "status": "finished",
                    "message": f"Tournament {tournament.id} is finished"
                })
                self.running = False
                await self.close()
                return
            else:
                # Отправляем статус клиенту
                await self.send_json({
                    "status": "ongoing",
                    "message": f"Tournament {tournament.id} is still active.",
                    "time_remaining": (tournament.date_end - now()).total_seconds()
                })
            await asyncio.sleep(20)
