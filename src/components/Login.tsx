import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useAuth } from '../context/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) setError('Invalid email or password.');
    }
  };

  if (currentUser) {
    navigate('/');
    return null;
  }

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', background: '#1e1e1e', borderRadius: '8px' }}>
      <h2 style={{ color: '#fff', marginBottom: '1.5rem' }}>Login</h2>
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #555', background: '#2a2a2a', color: '#fff' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #555', background: '#2a2a2a', color: '#fff' }}
        />
        <button
          type="submit"
          style={{ padding: '0.65rem', background: '#0d6efd', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Login
        </button>
      </form>
      <p style={{ color: '#aaa', marginTop: '1rem', textAlign: 'center' }}>
        Don't have an account? <Link to="/register" style={{ color: '#0d6efd' }}>Register</Link>
      </p>
    </div>
  );
};

export default Login;
