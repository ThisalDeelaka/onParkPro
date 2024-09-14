import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import "./updateInventory.css";

export default function UpdateInventory({ match }) {
  let { id } = useParams();
  const [product, setProduct] = useState({
    ProductName: '',
    productCode: '',
    value: '',
    description: '',
    quantity: '',
    minimumAmount: ''
  });

  const [validationMessages, setValidationMessages] = useState({
    ProductName: '',
    productCode: '',
    value: '',
    description: '',
    quantity: '',
    minimumAmount: ''
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`/stock/update_stock/${id}`);
        console.log('Product fetched:', response);
        setProduct(response.data);

      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let message = '';

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

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any errors before submitting
    const hasErrors = Object.values(validationMessages).some((message) => message !== "");
    if (hasErrors) {
      console.log("Form has errors");
      return;
    }

    try {
      await axios.put(`/stock/update_stock/${id}`, product);
      console.log('Product updated successfully');
      alert('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      
      <div className="update-inventory-container">
        <div className="form-container">
          <div className="form-wrapper">
            <div className="form-heading">
              <h2>Update Inventory</h2>
              <Link to="/Inventory" className="all-inventory-link">All Inventory</Link>
            </div>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="ProductName">Product Name</label>
                <input type="text" name="ProductName" id="ProductName" value={product.ProductName} onChange={handleInputChange} required />
                {validationMessages.ProductName && <span className="error">{validationMessages.ProductName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="productCode">Product Code</label>
                <input type="text" name="productCode" id="productCode" value={product.productCode} onChange={handleInputChange} required />
                {validationMessages.productCode && <span className="error">{validationMessages.productCode}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="value">Quantity should have</label>
                <input type="text" name="value" id="value" value={product.value} onChange={handleInputChange} required />
                {validationMessages.value && <span className="error">{validationMessages.value}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" value={product.description} onChange={handleInputChange} required />
                {validationMessages.description && <span className="error">{validationMessages.description}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Current Quantity</label>
                <input type="number" name="quantity" id="quantity" value={product.quantity} onChange={handleInputChange} required />
                {validationMessages.quantity && <span className="error">{validationMessages.quantity}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="minimumAmount">Minimum Amount</label>
                <input type="number" name="minimumAmount" id="minimumAmount" value={product.minimumAmount} onChange={handleInputChange} required />
                {validationMessages.minimumAmount && <span className="error">{validationMessages.minimumAmount}</span>}
              </div>
              <div className="form-buttons">
                <button type="submit">Update Inventory</button>
                <button type="button">Delete</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
