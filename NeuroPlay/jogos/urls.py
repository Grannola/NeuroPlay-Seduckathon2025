from django.urls import path
from .views import jogos_all, memoria_cartas


urlpatterns = [
    path('', jogos_all, name = 'jogos_all'),

    # urls para os jogos
    path('memoriaCartas/', memoria_cartas, name = 'memoria_cartas'),

]

