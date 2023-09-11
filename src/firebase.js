import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAs9CAQcuHn_4LJTqwu7WDfByNncYEjZdY',
  authDomain: 'inkbase-4bd04.firebaseapp.com',
  projectId: 'inkbase-4bd04',
  storageBucket: 'inkbase-4bd04.appspot.com',
  messagingSenderId: '1049810760774',
  appId: '1:1049810760774:web:e3014bfe0c72722dc6c647',
  measurementId: 'G-CKPDNHHJ7Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
