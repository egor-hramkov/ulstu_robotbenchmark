from django.contrib.auth.models import User
from django.db import models


# Create your models here.


class Problem(models.Model):
    """Модель соревнования"""
    title = models.CharField(max_length=300)
    description = models.CharField(max_length=1000, null=True)
    world_path = models.CharField(max_length=300)
    image_path = models.CharField(max_length=300)
    difficulty = models.FloatField()
    author = models.ForeignKey(User, related_name='problems', on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.title
