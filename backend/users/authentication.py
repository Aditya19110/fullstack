from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
import jwt
from .models import User
from mongoengine import DoesNotExist


class MongoEngineJWTAuthentication(BaseAuthentication):
    """
    Custom JWT authentication for MongoEngine User model
    """
    
    def authenticate(self, request):
        
        # Get the Authorization header
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            return None
            
        # Parse the token
        try:
            token_type, token = auth_header.split(' ')
            if token_type.lower() != 'bearer':
                return None
        except ValueError:
            return None
        
        try:
            # Decode the JWT token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            
            # Get user ID from token
            user_id = payload.get('user_id')
            if not user_id:
                return None
            
            user = User.objects.get(id=user_id)
            
            return (user, token)
            
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
        except User.DoesNotExist:
            return None
        except Exception as e:
            return None
