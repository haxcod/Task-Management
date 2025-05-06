# Task Management System

A feature-rich web application for managing tasks within a small team. Built with **React.js**, **NodeJS**, and **MongoDB**, this system enables users to efficiently create, assign, and track tasks with collaboration features and secure authentication.

---

## Live Demo

🔗 [View Deployed App](https://your-deployment-url.com)

---

## Tech Stack

| Frontend | Backend          | Database | Auth | Deployment      |
| -------- | ---------------- | -------- | ---- | --------------- |
| React.js | NodeJs / Express | MongoDB  | JWT  | Vercel / Render |

---

### ✅ Core

- **User Authentication**: Secure sign up and login using JWT.
- **Task Management**: Full CRUD (Create, Read, Update, Delete) functionality.
- **Dashboard**: Shows tasks assigned to the user, created by the user, and overdue tasks.
- **Task Assignment**: Assign tasks to team members.
- **Search & Filters**: By title, description, due date, priority, and status.
- **Notifications**: In-app notifications when a task is assigned.

---

## Getting Started

### Prerequisites

- Node.js (>= 18)
- MongoDB or PostgreSQL instance
- Yarn or npm

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/haxcod/task-management.git
   cd task-management
   ```

2. **Install dependencies**

   ```bash
   cd frontend && npm install
   cd backend && npm install
   ```

3. **Configure Environment**

   - Create `.env` files in both frontend and backend folders with your secrets (DB_URI, JWT_SECRET, PORT, VITE_API_URL )

4. **Run Backend**

   ```bash
   npm run start:dev
   ```

5. **Run Frontend**
   ```bash
   npm run dev
   ```

---

## 📌 API Routes (Sample)

- `POST /api/v1/register` – Register user
- `POST /api/v1/login` – Login user
- `GET /api/v1/tasks` – Fetch tasks
- `POST /api/v1/tasks` – Create new task
- `PUT /api/v1/tasks/:id` – Update task
- `DELETE /api/v1/tasks/:id` – Delete task
- `GET /api/v1/tasks/` – Get tasks by user

---

## Assumptions & Decisions

- Notifications are in-app only (no email/SMS).
- MongoDB was chosen for flexibility in data modeling.
- Minimal styling done with Tailwind CSS for speed.

---

## Future Improvements

- Add Gantt chart/calendar views
- Email notifications
- Export tasks (CSV, PDF)
- Mobile app version (React Native)

---

> Designed and built by Ashish for [Take-Home Assignment](https://forms.gle/QnLMWKDLeAYhzWGz5) 🌟
