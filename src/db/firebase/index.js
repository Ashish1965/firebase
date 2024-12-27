import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// console.log(process.env.Apikey);
const firebaseConfig = {
    apiKey: process.env.API_KEY ,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: "nextapp-9fe6c",
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };