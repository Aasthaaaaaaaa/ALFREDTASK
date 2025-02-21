# Flashcard Learning App

## Overview
The **Flashcard Learning App** is a **MERN stack**-based web application that helps users **create, review, and track flashcards** using the **Leitner System** for spaced repetition. Users can mark their answers as **correct or incorrect**, which determines when the flashcard will reappear for review, optimizing learning efficiency.

## Features
- **User Authentication** with JWT
- **Create, Edit, and Delete Flashcards**
- **Spaced Repetition using the Leitner System**
- **Real-time Progress Tracking**
- **Clean and Responsive UI**

---

## Tech Stack
- **Frontend:** React (Vite), React Hooks, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, JWT Authentication
- **Database:** MongoDB with Mongoose ORM
- **Deployment:** Render (Frontend & Backend)

---

## Setup & Installation

### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/your-repo.git
 cd flashcard-learning-app
```

### 2️⃣ Backend Setup
```sh
 cd backend
 npm install
```

#### Configure Environment Variables
Create a **.env** file in the **backend/** directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

#### Start Backend Server
```sh
 npm run dev
```

### 3️⃣ Frontend Setup
```sh
 cd frontend
 npm install
```

#### Start Frontend Server
```sh
 npm run dev
```

> The frontend should now be running at `http://localhost:5173/` and the backend at `http://localhost:5000/`.

---

## Thought Process & Architecture

### 1️⃣ **Backend Design**
- Implemented **RESTful API** endpoints for user authentication, flashcard CRUD operations, and spaced repetition logic.
- Used **JWT for authentication** to secure API routes.
- Applied **Mongoose Schemas** to structure flashcard data, tracking question, answer, level, and next review date.

### 2️⃣ **Frontend UI & Functionality**
- Built with **React Vite** for fast development.
- Designed **minimalist UI** with Tailwind CSS for responsiveness.
- Used **React Hooks** for state management (e.g., `useState`, `useEffect`).
- Implemented **Axios** for API requests with JWT authorization.

### 3️⃣ **Leitner System Implementation**
- Users start in **Box 1**.
- Correct answers move flashcards to the **next box** with longer review intervals.
- Incorrect answers reset flashcards to **Box 1**.
- **MongoDB stores** the flashcard’s level and next review date.

---

## Future Improvements
- Add **categories & tags** for flashcards.
- Implement **leaderboard & streak tracking**.
- Introduce **audio & image support** in flashcards.
- Deploy on a scalable **cloud platform**.

---

## Contributors
- **Aastha** (Developer)

---

## License
This project is open-source under the **MIT License**. Feel free to contribute and improve! 🚀

