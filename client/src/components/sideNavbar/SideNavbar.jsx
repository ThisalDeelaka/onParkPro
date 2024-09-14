import React from 'react';
import './sideNavbar.css';

const MenuItem = ({ title }) => (
  <button className="menu-button">
    {title}
  </button>
);

const Navigation = () => {
  const menuItems = [
    'Bookings',
    'Add Vehicle',
    'Manage Vehicle',
    'Profile',
    'Payment Methods',
    'Log out',
  ];

  return (
    <nav>
      <div className="nav-container">
        {menuItems.map((item, index) => (
          <MenuItem key={index} title={item} />
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
