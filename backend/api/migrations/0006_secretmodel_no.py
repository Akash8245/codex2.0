# Generated by Django 5.1.1 on 2024-09-07 14:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_secretmodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='secretmodel',
            name='no',
            field=models.PositiveIntegerField(default=3333),
            preserve_default=False,
        ),
    ]
