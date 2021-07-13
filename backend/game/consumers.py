# chat/consumers.py
import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from game.models import Game


class GameBaseConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def get_game(self):
        game_identifier = self.scope['url_route']['kwargs']['game_id']
        game = Game.objects.filter(identifier=game_identifier).first()
        return game

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )


class GameConsumer(GameBaseConsumer):

    @database_sync_to_async
    def get_initial_game(self):
        game = Game.objects.filter(identifier=self.game_identifier).first()
        if game and game.is_available():
            return game
        return None

    async def connect(self):
        self.game_identifier = self.scope['url_route']['kwargs']['game_id']
        self.room_name = self.game_identifier
        self.room_group_name = 'chat_%s' % self.room_name
        game = await self.get_initial_game()
        if game:
            # Join room group
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()
            if game.npc:
                await self.send(text_data=json.dumps({
                    'type': 'initial_setup',
                    'player': 1
                }))
            else:
                await self.send(text_data=json.dumps({
                    'type': 'initial_setup',
                    'player': game.current_players
                }))
            if game.status == game.GAME_STARTED:
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'game_status',
                        'status': "GAME_STARTED",
                        'turn': game.turn,
                        'board': game.board,
                        'winner': game.winner,
                        'npc': game.npc,
                    }
                )

    @database_sync_to_async
    def make_movement(self, game, data):
        game.make_movement(data)
        game.refresh_from_db()
        return game

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data.get('type') == 'movement':
            game = await self.get_game()
            game = await self.make_movement(game, data)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_status',
                    'status': "FINISHED" if game.status == game.GAME_FINISHED else "MOVEMENT",
                    'turn': game.turn,
                    'board': game.board,
                    'winner': game.winner,
                    'npc': game.npc,
                }
            )

    # Receive message from room group
    async def game_status(self, info):
        await self.send(text_data=json.dumps(info))


class WatchGameConsumer(GameBaseConsumer):
    async def connect(self):
        self.game_identifier = self.scope['url_route']['kwargs']['game_id']
        self.room_name = self.game_identifier
        self.room_group_name = 'chat_%s' % self.room_name
        game = await self.get_game()
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        await self.send(text_data=json.dumps({
            'type': 'game_status',
            'status': "GAME_STARTED",
            'turn': game.turn,
            'board': game.board,
            'winner': game.winner,
            'npc': game.npc,
        }))
