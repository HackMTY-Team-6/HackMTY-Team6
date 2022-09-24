require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());


app.get('/test',(req,res)=>{
    res.send("Si sirve");
    
    });

module.exports = app;

