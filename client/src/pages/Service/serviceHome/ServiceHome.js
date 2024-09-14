import { useEffect, useState } from 'react';
import Navbar from "../../../components/navbar/Navbar";
import ServiceDetails from '../ServiceDetails/ServiceDetails';
//import './serviceHome.css';
const ServiceHome = () => {
    const [services, setServices] = useState(null);
    const [error, setError] = useState(null);
    const [userID, setUserID] = useState("");

    

    useEffect(() => {
        const storedUserID = localStorage.getItem("user");

    if (storedUserID) {
        const userData = JSON.parse(storedUserID);
        setUserID(userData._id);
    }
        console.log("userID:",userID)
        const fetchServices = async () => {
            try {
                const response = await fetch(`http://localhost:8800/api/serviceBooking/${userID}`);
                console.log("services",response)
                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }
                const jsonn = await response.json();
                setServices(jsonn);
                console.log("servicesssssss",services)
            } catch (error) {
                setError(error.message);
            }
        };

        fetchServices();
    }, [userID, services]);
    
    

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="hom">
            <Navbar />
            <div className="home">
                <div className="services">
                    {services &&
                        services.map((service) => (
                            <ServiceDetails key={service._id} service={service} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceHome;
