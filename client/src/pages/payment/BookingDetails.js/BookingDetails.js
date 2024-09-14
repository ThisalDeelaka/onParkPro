import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import './BookingDetails.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Footer from '../../../components/footer/Footer';

const PaymentDetails = () => {
    const [bookingDetails, setBookingDetails] = useState(null);
    const [userID, setUserId] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch data based on userID
    const fetchData = async (id) => {
        try {
            const response = await fetch(`http://localhost:8800/api/booking/user/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch package price');
            }
            const data = await response.json();
            console.log(data);
            console.log(data.responseData);

            setBookingDetails(data.responseData);
            setError(null);
        } catch (error) {
            console.error(error);
            setError(error.message);
            setBookingDetails(null);
        }
    };

    // Retrieve userID from local storage on component mount
    useEffect(() => {
        const storedUserID = localStorage.getItem("user");
        if (storedUserID) {
            const userData = JSON.parse(storedUserID);
            setUserId(userData._id);
        }
    }, []);

    // Fetch data when userID changes
    useEffect(() => {
        if (userID !== '') {
            fetchData(userID);
        }
    }, [userID]);

    const handlePayment = () => {
        // Perform payment logic here
        // Navigate to another page after payment
        navigate('/PaymentForm'); // Change '/confirmation' to your desired route
    };

    const refund = () => {
        navigate('/RefundForm');
    };

    return (
        <div className='bg'> 
            <Navbar />
            
            {/* Removed input field for userID */}
            
            {error && <p className="error">{error}</p>}
            {bookingDetails && (
                <div className="booking-details">
                    <h2 className='bookingdetailsheading'>Booking Details</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Package Type:</td>
                                <td>{bookingDetails.packageType
}</td>
                            </tr>
                            <tr>
                                <td>Reservation date:</td>
                                <td>{bookingDetails.reservationDate
}</td>
                            </tr>
                            <tr>
                                <td>Arrival Time:</td>
                                <td>{bookingDetails.estimatedArrivalTime
}</td>
                            </tr>
                            <tr>
                                <td>Pickup Time:</td>
                                <td> {bookingDetails.departureTime}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2 className='paymentsummaryheading'>Payment Summary</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Booking fee:</td>
                                <td>Rs {bookingDetails.
bookingFee}</td>
                            </tr>
                            <tr>
                                <td>Service Package Price:</td>
                                <td>Rs{bookingDetails.seviceFee}</td>
                            </tr>
                            <tr>
                                <td>Total Package Price:</td>
                                <td>Rs {bookingDetails.totalPackagePrice}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="paybtn" onClick={handlePayment}>Pay</button>
                </div>
            )}
            <Footer/>
        </div>
    );
};

export default PaymentDetails;
