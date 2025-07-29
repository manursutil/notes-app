# Full-Stack Notes App

A full-featured notes app built with the **MERN stack** where each authenticated user can create, edit, view, and delete their own notes. Built to explore full-stack architecture, authentication, and modern React patterns.

## Tech Stack

### Frontend
- [React](https://reactjs.org/) (Vite)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Custom React hooks (`useAuth`, `useNotes`)
- Auth state persisted via `localStorage`

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT for secure authentication
- Middleware for token extraction and user scoping
- Route protection and per-user data access

## Features

- ✅ User signup & login with JWT
- ✅ Token stored in localStorage and sent with each request
- ✅ Protected frontend routes (`/notes`, `/notes/:id`)
- ✅ Notes are scoped to each user
- ✅ Create, read, update, and delete notes (CRUD)
- ✅ Responsive layout with Tailwind
- ✅ Search functionality in notes list
- ✅ Clean separation of concerns (hooks, services, routes)
