# FitTrack AI API

AI-powered RESTful fitness backend built with Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt.js and Google Gemini.

## Features

- JWT authentication
- bcrypt password hashing
- Protected REST endpoints
- Workout CRUD/search
- Workout statistics
- Gemini AI workout recommendations
- Gemini AI fitness insights
- MVC architecture
- Standard JSON responses
- Centralized error handling

## Requirements

- Node.js 18+ recommended
- MongoDB local installation or MongoDB Atlas
- Gemini API key

## Installation

```bash
npm install
```

Create `.env` from `.env.example` and set:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/fittrack_ai
JWT_SECRET=your_secret
GEMINI_API_KEY=your_key
```

Start development server:

```bash
npm run dev
```

Server:

`http://localhost:5000`

## API

### Auth

`POST /api/auth/register`

Example:

```json
{
  "name": "Sukumaaran",
  "email": "user@example.com",
  "password": "password123",
  "age": 20,
  "fitnessGoal": "muscle_gain",
  "experience": "beginner"
}
```

`POST /api/auth/login`

`GET /api/auth/me`

### Workouts

Protected routes require:

`Authorization: Bearer YOUR_TOKEN`

`POST /api/workouts`

```json
{
  "name": "Morning Run",
  "type": "cardio",
  "duration": 30,
  "caloriesBurned": 250,
  "exercises": [
    {
      "name": "Running",
      "sets": 1,
      "reps": 0,
      "weight": 0
    }
  ],
  "notes": "Easy pace"
}
```

`GET /api/workouts`

`GET /api/workouts/search?q=run`

`GET /api/workouts/stats`

`DELETE /api/workouts/:id`

### AI

`POST /api/ai/recommendations`

```json
{
  "age": 20,
  "fitnessGoal": "muscle_gain",
  "experience": "beginner",
  "preferences": "home workouts, 4 days per week"
}
```

`GET /api/ai/insights`

## Architecture

```text
Client
  |
  v
Express Routes
  |
  v
JWT Middleware
  |
  v
Controllers
  |
  +----> MongoDB / Mongoose
  |
  +----> Gemini AI Service
```

## Security notes

Never commit `.env` or your Gemini API key to GitHub. Use a strong JWT secret in production. For production deployments, add rate limiting, HTTPS, request-size limits, logging/monitoring, stricter CORS configuration, and additional schema validation.

## Disclaimer

AI-generated fitness guidance is informational and is not medical advice. Users with injuries, medical conditions, or unusual symptoms should consult an appropriately qualified healthcare professional.
