from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_tasks, name='get_tasks'),
    path('create/', views.create_task, name='create_task'),
    path('<str:task_id>/', views.get_task, name='get_task'),
    path('<str:task_id>/update/', views.update_task, name='update_task'),
    path('<str:task_id>/delete/', views.delete_task, name='delete_task'),
    path('stats/', views.get_task_stats, name='get_task_stats'),
]