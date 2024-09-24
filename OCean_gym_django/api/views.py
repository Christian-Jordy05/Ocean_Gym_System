from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Client  # Nombre del modelo corregido
from .serializers import ClientSerializer

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def client_detail(request, pk=None):
    if request.method == 'GET':
        if pk:
            # Obtener un cliente específico
            try:
                user = Client.objects.get(pk=pk)
                serializer = ClientSerializer(user)
                return Response(serializer.data)
            except Client.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Obtener todos los clientes
            users = Client.objects.all()
            serializer = ClientSerializer(users, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        # Crear un nuevo cliente
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        if pk:
            try:
                user = Client.objects.get(pk=pk)
                serializer = ClientSerializer(user, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Client.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        if pk:
            try:
                user = Client.objects.get(pk=pk)
                user.delete()
                return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            except Client.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
