import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updatePassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBbWx630F8Lb-Vsov_jnqHj1pn5pTYL0m8",
    authDomain: "rndx-client-wallet.firebaseapp.com",
    projectId: "rndx-client-wallet",
    storageBucket: "rndx-client-wallet.appspot.com",
    messagingSenderId: "288293074890",
    appId: "1:288293074890:web:bcb29c73e998d5d97f0133",
};

initializeApp(firebaseConfig);

export const firebaseGetAuth = () => getAuth();
export const firebaseCreateUser = (auth, email, password) => createUserWithEmailAndPassword(auth, email, password);
export const firebaseLogin = (auth, email, password) => signInWithEmailAndPassword(auth, email, password);
export const firebaseSendEmailVerification = (auth, user) => sendEmailVerification(auth, user);
export const firebaseSendPasswordResetEmail = (auth, email) => sendPasswordResetEmail(auth, email)
export const firebaseUpdatePassword = (user, newPassword) => updatePassword(user, newPassword)