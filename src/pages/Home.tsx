import React, { useState } from 'react';
import { useAllProducts, useCategories, useProductsByCategory } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { addProduct } from '../firebase/productService';
import { useQueryClient } from '@tanstack/react-query';
import type { Product } from '../types';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');

  const queryClient = useQueryClient();
  const { data: allProducts, isLoading: loadingAll } = useAllProducts();
  const { data: categories } = useCategories();
  const { data: categoryProducts, isLoading: loadingCat } = useProductsByCategory(selectedCategory);

  const products = selectedCategory ? categoryProducts : allProducts;
  const isLoading = selectedCategory ? loadingCat : loadingAll;

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct({
      title: newTitle,
      price: Number(newPrice),
      category: newCategory,
      description: newDescription,
      image: newImage || 'https://via.placeholder.com/100',
      rating: { rate: 0, count: 0 },
    });
    queryClient.invalidateQueries({ queryKey: ['products'] });
    setNewTitle(''); setNewPrice(''); setNewCategory('');
    setNewDescription(''); setNewImage('');
    setShowAddForm(false);
  };

  const inputStyle = {
    padding: '0.4rem', background: '#2a2a2a', color: '#fff',
    border: '1px solid #555', borderRadius: '4px', width: '100%'
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <h1>Product Catalog</h1>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <select onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">All Categories</option>
          {categories?.map((cat: string) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{ background: '#198754', color: '#fff', border: 'none', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
        >
          {showAddForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '400px', marginBottom: '1.5rem', padding: '1rem', background: '#1e1e1e', borderRadius: '8px' }}>
          <h3 style={{ margin: 0 }}>New Product</h3>
          <input placeholder="Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} required style={inputStyle} />
          <input placeholder="Price" type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} required style={inputStyle} />
          <input placeholder="Category" value={newCategory} onChange={e => setNewCategory(e.target.value)} required style={inputStyle} />
          <textarea placeholder="Description" value={newDescription} onChange={e => setNewDescription(e.target.value)} required rows={3} style={inputStyle} />
          <input placeholder="Image URL (optional)" value={newImage} onChange={e => setNewImage(e.target.value)} style={inputStyle} />
          <button type="submit" style={{ background: '#0d6efd', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>
            Save Product
          </button>
        </form>
      )}

      {isLoading && <p>Loading products...</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
        {products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
