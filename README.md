# OtakuChat

**OtakuChat** is a real-time, anime-themed chat and collaboration platform built with **React**, **Node.js**, and **Firebase/Socket.IO**. It allows users to create accounts, join chat rooms, and communicate instantly with other anime enthusiasts. Perfect for showcasing modern web development skills including full-stack development, real-time systems, authentication, and cloud integration.

---

## Features

- **Real-time Messaging** – Send and receive messages instantly across multiple chat rooms.  
- **Anime-Themed UI** – Fun, responsive design inspired by anime aesthetics.  
- **User Authentication** – Sign up, log in, and manage profiles securely.  
- **Chat Rooms** – Create or join rooms to discuss different anime series or topics.  
- **Private Messaging** – One-on-one messaging between users.  
- **Typing Indicators & Message Status** – See when someone is typing or if a message is delivered/read.  
- **Responsive Design** – Works on mobile and desktop seamlessly.  
- **Firebase/Socket.IO Backend** – Real-time updates, cloud persistence, and scalable infrastructure.  

---

## Tech Stack

- **Frontend:** React, TailwindCSS / Material UI, TypeScript  
- **Backend:** Node.js, Express, Socket.IO  
- **Database & Auth:** Firebase Firestore, Firebase Authentication  
- **Deployment:** Vercel / Netlify (Frontend), Heroku / Cloud Run (Backend)  
- **CI/CD:** GitHub Actions  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/OtakuChat.git
cd OtakuChat
```

2. Check out the development branch (active work is on `development`):

```bash
git checkout development
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Install backend dependencies:
```bash
cd ../backend
npm install
```

5. Firebase setup (requires a Firebase account):
   1. Create a new Firebase project in the console.
   2. Enable **Authentication** (Email/Password provider; add Google/Facebook later if desired).
   3. Add a **Firestore** database (start in test mode for development).
   4. Grab the web app configuration (API key, auth domain, project ID).

6. Configure environment variables:
   - Copy `.env.example` to `.env` at the repo root (or to `frontend/.env`).
   - Populate it with the values from Firebase and any API URLs:
     ```bash
     FIREBASE_API_KEY=your_api_key
     FIREBASE_AUTH_DOMAIN=your_auth_domain
     FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_API_URL=http://localhost:5000
     ```
   - The `.env` file is ignored by Git; never commit your real secrets.

7. Run the app locally:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```

The frontend will be available at http://localhost:3000 by default.



License

This project is licensed under the MIT License – see the LICENSE
 file for details.
