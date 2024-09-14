import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Paper, Grid, Button, Typography } from '@mui/material';
import TimePicker from 'react-time-picker'; // Import TimePicker component
import bodywash from '../service/bodywash.jpg';
import Navbar from "../../../components/navbar/Navbar";
import { useNavigate,useParams } from 'react-router-dom'; // Import useNavigate instead of useHistory
import "./servicetime.css"
import Footer from '../../../components/footer/Footer';

const Servicetime = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate

  const [servicetype,setservicetype] = useState('')
  const [date, setDate] = useState(new Date());
  console.log("servicess",date)

  const onChange = (newDate) => {
    // console.log("services",newDate)
    setDate(newDate);
  };

  const datefix =() =>{
    navigate(`/serviceForm?id=${id}&date=${date}`);
  }

  function MyComponent() {
    setservicetype(id)
    function ImageCard({ imageSrc, title }) {
      return (
        <div className="card">
          <img src={imageSrc} alt={title} className="card-image" />
          <div className="card-title">{title}</div>
        </div>
      );
    }
  
  
    const cardData = [
      {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/88bd1b88632a3bdedd518a7fd3185d26c13816ed791b52842c9220f4695dec11?apiKey=104eb047a02e4c0c91f9caee82b0eb43&",
        title: "",
      },
      
    ];

    return (
      <div>
        <Navbar />
        
        <Paper sx={{ margin: '20px', borderRadius: '15px', padding: '20px' }}>
          <Grid container justifyContent="center" spacing={2}>
              <Grid item md={4} textAlign="right" marginTop={'20px'}> {/* Move content to the right */}
                  <div style={{ textAlign: 'left' }}> {/* Ensure inner content is aligned to the left */}
                      <Typography variant="h6">Select date and time</Typography>
                      <Calendar onChange={onChange} value={date} />
                  </div>
              </Grid>

              <Grid item md={4}  marginTop={'50px'}>
              <section className="card-container">
          
              {cardData.map((card, index) => (
            <ImageCard key={index} imageSrc={card.imageSrc} title={servicetype} />
          ))}
              </section>
              </Grid>

              <Grid item md={4} textAlign="left" marginTop={'70px'}>
                  <Typography variant="body1">Revive your ride with our premium body and washing service! Let us pamper your vehicle with expert care and attention to detail, leaving it gleaming and pristine. From gentle hand washes to meticulous interior cleaning, we're committed to bringing back that showroom shine. Trust us to treat your car like royalty, because when it comes to keeping your wheels looking their best, we're the ones to call.</Typography>
                  {/* <Typography variant="body1" component="span">
                    <span style={{ fontWeight: 'bold' }}>Service Type:</span>
                    </Typography> */}

                  <Button variant="contained" style={{ backgroundColor: '#0c343d', marginTop: '80px',marginLeft:'180px' }} onClick={datefix}>Confirm</Button>
              </Grid>
          </Grid>
        </Paper>
        <Footer />
        </div>
      
    );
  }

  return <MyComponent />;
}

export default Servicetime;
