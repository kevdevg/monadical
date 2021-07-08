# mysite/asgi.py
import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

import game.routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sidestacker.settings")

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket":
        URLRouter(
            game.routing.websocket_urlpatterns
        )
    ,
})
