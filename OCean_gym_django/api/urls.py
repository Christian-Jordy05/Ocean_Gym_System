from django.urls import path
from . import views
from .views import subir_imagen_a_imgur

urlpatterns = [
    # CLIENTES
    path('clients/', views.client_detail, name='client_list'),  # Cambié 'client' a 'clients'
    path('clients/<int:pk>/', views.client_detail, name='client_detail'),  # Cambié a 'client_detail'
    
    # -----------------------------------------------------------------
    # ADMINISTRADORES
    path('administradores/', views.administrador_detail, name='administrador_list'),  # Cambié 'admis' a 'administradores'
    path('administradores/<int:pk>/', views.administrador_detail, name='administrador_detail'),  # Cambié a 'administrador_detail'
    
    # -----------------------------------------------------------------
    # VENTAS
    path('ventas/', views.ventas_detail, name='ventas_list'),  # Cambié 'Ventas_detail' a 'ventas_detail'
    path('ventas/<int:pk>/', views.ventas_detail, name='venta_detail'),  # Cambié a 'venta_detail' para diferenciación
    
    # -----------------------------------------------------------------
    path('productos/', views.producto_detail, name='producto_list'),           # Para la lista de productos (GET) o crear (POST)
    path('productos/<int:pk>/', views.producto_detail,name='producto_list'),  # Para obtener, actualizar o eliminar un producto específico
   # -----------------------------------------------------------------
   #IMGUR
   path('api/subir-imagen/', subir_imagen_a_imgur, name='subir_imagen_a_imgur'),
]

