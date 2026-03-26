import cartReducer, { addToCart, removeFromCart, clearCart } from '../store/cartSlice';
import type { CartItem } from '../types';

const mockProduct: CartItem = {
  id: 'abc123',
  title: 'Test Product',
  price: 29.99,
  category: 'electronics',
  description: 'A test product description',
  image: 'https://via.placeholder.com/100',
  rating: { rate: 4.5, count: 100 },
  quantity: 1,
};

describe('cartSlice reducer', () => {

  test('should return the initial state', () => {
    const state = cartReducer(undefined, { type: '@@INIT' });
    expect(Array.isArray(state.items)).toBe(true);
  });

  test('addToCart: adds a new product to the cart', () => {
    const initialState = { items: [] };
    const newState = cartReducer(initialState, addToCart(mockProduct));
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].title).toBe('Test Product');
    expect(newState.items[0].quantity).toBe(1);
  });

  test('addToCart: increments quantity if product already in cart', () => {
    const initialState = { items: [{ ...mockProduct, quantity: 1 }] };
    const newState = cartReducer(initialState, addToCart(mockProduct));
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].quantity).toBe(2);
  });

  test('removeFromCart: removes a product from the cart', () => {
    const initialState = { items: [{ ...mockProduct, quantity: 1 }] };
    const newState = cartReducer(initialState, removeFromCart(mockProduct.id));
    expect(newState.items).toHaveLength(0);
  });

  test('clearCart: empties the entire cart', () => {
    const initialState = { items: [{ ...mockProduct, quantity: 2 }] };
    const newState = cartReducer(initialState, clearCart());
    expect(newState.items).toHaveLength(0);
  });

});
