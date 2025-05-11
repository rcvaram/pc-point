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
  priceRange: [0, 5000],
  inStock: false,
  rating: 0
};

export const priceMarks = [
  { value: 0, label: '$0' },
  { value: 1000, label: '$1000' },
  { value: 2000, label: '$2000' },
  { value: 3000, label: '$3000' },
  { value: 4000, label: '$4000' },
  { value: 5000, label: '$5000+' },
];
