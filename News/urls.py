from News.views import list_news, get_news
from django.urls import path

urlpatterns = [
    # path('admin/', admin.site.urls),
    # 获取全部新闻
    path('', list_news),
    # 拉取某一个新闻
    path('/one', get_news)
]
