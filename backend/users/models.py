from mongoengine import Document, StringField, BooleanField, DateTimeField
from django.contrib.auth.hashers import make_password, check_password
from datetime import datetime


class User(Document):
    """
    Custom User model using MongoEngine
    """
    # Basic fields
    name = StringField(required=True, max_length=100)
    email = StringField(required=True, unique=True, max_length=255)
    password = StringField(max_length=255)
    
    # OAuth fields
    google_id = StringField(max_length=255)
    is_oauth_user = BooleanField(default=False)
    profile_picture = StringField(max_length=500)
    
    # Timestamps
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'users',
        'indexes': ['email', 'google_id'],
        'strict': False  # Allow unknown fields to be ignored
    }
    
    def set_password(self, raw_password):
        """Set password using Django's password hashing"""
        self.password = make_password(raw_password)
        
    def check_password(self, raw_password):
        """Check if provided password matches stored password"""
        if not self.password:
            return False
        return check_password(raw_password, self.password)
    
    def save(self, *args, **kwargs):
        """Override save to update timestamp"""
        self.updated_at = datetime.utcnow()
        return super().save(*args, **kwargs)
    
    # Django compatibility methods for REST Framework
    @property
    def is_authenticated(self):
        """Always return True for authenticated users"""
        return True
    
    @property
    def is_anonymous(self):
        """Return False since this is an authenticated user"""
        return False
    
    @property
    def is_active(self):
        """Return True if user is active"""
        return True
    
    def get_username(self):
        """Return email as username"""
        return self.email
    
    def to_dict(self):
        """Convert to dictionary for serialization"""
        return {
            'id': str(self.id),
            'name': self.name,
            'email': self.email,
            'is_oauth_user': self.is_oauth_user,
            'profile_picture': self.profile_picture or '',
            'google_id': self.google_id or '',
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }
    
    def __str__(self):
        return f"{self.name} ({self.email})"