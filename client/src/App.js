import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Park from "./pages/park/Park"; 
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Landing from "./pages/landing/Landing";
import Rhome from "./pages/reservation/Rhome";
import ReservationList from "./pages/reservation/ReservationList";
import Reservation from "./pages/reservation/Reservation";
import UpdateReservation from "./pages/reservation/UpdateReservation";
import ReservationHistory from "./pages/reservation/ReservationHistory";
import ServiceForm from './pages/Service/serviceForm/ServiceForm';
import ServiceDetails from './pages/Service/ServiceDetails/ServiceDetails';
import ServiceHome from "./pages/Service/serviceHome/ServiceHome";
import ServiceUpdate from "./pages/Service/ServiceUpdate/ServiceUpdate";
import ServiceIndex from "./pages/Service/ServiceIndex/ServiceIndex";
import Services from "./pages/Service/service/Services";
import Servicetime from "./pages/Service/serviceTime/Servicetime"
import ServiceHistory from "./pages/Service/ServiceHistory";
import Register from "./pages/profile/Register";

import ProfileUpdate from "./pages/profile/ProfileUpdate";

import Profile from "./pages/profile/Profile";
import PageNotFound from "./components/pageNotFound/PageNotFound";

import PaymentForm from './pages/payment/PaymentForm/PaymentForm';
import RefundHome from './pages/payment/RefundHome/RefundHome';
import RefundForm from './pages/payment/RefundForm.js/RefundForm';
import RefundUpdate from'./pages/payment/RefundUpdate/RefundUpdate';
import BookingDetails from './pages/payment/BookingDetails.js/BookingDetails';
import PaymentReport from './pages/payment/PaymentReport/PaymentReport';
import React, { useState, useEffect } from 'react';

function App() {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    // Fetch reservations data from your API
    fetch('/reservation')
      .then(response => response.json())
      .then(data => setReservations(data))
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/parks" element={<List/>}/> 
        <Route path="/parks/:id" element={<Park/>}/> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/packages" element={<Rhome />} />
        <Route path="/reservationList" element={<ReservationList reservations={reservations} />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/updateReservation/:id" element={<UpdateReservation />} />
        <Route path="/reservationHistory" element={<ReservationHistory reservations={reservations} />} />
        <Route path="/serviceForm" element={<ServiceForm />} />
        <Route path="/serviceDetails" element={<ServiceDetails />} />
        <Route path="/serviceHome" element={<ServiceHome />} />
        <Route path="/serviceIndex" element={<ServiceIndex />} />
        <Route path="/services" element={<Services />} />
        <Route path="/servicetime/:id" element={<Servicetime />} />
        <Route path="/serviceUpdate/:id" element={<ServiceUpdate />} />
        <Route path="/serviceHistory" element={<ServiceHistory />} />
        <Route path="/service" element={<ServiceIndex/>}/>
        <Route path="/register" element={<Register/>} />
      
      
      <Route path="/profileUpdate" element={<ProfileUpdate/>} />
      
      <Route path="/profile" element={<Profile/>} />
      <Route path="*" element={<PageNotFound/>} />

      <Route path="/PaymentForm" element={<PaymentForm />} />
<Route path="/RefundForm" element={<RefundForm />} />
<Route path="/RefundHome" element={<RefundHome />} />
<Route path="/RefundUpdate/:id" element={<RefundUpdate />} />
<Route path="/booking" element={<BookingDetails />} />
<Route path="/PaymentReport" element={<PaymentReport />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
