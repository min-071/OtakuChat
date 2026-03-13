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

interface BackendUserProfile {
  uid?: string;
  email?: string;
  name?: string | null;
}

interface UseAuthReturn {
  user: User | null;
  backendUser: BackendUserProfile | null;
  backendVerified: boolean;
  backendError: Error | null;
  loading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [backendUser, setBackendUser] = useState<BackendUserProfile | null>(null);
  const [backendVerified, setBackendVerified] = useState(false);
  const [backendError, setBackendError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const verifyBackendUser = useCallback(async (firebaseUser: User) => {
    if (!apiUrl) {
      setBackendVerified(false);
      setBackendUser(null);
      setBackendError(new Error('Missing VITE_REACT_APP_API_URL in frontend/.env'));
      return;
    }

    try {
      const token = await firebaseUser.getIdToken();
      const response = await fetch(`${apiUrl}/api/users/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Backend verification failed with status ${response.status}`);
      }

      const profile = (await response.json()) as BackendUserProfile;
      setBackendUser(profile);
      setBackendVerified(true);
      setBackendError(null);
    } catch {
      setBackendUser(null);
      setBackendVerified(false);
      setBackendError(
        new Error('Logged in, but backend token verification failed. Check backend server and credentials.'),
      );
    }
  }, [apiUrl]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        void verifyBackendUser(firebaseUser);
      } else {
        setBackendUser(null);
        setBackendVerified(false);
        setBackendError(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [verifyBackendUser]);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      await verifyBackendUser(credential.user);
    } catch (err: unknown) {
      const message = getFirebaseAuthErrorMessage(err);
      const friendlyError = new Error(message);
      setError(friendlyError);
      throw friendlyError;
    }
  }, [verifyBackendUser]);

  const signup = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await verifyBackendUser(credential.user);
    } catch (err: unknown) {
      const message = getFirebaseAuthErrorMessage(err);
      const friendlyError = new Error(message);
      setError(friendlyError);
      throw friendlyError;
    }
  }, [verifyBackendUser]);

  const logout = useCallback(async () => {
    setError(null);
    try {
      await signOut(auth);
      setBackendUser(null);
      setBackendVerified(false);
      setBackendError(null);
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
      const credential = await signInWithPopup(auth, provider);
      await verifyBackendUser(credential.user);
    } catch (err: unknown) {
      const message = getFirebaseAuthErrorMessage(err);
      const friendlyError = new Error(message);
      setError(friendlyError);
      throw friendlyError;
    }
  }, [verifyBackendUser]);

  return {
    user,
    backendUser,
    backendVerified,
    backendError,
    loading,
    error,
    login,
    signup,
    logout,
    loginWithGoogle,
  };
};
