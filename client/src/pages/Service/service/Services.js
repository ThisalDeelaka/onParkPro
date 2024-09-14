import React from 'react';
import { Paper, Grid, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Navbar from "../../../components/navbar/Navbar";
import bodywash from './bodywash.jpg';
import fullservice from './fullservice.jpg';
import interior from './interior.jpg';
import oilchange from './oilchange.jpg';
import Footer from '../../../components/footer/Footer';

const Services = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const services = (serviceType) =>{
    navigate(`/servicetime/${serviceType}`);
  }

  return (
    <div>
      <Navbar />
      <div className="scoop service-details">
      <Typography variant="h1" align="center" gutterBottom>
        Services
      </Typography>
      <Paper sx={{ bgcolor: '#F0F8FF', margin: '20px auto', maxWidth: 1024, width: '100%', padding: '20px' }} elevation={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ padding: '10px' }} elevation={3}>
              <Box sx={{ textAlign: 'center' }}>
                <img src={bodywash} alt="Body Wash" style={{ width: '100%', maxWidth: '200px', height: 'auto' }} />
                <Typography variant="subtitle1" gutterBottom>
                  Body Wash
                </Typography>
                <Button variant="contained" style={{ backgroundColor: '#0c343d' }} onClick={() =>services('bodywash')}>
                  Book
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ padding: '10px' }} elevation={3}>
              <Box sx={{ textAlign: 'center' }}>
                <img src={fullservice} alt="Full Service" style={{ width: '100%', maxWidth: '200px', height: 'auto' }} />
                <Typography variant="subtitle1" gutterBottom>
                  Full Service
                </Typography>
                <Button variant="contained" style={{ backgroundColor: '#0c343d' }} onClick={() =>services('fullservice')}>
                  Book
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ padding: '10px' }} elevation={3}>
              <Box sx={{ textAlign: 'center' }}>
                <img src={interior} alt="Interior" style={{ width: '100%', maxWidth: '200px', height: 'auto' }} />
                <Typography variant="subtitle1" gutterBottom>
                  Interior
                </Typography>
                <Button variant="contained" style={{ backgroundColor: '#0c343d' }} onClick={() =>services('interior')}>
                  Book
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ padding: '10px' }} elevation={3}>
              <Box sx={{ textAlign: 'center' }}>
                <img src={oilchange} alt="Oil Change" style={{ width: '100%', maxWidth: '200px', height: 'auto' }} />
                <Typography variant="subtitle1" gutterBottom>
                  Oil Change
                </Typography>
                <Button variant="contained" style={{ backgroundColor: '#0c343d' }} onClick={() =>services('oilchange')}>
                  Book
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
