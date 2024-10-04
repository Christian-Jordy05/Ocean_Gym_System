from rest_framework import serializers
from .models import Client, Administrador, Venta, Producto, Inscripcion, MetodoDePago

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id_cliente','email', 'name', 'password', 'fecha_creacion']
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

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id_producto', 'nombre', 'descripcion', 'precio']

class InscripcionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscripcion
        fields = ['id_inscripcion', 'id_cliente', 'id_administrador', 'fecha_inscripcion', 'tipo_inscripcion', 'costo']

class MetodoDePagoSerializer(serializers.ModelSerializer):
    descripcion = serializers.CharField(source='get_descripcion_display', read_only=True)

    class Meta:
        model = MetodoDePago
        fields = ['id_inscripcion', 'descripcion']
