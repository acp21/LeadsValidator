// src/services/firebase_auth.ts
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, AuthError } from "firebase/auth";
import app from "../firebase/firebaseInit";

const auth = getAuth(app);

export const loginWithGoogle = async (): Promise<UserCredential | void> => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw error;
  }
};

export const registerWithEmailPassword = async (email: string, password: string): Promise<UserCredential | void> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    console.error("Error registering with email and password:", error);
    throw error;
  }
};

export const loginWithEmailPassword = async (email: string, password: string): Promise<UserCredential | void> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    console.error("Error logging in with email and password:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
