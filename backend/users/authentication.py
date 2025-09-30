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
        print("🔐 Custom MongoEngine JWT authentication called")
        
        # Get the Authorization header
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            print("❌ No Authorization header")
            return None
            
        # Parse the token
        try:
            token_type, token = auth_header.split(' ')
            if token_type.lower() != 'bearer':
                print("❌ Not a Bearer token")
                return None
        except ValueError:
            print("❌ Invalid Authorization header format")
            return None
        
        try:
            # Decode the JWT token
            print(f"🎫 Decoding token: {token[:20]}...")
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            print(f"� Token payload: {payload}")
            
            # Get user ID from token
            user_id = payload.get('user_id')
            if not user_id:
                print("❌ No user_id in token payload")
                raise AuthenticationFailed('Invalid token: no user ID')
            
            print(f"🔍 Looking for user with ID: {user_id}")
            
            # Find user in MongoDB
            user = User.objects.get(id=user_id)
            print(f"✅ Found user: {user.email}")
            
            return (user, token)
            
        except jwt.ExpiredSignatureError:
            print("❌ Token has expired")
            raise AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError as e:
            print(f"❌ Invalid token: {e}")
            raise AuthenticationFailed('Invalid token')
        except DoesNotExist:
            print(f"❌ User not found with ID: {user_id}")
            raise AuthenticationFailed('User not found')
        except Exception as e:
            print(f"💥 Authentication error: {e}")
            raise AuthenticationFailed('Authentication failed')