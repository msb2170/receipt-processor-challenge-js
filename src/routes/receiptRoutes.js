const express = require("express");

const {
  processReceipt,
  getPoints,
} = require("../controllers/receiptController");

const router = express.Router();

router.post("/process", processReceipt);
router.get("/:id/points", getPoints);

module.exports = router;
