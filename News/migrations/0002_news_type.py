# Generated by Django 4.2.8 on 2024-01-02 01:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('News', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='news',
            name='type',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]