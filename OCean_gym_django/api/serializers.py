from rest_framework import serializers, permissions
from .models import Client, Venta, Producto, Inscripcion, MetodoDePago
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
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
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Client
        fields = ['id_cliente', 'email', 'name', 'password', 'fecha_creacion', 'role', 'is_active']
        read_only_fields = ['fecha_creacion', 'is_active'] 






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



    




class MetodoDePagoSerializer(serializers.ModelSerializer):
    descripcion = serializers.CharField(source='get_descripcion_display', read_only=True)

    class Meta:
        model = MetodoDePago
        fields = ['id_metododepago', 'descripcion']



from rest_framework import serializers
from .models import RegistroDePagos, Client, Inscripcion 

class RegistroDePagosSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroDePagos
        fields = ['id_pago', 'fecha_pago', 'email', 'monto', 'id_inscripcion']
        read_only_fields = ['id_pago', 'fecha_pago']




from rest_framework import serializers
from .models import Inscripcion, Client
from django.utils import timezone

class InscripcionSerializer(serializers.ModelSerializer):
    dias_restantes = serializers.IntegerField(read_only=True)
    fecha_inscripcion = serializers.DateTimeField(read_only=True)
    fecha_expiracion = serializers.DateTimeField(read_only=True)
    pagos = RegistroDePagosSerializer(many=True, read_only=True)

    class Meta:
        model = Inscripcion
        fields = '__all__'

    def create(self, validated_data):
        inscripcion = Inscripcion.objects.create(**validated_data)
        return inscripcion 

    def update(self, instance, validated_data):
        if 'tipo_inscripcion' in validated_data:
            instance.extender_inscripcion(validated_data['tipo_inscripcion'])

        for attr, value in validated_data.items():
            if attr not in ['fecha_inscripcion', 'fecha_expiracion']:
                setattr(instance, attr, value)

        instance.save()  
        return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)
        
        # Formateo de fechas
        if instance.fecha_inscripcion:
            data['fecha_inscripcion'] = instance.fecha_inscripcion.strftime('%d/%m/%Y')
        else:
            data['fecha_inscripcion'] = None 

        if instance.fecha_expiracion:
            data['fecha_expiracion'] = instance.fecha_expiracion.strftime('%d/%m/%Y')
            dias_restantes = (instance.fecha_expiracion - timezone.now()).days
            data['dias_restantes'] = dias_restantes
            data['is_active'] = dias_restantes > 0 
        else:
            data['fecha_expiracion'] = None 
            data['dias_restantes'] = 0 
            data['is_active'] = False  

        return data

    