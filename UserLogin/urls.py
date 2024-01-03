from django.urls import path
from UserLogin.views import dispatch, user_login, welcome


urlpatterns = [
    path('', dispatch),
]