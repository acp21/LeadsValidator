// src/services/firebase_auth.ts
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, AuthError, sendEmailVerification } from "firebase/auth";
import app from "../firebase/firebaseInit";

export const auth = getAuth(app);

// TODO: Add features for updating user login time on logins
// TODO: Add feature for creating user in 'users' firestore collection


// TODO: Verify if this is first login, if so, create document in DB account
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


// TODO: Create document in DB account
export const registerWithEmailPassword = async (email: string, password: string, confirmPassword: string): Promise<UserCredential | void> => {
  try {
    if(password === confirmPassword){
      const result = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          sendEmailVerification(user)
            .then(() => {
              console.log("Verification email sent.")
            })
        })
      return result;  
    }
    else{
      console.error("Passwords do not match")
    }
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

export const confirmVerifiedUser = ():  boolean => {
  if(auth.currentUser && auth.currentUser.emailVerified){
    return true;
  }
  else{
    return false;
  }
}