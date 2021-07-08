# Generated by Django 3.2.5 on 2021-07-07 15:26

from django.db import migrations, models
import game.utils


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0002_game_turn'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='board',
            field=models.JSONField(default=game.utils.initial_game),
        ),
    ]