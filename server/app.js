require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Parse = require("./utils/parse_config");

const userTable="Usuarios";

app.use(express.json());
app.use(cors());


app.get('/test',(req,res)=>{
    res.send("Si sirve");

    });

app.get('/test2', async (req,res)=> {

    const Usuarios = Parse.Object.extend(userTable);
    const query = new Parse.Query(Usuarios);
    const response=await query.find();
    //console.log(response);
    res.send(response);

});

app.post("/newUser", async (req,res)=>{
    //req.body.email

    //res.send(req.body.email);
    const user = new Parse.User();
    user.set("username", req.body.email)
    user.set("email", req.body.email)
    user.set("password", req.body.password)
    user.set("emailPublico", req.body.email)
    user.set("nombreCompleto",req.body.nombreCompleto)
    user.set("telefono", req.body.telefono)
    user.set("tipoSangre", req.body.tipoSangre)
    user.set("estado", req.body.estado)
    user.set("ciudad",req.body.ciudad)

    try{
        await user.signUp();
        res.send({ message: "User created!", status: "success", payload: body });

    }catch(err){
        res.send((400, err));
    }  
});

app.post("/login", async (req,res)=>{
    try{
        const user= await Parse.User.logIn(req.body.email,req.body.password);
        res.send({ message: "User logged!", status: "success", payload: user });
    }catch(err){
        res.status(404).send(err)
    }
});

app.post("/newPeticion", async (req,res)=>{
    const Peticion=Parse.Object.extend("Peticiones")
    const newPeticion=new Peticion();

    const userPointer={
        __type: "Pointer",
        className: "_User",
        objectId: req.body.userID,
    };

    const peticion_info={
        userID:userPointer,
        lugarParaRecibir:req.body.lugarParaRecibir
    };


    const peticionPointer=await newPeticion.save(peticion_info, {
        success:(obj)=>{
            return obj;
        },
        error:(err)=>{
            return err;
        }
    });

    res.send(peticionPointer);

});

app.post("/newDonacion", async (req,res)=>{
    const Donacion=Parse.Object.extend("Donaciones")
    const newDonacion=new Donacion();

    const userPointer={
        __type: "Pointer",
        className: "_User",
        objectId: req.body.userID,
    };


    const donacion_info={
        userID:userPointer,
        aproved:req.body.aproved
    };

    const donacionPointer=await newDonacion.save(donacion_info, {
        success:(obj)=>{
            return obj;
        },
        error:(err)=>{
            return err;
        }
    });

    res.send(donacionPointer);
});


module.exports = app;

