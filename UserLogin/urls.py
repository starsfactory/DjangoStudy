from django.urls import path
from UserLogin.views import dispatch, user_login, welcome, get_personal_data, star_news, unstar_news

urlpatterns = [
    path('', dispatch),
    path('personal', get_personal_data),
]