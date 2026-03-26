import cartReducer, { addToCart, removeFromCart } from '../store/cartSlice';
import { configureStore } from '@reduxjs/toolkit';
import type { Product } from '../types';

const mockProduct: Product = {
  id: 'prod-1',
  title: 'Wireless Headphones',
  price: 49.99,
  category: 'electronics',
  description: 'Great sound quality',
  image: 'https://via.placeholder.com/100',
  rating: { rate: 4.7, count: 200 },
};

const buildStore = () =>
  configureStore({
    reducer: { cart: cartReducer },
  });

describe('Cart Integration Test', () => {

  test('cart starts empty', () => {
    const store = buildStore();
    const { items } = store.getState().cart;
    expect(items).toHaveLength(0);
  });

  test('cart updates when a product is added', () => {
    const store = buildStore();
    store.dispatch(addToCart(mockProduct));
    const { items } = store.getState().cart;
    expect(items).toHaveLength(1);
    expect(items[0].title).toBe('Wireless Headphones');
    expect(items[0].quantity).toBe(1);
  });

  test('cart quantity increments when same product is added again', () => {
    const store = buildStore();
    store.dispatch(addToCart(mockProduct));
    store.dispatch(addToCart(mockProduct));
    const { items } = store.getState().cart;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  test('cart reflects correct total after multiple products added', () => {
    const store = buildStore();
    const secondProduct: Product = { ...mockProduct, id: 'prod-2', title: 'USB Hub' };
    store.dispatch(addToCart(mockProduct));
    store.dispatch(addToCart(secondProduct));
    const { items } = store.getState().cart;
    expect(items).toHaveLength(2);
  });

  test('cart updates correctly when a product is removed', () => {
    const store = buildStore();
    store.dispatch(addToCart(mockProduct));
    store.dispatch(removeFromCart(mockProduct.id));
    const { items } = store.getState().cart;
    expect(items).toHaveLength(0);
  });

});
