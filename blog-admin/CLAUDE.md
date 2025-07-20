# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based blog administration interface for managing blog posts. The application is built with Vite, uses Tailwind CSS for styling, and communicates with a REST API backend for blog management operations.

## Development Commands

- `npm run dev` - Start development server on port 3001
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run build-css` - Build Tailwind CSS (with watch mode)

## Architecture

### Core Structure
- **Frontend Framework**: React 19.1.0 with Vite for build tooling
- **Styling**: Tailwind CSS with PostCSS
- **State Management**: React Context API (AuthContext)
- **HTTP Client**: Axios for API communication
- **Routing**: React Router DOM for navigation
- **Notifications**: React Toastify for user feedback

### Key Components
- `App.jsx` - Main application wrapper with authentication state
- `AuthContext.jsx` - Authentication context with JWT token management and automatic expiration handling
- `AdminDashboard.jsx` - Main dashboard with blog management functionality
- `BlogList.jsx` - Blog listing with pagination
- `BlogForm.jsx` - Blog creation/editing form
- `Pagination.jsx` - Pagination component for blog lists
- `RelatedBlogsSelector.jsx` - Component for selecting related blogs

### API Integration
- Base URL configurable via `VITE_API_URL` environment variable (defaults to `http://localhost:5050/api`)
- All admin operations require JWT authentication
- API functions in `src/services/api.js` handle CRUD operations for blogs

### Authentication Flow
- JWT token stored in localStorage with automatic expiration checking
- Token validation occurs every minute
- Auto-logout on token expiration
- Protected routes based on authentication state

### Blog Schema
Blog posts contain the following fields:
- `title` (required) - Blog post title
- `content` (required) - Main blog content
- `theme` (required) - Blog theme/category
- `level` (required) - Difficulty level
- `description` (required) - Blog description
- `duration` (required) - Estimated reading time
- `youtubeLink` (optional) - Associated YouTube video
- `relatedBlogs` (optional) - Array of related blog post IDs
- `published` (boolean) - Publication status

## Configuration Files

- `vite.config.js` - Vite configuration with React plugin and port 3001
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration with React hooks rules
- `postcss.config.cjs` - PostCSS configuration for Tailwind
- `.env.example` - Environment variable template

## Development Notes

- The application runs on port 3001 to avoid conflicts with other services
- All API calls include proper error handling and user feedback via toasts
- The UI uses a consistent blue color scheme with responsive design
- Form validation ensures all required fields are filled before submission
- Pagination is implemented for better performance with large blog lists
- Related blogs feature allows cross-referencing between blog posts