# Generated by Django 4.2.8 on 2023-12-30 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.TimeField()),
                ('editor', models.CharField(default='nobody', max_length=10)),
                ('title', models.CharField(default='no title', max_length=30)),
                ('content', models.CharField(default='no content', max_length=20000)),
            ],
        ),
    ]
