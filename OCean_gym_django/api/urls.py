from django.urls import path
from . import views
from .views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # CLIENTES
    path('clients/', views.client_detail, name='client_list'),  # Cambié 'client' a 'clients'
    path('clients/<int:pk>/', views.client_detail, name='client_detail'),  # Cambié a 'client_detail'
      
    # -----------------------------------------------------------------
    # VENTAS
    path('ventas/', views.ventas_detail, name='ventas_list'),  # Cambié 'Ventas_detail' a 'ventas_detail'
    path('ventas/<int:pk>/', views.ventas_detail, name='venta_detail'),  # Cambié a 'venta_detail' para diferenciación
    
    # -----------------------------------------------------------------
    path('productos/', views.producto_detail, name='producto_list'),           # Para la lista de productos (GET) o crear (POST)
    path('productos/<int:pk>/', views.producto_detail,name='producto_list'),  # Para obtener, actualizar o eliminar un producto específico
    # NOSE
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
