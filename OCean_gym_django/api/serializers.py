from rest_framework import serializers, permissions
from .models import Client, Venta, Producto, Inscripcion, MetodoDePago
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if not user:
                msg = 'No se puede iniciar sesión con las credenciales proporcionadas.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Debe incluir "email" y "password".'
            raise serializers.ValidationError(msg, code='authorization')

        data = super().validate(attrs)
        refresh = self.get_token(user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        self.user = user
        return data

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



