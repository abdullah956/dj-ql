# Generated by Django 5.2.3 on 2025-06-25 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ql', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='posts/'),
        ),
    ]
