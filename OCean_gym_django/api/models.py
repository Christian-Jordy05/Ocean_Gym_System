from django.db import models

class Client(models.Model):
    id_cliente = models.AutoField(primary_key=True)  # Definición manual del campo ID
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    apellido = models.CharField(max_length=200, null=True, blank=True)
    telefono = models.CharField(max_length=200, null=True, blank=True)
    password = models.CharField(max_length=128)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.name} {self.apellido}"
    
    
    
class Administrador(models.Model):
    id_Administrador = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)
    usuario = models.CharField(max_length=220, unique=True)
    contrasena = models.CharField(max_length=128)
    email = models.EmailField(unique=True)
    def __str__(self):
        return self.usuario
    
 
class Venta(models.Model):
    id_venta = models.AutoField(primary_key=True)  # Definición manual del campo ID
    fecha_venta = models.DateTimeField(auto_now_add=True)
    total = models.FloatField()
    id_cliente = models.ForeignKey('Client', on_delete=models.CASCADE)
    id_administrador = models.ForeignKey('Administrador', on_delete=models.SET_NULL, null=True, blank=True)
    id_metodo_pago = models.ForeignKey('MetodoDePago', on_delete=models.CASCADE)  # FK a método de pago
    def __str__(self):
        return f"Venta {self.id_venta} - {self.fecha_venta}"

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)  # PK
    nombre = models.CharField(max_length=100)  # string (se define el tamaño máximo)
    descripcion = models.TextField()  # string (campo de texto largo)
    precio = models.FloatField()  # float

    def _str_(self):
        return self.nombre

class Inscripcion(models.Model):
    id_inscripcion = models.AutoField(primary_key=True)  # PK
    id_cliente = models.ForeignKey('Client', on_delete=models.CASCADE)  # FK a cliente
    id_administrador = models.ForeignKey('Administrador', on_delete=models.CASCADE)  # FK a administrador
    fecha_inscripcion = models.DateTimeField()  # Fecha de inscripción
    tipo_inscripcion = models.CharField(max_length=50)  # Tipo de inscripción (día, semana, quincena, mes)
    costo = models.FloatField()  # Costo

    def _str_(self):
        return f"Inscripción {self.id_inscripcion} - {self.tipo_inscripcion}"

class MetodoDePago(models.Model):
    TIPO_PAGO_CHOICES = [
        ('SP', 'Sinpe'),
        ('EF', 'Efectivo'),
    ]
    id_inscripcion = models.AutoField(primary_key=True) 
    descripcion = models.CharField(max_length=100, choices=TIPO_PAGO_CHOICES)
 

    def __str__(self):
        return self.get_nombre_display()  # Muestra el nombre legible en lugar del código


 





