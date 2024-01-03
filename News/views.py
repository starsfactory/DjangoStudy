from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
from News.models import News
import json
from django.core import serializers


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
    print('solve the click event')

    print('get user id')

    print('back news')
    if news is not None:
        return JsonResponse({'success': True, 'news': news})
    else:
        return JsonResponse({'success': False})

