from django.db import models

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

