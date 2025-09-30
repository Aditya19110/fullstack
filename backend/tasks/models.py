from mongoengine import Document, StringField, DateTimeField, ReferenceField
from datetime import datetime
from users.models import User


class Task(Document):
    
    title = StringField(required=True, max_length=255)
    description = StringField(max_length=1000)
    status = StringField(choices=['pending', 'in-progress', 'completed'], default='pending')
    priority = StringField(choices=['low', 'medium', 'high'], default='medium')
    due_date = DateTimeField()
    
    user_id = StringField(required=True)
    
    # Timestamps
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'tasks',
        'indexes': ['user_id', 'status', 'priority', 'created_at']
    }
    
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super().save(*args, **kwargs)
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'priority': self.priority,
            'due_date': self.due_date.isoformat() if self.due_date else None,
            'user_id': self.user_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }
    
    def __str__(self):
        return f"{self.title} ({self.status})"