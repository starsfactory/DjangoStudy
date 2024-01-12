from News.views import list_news, get_news, get_ad, search_new, get_type_news
from django.urls import path

from UserLogin.views import star_news, unstar_news

urlpatterns = [
    # path('admin/', admin.site.urls),
    # 获取全部新闻
    path('', list_news),
    # 拉取某一个新闻
    path('/one', get_news),
    path('/advertisement', get_ad),
    path('/search', search_new),
    path('/star', star_news),
    path('/unstar', unstar_news),
    path('/type', get_type_news)
]
