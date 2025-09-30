from django.http import JsonResponse
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.conf import settings
import jwt

class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Process the request before the view
        if request.path.startswith('/api/') and request.path not in ['/api/health/', '/api/users/register/', '/api/users/login/', '/api/users/oauth-login/']:
            auth_header = request.META.get('HTTP_AUTHORIZATION')
            if auth_header and auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
                try:
                    # Verify and decode JWT token
                    decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                    request.user = decoded_token
                except jwt.ExpiredSignatureError:
                    return JsonResponse({
                        'success': False,
                        'message': 'Token expired'
                    }, status=401)
                except jwt.InvalidTokenError:
                    return JsonResponse({
                        'success': False,
                        'message': 'Invalid token'
                    }, status=401)
            else:
                return JsonResponse({
                    'success': False,
                    'message': 'No token provided'
                }, status=401)

        response = self.get_response(request)
        return response