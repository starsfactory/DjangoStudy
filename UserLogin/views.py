import django.http
from django.shortcuts import render, redirect
from django.http import JsonResponse
import json

# Create your views here.
from django.http import HttpResponse

from UserLogin.models import User


def dispatch(request):

    if request.method == 'GET':
        res = welcome(request)
    else:
        res = user_login(request)

    return res


# user come to our website
def welcome(request):
    print("welcome")
    return render(request, "Login.html")


# user want to log in
def user_login(request):
    print('logining...')
    if request.method == 'POST':
        userName = request.POST.get('username')
        userPassword = request.POST.get('password')

        user = User.objects.filter(name=userName).first()
        print('set session')
        request.session['userid'] = user.id
        if user is not None:
            print("have find user")
            print(user.name)
            print(user.password)
            return JsonResponse({'success': True, 'username': user.name, 'userpassword': user.password})
        else:
            print('None')
            return JsonResponse({'success': False})








# create
# User.objects.create(name=?, password=?, age=?)
# delete
# User.objects.filter().delete()
# User.objects.all().delete()
# get
# User.objects.all() -> list 每个元素是对象
# User.objects.filter().first() # 取第一个数据
# update
# User.objects.filter().update(password=?)

    # print('logining...')
    # if request.method == 'POST':
    #     userName = request.POST.get('username')
    #     userPassword = request.POST.get('password')
    #
    #     if userName == "root" and userPassword == "123":
    #         print('success')
    #         return JsonResponse({'success': True, 'username': 'root', 'userpassword': '123'})
    #     else:
    #         return JsonResponse({'success': False})