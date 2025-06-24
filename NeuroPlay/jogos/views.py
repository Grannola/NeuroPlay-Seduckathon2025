from django.shortcuts import render
from .models import Jogo

def jogos_all(request):
    jogos = Jogo.objects.all()
    return render(request, 'jogos/jogosAll.html', {
        'jogos': jogos
    })


def memoria_cartas(request):
    return render(request, 'jogos/projetos/jogo_memoria/jogodamemoria.html')