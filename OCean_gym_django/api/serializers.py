from rest_framework import serializers
from .models import Client, Administrador, Venta

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['email', 'name', 'password', 'fecha_creacion']
        read_only_fields = ['fecha_creacion']

class AdministradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrador
        fields = '__all__'

class VentaSerializer(serializers.ModelSerializer):
    cliente = ClientSerializer(read_only=True)
    administrador = AdministradorSerializer(read_only=True, allow_null=True)  
    class Meta:
        model = Venta
        fields = ['id_venta', 'fecha_venta', 'total', 'cliente', 'administrador']
        read_only_fields = ['fecha_venta']  
