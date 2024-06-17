const { v4: uuidv4 } = require("uuid");
const calculatePoints = require("../middleware/calculatePoints");

//empty data structure to store receipts in memory
const receipts = {};

const processReceipt = (req, res) => {
  const receipt = req.body;
  const id = uuidv4();
  const points = calculatePoints(receipt);

  receipts[id] = { receipt, points };

  res.json({ id: id });
};

const getPoints = (req, res) => {
  const { id } = req.params;
  const receiptData = receipts[id];

  //points are calculated in the process step, we just need to retrieve them here
  if (receiptData) {
    res.json({ points: receiptData.points });
  } else {
    res.status(404).json({ error: "Receipt not found" });
  }
};

module.exports = { processReceipt, getPoints };
