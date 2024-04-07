from django.contrib.auth.models import User
from django.db import models


class Problem(models.Model):
    """Модель задачи"""
    title = models.CharField(max_length=300)
    description = models.CharField(max_length=1000, null=True)
    world_path = models.CharField(max_length=300)
    image_path = models.CharField(max_length=300)
    difficulty = models.FloatField()
    author = models.ForeignKey(User, related_name='problems', on_delete=models.DO_NOTHING)
    users = models.ManyToManyField(User, related_name='user_problems', through="ProblemUser")

    def __str__(self):
        return self.title


class ProblemUser(models.Model):
    """Многие ко многим Пользователь-Задача"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)
    points = models.IntegerField(default=0)


class Tournament(models.Model):
    """Модель Соревнования"""
    problems = models.ManyToManyField(Problem, related_name='tournaments')
    users = models.ManyToManyField(User, related_name='user_tournaments')
    date_start = models.DateTimeField(auto_now_add=True)
    date_end = models.DateTimeField()


class TournamentUser(models.Model):
    """Многие ко многим Пользователь-Соревнование"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)
    points = models.IntegerField(default=0)
