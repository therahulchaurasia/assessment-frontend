# Task Management Website

Welcome to the **Task Management Website**! This platform allows users to manage their tasks effectively by categorizing them into different statuses and updating them in real-time.

## Live Demo

Access the website here: [Task Management Website](https://assessment-frontend-eta.vercel.app/login)

## Features

### 1. **Authentication**

- **Login Page**: Securely log in with your credentials.
- **Register Page**: Create a new account to start using the platform.

### 2. **Task Management**

- **Add Tasks**: Create tasks by providing the following details:
  - Task name
  - Description
  - Status (Pending, Ongoing, or Completed)
- **Drag and Drop**: Easily move tasks between columns (Pending, Ongoing, Completed) to update their status.
- **Real-time Updates**: All changes are instantly saved to the backend.

### 3. **Task Board**

- Tasks are displayed in a **three-column layout**:
  - **Pending**
  - **Ongoing**
  - **Completed**
- The drag-and-drop interface makes it intuitive to update task statuses.

## Technology Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: Chakra UI V2 (depending on preferences)
- **Drag-and-Drop**: `react-dnd`

### Hosting

- **Frontend**: Hosted on [Vercel](https://vercel.com/)

## Installation Guide

### Clone the Repository

```bash
git clone https://github.com/your-repository-url.git
cd your-repository
```

### Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install
```

### Environment Variables

NEXT_PUBLIC_SERVER_ENDPOINT=https://assessment-backend-y7x7.onrender.com/api/v1

### Run Locally

```bash
cd frontend
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/login`: Log in with credentials.
- `POST /api/v1/auth/register`: Register a new user.

### Tasks

- `GET /api/v1/tasks`: Fetch all tasks.
- `POST /api/v1/tasks`: Create a new task.
- `PATCH /api/v1/tasks/:id`: Update a task's status.
- `DELETE /api/v1/tasks/:id`: Delete a task.

## Future Improvements

- Add a search and filter option for tasks.
- Implement task deadlines and reminders.
- Add user profile and settings.
- Enhance the UI with animations and responsiveness.
