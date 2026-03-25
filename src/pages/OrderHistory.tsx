import { useEffect, useState } from "react";
import { getUserOrders, getOrderById } from "../firebase/orderService";
import { useAuth } from "../context/useAuth";

interface OrderProduct {
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  totalPrice: number;
  createdAt: { toDate: () => Date } | null;
  products: OrderProduct[];
}

const OrderHistory = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);

  useEffect(() => {
    if (currentUser) {
      getUserOrders(currentUser.uid).then((data) => setOrders(data as Order[]));
    }
  }, [currentUser]);

  const handleSelectOrder = async (orderId: string) => {
    const order = await getOrderById(orderId);
    if (order) setSelected(order as Order);
  };

  if (!currentUser) return <p>Please log in to view your orders.</p>;

  return (
    <div>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            onClick={() => handleSelectOrder(order.id)}
            style={{ cursor: "pointer", border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}
          >
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Total:</strong> ${order.totalPrice?.toFixed(2)}</p>
            <p><strong>Date:</strong> {order.createdAt?.toDate().toLocaleDateString()}</p>
          </div>
        ))
      )}
      {selected && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Order Details</h3>
          {selected.products.map((p, i) => (
            <p key={i}>{p.title} — ${p.price} x {p.quantity}</p>
          ))}
          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
