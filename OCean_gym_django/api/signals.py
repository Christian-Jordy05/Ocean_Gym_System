from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Inscripcion, Client

@receiver(post_save, sender=Inscripcion)
def update_client_active_status(sender, instance, **kwargs):
    # Obtiene el cliente asociado a la inscripción
    client = instance.client
    # Actualiza el estado de is_active basado en las inscripciones
    client.is_active = any(inscripcion.dias_restantes > 0 for inscripcion in client.inscripciones.all())
    client.save()  # Asegúrate de guardar la instancia del cliente

@receiver(post_save, sender=Inscripcion)
def update_client_active_status(sender, instance, **kwargs):
    # Obtiene el cliente asociado a la inscripción
    client = instance.client  # Aquí, `client` es una instancia de `Client`
    # Actualiza el estado de is_active basado en las inscripciones
    client.is_active = any(inscripcion.dias_restantes > 0 for inscripcion in client.inscripciones.all())
    client.save()  # Asegúrate de guardar la instancia del cliente
