// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCa9uY6JJuQx524HEPkqpvGxu5AnJYCoBI',
	authDomain: 'e-commerce-2661d.firebaseapp.com',
	projectId: 'e-commerce-2661d',
	storageBucket: 'e-commerce-2661d.appspot.com',
	messagingSenderId: '710371586626',
	appId: '1:710371586626:web:aad3bbebb4c476e42fb3db'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firebaseAuth = getAuth(app);
export const storage = getStorage(app);
