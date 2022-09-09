// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHq6tFBkC8yswsRxWMTGwaCM35cdINhGo",
  authDomain: "shop-42fb6.firebaseapp.com",
  projectId: "shop-42fb6",
  storageBucket: "shop-42fb6.appspot.com",
  messagingSenderId: "353441790933",
  appId: "1:353441790933:web:95525d4c0c9fc306121b5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app