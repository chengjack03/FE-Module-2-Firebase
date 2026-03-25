// src/pages/ShoppingCart.tsx
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { placeOrder } from '../firebase/orderService';
import { useAuth } from '../context/useAuth';

const ShoppingCart: React.FC = () => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { currentUser } = useAuth();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!currentUser) {
      alert('Please log in to place an order.');
      return;
    }
    try {
      await placeOrder(currentUser.uid, items);
      dispatch(clearCart());
      alert('✅ Order placed successfully!');
    } catch (err) {
      console.error(err);
      alert('Something went wrong placing your order.');
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src={item.image} alt={item.title} style={{ width: '60px' }} />
              <div>
                <p>{item.title}</p>
                <p>Qty: {item.quantity} | Price: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </div>
          ))}
          <hr />
          <p><strong>Total Items:</strong> {totalItems}</p>
          <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
