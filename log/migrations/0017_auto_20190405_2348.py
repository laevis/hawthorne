# Generated by Django 2.1.1 on 2019-04-05 23:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('log', '0016_remove_serverchat_ip'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userconnection',
            old_name='disconnected',
            new_name='closed_at',
        ),
        migrations.RemoveField(
            model_name='userconnection',
            name='connected',
        ),
    ]
