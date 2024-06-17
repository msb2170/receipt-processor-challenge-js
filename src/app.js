const express = require("express");
const receiptRoutes = require("./routes/receiptRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/receipts", receiptRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
