import React, { useState } from "react";
import './pform.css';
import Navbar from '../../../components/navbar/Navbar';
import Footer from "../../../components/footer/Footer";


import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
    const [name, setName] = useState('');
    const [cardNo, setCardNo] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvcNo, setCvcNo] = useState('');
    const [nameError, setNameError] = useState(null);
    const [cvcError, setCvcError] = useState(null);
    const [cardNoError, setCardNoError] = useState(null); // New state for card number error
    const [emptyFields, setEmptyFields] = useState([]);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        const service = { name, cardNo, expDate, cvcNo };
        const response = await fetch(`http://localhost:8800/api/cardPayments`, {
            method: 'POST',
            body: JSON.stringify(service),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setNameError(json.nameError);
            setCvcError(json.cvcError);
            setEmptyFields(json.emptyFields || []);
            setSuccess(false);
        } else {
            setName('');
            setCardNo('');
            setExpDate('');
            setCvcNo('');
            setNameError(null);
            setCvcError(null);
            setEmptyFields([]);
            setSuccess(true);
            console.log('Payment Success', json);
            navigate('/PaymentReport'); // Use navigate to navigate to '/PaymentReport' route
        }
    };

    const handleNameChange = (e) => {
        const enteredName = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(enteredName) || enteredName === '') {
            setName(enteredName);
            setNameError(null);
        } else {
            setNameError("Name must contain only letters");
        }
    };

    const handleCvcNoChange = (e) => {
        const enteredCvcNo = e.target.value;
        if (/^\d{0,3}$/.test(enteredCvcNo) || enteredCvcNo === '') {
            setCvcNo(enteredCvcNo);
            setCvcError(null);
        } else {
            setCvcError("CVC must contain only up to 3 digits");
        }
    };

    const handleCardNoChange = (e) => {
        const enteredCardNo = e.target.value;
        if (/^\d{0,16}$/.test(enteredCardNo) || enteredCardNo === '') { // Allow up to 16 digits
            setCardNo(enteredCardNo);
            setCardNoError(null); // Clear card number error if valid
        } else {
            setCardNoError("Card number must contain up to 16 digits"); // Display error if not valid
        }
    };

    return (
        <div className="gateway">
            <Navbar />
            <form className="pay" onSubmit={handleSubmit}>
                <h2>Card Details</h2>
                <div className="cardDetails">
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            onChange={handleNameChange}
                            value={name}
                            className="name"
                        />
                        {nameError && <div className="error">{nameError}</div>}
                    </div>

                    <div>
                        <label>Card No:</label>
                        <input
                            type="text"
                            onChange={handleCardNoChange}
                            value={cardNo}
                            className={cardNoError ? 'error' : 'cardNo'} // Apply error class if there's an error
                        />
                        {cardNoError && <div className="error">{cardNoError}</div>} {/* Display error message */}
                    </div>

                    <div>
                        <label>Exp Date:</label>
                        <input
                            type="date" // Keep type as 'date' for expiration date
                            onChange={(e) => setExpDate(e.target.value)}
                            value={expDate}
                            className={emptyFields.includes('expDate') ? 'error' : ''}
                        />
                    </div>

                    <div>
                        <label>CVC No:</label>
                        <input
                            type="text"
                            onChange={handleCvcNoChange}
                            value={cvcNo}
                            className="cvcNo"
                        />
                        {cvcError && <div className="error">{cvcError}</div>}
                    </div>
                </div>
                <button type="submit" className="paybtn">Pay</button>
                {success && <div className="success">Payment successful!</div>}
            </form>
        </div>
    );
};

export default PaymentForm;
