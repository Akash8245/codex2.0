# Generated by Django 5.1.1 on 2024-09-04 11:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_pythonmodel_output'),
    ]

    operations = [
        migrations.CreateModel(
            name='BashModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('no', models.PositiveIntegerField()),
                ('title', models.TextField()),
                ('code', models.TextField()),
                ('output', models.TextField(null=True)),
            ],
        ),
    ]
