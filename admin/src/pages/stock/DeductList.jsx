import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./deductList.css";

export default function DeductList() {
  // State and useEffect hooks can be added here if needed
  
  return (
    <div>
      <section className="deduct-list-section">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Description</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>xxx</td>
                <td>xxx</td>
                <td>111</td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
