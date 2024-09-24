from django.db import models

class Client(models.Model):  
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=128)
    fecha_creacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email
