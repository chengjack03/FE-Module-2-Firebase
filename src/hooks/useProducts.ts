// src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../firebase/productService';
import type { Product } from '../types';

export const useAllProducts = () =>
  useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

// Keep categories derived from the Firestore products
export const useCategories = () =>
  useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const products = await fetchProducts();
      const cats = products.map((p) => p.category);
      return [...new Set(cats)];
    },
  });

export const useProductsByCategory = (category: string) =>
  useQuery<Product[]>({
    queryKey: ['products', category],
    queryFn: async () => {
      const products = await fetchProducts();
      return products.filter((p) => p.category === category);
    },
    enabled: !!category,
  });
