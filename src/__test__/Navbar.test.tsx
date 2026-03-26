jest.mock('../firebase/firebaseConfig', () => ({
  auth: {},
}));

jest.mock('firebase/auth', () => ({
  signOut: jest.fn(() => Promise.resolve()),
  getAuth: jest.fn(),
}));

jest.mock('../context/useAuth', () => ({
  useAuth: () => ({ currentUser: null }),
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/cartSlice';
import Navbar from '../components/Navbar';

interface CartItem {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: { rate: number; count: number };
  quantity: number;
}

const buildStore = (cartItems: CartItem[] = []) =>
  configureStore({
    reducer: { cart: cartReducer },
    preloadedState: { cart: { items: cartItems } },
  });

const renderNavbar = (cartItems: CartItem[] = []) =>
  render(
    <Provider store={buildStore(cartItems)}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );

describe('Navbar Component', () => {

  test('renders navigation links', () => {
    renderNavbar();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });

  test('displays correct cart item count when cart is empty', () => {
    renderNavbar([]);
    expect(screen.getByText(/0/)).toBeInTheDocument();
  });

  test('displays correct cart item count with items in cart', () => {
    const cartItems: CartItem[] = [
      {
        id: 'abc123',
        title: 'Test Product',
        price: 29.99,
        category: 'electronics',
        description: 'desc',
        image: 'img.png',
        rating: { rate: 4.5, count: 10 },
        quantity: 3,
      },
    ];
    renderNavbar(cartItems);
    expect(screen.getByText(/3/)).toBeInTheDocument();
  });

});
