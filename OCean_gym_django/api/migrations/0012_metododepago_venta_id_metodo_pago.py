# Generated by Django 5.1.1 on 2024-09-26 21:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_inscripcion'),
    ]

    operations = [
        migrations.CreateModel(
            name='MetodoDePago',
            fields=[
                ('id_inscripcion', models.AutoField(primary_key=True, serialize=False)),
                ('descripcion', models.CharField(choices=[('SP', 'Sinpe'), ('EF', 'Efectivo')], max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='venta',
            name='id_metodo_pago',
            field=models.ForeignKey( on_delete=django.db.models.deletion.CASCADE, to='api.metododepago'),
            preserve_default=False,
        ),
    ]
