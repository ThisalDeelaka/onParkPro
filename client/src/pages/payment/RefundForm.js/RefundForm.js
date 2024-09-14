import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RefundForm.css';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';

const RefundForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState('');
    const [reason, setReoson] = useState(''); // Corrected variable name
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const refund = { name, phone, email, reason }; // Corrected variable name
        const response = await fetch(`http://localhost:8800/api/refund`, {
            method: 'POST',
            body: JSON.stringify(refund),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields || []);
            setSuccess(false);
        } else {
            setName('');
            setPhone('');
            setEmail('');
            setReoson('');
            setError(null);
            setEmptyFields([]);
            setSuccess(true);
            navigate('/RefundHome'); // Navigate after successful submission
        }
    };

    return (
        <div>
            <Navbar/>
            <form action="" className="refunddd" onSubmit={handleSubmit}>
                <h3>Refund Details</h3>

                <div className="refundDetailsss">
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="name"
                        />
                    </div>

                    <div>
                        <label>Phone:</label>
                        <input
                            type="text"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            className="phone"
                        />
                    </div>

                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="email" // Corrected class name
                        />
                    </div>

                    <div>
                        <label>Reason:</label>
                        <input
                            type="text"
                            onChange={(e) => setReoson(e.target.value)} // Corrected state setter function
                            value={reason} // Corrected state variable
                            className={emptyFields.includes('reason') ? 'error' : ''} // Corrected variable name
                        />
                    </div>
                </div>

                <button type="submit" className="paybtnnn">Submit</button> {/* Changed Link to regular button for form submission */}
                {error && <div className="errorr">{error}</div>}
                {success && <div className="successs">Refund successful!</div>}
            </form>
            
        </div>
    );
};

export default RefundForm;
