# Generated by Django 2.0.2 on 2018-03-01 10:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0033_auto_20180227_2336'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mutegag',
            name='length',
            field=models.DurationField(null=True),
        ),
    ]
