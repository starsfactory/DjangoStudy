import os

import django.http
from django.shortcuts import render, redirect
from django.http import JsonResponse
import json

# Create your views here.
from django.http import HttpResponse

from CloudWord.cn_wordcloud import generate
from News.models import News
from NewsAdSystem import settings
from UserLogin.models import User, UserStar


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
        if user is not None:
            print('set session')
            request.session['userid'] = user.id
            print("have find user")
            print(user.name)
            print(user.password)
            return JsonResponse({'success': True, 'username': user.name, 'userpassword': user.password, 'isuser': user.isuser})
        else:
            print('None')
            return JsonResponse({'success': False})


def star_news(request):
    newId = request.GET.get('newsId')
    userId = request.session['userid']
    star = UserStar.objects.get(userId=userId)
    star.newsId = star.newsId + f' {newId}'
    star.save()
    return JsonResponse({'success': True})

def unstar_news(request):
    userId = request.session['userid']
    newsId = request.GET.get('newsId')
    print('get user star')
    userStar = UserStar.objects.get(userId=userId)
    userStarList = [int(x) for x in userStar.newsId.split()]
    print('remove')
    userStarList.remove(int(newsId))
    userStar.newsId = ''
    for x in userStarList:
        userStar.newsId += '' + str(x) + ' '
    userStar.save()
    return JsonResponse({'success': True})


def get_personal_data(request):
    userId = request.session['userid']
    print(userId)
    print('search user info')
    userInfo = User.objects.values().get(id=userId)
    print('get user star')
    userStar = UserStar.objects.get(userId=userId)
    userStarList = [int(x) for x in userStar.newsId.split()]
    print(userStarList)
    print('get user star news')
    userStarNewsList = list(News.objects.values().filter(id__in=userStarList))
    print('get user wordcloud')
    word_cloud_generate(userStarNewsList, userInfo['name'])
    userInfo['userimg'] = os.path.join(settings.MEDIA_URL, 'UserCloudWord').replace('\\', '/') + '/' +userInfo['name'] + '.jpg'
    return JsonResponse({'success': True, 'userinfo': userInfo, 'userstar': userStarNewsList})


def word_cloud_generate(newslist, name):
    txtlist = []
    for news in newslist:
        txtlist.append(news['content'])
    generate(txtlist, name)

    # count = {}
    # for txt in txtlist:
    #     txt = jieba.lcut(txt)
    #     for word in txt:
    #         if len(word) <= 1:
    #             continue
    #         else:
    #             count[word] = count.get(word, 0) + 1
    # wordlist = list(count.items())
    # wordlist.sort(key=lambda x: x[1], reverse=True)
    # for i in range(15):
    #     print("{0}:{1}".format(wordlist[i][0], wordlist[i][1]))
    # return txt



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