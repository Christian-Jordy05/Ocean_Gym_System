from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.contrib.auth.hashers import make_password
from django.utils import timezone
from datetime import timedelta
from django.core.exceptions import ValidationError

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
    # Campos de tu modelo Client
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
    username = None  
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = UserManager()

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

       
        if hasattr(self, 'inscripciones'):
            self.is_active = any(inscripcion.dias_restantes > 0 for inscripcion in self.inscripciones.all())
        else:
            self.is_active = False

class MetodoDePago(models.Model):
    TIPO_PAGO_CHOICES = [
        ('SP', 'Sinpe'),
        ('EF', 'Efectivo'),
    ]
    id_metododepago = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=100, choices=TIPO_PAGO_CHOICES)

    def __str__(self):
        return self.get_descripcion_display()


class Inscripcion(models.Model):
    id_inscripcion = models.AutoField(primary_key=True)
    email = models.CharField(max_length=200)
    fecha_inscripcion = models.DateTimeField(auto_now_add=True)
    fecha_expiracion = models.DateTimeField(null=True, blank=True)
    tipo_inscripcion = models.CharField(max_length=50)
    costo = models.FloatField()
    id_metododepago = models.ForeignKey(MetodoDePago, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, related_name='inscripciones', on_delete=models.CASCADE, default=1)

    DURACION_INSCRIPCIONES = {
        'dia': 1,
        'semanal': 7,
        'quincenal': 15,
        'mensual': 30
    }

    @property
    def dias_restantes(self):
        if not self.fecha_expiracion:
            return 0
        dias = (self.fecha_expiracion - timezone.now()).days
        return max(0, dias)

    def extender_inscripcion(self, tipo_inscripcion):
        duracion = self.DURACION_INSCRIPCIONES.get(tipo_inscripcion)
        if duracion is None:
            raise ValueError("Tipo de inscripción no válido")
        
        # Si ya hay una fecha de expiración, sumamos los días
        if self.fecha_expiracion:
            self.fecha_expiracion += timedelta(days=duracion)
        else:
            # Si no hay fecha de expiración, se establece una nueva
            self.fecha_expiracion = timezone.now() + timedelta(days=duracion)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.extender_inscripcion(self.tipo_inscripcion)
        else:
            self.extender_inscripcion(self.tipo_inscripcion)
        super().save(*args, **kwargs)

        self.client.is_active = any(inscripcion.dias_restantes > 0 for inscripcion in self.client.inscripciones.all())
        self.client.save()

    

class RegistroDePagos(models.Model):
    id_pago = models.AutoField(primary_key=True)
    fecha_pago = models.DateTimeField(auto_now_add=True)  
    email = models.EmailField(max_length=200)  
    monto = models.FloatField()  
    id_inscripcion = models.ForeignKey(Inscripcion, on_delete=models.CASCADE, related_name='pagos') 

    def __str__(self):
        return f"Pago {self.id_pago} - Cliente: {self.id_inscripcion.gmail} - Monto: {self.monto} - Fecha: {self.fecha_pago.strftime('%d/%m/%Y')}"

class Venta(models.Model):
    id_venta = models.AutoField(primary_key=True)
    fecha_venta = models.DateTimeField(auto_now_add=True)
    total = models.FloatField()
    id_cliente = models.ForeignKey(Client, on_delete=models.CASCADE)
    id_metododepago = models.ForeignKey(MetodoDePago, on_delete=models.CASCADE) 

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.FloatField()
    img = models.URLField(max_length=500, blank=True)

    def __str__(self):
        return self.nombre
