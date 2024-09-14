import express from "express";
import {
  createSlot,
  deleteSlot,
  getSlot,
  getSlots,
  updateSlot,
  updateSlotAvailability,
} from "../controllers/slot.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:parkid", verifyAdmin, createSlot);

//UPDATE
router.put("/availability/:id", updateSlotAvailability);
router.put("/:id", verifyAdmin, updateSlot);
//DELETE
router.delete("/:id/:parkid", verifyAdmin, deleteSlot);
//GET

router.get("/:id", getSlot);
//GET ALL

router.get("/", getSlots);

export default router;
