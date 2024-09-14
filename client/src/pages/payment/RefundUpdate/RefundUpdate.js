import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './RefundUpdate.css';

import Navbar from '../../../components/navbar/Navbar';
import Footer from "../../../components/footer/Footer";


const UpdateRefund = () => {
    const { id } = useParams(); // Get the restaurant id from URL params
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        phone:'',
        email:'',
        reoson: '',
    });

    console.log("hiii")
    useEffect(() => {
        // Fetch service details based on id
        const fetchRefund = async () => {
            try {
                const response = await fetch(`http://localhost:8800/api/refund/${id}`); // Corrected URL
                if (response.ok) {
                    const data = await response.json();
                    setValues(data);
                } else {
                    console.error("Failed to fetch refund");
                }
            } catch (error) {
                console.error("Error fetching refund:", error);
            }
        };
        fetchRefund();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8800/api/refund/${id}`, { // Corrected URL
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                navigate ('/RefundHome');
            } else {
                console.error("Failed to update refund");
            }
        } catch (error) {
            console.error("Error updating refund:", error);
        }
    };

    

    const { name,phone, email, reoson } = values;
    console.log("values",values)
    return (
        <div>
        <Navbar/>
            
            <form className="update" onSubmit={handleSubmit}>
                <h3>Appointment Reservation</h3>

                <div className="name">
                  
                    <div>
                       <br></br> <label>Name:</label>
                        <input
                            type="text"
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                            value={name}
                            className="name"
                        />
                    </div>

                    <div>
                        <br /><label>Phone :</label>
                        <br /><input
                            type="phone"
                            onChange={(e) => setValues({ ...values, phone: e.target.value })}
                            value={phone}
                            className={"phone"}
                        />
                    </div>

                    <div>
                        <br /><label>Email :</label>
                        <br /><input
                            type="email"
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            value={email}
                            className={"email"}
                        />
                    </div>

                    <div>
                        <br /><label>Reoson :</label>
                        <br /><input
                            type="reoson"
                            onChange={(e) => setValues({ ...values, reoson: e.target.value })}
                            value={reoson}
                            className={"reoson"}
                        />
                    </div>

                   
                
                </div>
                
            <button type="submit" className="uptbtn">Update</button>
          
                {/* Assuming error is defined somewhere */}
                {/* {error && <div className="error">{error}</div>} */}
            </form>
        </div>
        
    );
};

export default  UpdateRefund;
