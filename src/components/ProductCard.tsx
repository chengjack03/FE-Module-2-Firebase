import React, { useState } from 'react';
import type { Product } from '../types';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import { updateProduct, deleteProduct } from '../firebase/productService';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);

  const handleUpdate = async () => {
    await updateProduct(product.id, { title, price, description });
    queryClient.invalidateQueries({ queryKey: ['products'] });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete "${product.title}"?`)) {
      await deleteProduct(product.id);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem' }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: '100px', height: '100px', objectFit: 'contain' }}
        onError={e => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
        }}
      />

      {isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ padding: '0.3rem', background: '#2a2a2a', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
          />
          <input
            type="number"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            style={{ padding: '0.3rem', background: '#2a2a2a', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            style={{ padding: '0.3rem', background: '#2a2a2a', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handleUpdate} style={{ background: '#198754', color: '#fff', border: 'none', padding: '0.3rem 0.75rem', borderRadius: '4px', cursor: 'pointer' }}>
              Save
            </button>
            <button onClick={() => setIsEditing(false)} style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '0.3rem 0.75rem', borderRadius: '4px', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3>{product.title}</h3>
          <p><strong>${product.price}</strong></p>
          <p>{product.category}</p>
          <p>{product.description.substring(0, 80)}...</p>
          <p>⭐ {product.rating.rate} ({product.rating.count} reviews)</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
            <button onClick={() => setIsEditing(true)} style={{ background: '#0d6efd', color: '#fff', border: 'none', padding: '0.3rem 0.75rem', borderRadius: '4px', cursor: 'pointer' }}>
              Edit
            </button>
            <button onClick={handleDelete} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '0.3rem 0.75rem', borderRadius: '4px', cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
