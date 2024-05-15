import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const doSignOut = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export const doPasswordUpdate = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export const doSendEmailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};
