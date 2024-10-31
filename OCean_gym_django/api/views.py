from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Client, Venta, Producto
from .serializers import ClientSerializer, VentaSerializer, ProductoSerializer
from rest_framework import  status
from django.http import JsonResponse
import requests
from django.conf import settings
from .key import clientId
from rest_framework.permissions import AllowAny 
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .permissions import Acceso_View_privada
from django.core.mail import send_mail
from rest_framework.permissions import IsAuthenticated
from django.core.mail import EmailMessage
import logging

@api_view(['POST'])
@permission_classes([AllowAny])  
def register_client(request):
    if request.method == 'POST':
        # Verificar si ya existe un usuario con el mismo email
        email = request.data.get('email')
        if Client.objects.filter(email=email).exists():
            return Response({"error": "A user with this email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Crear nuevo usuario
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7


# Clientes

        
@api_view(['GET', 'PUT', 'DELETE'])
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

    elif request.method == 'PUT':
        if pk:
            try:
                client = Client.objects.get(pk=pk)
                serializer = ClientSerializer(client, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Client.DoesNotExist:
                return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        if pk:
            try:
                client = Client.objects.get(pk=pk)
                client.delete()
                return Response({"message": "Client deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            except Client.DoesNotExist:
                return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)



# ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
# Ventas
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
# //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////           
#producto
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([Acceso_View_privada])

def producto_detail(request, pk=None):
    # GET - Obtener una lista de productos o un producto por ID
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

    # POST - Crear un nuevo producto
    elif request.method == 'POST':
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # PUT - Actualizar un producto por ID
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

    # DELETE - Eliminar un producto por ID
    elif request.method == 'DELETE':
        if pk:
            try:
                producto = Producto.objects.get(pk=pk)
                producto.delete()
                return Response({"mensaje": "Producto eliminado exitosamente"}, status=status.HTTP_204_NO_CONTENT)
            except Producto.DoesNotExist:
                return Response({"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

#////////////////////////////////////////////////

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    


#////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
#view_imgur
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


import json
import requests
from django.http import JsonResponse
clientId = 'fcd86062a529556'
@api_view(['POST'])
@permission_classes([AllowAny])
def generar_qr_imgur(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print(f"Datos recibidos: {data}")  # Imprime los datos recibidos
            
            nombre = data.get("nombre")
            email = data.get("email")
            mensaje = data.get("message")
            qr_base64 = data.get("qr_base64")
            
            if not nombre or not email or not mensaje or not qr_base64:
                return JsonResponse({"error": "Todos los campos son obligatorios"}, status=400)

            headers = {                                 
                "Authorization": f"Client-ID {clientId}",
                "Content-Type": "application/json"
            }

            response = requests.post("https://api.imgur.com/3/image", headers=headers, json={"image": qr_base64})
            print(f"Respuesta de Imgur: {response.text}")  # Imprime la respuesta de Imgur
            
            if response.status_code != 200:
                return JsonResponse({"error": "Error al subir la imagen a Imgur"}, status=response.status_code)

            response_data = response.json()
            if "data" not in response_data or "link" not in response_data["data"]:
                return JsonResponse({"error": "Error al recibir la URL desde Imgur"}, status=500)

            imgur_link = response_data["data"]["link"]
            return JsonResponse({"imgur_link": imgur_link}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Formato JSON inválido"}, status=400)
        except Exception as e:
            print(f"Error inesperado: {str(e)}")  # Imprimir el error inesperado
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)





