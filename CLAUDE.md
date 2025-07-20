# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a full-stack blog application consisting of three microservices:

1. **blog-backend** - Express.js REST API with MongoDB and Socket.IO for real-time updates
2. **blog-client** - React frontend for public blog interface (port 3002)
3. **blog-admin** - React admin panel for content management (port 3001)

All services communicate through a shared network and can be orchestrated with Docker Compose.

## Development Commands

### Local Development (without Docker)

**Backend:**
```bash
cd blog-backend
npm run dev          # Start with nodemon on port 5050
npm run seed         # Seed database with sample data
npm start            # Production start
```

**Client:**
```bash
cd blog-client
npm run dev          # Start Vite dev server on port 3002
npm run build        # Build for production
npm run lint         # Run ESLint
```

**Admin:**
```bash
cd blog-admin
npm run dev          # Start Vite dev server on port 3001
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Docker Development
```bash
docker compose -f docker-compose.dev.yml up      # Start all services
docker compose -f docker-compose.dev.yml stop    # Stop all services
docker compose -f docker-compose.dev.yml --profile tools up seeder  # Run database seeder
```

## Key Technical Architecture

### Real-time Updates System
- Backend uses Socket.IO to emit `blogCreated`, `blogUpdated`, and `blogDeleted` events
- Client implements `useWebSocket` hook for live updates without page refresh
- Admin panel receives real-time notifications when content changes

### Authentication & Authorization
- JWT-based authentication for admin operations
- AuthContext in admin panel manages token lifecycle with automatic expiration
- All admin API routes require valid JWT tokens which expire in 24h 
- Token validation occurs every minute with auto-logout on expiration

### Database Design
- MongoDB with Mongoose ODM
- Blog schema: title, content, theme, level, description, duration, youtubeLink, relatedBlogs[], published
- Indexed on theme and published status for query optimization
- Related blogs feature enables cross-referencing between posts

### API Structure
- RESTful endpoints: `/api/blogs` (public) and `/api/admin/blogs` (authenticated)
- Centralized API clients in `src/services/api.js` with separate namespaces
- CORS configuration supports multiple frontend origins
- Error handling with consistent response formats

### State Management Patterns
- React Context for authentication state in admin panel
- Custom hooks for WebSocket connection management
- Local useState for component-level state
- No global state management library - relies on React's built-in patterns

## Environment Configuration

Each service requires specific environment variables:

**blog-backend (.env):**
- `MONGODB_URI` - Database connection string
- `JWT_SECRET` - Token signing secret
- `PORT` - Server port (default: 5050)
- `CORS_ORIGIN` - Comma-separated allowed origins

**blog-client (.env):**
- `VITE_API_URL` - Backend API URL
- `VITE_EMAILJS_*` - EmailJS configuration for contact form

**blog-admin (.env):**
- `VITE_API_URL` - Backend API URL for admin operations

## Development Workflow

1. Start backend first: `cd blog-backend && npm run dev`
2. Seed database if needed: `npm run seed`
3. Start client and/or admin frontends in separate terminals
4. Access admin at http://localhost:3001, client at http://localhost:3002
5. Backend API available at http://localhost:5050/api

For Docker development, use the compose file which handles service dependencies and networking automatically.