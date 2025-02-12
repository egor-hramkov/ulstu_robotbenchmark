import { notification } from "antd";
import { useEffect, useState } from "react";

interface Props {
    tournamentId: number;
}

export const ProblemEndingCountdown = ({tournamentId}: Props) => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [timerColor, setTimerColor] = useState('green');

    useEffect(() => {
        const socket = new WebSocket(`wss://virtual.robocross.ru:444/ws/tournament-check-end/${tournamentId}/`);
    
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          const minutesLeft = Math.floor(data.time_remaining / 60);
          setTimeLeft(minutesLeft);
    
          if (minutesLeft <= 5) {
            setTimerColor('red');
            notification.error({
              message: 'Турнир скоро закончится!',
              description: 'Осталось 5 минут до окончания турнира.',
            });
          } else if (minutesLeft <= 10) {
            setTimerColor('red');
            notification.error({
              message: 'Турнир скоро закончится!',
              description: 'Осталось 10 минут до окончания турнира.',
            });
          } else if (minutesLeft <= 30) {
            setTimerColor('yellow');
            notification.warning({
              message: 'Турнир скоро закончится!',
              description: 'Осталось 30 минут до окончания турнира.',
            });
          } else {
            setTimerColor('green');
          }
        };
    
        socket.onclose = () => {
          console.log('WebSocket connection closed');
        };
    
        return () => {
          socket.close();
        };
      }, [tournamentId]);

    if (timeLeft) {
        return (
            <div style={{ color: timerColor }}>
                Время до окончания: {timeLeft} минут
            </div>
        )
    }
}