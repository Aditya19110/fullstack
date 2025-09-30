from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('oauth-login/', views.oauth_login, name='oauth_login'),
    path('me/', views.get_user_profile, name='get_user_profile'),
    path('profile/', views.update_profile, name='update_profile'),
]