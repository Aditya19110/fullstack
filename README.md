# Task Manager

A simple task management app with React frontend and Django backend.

## Tech Stack

- **Frontend**: React, Bootstrap, Firebase Auth
- **Backend**: Django, Django REST Framework, MongoDB
- **Authentication**: JWT + Google OAuth

## Quick Start

### Setup
```bash
git clone <your-repo>
cd fullstack
cp .env.example .env
# Edit .env with your credentials
```

### Install Dependencies
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend  
cd ../frontend
npm install
```

### Run
```bash
# Backend (Terminal 1)
cd backend
python manage.py runserver 127.0.0.1:5001

# Frontend (Terminal 2)
cd frontend
npm start
```

Open http://localhost:3000

### Docker
```bash
docker-compose up --build
```

## Features

- Create, edit, delete tasks
- User authentication (email/password + Google)
- Task filtering and pagination
- Responsive design

## API Endpoints

- `POST /api/users/register` - Register
- `POST /api/users/login` - Login
- `POST /api/users/oauth` - Google OAuth
- `GET /api/tasks` - Get tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Environment Variables

Create `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-secret-key
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@your-project.iam.gserviceaccount.com
REACT_APP_API_URL=http://localhost:5001/api
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
```

## Technology Stack

### Frontend
- **React.js 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing and navigation
- **Bootstrap 5**: Responsive UI framework
- **Bootstrap Icons**: Icon library for enhanced UI
- **Axios**: HTTP client for API communications
- **Firebase SDK**: Google OAuth integration

### Backend
- **Django 4.2**: Python web framework with REST API
- **Django REST Framework**: Powerful API development toolkit
- **MongoDB**: NoSQL database with MongoEngine ODM
- **Firebase Admin SDK**: Server-side Firebase integration
- **JWT**: JSON Web Token authentication with SimpleJWT
- **Security Middleware**: CORS, Rate limiting, Security headers

### DevOps & Deployment
- **Docker**: Containerization support
- **Docker Compose**: Multi-container application orchestration
- **Environment Variables**: Configuration management
- **Git**: Version control with proper .gitignore setup

##  Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Firebase Project** (for Google OAuth)
- **Git** (for version control)
- **Docker** (optional, for containerized deployment)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd fullstack
```

### 2. Environment Configuration
```bash
# Copy the environment template (single .env file for both backend and frontend)
cp .env.example .env

# Edit .env with your actual values:
# - Database connection string (MONGODB_URI)
# - JWT secret key (JWT_SECRET)
# - Firebase Admin SDK configuration (FIREBASE_*)
# - Firebase Web SDK configuration (REACT_APP_FIREBASE_*)
# - API URLs and ports

# Note: The .env file in the root directory is used by both backend and frontend
# Frontend uses a symbolic link to access the root .env file
```

### 3. Install Dependencies
```bash
# Backend dependencies (Django/Python)
cd backend
pip install -r requirements.txt

# Frontend dependencies  
cd ../frontend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file with the following variables:
REACT_APP_API_URL=http://localhost:5001/api

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 4. Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or use existing one
3. Enable **Authentication** → **Sign-in method** → **Google**
4. Add **localhost** to **Authorized domains**
5. Generate service account credentials for backend
6. Configure OAuth consent screen in Google Cloud Console
7. Update the Firebase configuration values in your `.env` file

### 5. MongoDB Setup
```bash
# Option 1: Local MongoDB
# Install MongoDB and start the service
mongod

# Option 2: MongoDB Atlas
# Create a cluster and update MONGODB_URI in backend/.env
```

## Running the Application

### Development Mode

#### Start Backend Server
```bash
cd backend
python manage.py runserver 127.0.0.1:5001
# Server runs on http://localhost:5001
```

#### Start Frontend Server
```bash
cd frontend
npm start
# Application runs on http://localhost:3000
```

### Docker Deployment
```bash
# Make sure you have the .env file configured
cp .env.example .env
# Edit .env with your values

# Build and run with Docker Compose
docker-compose up --build

# Frontend: http://localhost:3000
# Backend: http://localhost:5001
```

##  Project Structure

```
fullstack/
├── .env                     # Consolidated environment variables (backend + frontend)
├── .env.example             # Environment template with all required variables
├── docker-compose.yml       # Multi-container Docker setup
├── setup.sh                # Automated setup script
├── frontend/                # React.js application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── common/      # Common UI components
│   │   │   └── tasks/       # Task-specific components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React Context (AuthContext)
│   │   ├── services/        # API services and Firebase config
│   │   └── App.js           # Main application component
│   ├── .env -> ../.env      # Symbolic link to root .env file
│   └── package.json         # Frontend dependencies
├── backend/                 # Django REST API
│   ├── backend_project/     # Django project settings
│   │   ├── settings.py      # Django configuration (loads root .env)
│   │   ├── urls.py          # Main URL routing
│   │   └── wsgi.py          # WSGI configuration
│   ├── users/               # User authentication app
│   │   ├── models.py        # User model (MongoEngine)
│   │   ├── views.py         # Authentication views
│   │   └── urls.py          # User API routes
│   ├── tasks/               # Task management app
│   │   ├── models.py        # Task model (MongoEngine)
│   │   ├── views.py         # Task CRUD views
│   │   └── urls.py          # Task API routes
│   ├── manage.py            # Django management script
│   └── requirements.txt     # Python dependencies
├── docker-compose.yml       # Docker orchestration
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## API Endpoints

### Authentication Endpoints

#### POST /api/users/register
Register a new user account
```json
Request Body:
{
  "name": "aditya",
  "email": "aditya@example.com",
  "password": "password123"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "aditya",
    "email": "aditya@example.com"
  }
}
```

#### POST /api/users/login
Authenticate user with email and password
```json
Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /api/users/oauth-login
Authenticate user with Firebase OAuth token
```json
Request Body:
{
  "idToken": "firebase_id_token_here"
}

Response (200):
{
  "success": true,
  "message": "OAuth login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "aditya",
    "email": "aditya@example.com"
  }
}
```

#### GET /api/users/me
Get current user profile (Protected Route)
```
Headers: Authorization: Bearer <jwt_token>

Response (200):
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "aaditya",
    "email": "aditya@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Task Management Endpoints

#### GET /api/tasks
Get all tasks for authenticated user
```
Headers: Authorization: Bearer <jwt_token>
Query Parameters:
  - status: pending|in-progress|completed
  - priority: low|medium|high
  - page: number (default: 1)
  - limit: number (default: 10)

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "task_id",
      "title": "Sample Task",
      "description": "Task description",
      "status": "pending",
      "priority": "medium",
      "dueDate": "2023-12-31T23:59:59.000Z",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

#### POST /api/tasks
Create a new task
```json
Headers: Authorization: Bearer <jwt_token>

Request Body:
{
  "title": "New Task",
  "description": "Task description",
  "priority": "high",
  "dueDate": "2023-12-31"
}

Response (201):
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "task_id",
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "priority": "high",
    "dueDate": "2023-12-31T00:00:00.000Z"
  }
}
```

#### PUT /api/tasks/:id
Update an existing task
```json
Headers: Authorization: Bearer <jwt_token>

Request Body:
{
  "title": "Updated Task",
  "status": "completed",
  "priority": "low"
}

Response (200):
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "task_id",
    "title": "Updated Task",
    "status": "completed",
    "priority": "low"
  }
}
```

#### DELETE /api/tasks/:id
Delete a task
```
Headers: Authorization: Bearer <jwt_token>

Response (200):
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### Utility Endpoints

#### GET /api/health
Check server health status
```json
Response (200):
{
  "message": "Server is running!",
  "timestamp": "2023-01-01T00:00:00.000Z",
  "environment": "development"
}
```

#### GET /api/tasks/stats
Get task statistics for user (Protected Route)
```json
Headers: Authorization: Bearer <jwt_token>

Response (200):
{
  "success": true,
  "data": {
    "total": 10,
    "pending": 3,
    "inProgress": 4,
    "completed": 3,
    "overdue": 1
  }
}
```

## Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  googleId: String (optional, for OAuth users),
  isOAuthUser: Boolean (default: false),
  profilePicture: String (optional),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

### Task Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  status: String (enum: ['pending', 'in-progress', 'completed']),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date,
  userId: ObjectId (ref: 'User'),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

## Error Responses

The API uses standard HTTP status codes and returns consistent error responses:

### Authentication Errors
```json
// 401 Unauthorized
{
  "success": false,
  "message": "No token provided" | "Invalid token" | "Token expired"
}

// 403 Forbidden
{
  "success": false,
  "message": "Access denied"
}
```

### Validation Errors
```json
// 400 Bad Request
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

### Resource Errors
```json
// 404 Not Found
{
  "success": false,
  "message": "Task not found" | "User not found"
}

// 409 Conflict
{
  "success": false,
  "message": "Email already exists"
}
```

### Server Errors
```json
// 500 Internal Server Error
{
  "success": false,
  "message": "Internal server error"
}

// 429 Too Many Requests
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

## Authentication Flow

### Traditional Authentication
1. User registers with email/password
2. Server validates and creates JWT token
3. Token stored in localStorage
4. Token sent with subsequent API requests

### Google OAuth Flow
1. User clicks "Continue with Google"
2. Firebase handles Google sign-in popup
3. Firebase returns ID token
4. Frontend sends token to backend
5. Backend verifies token with Firebase Admin SDK
6. Server creates/updates user and returns JWT token

## UI/UX Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Mobile-first responsive design
- **Bootstrap Integration**: Consistent styling and components
- **Loading States**: User feedback during API calls
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time input validation
- **Task Status Indicators**: Visual task status representation

##  Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt password encryption
- **CORS Protection**: Cross-origin request security
- **Rate Limiting**: API abuse prevention
- **Input Validation**: Data sanitization and validation
- **Environment Variables**: Sensitive data protection
- **Firebase Security**: Google OAuth integration security

##  Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

## Usage

1. **Registration**: Create account with email/password or Google OAuth
2. **Login**: Sign in using either authentication method
3. **Dashboard**: View task overview and statistics
4. **Create Tasks**: Add new tasks with title, description, and priority
5. **Manage Tasks**: Update task status, edit details, or delete tasks
6. **Filter Tasks**: View tasks by status (all, pending, completed)
7. **Profile Management**: Update user profile information

##  Deployment

### Production Environment Variables
Update environment variables for production:
- Use production MongoDB URI
- Set strong JWT secret
- Configure production Firebase project
- Set NODE_ENV=production

### Docker Production
```bash
# Build production images
docker-compose -f docker-compose.prod.yml up --build
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## Testing

### Running Tests

Backend tests:
```bash
cd backend
npm test
```

Frontend tests:
```bash
cd frontend
npm test
```

### Test Coverage
- API endpoint testing with Jest and Supertest
- React component testing with Jest and React Testing Library
- Authentication flow testing
- Task CRUD operations testing

## Deployment

### Docker Deployment
The application includes Docker configuration for easy deployment:

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

### Manual Deployment
1. Set up MongoDB database
2. Configure environment variables in production
3. Build frontend: `cd frontend && npm run build`
4. Start backend server: `cd backend && npm start`
5. Serve frontend build files through web server

### Environment Configuration
Make sure to set the following environment variables in production:
- `NODE_ENV=production`
- `JWT_SECRET` (strong secret key)
- `MONGODB_URI` (production database URL)
- Firebase configuration keys
- Port configurations

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Input validation and sanitization
- Rate limiting to prevent abuse
- CORS configuration
- Helmet.js for security headers
- Protected routes and middleware
- Firebase OAuth integration

## Performance Considerations

- Database indexing on frequently queried fields
- Pagination for task lists
- Rate limiting for API endpoints
- Efficient MongoDB aggregation for statistics
- Optimized React components with proper state management

## Architecture Decisions

### Frontend Architecture
- **React with Hooks**: Modern functional components for better performance
- **Context API**: Global state management for authentication
- **Bootstrap**: Responsive UI framework for faster development
- **Axios**: HTTP client with interceptors for token management

### Backend Architecture
- **Express.js**: Lightweight and flexible Node.js framework
- **MongoDB with Mongoose**: NoSQL database with ODM for schema validation
- **JWT Authentication**: Stateless authentication mechanism
- **Firebase Admin**: Server-side OAuth token verification
- **Modular Structure**: Separate controllers, routes, and middleware

### Security Architecture
- **Dual Authentication**: Traditional email/password and OAuth options
- **Token-based Authentication**: JWT for stateless session management
- **Input Validation**: Comprehensive validation at API level
- **Rate Limiting**: Protection against abuse and DoS attacks

## License

This project is licensed under the MIT License.

##  Support

For support and questions, please contact [your-email@example.com]

---

**Built using modern web technologies**

A modern, responsive task management application built with **React.js** frontend and **Node.js/Express** backend, featuring user authentication, task CRUD operations, and a clean, intuitive UI.

##  Features

### Frontend (React.js)
- **Modern UI/UX**: Bootstrap-based responsive design with custom styling
- **User Authentication**: Login/Register with JWT tokens
- **Task Management**: Create, read, update, delete tasks with priority levels
- **Dashboard**: Overview with task statistics and recent tasks
- **Filtering**: Filter tasks by status and priority
- **Profile Management**: Update user information
- **Protected Routes**: Authentication-based navigation

### Backend (Node.js/Express)
- **RESTful API**: Well-structured API endpoints
- **JWT Authentication**: Secure token-based authentication
- **MongoDB Integration**: Mongoose ODM for database operations
- **Input Validation**: Express-validator for data validation
- **Security**: Helmet, CORS, password hashing with bcrypt
- **Error Handling**: Comprehensive error handling middleware
- **Logging**: Morgan for HTTP request logging

### Database (MongoDB)
- **User Model**: User authentication with role-based access
- **Task Model**: Complete task management with relationships
- **Indexing**: Optimized database queries
- **Data Validation**: Schema-level validation

##  Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git** (for cloning the repository)

## � Quick Start with Docker (Recommended)

### One-Command Deployment
```bash
# Clone and run with Docker
git clone <your-repo-url>
cd fullstack
docker-compose up --build
```

** Your application will be running at:**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

**Prerequisites for Docker:**
- Docker Desktop (version 20.10+)
- 4GB RAM available
- Ports 3000, 5000, and 27017 available

For detailed Docker instructions, see [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md)

---

## � Manual Installation & Setup

### 1. Install Dependencies

```bash
# Install root dependencies (for concurrent running)
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
NODE_ENV=development
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/sessions

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=30d

# API Configuration
API_VERSION=v1
```

### 3. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The application will automatically create the database

#### Option B: MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

### 4. Running the Application

#### Development Mode (Recommended)
```bash
# From the root directory - runs both frontend and backend concurrently
npm run dev
```

#### Manual Mode
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

##  Project Structure

```
fullstack/
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Custom middleware
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   └── server.js          # Main server file
│   ├── .env.example           # Environment variables template
│   └── package.json           # Backend dependencies
├── frontend/                  # React.js frontend
│   ├── public/                # Static files
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── context/          # React context (state management)
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── App.js            # Main App component
│   │   └── index.js          # React entry point
│   └── package.json          # Frontend dependencies
├── package.json              # Root package.json for scripts
└── README.md                 # This file
```

##  Technology Stack

### Frontend
- **React.js** - JavaScript library for building user interfaces
- **React Router** - Declarative routing for React
- **Bootstrap** - CSS framework for responsive design
- **React Bootstrap** - Bootstrap components for React
- **Axios** - HTTP client for API requests
- **React Context** - State management

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **CORS** - Cross-Origin Resource Sharing

##  API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/profile` - Update user profile

### Tasks
- `GET /api/tasks` - Get user tasks (with filtering and pagination)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

### System
- `GET /api/health` - Health check endpoint

## 👤 User Roles

### Regular User
- Create, view, update, and delete their own tasks
- Update their own profile
- View dashboard with personal task statistics

### Admin User
- All regular user permissions
- View all users in the system
- Assign tasks to any user
- Access to admin-specific features

##  UI Features

### Responsive Design
- Mobile-first approach
- Bootstrap grid system
- Responsive navigation
- Touch-friendly interfaces

### Interactive Elements
- Loading spinners
- Form validation feedback
- Success/error alerts
- Confirmation modals
- Dropdown menus

### Visual Indicators
- Priority color coding (Low: Green, Medium: Yellow, High: Red)
- Status badges (Pending, In Progress, Completed)
- Overdue task indicators
- Task statistics cards

##  Deployment Options

### 1. Docker Deployment (Recommended)
```bash
# Production deployment with Docker
docker-compose up --build -d

# Scale for high availability
docker-compose up --scale backend=2 -d

# Monitor services
docker-compose ps
docker-compose logs -f
```

### 2. Manual Deployment

#### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the 'build' folder to your hosting service (Netlify, Vercel, etc.)
```

#### Backend Deployment
```bash
cd backend
npm start
# Deploy to cloud platforms (Heroku, AWS, DigitalOcean, etc.)
```

### 3. Production Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=a_very_secure_random_string_for_production_change_this
JWT_EXPIRE=30d
```

### 4. Production Checklist
- [ ] Change default passwords in docker-compose.yml
- [ ] Update JWT_SECRET to a secure random string
- [ ] Configure SSL certificates
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Test all functionality

##  Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

##  Usage Instructions

1. **Registration**: Create a new account or use existing credentials
2. **Dashboard**: View task overview and statistics
3. **Create Tasks**: Add new tasks with title, description, priority, due date
4. **Manage Tasks**: Update task status, edit details, or delete tasks
5. **Filter Tasks**: Use status and priority filters to organize tasks
6. **Profile**: Update your personal information

##  Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- Security headers with Helmet
- CORS configuration
- MongoDB injection prevention

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing processes on ports 3000/5000

3. **JWT Token Issues**
   - Clear browser localStorage
   - Check JWT_SECRET in `.env`

4. **Package Installation Errors**
   - Delete `node_modules` and run `npm install` again
   - Check Node.js version compatibility

## Development Notes

### Code Quality
- ESLint configuration for code linting
- Consistent code formatting
- Error handling best practices
- Clean, readable code structure

### Performance Optimization
- Database indexing for faster queries
- Pagination for large datasets
- Efficient React re-rendering
- Optimized API responses

##  Assignment Requirements Met

This fullstack application demonstrates:

 **Frontend Development**: Modern React.js with hooks and context
 **Backend Development**: RESTful API with Node.js/Express
 **Database Integration**: MongoDB with Mongoose ODM
 **Authentication**: JWT-based user authentication
 **CRUD Operations**: Complete task management functionality
 **Responsive Design**: Mobile-friendly interface
 **Error Handling**: Comprehensive error management
 **Security**: Industry-standard security practices
 **Documentation**: Comprehensive setup and usage guides

##  Support

For any issues or questions, please refer to the troubleshooting section above or check the application logs for detailed error messages.

---

**Author**: Aditya Kulkarni  
**Version**: 1.0.0  
**License**: MIT