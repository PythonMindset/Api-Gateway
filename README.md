# 🚀 API Gateway

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue.svg)](https://www.postgresql.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-black.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A comprehensive full-stack MERN application for project management with robust authentication, access control, and API monitoring capabilities. Built with modern technologies and best practices.

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user authentication with role-based access control
- 📊 **Project Management** - Create, update, and manage projects with different visibility levels
- 👥 **User Roles** - Admin and viewer roles with appropriate permissions
- 📧 **Email Notifications** - Automated email notifications for access requests
- 📈 **API Logging** - Comprehensive logging of all API requests
- 📚 **Swagger Documentation** - Interactive API documentation
- 🎨 **Modern UI** - Clean and responsive React interface
- 🛡️ **Security** - Password hashing, input validation, and rate limiting

## 🛠️ Tech Stack

### Backend 🖥️
- **Node.js** - Runtime environment
- **Express.js** - Fast, unopinionated web framework
- **PostgreSQL** - Advanced open-source relational database
- **JWT** - JSON Web Tokens for secure authentication
- **bcrypt** - Password hashing for security
- **Swagger** - API documentation and testing
- **Nodemailer** - Email sending functionality

### Frontend 💻
- **React 19** - Modern JavaScript library for building user interfaces
- **Vite** - Next-generation frontend tooling for faster development
- **ESLint** - Code linting and formatting
- **Modern CSS** - Responsive and beautiful styling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- 🟢 **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- 🐘 **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/)
- 📦 **npm** or **yarn** - Package managers (comes with Node.js)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd api-gateway
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
cd ..
```

### 4. Database Configuration
```bash
# Create a PostgreSQL database
createdb api_gateway_db

# Run migrations
cd backend
psql -U <your-username> -d api_gateway_db -f sql/master.sql
```

### 5. Environment Setup
Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=api_gateway_db
DB_USER=your_db_user
DB_PASS=your_db_password

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Email Configuration (for notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 6. Create Admin User
```bash
cd backend
node test/admin.js admin@example.com securepassword123
```

### 7. Start the Application
```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend
cd frontend
npm run dev
```

🎉 **Your application is now running!**
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`
- API Docs: `http://localhost:3000/api-docs`

## 📖 API Documentation

The API is fully documented using Swagger. Once the backend is running, visit:
**http://localhost:3000/api-docs**

### Key Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | User authentication | ❌ |
| POST | `/auth/accessRequest` | Request access | ❌ |
| GET | `/user/projects` | List public projects | ❌ |
| GET | `/user/projects/:id` | Get project details | ❌ |
| POST | `/projects` | Create new project | ✅ |
| PUT | `/projects/:id` | Update project | ✅ |
| DELETE | `/projects/:id` | Delete project | ✅ |
| GET | `/api-logs` | View API logs | ✅ (Admin) |

## 🏗️ Project Structure

```
api-gateway/
├── 📁 backend/
│   ├── 📁 config/          # Database & app configurations
│   │   ├── db.js          # PostgreSQL connection pool
│   │   └── swagger.js     # API documentation config
│   ├── 📁 controllers/     # Request handlers
│   │   ├── auth/          # Authentication logic
│   │   ├── project/       # Project CRUD operations
│   │   └── user/          # User-related operations
│   ├── 📁 middlewares/     # Express middlewares
│   │   ├── authenticateToken.js
│   │   ├── rbac.js        # Role-based access control
│   │   └── rateLimiter.js # API rate limiting
│   ├── 📁 routes/          # API route definitions
│   ├── 📁 sql/            # Database schema & migrations
│   ├── 📁 utils/          # Helper functions
│   └── server.js          # Application entry point
├── 📁 frontend/
│   ├── 📁 public/         # Static assets
│   ├── 📁 src/            # React components & logic
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # React entry point
│   └── vite.config.js     # Vite build configuration
├── 📄 package.json        # Project dependencies
└── 📄 README.md           # This file
```

## 🔧 Available Scripts

### Backend Scripts
```bash
npm start      # Production server
npm run dev    # Development server with hot reload
```

### Frontend Scripts
```bash
npm run dev     # Development server
npm run build   # Production build
npm run lint    # Code linting
npm run preview # Preview production build
```

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Rate Limiting** - Prevents API abuse
- **Input Validation** - Comprehensive request validation
- **CORS** - Cross-origin resource sharing configuration
- **SQL Injection Protection** - Parameterized queries

## 📧 Email Configuration

The application supports email notifications for access requests. Configure your email settings in the `.env` file:

- Use Gmail with App Passwords for security
- Supports other SMTP providers
- HTML email templates included

## 🧪 Testing

```bash
# Run backend tests (when implemented)
cd backend
npm test

# Run frontend tests (when implemented)
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm run build  # If build step exists
npm start
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the 'dist' folder to your hosting service
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. 💻 **Make** your changes
4. ✅ **Test** your changes
5. 📝 **Commit** your changes: `git commit -m 'Add amazing feature'`
6. 🚀 **Push** to the branch: `git push origin feature/amazing-feature`
7. 🔄 **Open** a Pull Request

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to the open-source community
- Express.js for the amazing web framework
- React for the powerful UI library
- PostgreSQL for the robust database

## 📞 Support

If you have any questions or need help:

- 📧 **Email**: your-email@example.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/api-gateway/issues)
- 📖 **Documentation**: [API Docs](http://localhost:3000/api-docs)

---

<div align="center">

**Made with ❤️ by [Your Name]**

⭐ **Star this repo if you found it helpful!**

</div>