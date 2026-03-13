import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// The configuration object will be injected from environment variables.
// Be sure to create a .env file in the frontend directory with the values defined
// in the README, then restart the dev server for Vite to pick them up.

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

if (!firebaseConfig.apiKey) {
  throw new Error(
    'Missing Firebase config. Create frontend/.env with VITE_FIREBASE_* keys and restart Vite.',
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services we will use
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;
