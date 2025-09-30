from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from users.models import User
from mongoengine import DoesNotExist, ValidationError
from datetime import datetime
import json


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tasks(request):
    try:
        user_id = str(request.user.id)
        
        status_filter = request.GET.get('status')
        priority_filter = request.GET.get('priority')
        page = int(request.GET.get('page', 1))
        limit = int(request.GET.get('limit', 10))
        
        query = {'user_id': user_id}
        if status_filter:
            query['status'] = status_filter
        if priority_filter:
            query['priority'] = priority_filter
        
        tasks = Task.objects(**query).order_by('-created_at')
        total = tasks.count()
        
        start = (page - 1) * limit
        end = start + limit
        paginated_tasks = tasks[start:end]
        
        return JsonResponse({
            'success': True,
            'data': [task.to_dict() for task in paginated_tasks],
            'pagination': {
                'page': page,
                'limit': limit,
                'total': total,
                'pages': (total + limit - 1) // limit
            }
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': 'Server error'
        }, status=500)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def create_task(request):
    """Create new task"""
    try:
        data = json.loads(request.body)
        user_id = str(request.user.id)
        
        title = data.get('title')
        description = data.get('description', '')
        priority = data.get('priority', 'medium')
        due_date_str = data.get('dueDate')
        
        if not title:
            return JsonResponse({
                'success': False,
                'message': 'Title is required'
            }, status=400)
        
        # Parse due date if provided
        due_date = None
        if due_date_str:
            try:
                due_date = datetime.fromisoformat(due_date_str.replace('Z', '+00:00'))
            except ValueError:
                return JsonResponse({
                    'success': False,
                    'message': 'Invalid date format'
                }, status=400)
        
        # Create task
        task = Task(
            title=title,
            description=description,
            priority=priority,
            due_date=due_date,
            user_id=user_id
        )
        task.save()
        
        return JsonResponse({
            'success': True,
            'message': 'Task created successfully',
            'data': task.to_dict()
        }, status=201)
        
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'message': 'Invalid JSON'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': 'Server error'
        }, status=500)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_task(request, task_id):
    """Get specific task"""
    try:
        user_id = str(request.user.id)
        task = Task.objects.get(id=task_id, user_id=user_id)
        
        return JsonResponse({
            'success': True,
            'data': task.to_dict()
        })
        
    except DoesNotExist:
        return JsonResponse({
            'success': False,
            'message': 'Task not found'
        }, status=404)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': 'Server error'
        }, status=500)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def update_task(request, task_id):
    """Update task"""
    try:
        data = json.loads(request.body)
        user_id = str(request.user.id)
        task = Task.objects.get(id=task_id, user_id=user_id)
        
        # Update allowed fields
        if 'title' in data:
            task.title = data['title']
        if 'description' in data:
            task.description = data['description']
        if 'status' in data:
            task.status = data['status']
        if 'priority' in data:
            task.priority = data['priority']
        if 'dueDate' in data:
            if data['dueDate']:
                try:
                    task.due_date = datetime.fromisoformat(data['dueDate'].replace('Z', '+00:00'))
                except ValueError:
                    return JsonResponse({
                        'success': False,
                        'message': 'Invalid date format'
                    }, status=400)
            else:
                task.due_date = None
        
        task.save()
        
        return JsonResponse({
            'success': True,
            'message': 'Task updated successfully',
            'data': task.to_dict()
        })
        
    except DoesNotExist:
        return JsonResponse({
            'success': False,
            'message': 'Task not found'
        }, status=404)
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'message': 'Invalid JSON'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': 'Server error'
        }, status=500)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def delete_task(request, task_id):
    """Delete task"""
    try:
        user_id = str(request.user.id)
        task = Task.objects.get(id=task_id, user_id=user_id)
        task.delete()
        
        return JsonResponse({
            'success': True,
            'message': 'Task deleted successfully'
        })
        
    except DoesNotExist:
        return JsonResponse({
            'success': False,
            'message': 'Task not found'
        }, status=404)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': 'Server error'
        }, status=500)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_task_stats(request):
    """Get task statistics"""
    try:
        user_id = str(request.user.id)
        
        # Get all tasks for user
        all_tasks = Task.objects(user_id=user_id)
        
        # Calculate statistics
        total = all_tasks.count()
        pending = all_tasks.filter(status='pending').count()
        in_progress = all_tasks.filter(status='in-progress').count()
        completed = all_tasks.filter(status='completed').count()
        
        # Count overdue tasks
        now = datetime.utcnow()
        overdue = all_tasks.filter(
            due_date__lt=now,
            status__ne='completed'
        ).count()
        
        return JsonResponse({
            'success': True,
            'data': {
                'total': total,
                'pending': pending,
                'inProgress': in_progress,
                'completed': completed,
                'overdue': overdue
            }
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': 'Server error'
        }, status=500)