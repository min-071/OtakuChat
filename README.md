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

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```
4. Set up Firebase:
```bash
 a. Create a Firebase project/n
 b. Enable Authentication (Email/Password)/n
 c. Add Firestore database
```
5. Configure environment variables (.env):
```bash
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
```
6. Run the app locally:
```bash

# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm start
```


License

This project is licensed under the MIT License – see the LICENSE
 file for details.
