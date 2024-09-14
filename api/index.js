import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import parksRoute from "./routes/parks.js"; 
import slotsRoute from "./routes/slots.js"; 
import stockRoute from "./routes/stocks.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import reservationRoute from "./routes/reservations.js";
import serviceRoute from "./routes/services.js";
import cardDetailsRoute from "./routes/cardDetails.js"
import refundRoute from "./routes/rerfund.js"
import bookingRoute from "./routes/userDetails.js"
import morgan from "morgan";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use(morgan('tiny'));
app.disable('x-powered-by');

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/parks", parksRoute); 
app.use("/api/slots", slotsRoute); 
app.use("/api/stock", stockRoute);
app.use('/api/reservation', reservationRoute);
app.use('/api/serviceBooking',serviceRoute);
app.use('/api/cardPayments',cardDetailsRoute)
app.use('/api/refund',refundRoute)
app.use('/api/booking',bookingRoute)


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
