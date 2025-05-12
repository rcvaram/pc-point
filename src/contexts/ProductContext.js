import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAllProducts, 
  getFeaturedProducts, 
  getDiscountedProducts,
  getProductsByCategory,
  getCategories as fetchCategories
} from '../services/productService.js';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [categories, setCategories] = useState(['All Categories']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const [allProducts, featured, discounted, cats] = await Promise.all([
        getAllProducts(),
        getFeaturedProducts(),
        getDiscountedProducts(),
        fetchCategories()
      ]);
      
      setProducts(allProducts);
      setFeaturedProducts(featured);
      setDiscountedProducts(discounted);
      setCategories(cats);
      setError(null);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const loadProductsByCategory = async (category) => {
    if (category === 'All Categories') {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
      return;
    }
    
    try {
      setLoading(true);
      const filteredProducts = await getProductsByCategory(category);
      setProducts(filteredProducts);
      setError(null);
    } catch (err) {
      console.error(`Failed to load products for category ${category}:`, err);
      setError(`Failed to load products for ${category}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const value = {
    products,
    featuredProducts,
    discountedProducts,
    categories,
    loading,
    error,
    setError,
    loadProducts,
    loadProductsByCategory,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
