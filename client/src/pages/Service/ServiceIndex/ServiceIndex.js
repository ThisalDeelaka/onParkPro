import React from 'react';
import './ServiceIndex.css'; // Import your CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';

const ServiceIndex = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleBookNow = () => {
        console.log("Button clicked"); // Check if this message appears in the console
        navigate(`/services`);
    };
    

    return (
        <div className="service">
            <Navbar />
            <main className="main-container">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/181f67b531acd2f49e2cd232b40294c627c96a36874dbb709c27aab9f56ae6d5?apiKey=104eb047a02e4c0c91f9caee82b0eb43&"
                    alt="Background image"
                    className="background-image"
                />
                <div className="content-wrapper">
                    <div className="text-content">
                        <h1 className="title">
                            Service your <br /> vehicle
                        </h1>
                    </div>
                    <div className="button-container">
                        <button className="book-now-button" onClick={handleBookNow}>Book now</button>
                        <button className="skip-button">skip</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ServiceIndex;
