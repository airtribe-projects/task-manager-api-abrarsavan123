# Task Manager API

A RESTful API for managing tasks built with Node.js and Express.js using in-memory data storage.

## Setup

```bash
npm install
node app.js
```

The server starts on `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description | Success | Error |
|--------|----------|-------------|---------|-------|
| GET | `/tasks` | Get all tasks | 200 | — |
| GET | `/tasks/:id` | Get a task by ID | 200 | 404 |
| POST | `/tasks` | Create a new task | 201 | 400 |
| PUT | `/tasks/:id` | Update a task | 200 | 400 / 404 |
| DELETE | `/tasks/:id` | Delete a task | 200 | 404 |

### Request Body (POST / PUT)

```json
{
  "title": "string",
  "description": "string",
  "completed": false
}
```

All three fields are required and type-validated.

## Running Tests

```bash
npm run test
```
