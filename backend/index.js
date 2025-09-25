const express = require("express");
const mongoose = require("./connection"); 
const cors = require("cors");
require("dotenv").config();

const searchRouter = require("./routes/SearchRouter");
const adminAuthRouter = require("./routes/adminAuthRouter"); 
const EnquiryRouter = require ("./routes/EnquiryRouter");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());

app.use("/api", searchRouter); 

app.get("/", (req, res) => {
  res.send("Welcome to LifeConnect ");
});
app.use("/admin", adminAuthRouter);
app.use("/api/enquiries", EnquiryRouter);

app.listen(PORT, () =>
  console.log(` Server running on http://localhost:${PORT}`)
); 