export const categories = [
  'Processors',
  'Graphics Cards',
  'RAM',
  'Storage',
  'Motherboards',
  'Power Supplies',
  'Cases',
  'Cooling',
  'Accessories'
];

export const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' }
];

export const initialFilters = {
  category: 'All Categories',
  priceRange: [0, 500000],
  inStock: false,
  rating: 0
};

export const priceMarks = [
  { value: 0, label: 'LKR 0' },
  { value: 25000, label: 'LKR 25,000' },
  { value: 50000, label: 'LKR 50,000' },
  { value: 100000, label: 'LKR 100,000' },
  { value: 200000, label: 'LKR 200,000' },
  { value: 500000, label: 'LKR 500,000+' },
];
