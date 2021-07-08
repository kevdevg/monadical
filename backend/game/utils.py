import random
import string


def random_char():
    return ''.join(random.choice(string.ascii_lowercase) for x in range(5))


def initial_game():
    return [[0] * 7] * 7
