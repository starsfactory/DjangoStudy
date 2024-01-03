from django.db import models

# Create your models here.
# python manage.py makemigrations
# python manage.py migrate


class User(models.Model):
    name = models.CharField(max_length=20)
    password = models.CharField(max_length=30)
    age = models.IntegerField()

