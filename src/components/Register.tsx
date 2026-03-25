import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCred.user.uid), {
        uid: userCred.user.uid,
        name,
        email: userCred.user.email,
        address: '',
        createdAt: new Date(),
      });
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', background: '#1e1e1e', borderRadius: '8px' }}>
      <h2 style={{ color: '#fff', marginBottom: '1.5rem' }}>Create Account</h2>
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #555', background: '#2a2a2a', color: '#fff' }}
        />
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
          Create Account
        </button>
      </form>
      <p style={{ color: '#aaa', marginTop: '1rem', textAlign: 'center' }}>
        Already have an account? <Link to="/login" style={{ color: '#0d6efd' }}>Login</Link>
      </p>
    </div>
  );
};

export default Register;
