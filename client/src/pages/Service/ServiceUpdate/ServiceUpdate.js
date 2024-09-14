import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import "./ServiceUpdate.css"; 
import Navbar from "../../../components/navbar/Navbar";


const Updateservice = () => {
    const { id } = useParams(); // Get the restaurant id from URL params
    const navigate = useNavigate();

    const [values, setValues] = useState({
        userId:'',
        serviceType: '',
        servicePackagePrice:'',
        serviceId:'',
        date: '',
        time: '',
        name: '',
        Email_address: '', // Assuming this is supposed to be 'emailAddress'
        engineType: '',
    });

    useEffect(() => {
        // Fetch service details based on id
        const fetchService = async () => {
            try {
                const response = await fetch(`http://localhost:8800/api/serviceBooking/${id}`); // Corrected URL
                if (response.ok) {
                    const data = await response.json();
                    setValues(data);
                } else {
                    console.error("Failed to fetch service booking");
                }
            } catch (error) {
                console.error("Error fetching service booking:", error);
            }
        };
        fetchService();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8800/api/serviceBooking/${id}`, { // Corrected URL
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                navigate ('/ServiceHome');
            } else {
                console.error("Failed to update service booking");
            }
        } catch (error) {
            console.error("Error updating service booking:", error);
        }
    };

    const handleOptionChange = (e) => {
        const serviceTypeValue = e.target.value;
        setValues({ ...values, serviceType: serviceTypeValue });
    };

    const { userId,serviceType,serviceId, name, date, time, engineType } = values;

    return (
        <div className="upd">
            <Navbar />
            <form className="create" onSubmit={handleSubmit}>
                <h3 className="updateHeading">Appointment Reservation</h3>

                <div className="serviceType">
                  <br></br>  <label>
                        Package Type :
                        <select value={serviceType} onChange={handleOptionChange}>
                            <option value="">Select</option>
                            <option value="fullservice">FullService</option>
                            <option value="bodywash">BodyWash</option>
                            <option value="oilchange">OilChange</option>
                        </select>
                    </label>
                    {/* Assuming packagePrice is supposed to come from values */}
                  <br></br> <br></br> <label>
                        Package Price :
                        <input type="text" value={values.servicePackagePrice} onChange={() => {}} disabled />
                    </label>
               
                    <div>
                      <br></br>  <label>User Id :</label>
                        <input
                            type="text"
                            onChange={(e) => setValues({ ...values, userId: e.target.value })}
                            value={userId}
                            className="userId"
                        />
                    </div>
            
                    <div>
                      <br></br>  <label>Service Id :</label>
                        <input
                            type="text"
                            onChange={(e) => setValues({ ...values, serviceId: e.target.value })}
                            value={serviceId}
                            className="serviceId"
                        />
                    </div>
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
                        <br /><label>Date :</label>
                        <br /><input
                            type="date"
                            onChange={(e) => setValues({ ...values, date: e.target.value })}
                            value={date}
                            className={values.emptyFields && values.emptyFields.includes('date') ? 'error' : ''}
                        />
                    </div>

                    <div>
                        <br /><label>Time :</label>
                        <br /><input
                            type="time"
                            onChange={(e) => setValues({ ...values, time: e.target.value })}
                            value={time}
                            className={values.emptyFields && values.emptyFields.includes('time') ? 'error' : ''}
                        />
                    </div>

                    <div>
                        <br /><label>Engine Type :</label>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="engineType"
                                    value="Petrol"
                                    checked={engineType === 'Petrol'}
                                    onChange={() => setValues({ ...values, engineType: 'Petrol' })}
                                />
                            
                            </label>
                        </div>
                        
                        
                        {/* Similar radio inputs for other engine types */}
                    </div>
                
                </div>
                <button type="submit" className="servicebtn">Update Service</button>
                {/* Assuming error is defined somewhere */}
                {/* {error && <div className="error">{error}</div>} */}
            </form>
        </div>
        
    );
};

export default Updateservice;
