import { db } from '../firebase.js';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

const PRODUCTS_COLLECTION = 'products';

// Get all products
export const getAllProducts = async () => {
  try {
    const productsCollection = collection(db, PRODUCTS_COLLECTION);
    const productsSnapshot = await getDocs(productsCollection);
    
    return productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

// Get a single product by ID
export const getProductById = async (id) => {
  try {
    const productDoc = doc(db, PRODUCTS_COLLECTION, id);
    const productSnapshot = await getDoc(productDoc);
    
    if (productSnapshot.exists()) {
      return {
        id: productSnapshot.id,
        ...productSnapshot.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

// Get featured products
export const getFeaturedProducts = async () => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('isFeatured', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting featured products:', error);
    throw error;
  }
};

// Get discounted products
export const getDiscountedProducts = async () => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('discount', '>', 0)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Calculate final price after discount
      const finalPrice = data.price - (data.price * (data.discount / 100));
      return {
        id: doc.id,
        ...data,
        finalPrice: Math.round(finalPrice * 100) / 100 // Round to 2 decimal places
      };
    });
  } catch (error) {
    console.error('Error getting discounted products:', error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('category', '==', category)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting products by category:', error);
    throw error;
  }
};

// Add a new product
export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), product);
    return { id: docRef.id, ...product };
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id, updates) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(productRef, updates);
    return { id, ...updates };
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
    return id;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Get all categories
export const getCategories = async () => {
  try {
    const products = await getAllProducts();
    const categories = ['All Categories', ...new Set(products.map(p => p.category))];
    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};
