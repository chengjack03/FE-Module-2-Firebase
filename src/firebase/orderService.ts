import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";
import type { CartItem } from "../types";

export const placeOrder = async (userId: string, cartItems: CartItem[]) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
  await addDoc(collection(db, "orders"), {
    userId,
    products: cartItems,
    totalPrice: total,
    createdAt: serverTimestamp()
  });
};

export const getUserOrders = async (userId: string) => {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getOrderById = async (orderId: string) => {
  const snap = await getDoc(doc(db, "orders", orderId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};
