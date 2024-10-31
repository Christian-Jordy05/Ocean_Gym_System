from django.urls import path
from . import views
from .views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import subir_imagen_a_imgur




urlpatterns = [
    # CLIENTES
    path('register_clientes/', views.register_client, name='register_list'),  
    
    
    path('clients/', views.client_detail, name='client_list'),  
    path('clients/<int:pk>/', views.client_detail, name='client_detail'), 
      
    # -----------------------------------------------------------------
    # VENTAS
    path('ventas/', views.ventas_detail, name='ventas_list'),  
    path('ventas/<int:pk>/', views.ventas_detail, name='venta_detail'),  
    
    # -----------------------------------------------------------------
    path('productos/', views.producto_detail, name='producto_list'),           
    path('productos/<int:pk>/', views.producto_detail,name='producto_list'),  

    # NOSE
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

   # -----------------------------------------------------------------
   #IMGUR
   path('api/subir-imagen/', subir_imagen_a_imgur, name='subir_imagen_a_imgur'),
   
#    path('test/', TestAdminAccess.as_view(), name='test-admin-access'), 
   
#    path('check-role/', CheckUserRole.as_view(), name='check-user-role'),

    # path('enviar-correo/', enviar_correo, name='enviar_correo'),
    
    path('generar_qr_imgur/', views.generar_qr_imgur, name='generar_qr_imgur'),

    path('api/send-contact-email/', views.send_contact_email, name='send_contact_email'),
]

