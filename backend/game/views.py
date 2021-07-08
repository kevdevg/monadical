# Create your views here.
from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from game.models import Game


class CreateGameView(generics.GenericAPIView):
    def post(self, *args, **kwargs):
        game = Game()
        game.save()
        return Response({'identifier': game.identifier})


class JoinToGameView(generics.GenericAPIView):
    def post(self, *args, **kwargs):
        game = get_object_or_404(Game, identifier=self.request.data.get('identifier'), current_players=1,
                                 status=Game.WAITING_FOR_PLAYERS)
        return Response({'identifier': game.identifier})
