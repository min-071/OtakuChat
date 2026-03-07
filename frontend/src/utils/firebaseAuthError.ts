import type { FirebaseError } from 'firebase/app';

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'Invalid email or password. Please try again.',
  'auth/user-not-found': 'No account found for this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/email-already-in-use': 'This email is already registered. Try logging in.',
  'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/popup-closed-by-user': 'Google sign-in popup was closed before completing login.',
  'auth/network-request-failed': 'Network error. Check your internet connection and retry.',
};

export const getFirebaseAuthErrorMessage = (error: unknown): string => {
  const firebaseError = error as FirebaseError;
  if (!firebaseError?.code) {
    return 'Something went wrong. Please try again.';
  }

  return AUTH_ERROR_MESSAGES[firebaseError.code] || `Authentication failed (${firebaseError.code}).`;
};
