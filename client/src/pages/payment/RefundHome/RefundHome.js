import { useEffect, useState } from 'react';
import './RefundHome.css';
import Footer from '../../../components/footer/Footer';
    

import RefundDetails from '../RefundDetails/RefundDetails';
import Navbar from '../../../components/navbar/Navbar';
const RefundHome = () => {
    const [refunds, setRefunds] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRefunds = async () => {
            try {
                const response = await fetch('http://localhost:8800/api/refund');
                if (!response.ok) {
                    throw new Error('Failed to fetch refunds');
                }
                const json = await response.json();
                setRefunds(json); 
            } catch (error) {
                setError(error.message);
            }
        };

        fetchRefunds();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="home">
              <Navbar  />
            <div className="refunds">
                {refunds &&
                    refunds.map((refund) => (
                        <RefundDetails key={refund._id} refund={refund} />
                    ))}
            </div>
            <Footer />
        </div>
    );
};

export default RefundHome;