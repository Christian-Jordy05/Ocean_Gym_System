from django.urls import path
from . import views

urlpatterns = [
    # CLIENTES
    path('client/', views.client_detail, name='Client_list'),
    path('client/<int:pk>/', views.client_detail, name='Client_list'),
    
    # -----------------------------------------------------------------
    # ADMINISTRADORES
    path('admis/', views.administrador_detail, name='Admis_list'),
    path('admis/<int:pk>/', views.administrador_detail, name='Admis_list'),
    
    # -----------------------------------------------------------------
    # VENTAS
    path('ventas/', views.Ventas_detail, name='Ventas_list'),
    path('ventas/<int:pk>/', views.Ventas_detail, name='Ventas_list'),
    
    # -----------------------------------------------------------------
    # NOSE
]