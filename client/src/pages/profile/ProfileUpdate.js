import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./profileUpdate.css";

function ProfileUpdate() {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = await axios.put(`http://localhost:8800/api/users/${user._id}`, user);
      dispatch({ type: "UPDATE_USER", payload: updatedUser.data });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="profileUpdatePage">
      <Navbar />
      <div className="profileUpdateContainer">
        <h2>Update your Profile</h2>
        <div className="formGroup">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="mobile">Phone Number:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={user.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={user.address}
            onChange={handleChange}
            required
          />
        </div>
        <button className="updateButton" onClick={handleUpdate}>Update</button>
      </div>
      <Footer />
    </div>
  );
}

export default ProfileUpdate;
