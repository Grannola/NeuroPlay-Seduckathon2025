from django.shortcuts import render
from usuarios.models import Aluno

def home(request):
    alunos = Aluno.objects.filter().all()
    return render(request, 'dashboard/index.html', {
        'alunos': alunos,
        'quant_alunos' : len(alunos)
    })

