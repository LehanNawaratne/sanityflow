# SanityFlow

A full-stack application for mental health and wellness management.

## Project Structure

```
sanityflow/
├── backend/          # Node.js + Express + TypeScript API
│   ├── src/
│   │   ├── config/      # Database and app configuration
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Custom middleware
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   ├── utils/       # Utility functions
│   │   ├── types/       # TypeScript type definitions
│   │   └── server.ts    # Entry point
│   ├── dist/            # Compiled JavaScript
│   └── package.json
└── frontend/         # React frontend (to be implemented)
```

## Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret

5. Run development server:
```bash
npm run dev
```

6. Build for production:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

## Tech Stack

### Backend
- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

## Environment Variables

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```
