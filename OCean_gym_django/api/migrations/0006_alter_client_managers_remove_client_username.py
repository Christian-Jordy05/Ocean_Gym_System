# Generated by Django 5.1.1 on 2024-10-19 01:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_client_email_alter_client_username'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='client',
            managers=[
            ],
        ),
        migrations.RemoveField(
            model_name='client',
            name='username',
        ),
    ]
