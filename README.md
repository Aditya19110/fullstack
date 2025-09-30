# Fullstack Task Management Application

A modern, responsive task management application built with React.js, Node.js, Express, MongoDB, and Firebase OAuth integration.

## 🚀 Features

### Core Functionality
- **Task Management**: Create, read, update, and delete tasks
- **User Authentication**: Dual authentication system (traditional + Google OAuth)
- **Real-time Updates**: Instant task status updates
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Task Filtering**: Filter tasks by status (pending, in-progress, completed)
- **User Dashboard**: Personalized task overview and statistics

### Authentication Features
- **Traditional Login/Register**: Email and password authentication
- **Google OAuth**: One-click sign-in with Google
- **JWT Token Management**: Secure token-based authentication
- **Protected Routes**: Access control for authenticated users
- **User Profiles**: Manage user information and preferences

### Technical Features
- **RESTful API**: Well-structured backend API endpoints
- **Data Validation**: Input validation on both frontend and backend
- **Error Handling**: Comprehensive error handling and user feedback
- **Security**: CORS, Helmet, Rate limiting, and input sanitization
- **Docker Support**: Containerized application for easy deployment

## 🛠️ Technology Stack

### Frontend
- **React.js 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing and navigation
- **Bootstrap 5**: Responsive UI framework
- **Bootstrap Icons**: Icon library for enhanced UI
- **Axios**: HTTP client for API communications
- **Firebase SDK**: Google OAuth integration

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **Firebase Admin SDK**: Server-side Firebase integration
- **JWT**: JSON Web Token authentication
- **Security Middleware**: Helmet, CORS, Rate limiting

### DevOps & Deployment
- **Docker**: Containerization support
- **Docker Compose**: Multi-container application orchestration
- **Environment Variables**: Configuration management
- **Git**: Version control with proper .gitignore setup

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Firebase Project** (for Google OAuth)
- **Git** (for version control)
- **Docker** (optional, for containerized deployment)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd fullstack
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file with the following variables:
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/sessions
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
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

### 5. MongoDB Setup
```bash
# Option 1: Local MongoDB
# Install MongoDB and start the service
mongod

# Option 2: MongoDB Atlas
# Create a cluster and update MONGODB_URI in backend/.env
```

## 🚀 Running the Application

### Development Mode

#### Start Backend Server
```bash
cd backend
npm start
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
# Build and run with Docker Compose
docker-compose up --build

# Frontend: http://localhost:3000
# Backend: http://localhost:5001
```

## 📁 Project Structure

```
fullstack/
├── frontend/                 # React.js application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── common/      # Common UI components
│   │   │   └── tasks/       # Task-specific components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React Context (AuthContext)
│   │   ├── services/        # API services and Firebase config
│   │   └── App.js           # Main application component
│   ├── .env                 # Frontend environment variables
│   └── package.json         # Frontend dependencies
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── config/          # Configuration files
│   │   └── server.js        # Express server setup
│   ├── .env                 # Backend environment variables
│   └── package.json         # Backend dependencies
├── docker-compose.yml       # Docker orchestration
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## 🔗 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/oauth-login` - Google OAuth login
- `GET /api/users/me` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Tasks
- `GET /api/tasks` - Get user tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Health Check
- `GET /api/health` - Server health status

## 🔐 Authentication Flow

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

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Mobile-first responsive design
- **Bootstrap Integration**: Consistent styling and components
- **Loading States**: User feedback during API calls
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time input validation
- **Task Status Indicators**: Visual task status representation

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt password encryption
- **CORS Protection**: Cross-origin request security
- **Rate Limiting**: API abuse prevention
- **Input Validation**: Data sanitization and validation
- **Environment Variables**: Sensitive data protection
- **Firebase Security**: Google OAuth integration security

## 🧪 Testing

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

## 📱 Usage

1. **Registration**: Create account with email/password or Google OAuth
2. **Login**: Sign in using either authentication method
3. **Dashboard**: View task overview and statistics
4. **Create Tasks**: Add new tasks with title, description, and priority
5. **Manage Tasks**: Update task status, edit details, or delete tasks
6. **Filter Tasks**: View tasks by status (all, pending, completed)
7. **Profile Management**: Update user profile information

## 🚀 Deployment

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

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📧 Support

For support and questions, please contact [your-email@example.com]

---

**Built with ❤️ using modern web technologies**

A modern, responsive task management application built with **React.js** frontend and **Node.js/Express** backend, featuring user authentication, task CRUD operations, and a clean, intuitive UI.

## 🚀 Features

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

## 📋 Prerequisites

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

**🎉 Your application will be running at:**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

**Prerequisites for Docker:**
- Docker Desktop (version 20.10+)
- 4GB RAM available
- Ports 3000, 5000, and 27017 available

For detailed Docker instructions, see [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md)

---

## �🛠 Manual Installation & Setup

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

## 📁 Project Structure

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

## 🔧 Technology Stack

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

## 🔐 API Endpoints

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

## 🎨 UI Features

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

## 🚀 Deployment Options

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

## 🧪 Testing

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

## 🤝 Usage Instructions

1. **Registration**: Create a new account or use existing credentials
2. **Dashboard**: View task overview and statistics
3. **Create Tasks**: Add new tasks with title, description, priority, due date
4. **Manage Tasks**: Update task status, edit details, or delete tasks
5. **Filter Tasks**: Use status and priority filters to organize tasks
6. **Profile**: Update your personal information

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- Security headers with Helmet
- CORS configuration
- MongoDB injection prevention

## 🐛 Troubleshooting

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

## 📝 Development Notes

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

## 🎯 Assignment Requirements Met

This fullstack application demonstrates:

✅ **Frontend Development**: Modern React.js with hooks and context
✅ **Backend Development**: RESTful API with Node.js/Express
✅ **Database Integration**: MongoDB with Mongoose ODM
✅ **Authentication**: JWT-based user authentication
✅ **CRUD Operations**: Complete task management functionality
✅ **Responsive Design**: Mobile-friendly interface
✅ **Error Handling**: Comprehensive error management
✅ **Security**: Industry-standard security practices
✅ **Documentation**: Comprehensive setup and usage guides

## 📧 Support

For any issues or questions, please refer to the troubleshooting section above or check the application logs for detailed error messages.

---

**Author**: Aditya Kulkarni  
**Version**: 1.0.0  
**License**: MIT