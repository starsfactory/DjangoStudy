from django.db import models

# Create your models here.
# python manage.py makemigrations
# python manage.py migrate


class User(models.Model):
    name = models.CharField(max_length=20)
    password = models.CharField(max_length=30)
    age = models.IntegerField()
    isuser = models.BooleanField(default=False)
    userimg = models.ImageField(default='None.jpg')

    # area = models.CharField(max_length=20,default='湖北武汉')
    # email = models.CharField(max_length=20,default='793673206@qq.com')
    # phone = models.CharField(max_length=20,default='793673206@qq.com')

class UserStar(models.Model):
    userId = models.IntegerField()
    newsId = models.CharField(max_length=1000)

