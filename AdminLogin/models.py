from django.db import models


# Create your models here.
class Admin(models.Model):
    name = models.CharField(max_length=20)
    password = models.CharField(max_length=30)
    age = models.IntegerField()