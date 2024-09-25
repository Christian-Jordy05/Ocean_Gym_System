from django.urls import path
from . import views

urlpatterns = [
    path('client/', views.client_detail, name='Client_list'),
    path('client/<int:pk>/', views.client_detail, name='Client_list'),  # Maneja GET (uno), PUT, DELETE
]