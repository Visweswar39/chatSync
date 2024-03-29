const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('../server/routes/userRoutes');
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());



mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log("Database connection error", err);
  });

app.use('/api/auth',userRoutes);


const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
