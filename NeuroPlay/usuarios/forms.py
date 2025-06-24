from django import forms
from .models import Aluno, Colaborador


# Tratamento Imagem
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile


class AlunoModelForms(forms.ModelForm):
    class Meta:
        model = Aluno
        fields = ['nome', 'data_nasc', 'observacoes', 'foto', 'responsavel', 'cpf_responsavel']
        widgets = {
            'nome': forms.TextInput(attrs = {'class': 'form-control'}),
            'data_nasc': forms.DateInput(attrs = {'class': 'form-control', 'type': 'date'}),
            'observacoes': forms.TextInput(attrs = {'class': 'form-control'}),
            # 'foto': forms.ClearableFileInput(attrs={'class': 'form-control', 'id': 'id_foto'}),
            'foto': forms.ClearableFileInput(attrs={'class': 'form-control', 'id': 'foto'}),
            'responsavel': forms.TextInput(attrs = {'class': 'form-control'}),
            # 'cpf-responsavel': forms.TextInput(attrs = {'class': 'form-control'})
            'cpf_responsavel': forms.TextInput(attrs={'class': 'form-control', 'id': 'cpf_responsavel'}),

        }
    
    def clean_foto(self):
        foto = self.cleaned_data.get("foto")

        if foto:
            img = Image.open(foto)

            # Converte para RGB se necessário
            if img.mode != "RGB":
                img = img.convert("RGB")

            # Corta a imagem para formato quadrado (centralizado)
            width, height = img.size
            min_dim = min(width, height)
            left = (width - min_dim) / 2
            top = (height - min_dim) / 2
            right = (width + min_dim) / 2
            bottom = (height + min_dim) / 2
            img_cropped = img.crop((left, top, right, bottom))

            # Salva em memória
            buffer = BytesIO()
            img_cropped.save(buffer, format="JPEG")
            file_name = foto.name.split('.')[0] + '_quadrado.jpg'
            foto_file = ContentFile(buffer.getvalue(), name=file_name)

            return foto_file

        return foto

    def clean_cpf_responsavel(self):
        cpf = self.cleaned_data['cpf_responsavel']
        return ''.join(filter(str.isdigit, cpf))  # Remove . e -


class ColaboradorModelForms(forms.ModelForm):
    class Meta:
        model = Colaborador
        fields = ['nome', 'email', 'cpf', 'foto']
        widgets = {
            'nome': forms.TextInput(attrs = {'class': 'form-control'}),
            'email': forms.EmailInput(attrs = {'class': 'form-control'}),
            'cpf': forms.TextInput(attrs={'class': 'form-control', 'id': 'cpf'}),
            'foto': forms.ClearableFileInput(attrs={'class': 'form-control', 'id': 'foto'}),
        }

    def clean_foto(self):
        foto = self.cleaned_data.get("foto")

        if foto:
            img = Image.open(foto)
            # Converte para RGB se necessário
            if img.mode != "RGB":
                img = img.convert("RGB")
            # Corta a imagem para formato quadrado (centralizado)
            width, height = img.size
            min_dim = min(width, height)
            left = (width - min_dim) / 2
            top = (height - min_dim) / 2
            right = (width + min_dim) / 2
            bottom = (height + min_dim) / 2
            img_cropped = img.crop((left, top, right, bottom))

            # Salva em memória
            buffer = BytesIO()
            img_cropped.save(buffer, format="JPEG")
            file_name = foto.name.split('.')[0] + '_quadrado.jpg'
            foto_file = ContentFile(buffer.getvalue(), name=file_name)
            return foto_file
        return foto

    def clean_cpf(self):
        cpf = self.cleaned_data['cpf']
        return ''.join(filter(str.isdigit, cpf))  # Remove . e -
    
