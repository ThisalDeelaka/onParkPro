import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./deductlnventory.css";

export default function DeductInventory() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [itemOptions, setItemOptions] = useState([]);

  useEffect(() => {
    // Fetch item names from your backend API
    const fetchItemNames = async () => {
      try {
        const response = await axios.get('/stock/items');
        setItemOptions(response.data.items); // Assuming response.data.items is an array of item names
      } catch (error) {
        console.error('Error fetching item names:', error);
      }
    };

    fetchItemNames();
  }, []); // Empty dependency array to only run once on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      itemName: itemName,
      description: description,
      quantity: quantity
    };

    try {
      const response = await axios.put(`/stock/deduct`, payload);
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error('Error deducting inventory:', error); // Handle error
    }
  };

  return (
    <div>
      <div className="deduct-inventory-container">
        <div className="form-container">
          <section className="form-section">
            <div className="form-content">
              <h2 className="form-title">Deduct Inventory</h2>
              <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                  <label htmlFor="itemName" className="form-label">Item Name</label>
                  <select 
                    name="itemName" 
                    id="itemName" 
                    value={itemName} 
                    onChange={(e) => setItemName(e.target.value)} 
                    className="form-input" 
                    required
                  >
                    <option value="" disabled>Select an item</option>
                    {itemOptions.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-input" placeholder="" required />
                </div>
                <div className="form-group">
                  <label htmlFor="quantity" className="form-label">Quantity</label>
                  <input type="Number" name="quantity" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="form-input" placeholder="" required />
                </div>
                <div className="form-actions">
                  <button type="submit" className="form-button">Deduct Inventory</button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
