from django.urls import path, include
from . import views
from .router import router_post
# from .views import helloworld

urlpatterns = [
    path('hello-world/', views.helloworld, name='hello-world'),
    path('post/', include(router_post.urls))
]