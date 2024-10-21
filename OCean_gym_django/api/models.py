from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.contrib.auth.hashers import make_password
from django.db import models


class MetodoDePago(models.Model):
    TIPO_PAGO_CHOICES = [
        ('SP', 'Sinpe'),
        ('EF', 'Efectivo'),
    ]
    id_metododepago = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=100, choices=TIPO_PAGO_CHOICES)
    def __str__(self):
        return self.get_nombre_display()

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El usuario debe tener un correo electrónico')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class Client(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Administrador'),
        ('user', 'Usuario'),
    ]
    
    id_cliente = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    apellido = models.CharField(max_length=200, null=True, blank=True)
    telefono = models.CharField(max_length=200, null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    is_active = models.BooleanField(default=True)
    username = None  # Deshabilita el campo 'username'
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'  # Usa 'email' como identificador
    REQUIRED_FIELDS = []  # No se requieren otros campos

    objects = UserManager()  # Usamos el nuevo UserManager

    groups = models.ManyToManyField(
        Group,
        related_name='client_groups',  
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='client_user_permissions',  
        blank=True,
    )

    def __str__(self):
        return f"{self.name} {self.apellido}"

    def save(self, *args, **kwargs):
        if self.pk is None or not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super(Client, self).save(*args, **kwargs)



class Venta(models.Model):
    id_venta = models.AutoField(primary_key=True)
    fecha_venta = models.DateTimeField(auto_now_add=True)
    total = models.FloatField()
    id_cliente = models.ForeignKey(Client, on_delete=models.CASCADE)
    id_metododepago = models.ForeignKey(MetodoDePago, on_delete=models.CASCADE)  # Relación con MetodoDePago

class Inscripcion(models.Model):
    id_inscripcion = models.AutoField(primary_key=True)  # PK
    id_cliente = models.ForeignKey(Client, on_delete=models.CASCADE)  # FK a cliente
    fecha_inscripcion = models.DateTimeField()  # Fecha de inscripción
    tipo_inscripcion = models.CharField(max_length=50)  # Tipo de inscripción (día, semana, quincena, mes)
    costo = models.FloatField()  # Costo
    id_metododepago = models.ForeignKey(MetodoDePago, on_delete=models.CASCADE)
    def __str__(self):
        return f"Inscripción {self.id_inscripcion} - {self.tipo_inscripcion}"

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.FloatField()
    img = models.URLField(max_length=500, blank=True)
    def __str__(self):
        return self.nombre
