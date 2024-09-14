import React from "react";
import { Link } from "react-router-dom";
import "./ServiceDetails.css";

const ServiceDetails = ({ service, onDelete }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8800/api/serviceBooking/${service._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                onDelete(service._id);
                alert("Service booking deleted successfully.");
            } else {
                console.error('Failed to delete booking:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <div className="service-details">
            <h1>Service Details</h1>
            {service && (
                <table className="details-table">
                    <tbody>
                        <tr>
                            <td>Service Type</td>
                            <td>{service.serviceType}</td>
                        </tr>

                        <tr>
                            <td>Date</td>
                            <td>{service.date}</td>
                        </tr>
                        <tr>
                            <td>vehicle type</td>
                            <td>{service.vtype}</td>
                        </tr>


                        <tr>
                            <td>Engine Type</td>
                            <td>{service.engineType}</td>
                        </tr>
                    </tbody>
                </table>
            )}
            <br />
            {service && (
                <>
                    <button onClick={handleDelete} className="del-button">Delete</button>
                    <Link to={`/ServiceUpdate/${service._id}`}>
                        <button className="update-button">Update</button>
                    </Link>
                    <Link to="/ServiceHistory">
                        <button className="update-button">History</button>
                    </Link>
                    <Link to="/booking">
                        <button className="proceed-button">Proceed</button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default ServiceDetails;
