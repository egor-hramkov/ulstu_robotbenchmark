# Generated by Django 5.0.2 on 2024-04-13 09:01

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('robotbenchmark', '0004_problemuser_problem_users'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_start', models.DateTimeField(auto_now_add=True)),
                ('date_end', models.DateTimeField()),
                ('problems', models.ManyToManyField(related_name='tournaments', to='robotbenchmark.problem')),
            ],
        ),
        migrations.CreateModel(
            name='TournamentUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_completed', models.BooleanField(default=False)),
                ('points', models.IntegerField(default=0)),
                ('tournament', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='robotbenchmark.tournament')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='tournament',
            name='users',
            field=models.ManyToManyField(related_name='user_tournaments', through='robotbenchmark.TournamentUser', to=settings.AUTH_USER_MODEL),
        ),
    ]
