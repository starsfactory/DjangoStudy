from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

# Create your models here.


class News(models.Model):
    time = models.TimeField()
    type = models.CharField(max_length=100, default='国际')
    editor = models.CharField(max_length=100, default='nobody')
    title = models.CharField(max_length=300, default='no title')
    content = models.CharField(max_length=20000, default='no content')
    siminfo = models.CharField(max_length=1000, default='no introduce')


class NewsClick(models.Model):
    editorId = models.IntegerField()
    type = models.CharField(max_length=10, default='国际')
    clickNumber = models.IntegerField()
    class Meta:
        # 唯一约束确保field1和field2的组合是唯一的
        constraints = [
            models.UniqueConstraint(fields=['editorId', 'type'], name='unique_editorId_type')
        ]


class Advertisement(models.Model):
    type = models.CharField(max_length=10,  default='国际')
    link = models.CharField(max_length=1000)
    content = models.CharField(max_length=300)
    img = models.ImageField(upload_to='images', default='img.jpg')
    phone = models.CharField(max_length=15, default=15367386191)
    charger = models.IntegerField(default=20)


class PageView(models.Model):
    timesplit = models.DateTimeField()
    ViewNumber = models.IntegerField()