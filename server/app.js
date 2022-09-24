require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Parse = require("./utils/parse_config");


app.use(express.json());
app.use(cors());


app.get('/test',(req,res)=>{
    res.send("Si sirve");

    });

app.get('/test2', async (req,res)=> {

    const Usuarios = Parse.Object.extend("Usuarios");
    const query = new Parse.Query(Usuarios);
    const response=await query.find();
    //console.log(response);
    res.send(response);



});

module.exports = app;

