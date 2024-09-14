
import express from "express";
import {
    createStock, getStock,getsingleStock, updateStock, deleteStock, deductStock
  } from "../controllers/stock.js";

const router = express.Router();

router.post("/insert_stock", createStock);
router.get("/view_stock", getStock);
router.get("/update_stock/:id", getsingleStock);
router.put("/update_stock/:id", updateStock);
router.delete("/delete_stock/:id", deleteStock);
router.put("/deductQuantity/:id", deductStock);

export default router;
