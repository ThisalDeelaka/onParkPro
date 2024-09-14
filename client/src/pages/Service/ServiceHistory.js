import React, { useState, useEffect } from "react";
import "./serviceHistory.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Navbar from "../../components/navbar/Navbar";

const ServiceHistory = () => {
    const [serviceHistory, setServiceHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchServiceHistory = async () => {
            try {
                const response = await fetch(`http://localhost:8800/api/serviceBooking`);
                if (response.ok) {
                    const data = await response.json();
                    setServiceHistory(data);
                } else {
                    console.error('Failed to fetch service history:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching service history:', error);
            }
        };

        fetchServiceHistory();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredServiceHistory = serviceHistory.filter(service => {
        return service.serviceType && service.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    });
    

    const generatePDF = () => {
        const input = document.getElementById("history-table");

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                const imgWidth = 210;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
                pdf.save("service_history_report.pdf");
            });
    };

    return (
        <div>
            <Navbar /> {/* Include the Header component */}
            <div className="container"> 
            <div className="service-history-container">
                <h1 className="title">Service History</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by Service Type..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="search-input"
                    />
                    <button onClick={generatePDF} className="report-button">Generate Report</button>
                </div>
                <table id="history-table" className="history-table">
                    <thead>
                        <tr>
                            <th>Service Type</th>
                            <th>Service ID</th>
                            <th>Service Package Price</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Engine Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServiceHistory.map(service => (
                            <tr key={service._id}>
                                <td>{service.serviceType}</td>
                                <td>{service.serviceId}</td>
                                <td>{service.servicePackagePrice}</td>
                                <td>{service.date}</td>
                                <td>{service.time}</td>
                                <td>{service.engineType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};

export default ServiceHistory;
