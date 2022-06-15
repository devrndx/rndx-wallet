import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updatePassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAIqChCk2TpIaK5kRbM-HjzpQysxOtSG6A",
    authDomain: "roundx-556ef.firebaseapp.com",
    projectId: "roundx-556ef",
    storageBucket: "roundx-556ef.appspot.com",
    messagingSenderId: "432405906492",
    appId: "1:432405906492:web:41ba2df265534cae466f39"
};

initializeApp(firebaseConfig);

export const firebaseGetAuth = () => getAuth();
export const firebaseCreateUser = (auth, email, password) => createUserWithEmailAndPassword(auth, email, password);
export const firebaseLogin = (auth, email, password) => signInWithEmailAndPassword(auth, email, password);
export const firebaseSendEmailVerification = (auth, user) => sendEmailVerification(auth, user);
export const firebaseSendPasswordResetEmail = (auth, email) => sendPasswordResetEmail(auth, email)
export const firebaseUpdatePassword = (user, newPassword) => updatePassword(user, newPassword)