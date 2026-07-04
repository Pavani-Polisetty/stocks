import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Balance:</strong> ₹{user.balance}</p>
      </div>
    </div>
  );
}

export default Profile;