import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,generateOTP, verifyOTP, createResetSession, resetPassword, verifyUserAuth
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser,localVariables, } from "../utils/verifyToken.js";
import { registerMail } from "../controllers/mailer.js";
const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);


//send email
router.post('/registerMail', registerMail);

//generate random OTP
router.get('/generateOTP', verifyUser, localVariables, generateOTP);
//verify generated OTP
router.get('/verifyOTP', verifyOTP);
//reset all the variables
router.get('/createResetSession', createResetSession);
//reset password
router.put('/resetPassword', resetPassword);
router.put('/authenticate', verifyUserAuth);


export default router;
