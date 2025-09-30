from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
import json
import firebase_admin
from firebase_admin import auth, credentials
from django.conf import settings
from .models import User
from mongoengine import DoesNotExist, ValidationError
from django_ratelimit.decorators import ratelimit

if not firebase_admin._apps:
    cred_dict = {
        "type": "service_account",
        "project_id": settings.FIREBASE_PROJECT_ID,
        "private_key_id": settings.FIREBASE_PRIVATE_KEY_ID,
        "private_key": settings.FIREBASE_PRIVATE_KEY,
        "client_email": settings.FIREBASE_CLIENT_EMAIL,
        "client_id": settings.FIREBASE_CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
    }
    cred = credentials.Certificate(cred_dict)
    firebase_admin.initialize_app(cred)

def get_tokens_for_user(user):
    refresh = RefreshToken()
    refresh['user_id'] = str(user.id)
    refresh['email'] = user.email
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
@ratelimit(key='ip', rate='5/m', method='POST')
def register(request):
    try:
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        
        if not all([name, email, password]):
            return JsonResponse({
                'success': False,
                'message': 'All fields are required'
            }, status=400)
        
        if len(password) < 6:
            return JsonResponse({
                'success': False,
                'message': 'Password must be at least 6 characters'
            }, status=400)
        
        # Check if user exists
        try:
            User.objects.get(email=email)
            return JsonResponse({
                'success': False,
                'message': 'Email already exists'
            }, status=409)
        except DoesNotExist:
            pass
        
        user = User(name=name, email=email)
        user.set_password(password)
        user.save()
        
        tokens = get_tokens_for_user(user)
        
        return JsonResponse({
            'success': True,
            'message': 'User registered successfully',
            'token': tokens['access'],
            'user': user.to_dict()
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

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
@ratelimit(key='ip', rate='5/m', method='POST')
def login(request):
    """User login endpoint"""
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        if not all([email, password]):
            return JsonResponse({
                'success': False,
                'message': 'Email and password are required'
            }, status=400)
        
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                tokens = get_tokens_for_user(user)
                return JsonResponse({
                    'success': True,
                    'message': 'Login successful',
                    'token': tokens['access'],
                    'user': user.to_dict()
                })
            else:
                return JsonResponse({
                    'success': False,
                    'message': 'Invalid credentials'
                }, status=401)
        except DoesNotExist:
            return JsonResponse({
                'success': False,
                'message': 'Invalid credentials'
            }, status=401)
            
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

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
@ratelimit(key='ip', rate='5/m', method='POST')
def oauth_login(request):
    """OAuth login endpoint"""
    try:
        print("🔥 OAuth login request received")
        data = json.loads(request.body)
        id_token = data.get('idToken')
        print(f"📨 ID token received: {bool(id_token)}")
        
        if not id_token:
            print("❌ No ID token provided")
            return JsonResponse({
                'success': False,
                'message': 'ID token is required'
            }, status=400)
        
        # Verify Firebase token
        print("🔍 Verifying Firebase token...")
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        email = decoded_token.get('email')
        name = decoded_token.get('name', '')
        picture = decoded_token.get('picture', '')
        print(f"✅ Token verified for user: {email}")
        
        if not email:
            print("❌ No email in token")
            return JsonResponse({
                'success': False,
                'message': 'Email not provided by OAuth provider'
            }, status=400)
        
        # Find or create user
        try:
            print(f"🔍 Looking for existing user: {email}")
            user = User.objects.get(email=email)
            print("✅ Found existing user")
            user.google_id = uid
            user.is_oauth_user = True
            if picture:
                user.profile_picture = picture
            user.save()
        except DoesNotExist:
            print("👤 Creating new user")
            user = User(
                name=name,
                email=email,
                google_id=uid,
                is_oauth_user=True,
                profile_picture=picture
            )
            user.save()
            print("✅ New user created")
        
        print("🎫 Generating tokens...")
        tokens = get_tokens_for_user(user)
        print("✅ OAuth login successful")
        
        return JsonResponse({
            'success': True,
            'message': 'OAuth login successful',
            'token': tokens['access'],
            'user': user.to_dict()
        })
        
    except auth.InvalidIdTokenError as e:
        print(f"❌ Invalid ID token: {e}")
        return JsonResponse({
            'success': False,
            'message': 'Invalid ID token'
        }, status=401)
    except json.JSONDecodeError as e:
        print(f"❌ JSON decode error: {e}")
        return JsonResponse({
            'success': False,
            'message': 'Invalid JSON'
        }, status=400)
    except Exception as e:
        print(f"💥 Unexpected error in OAuth login: {e}")
        return JsonResponse({
            'success': False,
            'message': 'Server error'
        }, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """Get user profile endpoint"""
    try:
        user = request.user  # request.user is already the User object from our custom auth
        
        return JsonResponse({
            'success': True,
            'user': user.to_dict()
        })
        
    except DoesNotExist:
        return JsonResponse({
            'success': False,
            'message': 'User not found'
        }, status=404)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': 'Server error'
        }, status=500)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def update_profile(request):
    """Update user profile endpoint"""
    try:
        data = json.loads(request.body)
        user = request.user  # request.user is already the User object from our custom auth
        
        if 'name' in data:
            user.name = data['name']
        if 'profile_picture' in data:
            user.profile_picture = data['profile_picture']
        
        user.save()
        
        return JsonResponse({
            'success': True,
            'message': 'Profile updated successfully',
            'data': user.to_dict()
        })
        
    except DoesNotExist:
        return JsonResponse({
            'success': False,
            'message': 'User not found'
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