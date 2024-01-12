import os
import random
from urllib import parse

from django.db.models import Count
from django.shortcuts import render
from django.http import JsonResponse

from AdFunc.insterests import get_type
# Create your views here.
from News.models import News, NewsClick, Advertisement
import json
from django.core import serializers

from NewsAdSystem import settings
from UserLogin.models import UserStar



def list_news(request):
    print('get newslist')
    newsList = list(News.objects.values())
    print('back newskist')
    if newsList is not None:
        return JsonResponse({'success': True, 'newslist': newsList})
    else:
        return JsonResponse({'success': False})

    # if newsList is not None:
    #     print('transform news')
    #     #
    #
    #     return render(request, 'home.html', newsList)
    # else:
    #     return render(request, 'False.html')


def get_news(request):
    print('get news id')
    newsId = request.GET.get('newsId')
    print(newsId)
    print('get news')
    news = list(News.objects.values().filter(id=newsId))
    print('get user id')
    userId = request.session['userid']
    print(userId)
    print('solve the click event') # 假定在用户注册时会自动更新表格
    clickNumber = NewsClick.objects.get(editorId=userId, type=news[0]['type'])
    print('update click number')
    clickNumber.clickNumber = clickNumber.clickNumber + 1
    clickNumber.save()
    print('check news is collected')
    collectionMark = is_collected(userId, newsId)
    print('back news and advertisement')
    if news is not None:
        return JsonResponse({'success': True, 'news': news, 'is_collected': collectionMark})
    else:
        return JsonResponse({'success': False})

newsTypeDict = {'internation': '国际', 'technology': '科技', 'sport': '体育', 'amusement': '文娱',
                'education': '教育', 'economics': '财经', 'culture': '文化'}

def get_type_news(request):
    type = request.GET.get('type')
    if type == 'home':
        return list_news(request)
    newsList = list(News.objects.values().filter(type=newsTypeDict[type]))
    if newsList is not None:
        return JsonResponse({'success': True, 'newslist': newsList})
    else:
        return JsonResponse({'success': False})


def is_collected(userId, newsId):
    print('get user star')
    userStar = UserStar.objects.get(userId=userId)
    userStarList = [int(x) for x in userStar.newsId.split()]
    if int(newsId) in userStarList:
        return True
    else:
        return False


newsDict = {1: '科技', 2: '教育', 3: '金融', 4: '电商', 5: '游戏', 6: '公益', 7: '其他'}


def get_ad(request):
    userId = request.session['userid']
    print('get type')
    # 需要算法
    clickList = NewsClick.objects.values('editorId', 'type', 'clickNumber').order_by('type').filter(editorId=userId)
    numberList = [x['clickNumber'] for x in clickList]
    newsTypeNumber = get_type(numberList)
    newsType = newsDict[newsTypeNumber]
    print(newsType)
    # newsType = '其他'
    print('get ad by type')
    adList = list(Advertisement.objects.values().filter(type=newsType))
    print('get type number')
    adNumber = Advertisement.objects.values('type').annotate(Count('type')).filter(type=newsType)[0]['type__count']
    print('random choose a advertise of relate type')
    ad = adList[random.randint(0, adNumber - 1)]
    imgName = ad['img']
    ad['img'] = os.path.join(settings.MEDIA_URL, 'image', imgName).replace('\\', '/')
    print(ad)
    return JsonResponse({'success': True, 'advertisement': ad})
    # print('solve the click event')
    # clickNumber = NewsClick.objects.get(editorId=userId, type=news[0]['type'])
    # if clickNumber is None:
    #     print('create a new record')
    #     newClickNumber = NewsClick(editorId=userId, type=news[0]['type'], clickNumber=1)
    #     newClickNumber.save()
    # else:
    #     print('update click number')
    #     clickNumber.clickNumber = clickNumber.clickNumber + 1
    #     clickNumber.save()


def search_new(request):
    searchString = request.GET.get('query')
    print(searchString)
    backNewsList = list(News.objects.values().filter(content__icontains=searchString))
    print(len(backNewsList))
    if backNewsList is not None:
        return JsonResponse({'success': True, 'newslist': backNewsList})
    else:
        return JsonResponse({'success': False})



