import { db, auth } from "./firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";

// Read user data
export const getUserData = async (uid: string) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
};

// Update user profile
export const updateUserProfile = async (uid: string, updates: { name?: string; address?: string }) => {
  await updateDoc(doc(db, "users", uid), updates);
};

// Delete user account
export const deleteUserAccount = async (uid: string) => {
  await deleteDoc(doc(db, "users", uid));
  if (auth.currentUser) {
    await deleteUser(auth.currentUser);
  }
};
