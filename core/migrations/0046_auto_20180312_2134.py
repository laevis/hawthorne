# Generated by Django 2.0.3 on 2018-03-12 21:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0045_auto_20180312_0614'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat',
            name='server',
        ),
        migrations.RemoveField(
            model_name='chat',
            name='user',
        ),
        migrations.RemoveField(
            model_name='log',
            name='user',
        ),
        migrations.RemoveField(
            model_name='userlogip',
            name='user',
        ),
        migrations.RemoveField(
            model_name='userlogtime',
            name='server',
        ),
        migrations.RemoveField(
            model_name='userlogtime',
            name='user',
        ),
        migrations.RemoveField(
            model_name='userlogusername',
            name='user',
        ),
        migrations.RenameField(
            model_name='token',
            old_name='is_superuser',
            new_name='is_supertoken',
        ),
        migrations.DeleteModel(
            name='Chat',
        ),
        migrations.DeleteModel(
            name='Log',
        ),
        migrations.DeleteModel(
            name='UserLogIP',
        ),
        migrations.DeleteModel(
            name='UserLogTime',
        ),
        migrations.DeleteModel(
            name='UserLogUsername',
        ),
    ]