require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Routes

// app.use("/user", require("./routes/user.routes"));

module.exports = app;