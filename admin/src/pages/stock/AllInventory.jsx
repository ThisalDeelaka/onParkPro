import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './allInventory.css';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

export default function AllInventory() {
    const [inventory, setInventory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredInventory, setFilteredInventory] = useState([]);
    const alertLevel = 100; // Set your alert level here

    useEffect(() => {
        async function fetchInventory() {
            try {
                const response = await axios.get('stock/view_stock');
                setInventory(response.data);
                setFilteredInventory(response.data);
            } catch (error) {
                console.error('Error fetching inventory:', error);
                // Add logic to handle errors
            }
        }

        fetchInventory();
    }, []);

    const deleteItem = async (id) => {
        try {
            await axios.delete(`stock/delete_stock/${id}`);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const updateItem = async (id) => {
        try {
            await axios.put(`/stock/update_stock/${id}`);
            window.location.reload();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filteredItems = inventory.filter((item) =>
            item.ProductName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredInventory(filteredItems);
    };

    const generatePDF = () => {
        const input = document.getElementById('report-content');
        if (!input) {
            console.error('No content to generate PDF from.');
            return;
        }

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save('inventory_report.pdf');
            })
            .catch((error) => {
                console.error('Error generating PDF:', error);
            });
    };

    const getRowColor = (currentQuantity, shouldHaveQuantity) => {
        const percentage = (currentQuantity / shouldHaveQuantity) * 100;
    
        if (percentage <= 30) {
            return 'red';
        } else if (percentage <= 60) {
            return 'orange';
        } else {
            return 'yellow';
        }
    };
    
    

    return (
        <div>
             
            <Navbar/>
            


        <div className="inventory-container">
           
        <div className="legend-wrapper">
    <div className="legend-box">
        <div className="legend-color red"></div>
        <span className="legend-text">Quantity &lt;= 30% of Alert Level</span>
    </div>
    <div className="legend-box">
        <div className="legend-color orange"></div>
        <span className="legend-text">Quantity &lt;= 60% of Alert Level</span>
    </div>
    <div className="legend-box">
        <div className="legend-color yellow"></div>
        <span className="legend-text">Quantity &lt; 100% of Alert Level</span>
    </div>
</div>


            <div className="search-wrapper">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="button-wrapper">
                <Link to="/AddStock" className="action-button">
                    + Add Stock
                </Link>
                <button className="action-button" onClick={generatePDF}>
                    Generate Report
                </button>
            </div>
            <div className="table-wrapper" id="report-content">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>Legend</th>
                            <th>Product Name</th>
                            <th>Quantity Should Have</th>
                            <th>Current Quantity</th>
                            <th>Minimum Amount</th>
                            <th>Description</th>
                            <th>Product Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInventory.map((item, index) => (
                            <tr key={index} style={{ backgroundColor: getRowColor(item.quantity, item.value) }}>
                                <td>
                                    <div className={`legend-color ${getRowColor(item.quantity, item.value)}`}></div>
                                </td>
                                <td>{item.ProductName}</td>
                                <td>{item.value}</td>
                                <td>{item.quantity}</td>
                                <td>{item.minimumAmount}</td>
                                <td>{item.description}</td>
                                <td>{item.productCode}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="action-button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (
                                                window.confirm(
                                                    'Are you sure you want to update this item?'
                                                )
                                            ) {
                                                updateItem(item._id);
                                            }
                                        }}
                                    >
                                        <Link
                                            to={`/Update/${item._id}`}
                                            className="action-button-text"
                                        >
                                            Update
                                        </Link>
                                    </button>
                                    <button
                                        type="button"
                                        className="action-button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (
                                                window.confirm(
                                                    'Are you sure you want to delete this item?'
                                                )
                                            ) {
                                                deleteItem(item._id);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}
