import { db, storage } from '../firebase';
import { collection, getDocs, doc, getDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

// Get all products
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting products: ', error);
    throw error;
  }
};

// Get a single product by ID
export const getProductById = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('No such product!');
    }
  } catch (error) {
    console.error('Error getting product: ', error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, 'products'),
      where('category', '==', category)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting products by category: ', error);
    throw error;
  }
};

// Get image URL from Firebase Storage
export const getImageUrl = async (imagePath) => {
  try {
    const imageRef = ref(storage, imagePath);
    return await getDownloadURL(imageRef);
  } catch (error) {
    console.error('Error getting image URL: ', error);
    throw error;
  }
};

// Get featured products
export const getFeaturedProducts = async (limitCount = 4) => {
  try {
    const q = query(
      collection(db, 'products'),
      orderBy('rating', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting featured products: ', error);
    throw error;
  }
};

// Search products by name
export const searchProducts = async (searchTerm) => {
  try {
    const products = await getAllProducts();
    const lowercasedSearch = searchTerm.toLowerCase();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(lowercasedSearch) ||
      product.description.toLowerCase().includes(lowercasedSearch) ||
      product.category.toLowerCase().includes(lowercasedSearch)
    );
  } catch (error) {
    console.error('Error searching products: ', error);
    throw error;
  }
};
