# Generated by Django 5.1.1 on 2024-10-22 15:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_client_managers_remove_client_username'),
    ]

    operations = [
        migrations.RenameField(
            model_name='inscripcion',
            old_name='id_cliente',
            new_name='gmail',
        ),
    ]
