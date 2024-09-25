from rest_framework import serializers
from .models import Client

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['email', 'name', 'password', 'fecha_creacion']
        read_only_fields = ['fecha_creacion']  #