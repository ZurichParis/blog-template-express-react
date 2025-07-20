# Blog Application

A full-stack blog platform with real-time updates, built with React, Express.js, and MongoDB. The application consists of a public blog interface, an admin dashboard for content management, and a RESTful API backend with WebSocket support for live updates.

## What This Application Is For

This is a blog platform that allows:
- **Public users** to browse, read, and filter blog posts by theme and difficulty level
- **Administrators** to create, edit, delete, and manage blog content through a dedicated admin interface
- **Real-time updates** so changes made in the admin panel appear instantly on the public blog
- **Multi-language support** with Chinese, English, Japanese
- **Contact functionality** with EmailJS integration for user inquiries

## Architecture

- **blog-client**: Public-facing React blog interface (port 3002)
- **blog-admin**: Administrative React dashboard (port 3001)  
- **blog-backend**: Express.js API server with Socket.IO (port 5050)
- **MongoDB**: Database for storing blog posts and admin data

## Prerequisites

### Docker Setup (Recommended)
- **Docker**: 4.37.2 (179585)

### Manual Setup (Alternative)
- **Node.js**: v24.4.0
- **npm**: 11.4.2
- **MongoDB**: 8.0.11

## Quick Start with Docker

### 1. Clone and Setup
```bash
git clone <repository-url>
cd blog-template-express-react
```

### 2. Configure Environment Variables (Optional for dev)
Copy the example environment files and configure them:

```bash
# Backend configuration
cp blog-backend/.env.example blog-backend/.env
# Edit blog-backend/.env with your MongoDB URI and JWT secret

# Client configuration  
cp blog-client/.env.example blog-client/.env
# Edit blog-client/.env with your EmailJS credentials

# Admin configuration
cp blog-admin/.env.example blog-admin/.env
# No changes needed for basic setup
```

### 3. Start All Services
```bash
# Start all services (MongoDB, backend, admin, client)
docker compose -f docker-compose.dev.yml up -d

# Seed the database with sample data and admin account
docker compose -f docker-compose.dev.yml --profile tools up seeder
```

### 4. Access the Application
- **Public Blog**: http://localhost:3002
- **Admin Dashboard**: http://localhost:3001  
- **Backend**: http://localhost:5050
- **Backend Debugger**: http://localhost:9229

### 5. Stop Services
```bash
# Stop all services
docker compose -f docker-compose.dev.yml stop
```

## Manual Setup (without Docker)

### 1. Install Dependencies
```bash
# Install backend dependencies
cd blog-backend
npm install

# Install client dependencies  
cd ../blog-client
npm install

# Install admin dependencies
cd ../blog-admin
npm install
```

### 2. Setup MongoDB
Ensure MongoDB is running locally on port 27017, or update the `MONGODB_URI` in your environment files.

### 3. Configure Environment Variables
Copy and edit the `.env.example` files as described in the Docker setup section.

### 4. Start Services
```bash
# Terminal 1: Start backend
cd blog-backend
npm run dev

# Terminal 2: Seed database (run once)
cd blog-backend  
npm run seed

# Terminal 3: Start client
cd blog-client
npm run dev

# Terminal 4: Start admin
cd blog-admin
npm run dev
```

## Default Admin Account

After running the seeder, you can log in to the admin dashboard with:
- **Email**: admin@blog.com
- **Password**: admin123

⚠️ **Important**: Change these credentials in production by updating the `SEED_ADMIN_*` variables in `blog-backend/.env`.

## EmailJS Setup

To enable the contact form functionality:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email  
   - `{{message}}` - Message content
4. Update `blog-client/.env` with your EmailJS credentials:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id  
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## Environment Variables Reference

### blog-backend/.env.example
```
PORT=5050
MONGODB_URI=mongodb://localhost:27017/blogdb
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=http://localhost:3002,http://localhost:3001
SEED_ADMIN=admin
SEED_ADMIN_EMAIL=admin@blog.com
SEED_ADMIN_PW=admin123
```

### blog-client/.env.example
```
VITE_API_URL=http://localhost:5050/api
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### blog-admin/.env.example
```
VITE_API_URL=http://localhost:5050/api
```

## Development

### Linting
```bash
# Lint frontend code
cd blog-client && npm run lint
cd blog-admin && npm run lint
```

### Building for Production

- Write proper Dockerfiles and Composer file for Prod with optional multistages structure to minimize the image size

## Troubleshooting


### Docker Issues

1. **Permission errors**: Ensure Docker daemon is running and you have permissions
2. **Build failures**: Try rebuilding with `docker compose build --no-cache`
3. **Database persistence**: Data is stored in Docker volumes, use `docker-compose down -v` to reset

## Support

For development guidance and architecture details, see [CLAUDE.md](./CLAUDE.md).