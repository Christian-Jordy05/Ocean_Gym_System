# Generated by Django 5.1.1 on 2024-10-14 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inscripcion',
            name='id_administrador',
        ),
        migrations.RemoveField(
            model_name='venta',
            name='id_administrador',
        ),
        migrations.AddField(
            model_name='client',
            name='role',
            field=models.CharField(choices=[('admin', 'Administrador'), ('user', 'Usuario')], default='user', max_length=10),
        ),
        migrations.DeleteModel(
            name='Administrador',
        ),
    ]
