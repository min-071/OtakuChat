import { useState, useEffect, useCallback } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../services/firebase';
import { getFirebaseAuthErrorMessage } from '../utils/firebaseAuthError';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const message = getFirebaseAuthErrorMessage(err);
      const friendlyError = new Error(message);
      setError(friendlyError);
      throw friendlyError;
    }
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const message = getFirebaseAuthErrorMessage(err);
      const friendlyError = new Error(message);
      setError(friendlyError);
      throw friendlyError;
    }
  }, []);

  const logout = useCallback(async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (err: unknown) {
      const message = getFirebaseAuthErrorMessage(err);
      const friendlyError = new Error(message);
      setError(friendlyError);
      throw friendlyError;
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      const message = getFirebaseAuthErrorMessage(err);
      const friendlyError = new Error(message);
      setError(friendlyError);
      throw friendlyError;
    }
  }, []);

  return { user, loading, error, login, signup, logout, loginWithGoogle };
};
