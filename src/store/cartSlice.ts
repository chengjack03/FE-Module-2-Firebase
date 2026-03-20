// src/store/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../types';


const loadFromSession = (): CartItem[] => {
  const stored = sessionStorage.getItem('cart');
  return stored ? JSON.parse(stored) : [];
};

const saveToSession = (cart: CartItem[]) => {
  sessionStorage.setItem('cart', JSON.stringify(cart));
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: loadFromSession(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveToSession(state.items);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToSession(state.items);
    },
    clearCart(state) {
      state.items = [];
      sessionStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
