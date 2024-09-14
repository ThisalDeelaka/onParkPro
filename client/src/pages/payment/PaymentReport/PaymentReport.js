import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Navbar from '../../../components/navbar/Navbar';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './paymentReport.css';
import Footer from '../../../components/footer/Footer';

const PaymentDetails = () => {
    const [bookingDetails, setBookingDetails] = useState(null);
    const [userID, setUserId] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Function to generate PDF and navigate to '/refundform'
    const generatePDF = () => {
        const input = document.getElementById('pdf-container');

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save('payment_summary.pdf');
            })
            .then(() => {
                navigate('/refundform'); // Navigate to '/refundform' using navigate function
            });
    };

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

    return (
        <div className='bg'> 
            <Navbar />
            <h1 className='reportHeader'>Payment Report</h1>

            {/* Removed input field for userID */}
            
            {error && <p className="error">{error}</p>}
            {bookingDetails && (
                <div id="pdf-container">
                    <table>
                        <tbody>
                            <tr>
                                <td>Package Type:</td>
                                <td>{bookingDetails.packageType}</td>
                            </tr>
                            <tr>
                                <td>Reservation date:</td>
                                <td>{bookingDetails.reservationDate}</td>
                            </tr>
                            <tr>
                                <td>Arrival Time:</td>
                                <td>{bookingDetails.estimatedArrivalTime}</td>
                            </tr>
                            <tr>
                                <td>Booking fee:</td>
                                <td>Rs {bookingDetails.bookingFee}</td>
                            </tr>
                            <tr>
                                <td>Service Package Price:</td>
                                <td>Rs {bookingDetails.serviceFee}</td>
                            </tr>
                            <tr>
                                <td>Total Package Price:</td>
                                <td>Rs {bookingDetails.totalPackagePrice}</td>
                            </tr>
                        </tbody>
                    </table>
                    {/* Add more fields as needed */}
                </div>
            )}
            <button className="paybtnn" onClick={generatePDF}>Generate PDF</button>
            <Footer/>
        </div>
    );
};

export default PaymentDetails;
