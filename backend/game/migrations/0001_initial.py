# Generated by Django 3.2.5 on 2021-07-07 04:27

from django.db import migrations, models
import game.utils


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('identifier', models.CharField(default=game.utils.random_char, max_length=5)),
                ('current_players', models.IntegerField(default=0)),
                ('status', models.IntegerField(default=0)),
            ],
        ),
    ]
