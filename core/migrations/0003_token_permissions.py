# Generated by Django 2.0 on 2018-01-25 09:20

from django.db import migrations, models


class Migration(migrations.Migration):
  dependencies = [
    ('auth', '0009_alter_user_last_name_max_length'),
    ('core', '0002_auto_20180125_0914'),
  ]

  operations = [
    migrations.AddField(
      model_name='token',
      name='permissions',
      field=models.ManyToManyField(to='auth.Permission'),
    ),
  ]
