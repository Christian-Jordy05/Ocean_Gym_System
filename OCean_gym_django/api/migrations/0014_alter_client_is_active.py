# Generated by Django 5.1.1 on 2024-10-28 06:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_inscripcion_client'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]
