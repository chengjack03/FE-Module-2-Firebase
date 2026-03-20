// src/pages/Home.tsx
import React, { useState } from 'react';
import { useAllProducts, useCategories, useProductsByCategory } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { data: allProducts, isLoading: loadingAll } = useAllProducts();
  const { data: categories } = useCategories();
  const { data: categoryProducts, isLoading: loadingCat } =
    useProductsByCategory(selectedCategory);

  const products = selectedCategory ? categoryProducts : allProducts;
  const isLoading = selectedCategory ? loadingCat : loadingAll;

  return (
    <div>
      <h1>Product Catalog</h1>

      <select onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory}>
        <option value="">All Categories</option>
        {categories?.map((cat: string) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {isLoading && <p>Loading products...</p>}

      <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1.5rem',
    marginTop: '1.5rem',
  }}
>
  {products?.map((product: Product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>

    </div>
  );
};

export default Home;
