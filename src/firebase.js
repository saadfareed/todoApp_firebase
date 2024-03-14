import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCTHkiniYaPlLkISVQfPzPaCHfukc-644g",
//     authDomain: "expense-tracker-bdf70.firebaseapp.com",
//     projectId: "expense-tracker-bdf70",
//     storageBucket: "expense-tracker-bdf70.appspot.com",
//     messagingSenderId: "508289120826",
//     appId: "1:508289120826:web:98314973a04ece0dd01303"
//   };  
const firebaseConfig = {
  apiKey: "AIzaSyD28Z237cH-rjjWV-PgN7dJlf4wg4z0PmA",
  authDomain: "todoapp-282681.firebaseapp.com",
  projectId: "todoapp-282681",
  storageBucket: "todoapp-282681.appspot.com",
  messagingSenderId: "493412555360",
  appId: "1:493412555360:web:55a0b06a801055f934c105",
  measurementId: "G-5JJ9LP8G69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
