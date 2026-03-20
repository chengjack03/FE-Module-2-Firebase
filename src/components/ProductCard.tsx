// src/components/ProductCard.tsx
import React from 'react';
import type { Product } from '../types';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/cartSlice';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

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
      <h3>{product.title}</h3>
      <p>
        <strong>${product.price}</strong>
      </p>
      <p>{product.category}</p>
      <p>{product.description.substring(0, 80)}...</p>
      <p>
        ⭐ {product.rating.rate} ({product.rating.count} reviews)
      </p>
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
