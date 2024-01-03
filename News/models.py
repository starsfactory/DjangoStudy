from django.db import models

# Create your models here.


class News(models.Model):
    time = models.TimeField()
    type = models.IntegerField(default=1)
    editor = models.CharField(max_length=10, default='nobody')
    title = models.CharField(max_length=30, default='no title')
    content = models.CharField(max_length=20000, default='no content')


class NewsClick(models.Model):
    editorId = models.IntegerField()
    type = models.IntegerField()
    clickNumber = models.IntegerField()