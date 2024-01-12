import os

from django.conf import settings
from django.db.models import Sum, Count
from django.shortcuts import render
from django.http import JsonResponse

from News.models import News, Advertisement, NewsClick


# Create your views here.
def go_manage(request):
    print('go manage')
    return render(request, "g_news.html")


def add_news(request):
    print('init news')
    news = News()
    print('get news info')
    news.title = request.GET.get('newstitle')
    news.type = request.GET.get('newstype')
    news.editor = request.GET.get('newseditor')
    news.content = request.GET.get('newscontent')
    print('save news')
    news.save()
    return JsonResponse()


def del_news(request):
    print('get news id')
    newsId = request.GET.get()
    print(newsId)
    print('search the news')
    news = list(News.objects.values().filter(id=newsId))
    if news is None:
        return JsonResponse({'success': False})
    else:
        news.delete()
        return JsonResponse({'success': True})


def update_news(request):
    print('get news id')
    newsId = request.GET.get()
    print(newsId)
    print('search the news')
    news = list(News.objects.values().filter(id=newsId))
    if news is None:
        return JsonResponse({'success': False})
    else:
        print('update news')
        news.title = request.GET.get('newstitle')
        news.type = request.GET.get('newstype')
        news.editor = request.GET.get('newseditor')
        news.content = request.GET.get('newscontent')
        news.save()
        return JsonResponse({'success': True})

def list_ad(request):
    print('get adlist')
    adList = list(Advertisement.objects.values())
    print('back adlist')
    if adList is not None:
        return JsonResponse({'success': True, 'adlist': adList})
    else:
        return JsonResponse({'success': False})


def list_advertise(request):
    print('get advertiselist')
    advertiseList = list(Advertisement.objects.values())
    print('back advertisekist')
    if advertiseList is not None:
        return JsonResponse({'success': True, 'newslist': advertiseList})
    else:
        return JsonResponse({'success': False})

def add_ad(request):
    advertise = Advertisement()
    image = request.FILES.get('image', None)
    if image:
        file_info, suffix = os.path.splitext(image.name)
        # 修改照片名称 按需求来进行改写
        image.name = 'ad_' + suffix
        if suffix.upper() not in ['.JPG', '.JPEG', '.PNG']:
            return JsonResponse({'success': False, "msg": "照片格式只支持PNG、JPEG、JPG", "code": 1})
        # 判断数据库中该用户是否有上传过照片，如果有，代表我们服务器本地也有这个照片，因为我们model用的是 upload_to 这个，
        # 所以 如果照片存在，再次上传同一张照片，系统会自动给你在照片的末尾加上一些字符串来区分并不会替换掉照片，会造成无用的图片越来越多，
        # 所以我们要把之间的同一个名字的照片先删除掉，在进行保存
        if advertise.img:
            path = settings.BASE_DIR + '/media/' + str(advertise.img)
            if os.path.exists(path):
                os.remove(path)

    advertise.img = image
    advertise.type = request.GET.get('type')
    advertise.link = request.GET.get('link')
    advertise.content = request.GET.get('content')
    advertise.save()
    return JsonResponse({'success': True})


def del_ad(request):
    print('get advertise id')
    advertiseId = request.GET.get()
    print(advertiseId)
    print('search the advertise')
    advertise = list(Advertisement.objects.values().filter(id=advertiseId))
    if advertise is None:
        return JsonResponse({'success': False})
    else:
        advertise.delete()
        return JsonResponse({'success': True})

    return JsonResponse()


def update_ad(request):
    print('get advertise id')
    advertiseId = request.GET.get()
    print(advertiseId)
    print('search the news')
    advertise = list(Advertisement.objects.values().filter(id=advertiseId))
    if advertise is None:
        return JsonResponse({'success': False})
    else:
        print('update news')
        advertise.title = request.GET.get('newstitle')
        advertise.type = request.GET.get('newstype')
        advertise.editor = request.GET.get('newseditor')
        advertise.content = request.GET.get('newscontent')
        advertise.save()
        return JsonResponse({'success': True})



# def get_statistics(request):
#     print('get statistic')
#     statistic = NewsClick.objects.values('type').anontate(total_type=Sum('clickNumber')).all()
#     print(statistic)
#     # print('back statistic')
#     # if statistic is not None:
#     #     return JsonResponse({'success': True, 'statistic': statistic})
#     # else:
#     #     return JsonResponse({'success': False})
#     return JsonResponse({'sucess': True})


def get_news_statistics(request):
    backList = []
    print('get news statistics')
    statistics = News.objects.values('type').annotate(Count('type'))
    for sta in statistics:
        print(sta)
        backList.append(sta['type__count'])
    print(backList)
    backStatistics = list(statistics)

    return JsonResponse({'sucess': True, 'statistics': backList})

