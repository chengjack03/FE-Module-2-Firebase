// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const Navbar: React.FC = () => {
  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#333', color: '#fff' }}>
      <Link to="/" style={{ color: '#fff' }}>Home</Link>
      <Link to="/cart" style={{ color: '#fff' }}>🛒 Cart ({totalItems})</Link>
    </nav>
  );
};

export default Navbar;
