import express from "express";
import {
  countByCity,
  countByType,
  createPark,
  deletePark,
  getPark,
  getParkSlots,
  getParks,
  updatePark,
} from "../controllers/park.js";
import Park from "../models/Park.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createPark);

//UPDATE
router.put("/:id", verifyAdmin, updatePark);
//DELETE
router.delete("/:id", verifyAdmin, deletePark);
//GET

router.get("/find/:id", getPark);
//GET ALL

router.get("/", getParks);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/slot/:id", getParkSlots);

export default router;
