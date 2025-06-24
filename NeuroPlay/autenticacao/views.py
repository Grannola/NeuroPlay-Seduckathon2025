from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate



def login(request):
    if request.method == 'GET':
        return render(request, 'autenticacao/login.html')
    else:
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request,username=username, password=password)
        if user:
            return login(request, user)
        return redirect("dashboard_index")
    

 