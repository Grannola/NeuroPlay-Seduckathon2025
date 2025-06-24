from django.db import models

class Jogo(models.Model):
    id = models.AutoField(primary_key = True)
    nome = models.CharField(max_length = 120)
    descricao = models.TextField(max_length = 1000)
    imagem = models.ImageField(upload_to = 'jogos/')

    def __str__(self):
        return self.nome


