from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Client, Administrador, Venta
from .serializers import ClientSerializer, AdministradorSerializer, VentaSerializer

# ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
# Clientes
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
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

    elif request.method == 'POST':
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
# Administradores
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def administrador_detail(request, pk=None):
    if request.method == 'GET':
        if pk:
            try:
                admin = Administrador.objects.get(pk=pk)
                serializer = AdministradorSerializer(admin)
                return Response(serializer.data)
            except Administrador.DoesNotExist:
                return Response({"error": "Administrador not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            admins = Administrador.objects.all()
            serializer = AdministradorSerializer(admins, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AdministradorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        if pk:
            try:
                admin = Administrador.objects.get(pk=pk)
                serializer = AdministradorSerializer(admin, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Administrador.DoesNotExist:
                return Response({"error": "Administrador not found"}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        if pk:
            try:
                admin = Administrador.objects.get(pk=pk)
                admin.delete()
                return Response({"message": "Administrador deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            except Administrador.DoesNotExist:
                return Response({"error": "Administrador not found"}, status=status.HTTP_404_NOT_FOUND)


# ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
# Ventas
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
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
