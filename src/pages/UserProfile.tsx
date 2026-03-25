import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, updateUserProfile, deleteUserAccount } from "../firebase/userService";
import { useAuth } from "../context/useAuth";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid).then((data) => {
        if (data) {
          setName(data.name || "");
          setAddress(data.address || "");
        }
      });
    }
  }, [currentUser]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    await updateUserProfile(currentUser.uid, { name, address });
    setMessage("Profile updated!");
  };

  const handleDelete = async () => { 
    if (!currentUser) return;
    if (window.confirm("Are you sure you want to delete your account?")) {
      await deleteUserAccount(currentUser.uid);
      navigate("/login");
    }
  };

  if (!currentUser) return <p>Please log in to view your profile.</p>;

  return (
    <div>
      <h2>User Profile</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      <button onClick={handleDelete} style={{ color: "red" }}>
        Delete Account
      </button>
    </div>
  );
};

export default UserProfile;
