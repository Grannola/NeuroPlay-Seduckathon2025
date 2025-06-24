from django.shortcuts import render, redirect, get_object_or_404
from .models import Aluno, Colaborador
from .forms import AlunoModelForms, ColaboradorModelForms


def alunos_all(request):
    alunos = Aluno.objects.filter().all()
    return render(request, 'usuarios/alunos/alunosAll.html',{
        'alunos': alunos
    })

def aluno_add(request):
    if request.method == 'GET':
        form_aluno = AlunoModelForms()
    else:
        form_aluno = AlunoModelForms(request.POST, request.FILES)
        if form_aluno.is_valid():
            form_aluno.save()
            return redirect('usuarios:alunos_all')
    return render(request, 'usuarios/alunos/alunoAdd.html',{
        'form_aluno': form_aluno
    })

def aluno_edit(request, aluno_id):
    aluno = get_object_or_404(Aluno, id=aluno_id)

    if request.method == 'POST':
        aluno.nome = request.POST.get('nome')
        aluno.data_nasc = request.POST.get('data_nasc')
        aluno.observacoes = request.POST.get('observacoes')
        aluno.responsavel = request.POST.get('responsavel')
        aluno.cpf_responsavel = request.POST.get('cpf_responsavel')

        if 'foto' in request.FILES:
            aluno.foto = request.FILES['foto']

        aluno.save()
        return redirect('usuarios:alunos_all')

    return render(request, 'usuarios/alunos/alunoEdit.html', {'aluno': aluno})


def colaboradores_all(request):
    colaboradores = Colaborador.objects.filter().all()
    return render(request, 'usuarios/colaboradores/colaboradoresAll.html',{
        'colaboradores': colaboradores
    })

def colaborador_add(request):
    if request.method == 'GET':
        form_colaborador = ColaboradorModelForms()
    else:
        form_colaborador = ColaboradorModelForms(request.POST, request.FILES)
        if form_colaborador.is_valid():
            form_colaborador.save()
            return redirect('usuarios:colaboradores_all')
        else:
            print(form_colaborador.errors)
    return render(request, 'usuarios/colaboradores/colaboradorAdd.html',{
        'form_colaborador': form_colaborador
    })

def colaborador_edit(request, colaborador_id):
    colaborador = get_object_or_404(Colaborador, id = colaborador_id)

    if request.method == 'POST':
        colaborador.nome = request.POST.get('nome')
        colaborador.email = request.POST.get('email')
        colaborador.cpf = request.POST.get('cpf')

        if 'foto' in request.FILES:
            colaborador.foto = request.FILES['foto']

        colaborador.save()
        return redirect('usuarios:colaboradores_all')

    return render(request, 'usuarios/colaboradores/colaboradorEdit.html', {'colaborador': colaborador})

