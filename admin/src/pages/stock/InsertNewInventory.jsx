import React, { useState } from 'react';
import axios from 'axios';

import "./insertNewInventory.css";

export default function InsertNewInventory() {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    ProductName: "",
    value: 0,
    quantity: "",
    minimumAmount: 5,
    description: "",
    productCode: "",
  });
  const [validationMessages, setValidationMessages] = useState({
    ProductName: "",
    value: "",
    quantity: "",
    minimumAmount: "",
    description: "",
    productCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let message = "";

    // Validation logic
    switch(name) {
      case "ProductName":
        if (/\d/.test(value)) {
          message = "Product Name cannot contain numbers";
        }
        break;
      case "value":
      case "quantity":
      case "minimumAmount":
        if (isNaN(value)) {
          message = "Input must be a number";
        }
        break;
      case "description":
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          message = "Description can only contain letters and spaces";
        }
        break;
      case "productCode":
        if (!/^[a-zA-Z]{2}\d{3}$/.test(value)) {
          message = "Product Code must start with two letters followed by three numbers";
        }
        break;
      default:
        break;
    }

    setValidationMessages({
      ...validationMessages,
      [name]: message,
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Check if there are any errors before submitting
    const hasErrors = Object.values(validationMessages).some((message) => message !== "");
    if (hasErrors) {
      console.log("Form has errors");
      return;
    }

    console.log("11111");
    axios.post("stock/insert_stock", formData)
      .then((result) => {
        setInventory([...inventory, result.data]);
        setFormData({
          ProductName: "",
          value: 0,
          quantity: "",
          minimumAmount: "",
          description: "",
          productCode: "0",
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      
      <div className="insert-inventory-container">
        <div className="form-container">
          <div className="form-wrapper">
            <h2 className="form-title">Add Inventory</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="ProductName" className="form-label">Product Name</label>
                <input name="ProductName" value={formData.ProductName} onChange={handleInputChange} type="text" id="ProductName" className="form-input" placeholder="Product Name" required />
                {validationMessages.ProductName && <span className="error">{validationMessages.ProductName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="productCode" className="form-label"> Product Code</label>
                <input name="productCode" value={formData.productCode} onChange={handleInputChange} type="text" id="productCode" className="form-input" required />
                {validationMessages.productCode && <span className="error">{validationMessages.productCode}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="value" className="form-label"> Value</label>
                <input name="value" value={formData.value} onChange={handleInputChange} type="text" id="value" className="form-input" required />
                {validationMessages.value && <span className="error">{validationMessages.value}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="description" className="form-label">Description</label>
                <input name="description" value={formData.description} onChange={handleInputChange} type="text" id="Description" className="form-input" required />
                {validationMessages.description && <span className="error">{validationMessages.description}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input name="quantity" value={formData.quantity} onChange={handleInputChange} type="number" id="Quantity" className="form-input" required />
                {validationMessages.quantity && <span className="error">{validationMessages.quantity}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="minimumAmount" className="form-label">Minimum Amount</label>
                <input name="minimumAmount" value={formData.minimumAmount} onChange={handleInputChange} type="number" id="minimumAmount" className="form-input" required />
                {validationMessages.minimumAmount && <span className="error">{validationMessages.minimumAmount}</span>}
              </div>
              <button type="submit" className="form-button">Add Stock</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
