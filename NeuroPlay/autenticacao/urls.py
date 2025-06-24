from django.urls import path
from .views import login

app_name = 'autenticacao'

urlpatterns = [
    path('', login, name = 'home_login')
]

