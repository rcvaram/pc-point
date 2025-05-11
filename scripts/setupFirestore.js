const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where, writeBatch } = require('firebase/firestore');
require('dotenv').config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function setupFirestore() {
  try {
    console.log('Setting up Firestore...');
    
    // Check if products collection exists
    const productsRef = collection(db, 'products');
    const productsSnapshot = await getDocs(productsRef);
    
    if (productsSnapshot.empty) {
      console.log('No products found. Please run uploadProducts.js first.');
      return;
    }
    
    console.log('Firestore setup complete!');
    console.log('\nNext steps:');
    console.log('1. Go to the Firebase Console');
    console.log('2. Navigate to Firestore Database');
    console.log('3. Go to the "Indexes" tab');
    console.log('4. Create the following composite indexes:');
    console.log('   - Collection ID: products');
    console.log('   - Fields to index: category (Ascending), price (Ascending)');
    console.log('   - Fields to index: isFeatured (Ascending), rating (Descending)');
    
    process.exit(0);
  } catch (error) {
    console.error('Error setting up Firestore:', error);
    process.exit(1);
  }
}

// Run the setup function
setupFirestore();
