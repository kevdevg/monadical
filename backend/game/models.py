import random
from itertools import groupby

import numpy as np
from django.db import models

# Create your models here.
from game.utils import random_char, initial_game


def count_same_pair(nums):
    for _, group in groupby(nums):
        group = [item for item in group]
        if len(group) >= 4:
            return group[0]
    return 0


class Game(models.Model):
    WAITING_FOR_PLAYERS = 0
    GAME_STARTED = 1
    GAME_FINISHED = 2
    identifier = models.CharField(default=random_char, max_length=5)
    current_players = models.IntegerField(default=0)
    status = models.IntegerField(default=0)
    turn = models.IntegerField(default=1)
    board = models.JSONField(default=initial_game)
    winner = models.IntegerField(default=0)
    npc = models.BooleanField(default=False)

    def is_available(self):
        if self.current_players < 2 and self.status == self.WAITING_FOR_PLAYERS:
            self.current_players += 1
            if self.npc:
                self.current_players += 1
            if self.current_players == 2:
                self.status = self.GAME_STARTED
            self.save()
            return True
        return False

    def change_turn(self):
        if self.turn == 1:
            self.turn = 2
        else:
            self.turn = 1

    def make_movement(self, data):
        player = data.get('player')
        side = data.get('side')
        row_index = data.get('row')
        board = self.board
        row = board[row_index]
        index = row.index(0)
        if index >= 0 and player == self.turn:
            row.pop(index)
            if side == 'R':
                row.append(player)
            if side == 'L':
                row.insert(0, player)
            board[row_index] = row
            self.board = board
            self.change_turn()
            self.validate_win()
            self.save()
            if player == 1 and self.npc and not self.winner:
                self.check_npc_movements()

    def validate_win(self):
        matrix = np.matrix(self.board)
        diags = [matrix[::-1, :].diagonal(i) for i in range(-3, 4)]
        diags.extend(matrix.diagonal(i) for i in range(3, -4, -1))
        winner = 0
        for diagonal in [np.trim_zeros(n.tolist()[0]) for n in diags if n.size > 3 and np.count_nonzero(n > 0) >= 4]:
            winner = count_same_pair(diagonal)
            if winner:
                break
        if not winner:
            for i in range(matrix.shape[0]):
                row = matrix[i]
                if np.count_nonzero(row > 0) >= 4:
                    winner = count_same_pair(np.trim_zeros(row.tolist()[0]))
                    if winner:
                        break
                column = matrix[:, i]
                if np.count_nonzero(column > 0) >= 4:
                    winner = count_same_pair(np.trim_zeros([i[0] for i in column.tolist()]))
                    if winner:
                        break
        if winner:
            self.turn = 0
            self.winner = winner
            self.status = self.GAME_FINISHED
            self.save()

    def check_npc_movements(self):
        matrix = np.matrix(self.board)
        row_index = None
        available_moves = []
        for i in range(matrix.shape[0]):
            row = matrix[i]
            if np.count_nonzero(row == 0):
                available_moves.append(i)
        row_index = random.choice(available_moves)
        side = random.choice(["L", "R"])
        self.make_movement({
            'row': row_index,
            'side': side,
            'player': 2
        })
