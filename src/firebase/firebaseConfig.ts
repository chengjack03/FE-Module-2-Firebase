import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATVmw_QHq_G7Pm33_6tmNo1hWdhMwN34c",
  authDomain: "fe-2-76214.firebaseapp.com",
  projectId: "fe-2-76214",
  storageBucket: "fe-2-76214.firebasestorage.app",
  messagingSenderId: "925832015396",
  appId: "1:925832015396:web:afb9648483a26da9e972b1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
