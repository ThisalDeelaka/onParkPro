import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./profile.css";

function Profile() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch({ type: "LOGOUT" }); // Dispatch the LOGOUT action
      localStorage.removeItem('user'); // Clear user data from local storage
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="profilemax">
    <Navbar/>
    <div className="profilePage">
      
      
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profileUpdate">
              <button className="updateButton">Update Profile</button>
            </Link>
          </div>
          <div className="info">
          <div className="infoItem">
  <div className="infoLabel">
    <label>Username:</label>
  </div>
  <div className="infoData">
    <span>{user.username}</span>
  </div>
</div>

<div className="infoItem">
  <div className="infoLabel">
    <label>Email:</label>
  </div>
  <div className="infoData">
    <span>{user.email}</span>
  </div>
</div>

<div className="infoItem">
  <div className="infoLabel">
    <label>Phone Number:</label>
  </div>
  <div className="infoData">
    <span>{user.mobile}</span>
  </div>
</div>

<div className="infoItem">
  <div className="infoLabel">
    <label>Address:</label>
  </div>
  <div className="infoData">
    <span>{user.address}</span>
  </div>
</div>

            <button className="logoutButton" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </div>

  );
}

export default Profile;
