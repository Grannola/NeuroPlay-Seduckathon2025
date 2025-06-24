from django.db import models


class Aluno(models.Model):
    id = models.AutoField(primary_key = True)
    nome = models.CharField(max_length = 120)
    data_nasc = models.DateField()
    observacoes = models.TextField()
    foto = models.ImageField(upload_to = 'perfil/alunos/', blank = True, null = True)
    responsavel = models.CharField(max_length = 120)
    cpf_responsavel = models.CharField(max_length = 14)

    def __str__(self):
        return self.nome



class Colaborador(models.Model):
    id = models.AutoField(primary_key = True)
    nome = models.CharField(max_length = 120)
    email = models.EmailField(max_length = 120)
    cpf = models.CharField(max_length = 14)
    foto = models.ImageField(upload_to = 'perfil/colaboradores/', blank = True, null = True)

    def __str__(self):
        return self.nome


