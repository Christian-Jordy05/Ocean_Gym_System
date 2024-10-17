from rest_framework import serializers
from .models import Client, Venta, Producto, Inscripcion, MetodoDePago
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Client

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(required=True)

    def validate(self, attrs):
        # Override the validate method to check for email instead of username
        try:
            user = Client.objects.get(email=attrs['email'])
        except Client.DoesNotExist:
            raise serializers.ValidationError('No user with this email found.')
        
        # Add the email to the attributes, as authenticate() will expect a username field
        attrs['username'] = user.username
        return super().validate(attrs)

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        token['name'] = user.name

        return token



class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id_cliente', 'email', 'name', 'password', 'fecha_creacion', 'role']  
        read_only_fields = ['fecha_creacion']



class VentaSerializer(serializers.ModelSerializer):
    cliente = ClientSerializer(read_only=True)
    class Meta:
        model = Venta
        fields = ['id_venta', 'fecha_venta', 'total', 'cliente', 'administrador']
        read_only_fields = ['fecha_venta']  

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id_producto', 'nombre', 'descripcion', 'precio', 'img']

class InscripcionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscripcion
        fields = ['id_inscripcion', 'id_cliente', 'id_administrador', 'fecha_inscripcion', 'tipo_inscripcion', 'costo']

class MetodoDePagoSerializer(serializers.ModelSerializer):
    descripcion = serializers.CharField(source='get_descripcion_display', read_only=True)

    class Meta:
        model = MetodoDePago
        fields = ['id_inscripcion', 'descripcion']



