import React from "react";
import { Link } from "react-router-dom";
import "./RefundDetails.css";
import Navbar from '../../../components/navbar/Navbar';

const RefundDetails = ({ refund }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8800/api/refund/${refund._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                // Deletion successful
                // You might want to update the UI to reflect the deletion
                // For example, remove the deleted workout from the list
            } else {
                // Handle the case where the server returns an error response
                console.error('Failed to delete refund:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting refund:', error);
            // Handle error, show a notification, etc.
        }
    };

    return (
        <div className="refund-details">
        
            <table className="refund-table">
                <tbody>
                    
                    <tr>
                        <td>Name</td>
                        <td>{refund.name}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>{refund.phone}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{refund.email}</td>
                    </tr>
                    <tr>
                        <td>Reoson</td>
                        <td>{refund.reoson}</td>
                    </tr>
                </tbody>
            </table>
           <br></br> <button onClick={handleDelete} className="del-button">Delete</button>
            <Link to={`/RefundUpdate/${refund._id}`}>
                <button className="update-button">Update</button>
            </Link>
        </div>
    )
}

export default RefundDetails;
