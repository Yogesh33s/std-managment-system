# Student Management System

A full-stack web application to manage student records with create, read, update, and delete (CRUD) operations, along with filtering functionality.

---

## Features

* Add new students
* Edit existing student details
* Delete student records
* Filter students by:

  * Registration Number
  * Course
  * Batch
* Deployed frontend and backend

---

## Tech Stack

Frontend:

* React.js
* Axios

Backend:

* Node.js
* Express.js

Database:

* MongoDB Atlas

Deployment:

* Vercel (Frontend)
* Render (Backend)

---

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Yogesh33s/std-managment-system.git
cd std-managment-system
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file and add:

```
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```bash
node server.js
```

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

---

## Live Demo

Frontend:
https://your-vercel-link.vercel.app

Backend API:
https://std-managment-system.onrender.com/api/students

---

## Author

Yogesh
