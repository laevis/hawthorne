# Generated by Django 2.0.3 on 2018-03-20 21:25

from django.db import migrations


class Migration(migrations.Migration):
  dependencies = [
    ('core', '0050_auto_20180319_2150'),
  ]

  operations = [
    migrations.AlterModelOptions(
      name='ban',
      options={'permissions': [('view_ban', 'Can view ban')]},
    ),
    migrations.AlterModelOptions(
      name='mutegag',
      options={'permissions': [('view_mutegag', 'Can view mute & gag'), ('add_mutegag_mute', 'Can add mute'),
                               ('add_mutegag_gag', 'Can add gag')], 'verbose_name': 'mute & gag',
               'verbose_name_plural': 'mutes & gags'},
    ),
    migrations.AlterModelOptions(
      name='server',
      options={'permissions': [('view_server', 'Can view server'), ('execute_server', 'Can execute command')]},
    ),
    migrations.AlterModelOptions(
      name='servergroup',
      options={'permissions': [('view_servergroup', 'Can view server group')], 'verbose_name': 'server role',
               'verbose_name_plural': 'server roles'},
    ),
    migrations.AlterModelOptions(
      name='token',
      options={'permissions': [('view_token', 'Can view token')], 'verbose_name': 'token',
               'verbose_name_plural': 'tokens'},
    ),
    migrations.AlterModelOptions(
      name='user',
      options={'permissions': [('view_user', 'Can view user'), ('kick_user', 'Can kick user'),
                               ('view_group', 'Can view user group'),
                               ('view_capabilities', 'Can check capabilities')]},
    ),
  ]
