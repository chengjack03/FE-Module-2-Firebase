// src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Product } from '../types';

const BASE = 'https://fakestoreapi.com';

export const useAllProducts = () =>
  useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => (await axios.get<Product[]>(`${BASE}/products`)).data,
  });

export const useCategories = () =>
  useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: async () => (await axios.get<string[]>(`${BASE}/products/categories`)).data,
  });

export const useProductsByCategory = (category: string) =>
  useQuery<Product[]>({
    queryKey: ['products', category],
    queryFn: async () =>
      (await axios.get<Product[]>(`${BASE}/products/category/${category}`)).data,
    enabled: !!category,
  });
