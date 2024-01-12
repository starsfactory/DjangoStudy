from django.urls import path, include

from Manage.views import go_manage, add_news, add_ad, del_news, del_ad, update_news, update_ad, \
    get_news_statistics, list_ad


urlpatterns = [
    path('', go_manage),

    path('/adanews', add_news),
    path('/delnews', del_news),
    path('/updatenews', update_news),

    path('/allad', list_ad),
    path('/addad', add_ad),
    path('/delad', del_ad),
    path('/update', update_ad),

    # 可视化
    # path('/statistics', get_statistics),
    # 新闻种类点击量
    path('/news_statistics', get_news_statistics),


]