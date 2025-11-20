import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB2HW-mqyTZAPMd5QWSjZkILPWa-tkPheg",
    authDomain: "aicoco-5f8e6.firebaseapp.com",
    projectId: "aicoco-5f8e6",
    storageBucket: "aicoco-5f8e6.firebasestorage.app",
    messagingSenderId: "563549872890",
    appId: "1:563549872890:web:cc0a085819a4b728ed9f43",
    measurementId: "G-W19YRVM3DV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
