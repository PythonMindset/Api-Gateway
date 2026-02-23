# 🔧 API Gateway Backend

This is the backend component of the API Gateway system, built with Node.js, Express.js, and PostgreSQL.

## 🏗️ Architecture Overview

This project follows a layered architecture:

- **Routes** handle HTTP concerns
- **Controllers** manage request logic  
- **Services** contain business logic
- **SQL** is managed separately for clarity and performance

The backend follows a modular architecture with clear separation of concerns:

```
backend/
├── 📁 config/          # Configuration files (DB, email, Swagger)
├── 📁 controllers/     # Request handlers & business logic
├── 📁 middlewares/     # Express middlewares (auth, validation, logging)
├── 📁 routes/          # API route definitions
├── 📁 services/        # Business logic services
├── 📁 sql/            # Database schema & migrations
├── 📁 utils/          # Helper functions & utilities
├── 📁 validations/    # Input validation schemas
├── 📁 docs/           # Swagger API documentation
└── 📁 test/           # Test scripts & utilities
```

## 🎯 Design Decisions

- PostgreSQL chosen for structured relational data
- SQL used directly for performance and control
- Fast cleanup routines to prevent log bloat
- Modular middleware for auth, logging, and rate limiting

## 🎯 Project Scope

This project is intentionally scoped as a single-node API gateway to demonstrate:

- Auth & RBAC
- Rate limiting
- Structured logging
- SQL-first design

Without introducing unnecessary enterprise complexity.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation
```bash
cd backend
npm install
```

### Database Setup
```bash
# Create database
createdb api_gateway_db

# Run migrations
psql -U your_username -d api_gateway_db -f sql/master.sql
```


### Environment Configuration
Copy `.env.example` to `.env` and fill in all required variables. See comments in `.env.example` for details on each variable.

### Running the Backend
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📊 Database Schema

### Core Tables

#### Users (`users`)
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    role user_role NOT NULL, -- 'admin' | 'viewer'
    last_active TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Projects (`projects`)
```sql
CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    tech_stack TEXT,
    repo_url VARCHAR(500),
    status project_status NOT NULL, -- 'planning' | 'testing' | 'completed' | 'live' | 'on_hold' | 'archived'
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT REFERENCES users(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Access Requests (`access_request`)
```sql
CREATE TABLE access_request (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status access_request_status DEFAULT 'active', -- 'active' | 'deactivated'
    requested_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### API Logs (`api_logs`)
```sql
CREATE TABLE api_logs (
    id BIGSERIAL PRIMARY KEY,
    endpoint VARCHAR(500) NOT NULL,
    method VARCHAR(10) NOT NULL,
    status_code INTEGER NOT NULL,
    user_id BIGINT REFERENCES users(id),
    level VARCHAR(10) DEFAULT 'info' CHECK (level IN ('info', 'warning', 'error')),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 Authentication & Authorization

### JWT Authentication
- Uses JSON Web Tokens for stateless authentication
- Tokens expire based on `JWT_EXPIRES_IN` environment variable
- Protected routes require `Authorization: Bearer <token>` header

### Role-Based Access Control (RBAC)
- **Admin**: Full access to all resources and user management
- **Viewer**: Read-only access to public projects and basic operations

### Middleware Stack
```
Request Flow:
Client Request → Rate Limiting → Authentication → Logging → Validation Error Handling → Controller → Response
```

Note: Authorization middleware is applied selectively based on routes. Public routes may skip authorization, while admin routes include role-based access control.

## 📡 API Endpoints


### Authentication
- `POST /auth/login` - User login
- `POST /auth/access-request` - Register new user with auto-generated credentials (public)


### User Operations
- `PUT /user/change-password` - Change password (authenticated)
- `GET /user/public` - List public projects (authenticated)
- `GET /user/public/:id` - Get project details (authenticated)
### API Documentation

Interactive API documentation is available via Swagger UI:
- Visit [`/api-docs`](http://localhost:PORT/api-docs) after starting the backend to explore and test endpoints.

### Project Management (Admin Only)
- `GET /projects` - List all projects
- `POST /projects` - Create new project
- `GET /projects/:id` - Get project details
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### API Logs (Admin Only)
- `GET /admin/api-logs` - View API request logs (filterable by user, endpoint, method, status code, level)

### Admin Operations (Admin Only)
- `GET /admin/access-requests` - View all access requests with user details (email, status, request date, last login, etc.)

### Health Check
- `GET /health` - Application health status

## 🛡️ Security Features

### Password Security
- bcrypt hashing with salt rounds for all stored passwords
- Password complexity validation for password changes (8+ chars, uppercase, lowercase, numbers)
- Auto-generated secure passwords for new user registrations

### Rate Limiting
- Global rate limiting per IP
- User-specific rate limiting
- Configurable windows and limits

### Input Validation
- Comprehensive validation using express-validator
- Sanitization of user inputs
- Structured error responses

### CORS Configuration
- Enabled for cross-origin requests
- Currently allows all origins (configurable for production)

## 📧 Email System

### Configuration
- SMTP transport using nodemailer
- Support for Gmail and other providers
- HTML email templates

### Email Types
- **Access Granted**: Sent immediately when user registers via access request
- Contains auto-generated login credentials and instructions

## 📝 Logging & Monitoring

### API Logging
- All authenticated requests automatically logged to database
- Tracks: endpoint, HTTP method, status code, user ID, log level, timestamp
- Log levels: info (2xx-3xx), warning (4xx), error (5xx)
- Useful for analytics, debugging, and audit trails

### Error Handling
- Centralized error handling middleware
- Structured error responses
- Proper HTTP status codes

## 🔄 Automated Maintenance Tasks

The backend includes scheduled background tasks for database maintenance:

### Log Cleanup
- **Frequency**: Daily
- **Action**: Automatically deletes API logs older than `LOG_EXPIRY` days (configurable via `.env`)
- **Purpose**: Prevents database bloat and maintains performance

### Inactive User Cleanup
- **Frequency**: Daily
- **Action**: Removes viewer accounts that are inactive based on:
  - Users with `last_active` older than `MAX_VIEWER_INACTIVITY_DAYS` (default: 30 days)
  - Users with no `last_active` (never logged in) and `created_at` older than `NEW_USER_INACTIVITY_DAYS` (default: 7 days)
- **Additional**: Updates corresponding `access_request` records to 'deactivated' status
- **Purpose**: Cleans up unused accounts and maintains data integrity

### Scheduling
- Tasks run every 24 hours from server startup
- No external cron jobs required
- Configurable via environment variables

## � Background Cleanup

- Old API logs are periodically removed
- Inactive viewers are cleaned to reduce DB load

## �🧪 Testing


### Test Scripts
- **Admin user creation:**
    ```bash
    node test/admin.js <name> <email> <password>
    ```
- The script requires the admin's name, email, and password as arguments.
- Located in `backend/test/` directory

### Running Tests
```bash
# Backend tests (when implemented)
npm test

# Integration tests
# Add your test commands here
```

## 🔧 Development Guidelines

### Code Organization
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Utils**: Helper functions and utilities
- **Validations**: Input validation schemas
- **Middlewares**: Express middleware functions

### Naming Conventions
- Files: camelCase (e.g., `userController.js`)
- Functions: camelCase (e.g., `getUserById`)
- Constants: UPPER_SNAKE_CASE
- Database: snake_case

### Error Handling
- Use custom error classes
- Consistent error response format
- Proper HTTP status codes

## 🚀 Deployment Considerations


### Environment Variables
All required environment variables are documented in `.env.example`. Copy this file to `.env` and update values as needed for your environment:
- Database credentials
- JWT secrets
- Email configuration
- Rate limiting settings
- Log and user cleanup settings
- Server port and CORS settings

### Database
- Use connection pooling for production
- Set up database backups
- Monitor database performance

### Security
- Use HTTPS in production
- Set secure cookie options
- Regular security audits

### Monitoring
- Set up application monitoring
- Log aggregation
- Performance monitoring

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)
- [Swagger/OpenAPI](https://swagger.io/)

## 🤝 Contributing to Backend

When contributing to the backend:

1. Follow the existing code structure
2. Add proper validation for new endpoints
3. Include error handling
4. Update API documentation
5. Add tests for new features
6. Follow the commit message conventions

---

**For project overview, see the main [README.md](../README.md)**