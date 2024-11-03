from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import status
from .models import Client, Venta, Producto
from .serializers import ClientSerializer, VentaSerializer, ProductoSerializer
from rest_framework import  status

from django.http import JsonResponse
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
import requests
import logging

from .models import Client, Venta, Producto, Inscripcion, RegistroDePagos, MetodoDePago
from .serializers import (
    ClientSerializer, 
    VentaSerializer, 
    ProductoSerializer,
    ContactSerializer,
    CustomTokenObtainPairSerializer,
    InscripcionSerializer,
    RegistroDePagosSerializer,
    MetodoDePagoSerializer
)
from .permissions import Acceso_View_privada

from .key import clientId

logger = logging.getLogger(__name__)

from django.core.mail import send_mail
from rest_framework.permissions import IsAuthenticated
from django.core.mail import EmailMessage
import logging


@api_view(['POST'])
@permission_classes([AllowAny])
def register_client(request):
    if request.method == 'POST':
        email = request.data.get('email')
        if Client.objects.filter(email=email).exists():
            return Response({"error": "A user with this email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([Acceso_View_privada])
def client_detail(request, pk=None):
    if request.method == 'GET':
        if pk:
            try:
                client = Client.objects.get(pk=pk)
                serializer = ClientSerializer(client)
                return Response(serializer.data)
            except Client.DoesNotExist:
                return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            clients = Client.objects.all()
            serializer = ClientSerializer(clients, many=True)
            return Response(serializer.data)

    if request.method == 'PATCH':
        if pk:
            try:
                client = Client.objects.get(pk=pk)
                serializer = ClientSerializer(client, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Client.DoesNotExist:
                return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        if pk:
            try:
                client = Client.objects.get(pk=pk)
                client.delete()
                return Response({"message": "Client deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            except Client.DoesNotExist:
                return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([Acceso_View_privada])
def ventas_detail(request, pk=None):
    if request.method == 'GET':
        if pk:
            try:
                venta = Venta.objects.get(pk=pk)
                serializer = VentaSerializer(venta)
                return Response(serializer.data)
            except Venta.DoesNotExist:
                return Response({"error": "Venta not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            ventas = Venta.objects.all()
            serializer = VentaSerializer(ventas, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        serializer = VentaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        if pk:
            try:
                venta = Venta.objects.get(pk=pk)
                serializer = VentaSerializer(venta, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Venta.DoesNotExist:
                return Response({"error": "Venta not found"}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        if pk:
            try:
                venta = Venta.objects.get(pk=pk)
                venta.delete()
                return Response({"message": "Venta deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            except Venta.DoesNotExist:
                return Response({"error": "Venta not found"}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([Acceso_View_privada])
def producto_detail(request, pk=None):
    if request.method == 'GET':
        if pk:
            try:
                producto = Producto.objects.get(pk=pk)
                serializer = ProductoSerializer(producto)
                return Response(serializer.data)
            except Producto.DoesNotExist:
                return Response({"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        else:
            productos = Producto.objects.all()
            serializer = ProductoSerializer(productos, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        if pk:
            try:
                producto = Producto.objects.get(pk=pk)
                serializer = ProductoSerializer(producto, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Producto.DoesNotExist:
                return Response({"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        if pk:
            try:
                producto = Producto.objects.get(pk=pk)
                producto.delete()
                return Response({"mensaje": "Producto eliminado exitosamente"}, status=status.HTTP_204_NO_CONTENT)
            except Producto.DoesNotExist:
                return Response({"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['POST'])
@permission_classes([Acceso_View_privada])
def subir_imagen_a_imgur(request):
    file = request.FILES.get('image')
    if not file:
        return JsonResponse({'error': 'Por favor selecciona una imagen.'}, status=400)

    try:
        headers = {
            'Authorization': f'Client-ID {clientId}',
        }
        url = 'https://api.imgur.com/3/image'

        files = {'image': file.read()}

        response = requests.post(url, headers=headers, files=files)

        if response.status_code != 200:
            return JsonResponse({'error': 'Error al subir la imagen a Imgur'}, status=response.status_code)

        data = response.json()

        image_url = data['data']['link']

        return JsonResponse({'image_url': image_url}, status=200)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)



#/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7

# views.py
from django.core.mail import send_mail
from django.http import JsonResponse
import json

@api_view(['POST'])
def send_contact_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            nombre = data.get('nombre')
            mensaje = data.get('mensaje')

            # Enviar correo
            send_mail(
                subject='Nuevo mensaje de contacto',
                message=f'Nombre: {nombre}\nMensaje: {mensaje}',
                from_email='ydelgado@fwdcostarica.com',  # Cambia esto por tu correo electrónico
                recipient_list=['ydelgado@fwdcostarica.com'],  # Cambia esto al correo del destinatario

            )

            return JsonResponse({'message': 'Email enviado con éxito.'})
        except Exception as e:
            return JsonResponse({'error': f'Ocurrió un error: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


#////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


from django.core.mail import send_mail
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
import json
import requests

clientId = 'fcd86062a529556'

@api_view(['POST'])
@permission_classes([AllowAny])
def generar_qr_imgur(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            qr_base64 = data.get("qr_base64")
            email = data.get("email")

            if not qr_base64 or not email:
                return JsonResponse({"error": "El QR y el correo son obligatorios."}, status=400)

            headers = {
                "Authorization": f"Client-ID {clientId}",
                "Content-Type": "application/json"
            }

            # Enviar la imagen a Imgur
            response = requests.post("https://api.imgur.com/3/image", headers=headers, json={"image": qr_base64})
            if response.status_code != 200:
                return JsonResponse({"error": "Error al subir la imagen a Imgur"}, status=response.status_code)

            response_data = response.json()
            imgur_link = response_data["data"].get("link")

            if not imgur_link:
                return JsonResponse({"error": "Error al recibir la URL desde Imgur"}, status=500)

            # Enviar correo electrónico con el enlace del QR
            subject = "Tu código QR"
            message = f"Aquí está tu código QR: {imgur_link}"
            from_email = "ydelgado@fwdcostarica.com"
            recipient_list = [email]

            # Envía el correo y captura excepciones
            try:
                send_mail(subject, message, from_email, recipient_list)
            except Exception as e:
                return JsonResponse({"error": f"Error al enviar el correo: {str(e)}"}, status=500)

            return JsonResponse({"imgur_link": imgur_link}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Formato JSON inválido"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)






from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.core.mail import EmailMessage

@api_view(['POST'])
@permission_classes([AllowAny])
def enviar_qr_email(request):
    if request.method == 'POST':
        try:
            data = request.data
            email = data.get('email')
            imgur_link = data.get('imgur_link')

            # Verificar que el correo y el link no estén vacíos
            if not email or not imgur_link:
                return Response({"error": "El correo y el enlace son necesarios."}, status=400)

            # Configurar el correo
            subject = 'Tu código QR generado'
            message = f'Aquí tienes tu QR: {imgur_link}'
            email_from = 'salaysys4@gmail.com'  # El correo desde donde envías
            email_to = [email]  # Destinatario

            # Crear el mensaje de correo
            email = EmailMessage(subject, message, email_from, email_to)

            # Enviar el correo
            email.send()

            return Response({"message": "Correo enviado con éxito"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    return Response({"error": "Método no permitido"}, status=405)







@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def Inscripcion_detail(request, pk=None):
    if request.method == 'GET':
        if pk:
            try:
                inscripcion = Inscripcion.objects.get(pk=pk)
                serializer = InscripcionSerializer(inscripcion)
                return Response(serializer.data)
            except Inscripcion.DoesNotExist:
                return Response({"error": "Inscripcion not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            inscripciones = Inscripcion.objects.all()
            serializer = InscripcionSerializer(inscripciones, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        serializer = InscripcionSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        if pk:
            try:
                inscripcion = Inscripcion.objects.get(pk=pk)
                serializer = InscripcionSerializer(inscripcion, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Inscripcion.DoesNotExist:
                return Response({"error": "Inscripcion not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def registro_de_pago_list(request, pk=None):
    if request.method == 'GET':
        if pk:
            try:
                registro = RegistroDePagos.objects.get(pk=pk)
                serializer = RegistroDePagosSerializer(registro)
                return Response(serializer.data)
            except RegistroDePagos.DoesNotExist:
                return Response({"error": "Registro not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            registros = RegistroDePagos.objects.all()
            serializer = RegistroDePagosSerializer(registros, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        serializer = RegistroDePagosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def Metodo_de_pago(request, pk=None):
    if request.method == 'GET':
        if pk:
            try:
                metodo = MetodoDePago.objects.get(pk=pk)
                serializer = MetodoDePagoSerializer(metodo)
                return Response(serializer.data)
            except MetodoDePago.DoesNotExist:
                return Response({"error": "Metodo not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            metodos = MetodoDePago.objects.all()
            serializer = MetodoDePagoSerializer(metodos, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MetodoDePagoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def cambiar_contrasena(request):
    email = request.data.get('email')
    nueva_contrasena = request.data.get('nueva_contrasena')

    if not email or not nueva_contrasena:
        logger.warning("Faltan datos necesarios")
        return Response({'error': 'Todos los campos son obligatorios'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = Client.objects.get(email=email)
        user.password = make_password(nueva_contrasena)
        user.save()
        logger.info("Contraseña cambiada exitosamente")
        return Response({'message': 'Contraseña cambiada exitosamente'}, status=status.HTTP_200_OK)

    except Client.DoesNotExist:
        logger.error(f"Correo electrónico no encontrado: {email}")
        return Response({'error': f'Correo electrónico no encontrado: {email}'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        logger.error(f"Error al cambiar la contraseña: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)