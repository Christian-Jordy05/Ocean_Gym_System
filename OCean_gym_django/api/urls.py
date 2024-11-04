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
   
   

   path('Inscripcion/', views.Inscripcion_detail, name='Inscripcion'),
   path('Inscripcion/<int:pk>/', views.Inscripcion_detail,name='Inscripcion'),
   
   path('Registro_de_pago/', views.registro_de_pago_list, name='Registro_de_pago'),
   path('Registro_de_pago/<int:pk>/', views.registro_de_pago_list,name='Registro_de_pago'),
   
   path('Metodo_de_pago/', views.Metodo_de_pago, name='Metodo_de_pago'),
   path('Metodo_de_pago/<int:pk>/', views.Metodo_de_pago,name='Metodo_de_pago'),
   
   
    path('cambiar-contrasena/', views.cambiar_contrasena, name='cambiar_contrasena'),
   
   

    
    path('generar_qr_imgur/', views.generar_qr_imgur, name='generar_qr_imgur'),

    path('api/send-contact-email/', views.send_contact_email, name='send_contact_email'),
    
     path('enviar_qr_email/', views.enviar_qr_email, name='enviar_qr_email'),

]

