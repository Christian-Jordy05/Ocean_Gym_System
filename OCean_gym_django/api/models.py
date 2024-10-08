from django.db import models

class MetodoDePago(models.Model):
    TIPO_PAGO_CHOICES = [
        ('SP', 'Sinpe'),
        ('EF', 'Efectivo'),
    ]
    id_metododepago = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=100, choices=TIPO_PAGO_CHOICES)
    def __str__(self):
        return self.get_nombre_display()  # Muestra el nombre legible en lugar del código  

class Client(models.Model):
    id_cliente = models.AutoField(primary_key=True)
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
    id_venta = models.AutoField(primary_key=True)
    fecha_venta = models.DateTimeField(auto_now_add=True)
    total = models.FloatField()
    id_cliente = models.ForeignKey(Client, on_delete=models.CASCADE)
    id_administrador = models.ForeignKey(Administrador, on_delete=models.SET_NULL, null=True, blank=True)
    id_metododepago = models.ForeignKey(MetodoDePago, on_delete=models.CASCADE)  # Relación con MetodoDePago
    
class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.FloatField()
    img = models.URLField(max_length=500, blank=True)
    def _str_(self):
        return self.nombre
class Inscripcion(models.Model):
    
    id_inscripcion = models.AutoField(primary_key=True)  # PK
    id_cliente = models.ForeignKey(Client, on_delete=models.CASCADE)  # FK a cliente
    id_administrador = models.ForeignKey(Administrador, on_delete=models.CASCADE)  # FK a administrador
    fecha_inscripcion = models.DateTimeField()  # Fecha de inscripción
    tipo_inscripcion = models.CharField(max_length=50)  # Tipo de inscripción (día, semana, quincena, mes)
    costo = models.FloatField()  # Costo
    id_metododepago = models.ForeignKey(MetodoDePago, on_delete=models.CASCADE)
    def _str_(self):
        return f"Inscripción {self.id_inscripcion} - {self.tipo_inscripcion}"