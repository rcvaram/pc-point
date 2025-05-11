const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, doc, setDoc } = require('firebase/firestore');
const products = require('../src/data/products');
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

async function uploadProducts() {
  try {
    const batch = [];
    
    // Add all products to Firestore
    for (const product of products.allProducts) {
      // Convert price to number if it's a string
      const productData = {
        ...product,
        price: Number(product.price),
        rating: Number(product.rating),
        stock: Number(product.stock),
        isFeatured: products.featuredProducts.some(p => p.id === product.id)
      };
      
      // Add to batch
      const docRef = doc(collection(db, 'products'), product.id.toString());
      batch.push(setDoc(docRef, productData, { merge: true }));
    }
    
    // Execute all operations in parallel
    await Promise.all(batch);
    
    console.log('Successfully uploaded products to Firestore');
    process.exit(0);
  } catch (error) {
    console.error('Error uploading products:', error);
    process.exit(1);
  }
}

// Run the upload function
uploadProducts();
