from django.urls import path
from .views import alunos_all, aluno_add, aluno_edit
from .views import colaboradores_all, colaborador_add, colaborador_edit

# Renomeando o APP
app_name = 'usuarios'

urlpatterns = [
    path('alunosAll/', alunos_all, name = 'alunos_all'),
    path('alunoAdd/', aluno_add, name = 'aluno_add'),
    path('alunoEdit/<int:aluno_id>/', aluno_edit, name='aluno_edit'),

    path('colaboradoresAll/', colaboradores_all, name = 'colaboradores_all'),
    path('colaboradorAdd/', colaborador_add, name = 'colaborador_add'),
    path('colaboradorEdit/<int:colaborador_id>/', colaborador_edit, name = 'colaborador_edit'),
]
    

