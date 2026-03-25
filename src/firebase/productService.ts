import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import type { Product } from "../types";

const productsRef = collection(db, "products");

export const fetchProducts = async (): Promise<Product[]> => {
  const snap = await getDocs(productsRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
};

export const addProduct = async (product: Omit<Product, "id">) => {
  await addDoc(productsRef, product);
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  await updateDoc(doc(db, "products", id), updates);
};

export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, "products", id));
};
