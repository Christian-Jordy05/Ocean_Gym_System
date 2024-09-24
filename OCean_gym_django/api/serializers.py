from rest_framework import serializers
from .models import Client  # Nombre del modelo corregido

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['email', 'name', 'password', 'fecha_creacion']
