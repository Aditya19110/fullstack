// MongoDB initialization script
db = db.getSiblingDB('fullstack_assignment');

// Create application user
db.createUser({
  user: 'appuser',
  pwd: 'apppassword123',
  roles: [
    {
      role: 'readWrite',
      db: 'fullstack_assignment'
    }
  ]
});

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "isActive": 1 });

db.tasks.createIndex({ "assignedTo": 1, "status": 1 });
db.tasks.createIndex({ "createdBy": 1 });
db.tasks.createIndex({ "dueDate": 1 });
db.tasks.createIndex({ "createdAt": -1 });

print('Database initialized successfully');