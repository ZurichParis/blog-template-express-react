# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a full-stack blog application with three main components:

1. **blog-client** (main React frontend) - Public-facing blog interface
2. **blog-admin** (React admin panel) - Administrative interface for content management
3. **blog-backend** (Express.js API) - REST API with MongoDB and real-time WebSocket updates

## Development Commands

### Frontend (blog-client)
```bash
npm run dev          # Start development server (Vite on port 5173)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Admin Panel (blog-admin)
```bash
cd ../blog-admin
npm run dev          # Start admin dev server (Vite on port 3001)
npm run build        # Build admin panel
npm run lint         # Run ESLint for admin
```

### Backend (blog-backend)
```bash
cd ../blog-backend
npm run dev          # Start backend with nodemon (port 5050)
npm start            # Start backend in production
npm run seed         # Seed database with sample data
```

## Environment Configuration

Each component requires environment variables:

### blog-client (.env)
- `VITE_API_URL` - Backend API URL (default: http://localhost:5050/api)
- `VITE_EMAILJS_SERVICE_ID` - EmailJS service ID for contact form
- `VITE_EMAILJS_TEMPLATE_ID` - EmailJS template ID
- `VITE_EMAILJS_PUBLIC_KEY` - EmailJS public key

### blog-backend (.env)
- `PORT` - Server port (default: 5050)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `CORS_ORIGIN` - Comma-separated allowed origins
- `SEED_ADMIN`, `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PW` - Default admin credentials

## Key Architecture Patterns

### Real-time Updates
- WebSocket integration using Socket.IO for live blog updates
- Custom `useWebSocket` hook in blog-client handles real-time events
- Backend emits `blogCreated`, `blogUpdated`, and `blogDeleted` events

### API Structure
- RESTful API with `/api/blogs` (public) and `/api/admin` (authenticated) routes
- JWT authentication for admin operations
- Centralized API client in `src/services/api.js` with separate `blogAPI` and `adminAPI` namespaces

### Database Schema
- MongoDB with Mongoose ODM
- Blog schema includes: title, content, theme, level, description, duration, relatedBlogs, published status
- Indexed on theme and published status for efficient querying

### Frontend State Management
- Simple useState for page navigation in main app
- Admin panel uses React Context (`AuthContext`) for authentication state
- No global state management library - leverages React's built-in state

### Styling & UI
- Tailwind CSS for styling across all components
- Responsive design with mobile-first approach
- Custom pagination component shared between client and admin

## Testing

No specific test framework is configured. When adding tests, check if any test setup exists in the codebase first.