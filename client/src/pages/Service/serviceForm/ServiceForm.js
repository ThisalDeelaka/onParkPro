import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceForm.css";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { useLocation } from 'react-router-dom';

const ServiceForm = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Get the id parameter from the URL
    const idd = searchParams.get('id');

    // Get the date parameter from the URL and convert it back to a Date object
    const dateString = searchParams.get('date');
    const dateObj = new Date(dateString);

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
    const date = dateObj.getDate();

    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;

    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [servicePackagePrice, setServicePackagePrice] = useState("");
    const [parkName, setParkName] = useState('');
    const [time, setTime] = useState('');
    const [name, setName] = useState('');
    const [engineType, setEngineType] = useState('');
    const [vtype, setVType] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState('');

    useEffect(() => {
        // Retrieve userID from local storage and set it to state
        const storedUserID = localStorage.getItem("user");
        if (storedUserID) {
            const userData = JSON.parse(storedUserID);
            setUserId(userData._id);
        }

        // Retrieve parkName from local storage and set it to state
        const storedParkName = localStorage.getItem("parkName");
        if (storedParkName) {
            setParkName(storedParkName);
        }
    }, []);

    useEffect(() => {
        let price = "";
        switch (idd) {
            case "Full Service":
                price = "200";
                break;
            case "Body Wash":
                price = "400";
                break;
            case "Oil Change":
                price = "500";
                break;
            case "Interior":
                price = "600";
                break;
            default:
                price = "";
        }
        setServicePackagePrice(price);
    }, [idd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!/^[a-zA-Z]+$/.test(name)) {
            setError("Name must contain letters.");
            return;
        }

        if (!/^[a-zA-Z]+$/.test(vtype)) {
            setError("Vehicle type must contain letters.");
            return;
        }

        const service = { userId, vtype, idd, servicePackagePrice, parkName, formattedDate, time, name, engineType };
        const response = await fetch('http://localhost:8800/api/serviceBooking', {
            method: 'POST',
            body: JSON.stringify(service),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields || []);
        } else {
            // Clear form fields and state upon successful submission
            setUserId('');
            setServiceType('');
            setServicePackagePrice('');
            setParkName('');
            setTime('');
            setName('');
            setEngineType('');
            setVType('');
            setError(null);
            setEmptyFields([]);
            console.log('New Service booking added', json);
            navigate('/ServiceHome');
        }
    };

    return (
        <div className="sform">
            <Navbar />
        
            <form action="" className="create" onSubmit={handleSubmit}>
                <h3 className="formheading">{parkName}</h3>

                <div className="serviceType">
                    <div>
                        <label>
                        Package Type : {idd}
                        </label>
                    </div>

                    <div>
                        <br />
                        <label>Name :</label>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="name"
                        />
                    </div>

                    <div>
                        <br />
                        <label>Vehicle type :</label>
                        <input
                            type="text"
                            onChange={(e) => setVType(e.target.value)}
                            value={vtype}
                            className="name"
                        />
                    </div>

                    <div>
    <br />
    <label>Engine Type :</label>
    <div className="engineType">
        <label>
            <input
                type="radio"
                name="engineType"
                value="Petrol"
                checked={engineType === 'Petrol'}
                onChange={() => setEngineType('Petrol')}
            />
            Petrol
        </label>
        <label>
            <input
                type="radio"
                name="engineType"
                value="Diesel"
                checked={engineType === 'Diesel'}
                onChange={() => setEngineType('Diesel')}
            />
            Diesel
        </label>
        <label>
            <input
                type="radio"
                name="engineType"
                value="Hybrid"
                checked={engineType === 'Hybrid'}
                onChange={() => setEngineType('Hybrid')}
            />
            Hybrid
        </label>
        <label>
            <input
                type="radio"
                name="engineType"
                value="Electric"
                checked={engineType === 'Electric'}
                onChange={() => setEngineType('Electric')}
            />
            Electric
        </label>
    </div>
</div>
                    
                </div>

                <button className="servicebtn">Proceed</button>
                {error && <div className="error">{error}</div>}
            </form>
            <Footer/>
        </div>
    );
};

export default ServiceForm;
