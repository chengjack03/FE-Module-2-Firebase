import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useAuth } from '../context/useAuth';
import { useAppSelector } from '../store/hooks';

const Navbar: React.FC = () => {
  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#333', color: '#fff', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#fff' }}>Home</Link>
      <Link to="/cart" style={{ color: '#fff' }}>🛒 Cart ({totalItems})</Link>
      <Link to="/orders" style={{ color: '#fff' }}>📋 Orders</Link>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {currentUser ? (
          <>
            <Link to="/profile" style={{ color: '#aaa', fontSize: '0.85rem' }}>{currentUser.email}</Link>
            <button
              onClick={handleLogout}
              style={{ background: 'transparent', border: '1px solid #aaa', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '4px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff' }}>Login</Link>
            <Link to="/register" style={{ color: '#fff' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
