import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './pages/UserProfile';
import OrderHistory from './pages/OrderHistory';



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
    </>
  );
}

export default App;
