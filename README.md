# Task-Manager-App

A simple full-stack task manager built with React, Express, and PostgreSQL.

## Features

- Add a task with title, description, and status
- View all tasks from the database
- Update a task status to `To Do`, `In Progress`, or `Done`
- Delete a task
- Express backend organized with a clear MVC pattern

## Project Structure

```text
backend/
  config/        Database connection and table setup
  controllers/   Request and response logic
  models/        PostgreSQL queries
  routes/        API routes
frontend/
  src/
    components/ Reusable React UI components
    services/   Axios API calls
    constants/  Shared task status values
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Check the database connection:

The backend uses `backend/.env`.

```env
PORT=5001
DATABASE_URL=your_postgresql_connection_string
```

The provided Neon PostgreSQL connection string is already added in `backend/.env` for local testing.

3. Run backend and frontend together:

```bash
npm run dev
```

4. Open the frontend:

```text
http://localhost:5173
```

The API runs at:

```text
http://localhost:5001/api/tasks
```

## Deploying To Vercel

- Import the repo into Vercel as a Git project.
- Set the `DATABASE_URL` environment variable in Vercel to your Neon connection string.
- Deploy with the default build command, which runs `npm run build`.
- The frontend is served from the Vercel build output, and the API is exposed through `/api/*`.
- The same frontend code works in production because it calls `/api/tasks` with Axios.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id/status` | Update task status |
| DELETE | `/api/tasks/:id` | Delete a task |

## Notes

- The backend creates the `tasks` table automatically when the server starts.
- The frontend uses Axios in `frontend/src/services/taskApi.js`. There is no hardcoded task data.
- Run `npm run build` to create a production frontend build in `dist/`.
