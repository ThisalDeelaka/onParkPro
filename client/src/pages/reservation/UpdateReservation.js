import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./updateReservation.css";
import Navbar from "../../components/navbar/Navbar";
//component for updating reservation
const UpdateReservation = () => {
    const { id } = useParams();//get reservation id from url
    const navigate = useNavigate();//navigate to reservation

    //state for reservation
    const [reservation, setReservation] = useState({
        userID: '',
        parkingSlotId: '',
        reservationDate: '',
        estimatedArrivalTime: '',
        departureTime: '',
        packageType: '',
        valetService: false,
    });

    //state for notification
    const [notification, setNotification] = useState('');

    //state for user name validation error
    const [userNameError, setUserNameError] = useState('');

    //fetch reservation
    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await fetch(`http://localhost:8800/api/reservation/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setReservation(data);
                } else {
                    console.error("Failed to fetch reservation");
                }
            } catch (error) {
                console.error("Error fetching reservation:", error);
            }
        };
        fetchReservation();
    }, [id]);

    //update reservation
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8800/api/reservation/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservation)
            });
            if (response.ok) {
                setNotification('Reservation successfully updated');
                setTimeout(() => {
                    setNotification('');
                    navigate('/packages');
                }, 3000); // Clear notification after 3 seconds and navigate to the home page
            } else {
                console.error("Failed to update reservation");
            }
        } catch (error) {
            console.error("Error updating reservation:", error);
        }
    };

    //handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Validate user name
        if (name === 'userID' && !/^[a-zA-Z]+$/.test(value)) {
            setUserNameError('User name must contain only letters');
        } else {
            setUserNameError('');
        }

        const newValue = type === 'checkbox' ? checked : value;
        setReservation({ ...reservation, [name]: newValue });
    };

    //handle package type change
    const handlePackageChange = (e) => {
        const { value } = e.target;
        setReservation({ ...reservation, packageType: value });
    };

    const { userID, parkingSlotId, reservationDate, estimatedArrivalTime, departureTime, packageType, valetService } = reservation;

    //form inputs
    return (
        <div>
            <Navbar />
        <div className="container">
            
            <h2>Update Reservation</h2>
            {notification && <p className="notification">{notification}</p>}
            <form onSubmit={handleSubmit} className="form-container">
                <label>
                    User Name:
                    <input type="text" name="userID" value={userID} onChange={handleChange} />
                    {userNameError && <span className="error">{userNameError}</span>}
                </label>

                <label>
                    Parking Slot ID:
                    <input type="text" name="parkingSlotId" value={parkingSlotId} onChange={handleChange} readOnly />
                </label>
                <label>
                    Reservation Date:
                    <input type="date" name="reservationDate" min={new Date().toISOString().split('T')[0]} value={reservationDate?.split('.')[0].split('T')[0]} onChange={handleChange} />
                </label>
                <label>
                    Estimated Arrival Time:
                    <input type="time" name="estimatedArrivalTime" value={estimatedArrivalTime} onChange={handleChange} />
                </label>
                <label>
                    Departure Time:
                    <input type="time" name="departureTime" value={departureTime} onChange={handleChange} />
                </label>
                <label>
                    Package Type:
                    <select name="packageType" value={packageType} onChange={handlePackageChange}>
                        <option value="">Select Package</option>
                        <option value="basic">Basic Pass</option>
                        <option value="unlimited">Unlimited Pass</option>
                        <option value="multilocation">Multilocation Pass</option>
                    </select>
                </label>
                <label>
                    Valet Service:
                    <input type="checkbox" name="valetService" checked={valetService} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default UpdateReservation;
