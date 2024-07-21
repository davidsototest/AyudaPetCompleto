// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGdjmMapFvTrWYT5cINJEWy84mg2IwP8w",
  authDomain: "grupo12-f7def.firebaseapp.com",
  projectId: "grupo12-f7def",
  storageBucket: "grupo12-f7def.appspot.com",
  messagingSenderId: "808942736123",
  appId: "1:808942736123:web:dcb9cb5c6991604452965e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };