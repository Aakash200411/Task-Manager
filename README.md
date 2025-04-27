# Task Manager

A full-stack Task Manager application with user authentication, task CRUD, priority, deadlines, search, filtering, dark mode, and user profile update.

## Features
- User registration and login (JWT-based)
- Add, edit, delete, and mark tasks as complete
- Set task priority (low, medium, high) and deadline
- Search tasks by title
- Filter tasks by status (all, completed, pending)
- Responsive UI with Bootstrap
- Dark mode toggle
- User profile update (name, email, password)
- Toast notifications for all actions

## Tech Stack
- **Frontend:** React, Redux Toolkit, Redux Persist, React Router, Bootstrap, React Toastify
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt

## Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)

## Setup Instructions

### 1. Clone the repository
```bash
# Clone the repo and navigate to the project folder
cd task-manager
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your-secret-key
```
Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

The frontend will run at [http://localhost:3000](http://localhost:3000)
The backend will run at [http://localhost:5000](http://localhost:5000)

## Usage
- Register a new account or log in.
- Add, edit, delete, and mark tasks as complete.
- Set priority and deadline for tasks.
- Search tasks by title and filter by status.
- Toggle dark mode from the navbar.
- Update your profile from the "Profile" link in the navbar.

## API Endpoints (Backend)
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login
- `PUT /api/auth/profile` — Update user profile
- `GET /api/tasks` — Get all tasks for the user
- `POST /api/tasks` — Create a new task
- `PUT /api/tasks/:id` — Update a task
- `DELETE /api/tasks/:id` — Delete a task

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE) 