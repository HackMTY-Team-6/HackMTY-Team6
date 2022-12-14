require("dotenv").config();
const express = require("express");
const fns = require('date-fns')
const app = express();
const cors = require("cors");
const Parse = require("./utils/parse_config");

const userTable = "Usuarios";

app.use(express.json());
app.use(cors());

app.post("/newUser", async (req, res) => {
    //req.body.email

    //res.send(req.body.email);
    const user = new Parse.User();
    user.set("username", req.body.email)
    user.set("email", req.body.email)
    user.set("password", req.body.password)
    user.set("emailPublico", req.body.email)
    user.set("nombreCompleto", req.body.nombreCompleto)
    user.set("telefono", req.body.telefono)
    user.set("tipoSangre", req.body.tipoSangre)
    user.set("estado", req.body.estado)
    user.set("ciudad", req.body.ciudad)



    try {
        const trial = await user.signUp();

        const PeticionActiva = Parse.Object.extend("PeticionesActivas")
        const newPeticion = new PeticionActiva();

        // const userPointer={
        //     __type: "Pointer",
        //     className: "_User",
        //     objectId: trial.id,
        // };


        const peticion_info = {
            userID: trial.id,
        };

        const peticionPointer = await newPeticion.save(peticion_info, {
            success: (obj) => {
                return obj;
            },
            error: (err) => {
                return err;
            }
        });



        res.send({ message: "User created!", status: "success", payload: req.body });

    } catch (err) {
        res.send((400, err));
    }



});

app.post("/login", async (req, res) => {
    try {
        const user = await Parse.User.logIn(req.body.email, req.body.password);
        res.send({ message: "User logged!", status: "success", payload: user });
    } catch (err) {
        res.status(404).send(err)
    }
});

app.use("/*", async (req, res, next) => {
    const myToken = req.headers.authorization;
    if (!myToken) {
        req.user = null;
        next();
    } else {
        const query = new Parse.Query(Parse.Session);
        query.include(["user"]);
        const results = await query.first({ sessionToken: myToken });
        req.user = results.get("user");
        next();
    }

});


app.post("/newPetition", async (req, res) => {
    const Peticion = Parse.Object.extend("Peticiones")
    const newPeticion = new Peticion();

    const userPointer = {
        __type: "Pointer",
        className: "_User",
        objectId: req.body.userID,
    };

    const peticion_info = {
        userID: userPointer,
        lugarParaRecibir: req.body.lugarParaRecibir,
        fecha: req.body.fecha
    };


    const peticionPointer = await newPeticion.save(peticion_info, {
        success: (obj) => {
            return obj;
        },
        error: (err) => {
            return err;
        }
    });
    //Ajustar 'peticionActiva' de usuario
    const PeticionesActivas = Parse.Object.extend("PeticionesActivas")
    var query = new Parse.Query(PeticionesActivas);
    query.equalTo("userID", req.body.userID);
    const result = await query.first();
    console.log(peticionPointer);
    console.log(peticionPointer.id)
    result.set("peticionID", peticionPointer.id);
    result.save();

    res.send(peticionPointer);

});

app.post("/newDonacion", async (req, res) => {
    const Donacion = Parse.Object.extend("Donaciones")
    const newDonacion = new Donacion();

    const userPointer = {
        __type: "Pointer",
        className: "_User",
        objectId: req.body.userID,
    };


    const donacion_info = {
        userID: userPointer,
        aproved: req.body.aproved
    };

    const donacionPointer = await newDonacion.save(donacion_info, {
        success: (obj) => {
            return obj;
        },
        error: (err) => {
            return err;
        }
    });

    res.send(donacionPointer);
});


app.get("/peticionesPorTipoSangre/:tipoSangre", async (req, res) => {
    //req.body.bloodtype="O-"
    const User = Parse.Object.extend("User");
    const Peticion = Parse.Object.extend("Peticiones");
    const query = new Parse.Query(User);
    query.equalTo("tipoSangre", req.params.tipoSangre);
    const resultado = await query.find();
    const resultArray = [];

    const promisedArray = [];

    const currentDate = new Date();



    for (const usuarioResultado of resultado) {
        //console.log("-----------------------------");
        //console.log(usuarioResultado);
        const peticionQuery = new Parse.Query(Peticion);
        const userPointer = {
            __type: "Pointer",
            className: "_User",
            objectId: usuarioResultado.id,
        };
        peticionQuery.equalTo("userID", userPointer);
        const currUserPeticiones = peticionQuery.find();
        promisedArray.push(currUserPeticiones);


        // console.log(stringifiedDate);
        // console.log(new Date("Sep 24 2022"));
        //console.log(fns.format(parseISO(stringifiedDate, 'MM/dd/yyyy')));  
    }


    const arregloLleno = await Promise.all(promisedArray).then((values) => {
        return values;
    });

    //console.log(arregloLleno);
    for (const currentArreglo of arregloLleno) {
        for (const peticionResultado of currentArreglo) {
            const stringifiedDate = `${peticionResultado.get("createdAt")}`;
            const dateArrays = stringifiedDate.split(" ")
            const formatedDateString = `${dateArrays[1]} ${dateArrays[2]} ${dateArrays[3]}`
            //console.log(formatedDateString);
            const currentDate = new Date();
            const dateDiff = fns.differenceInDays(currentDate, new Date(formatedDateString));
            if (dateDiff <= 30) {
                resultArray.push(peticionResultado);
            }
        }
    }

    res.send(resultArray);

});

//session token


//with user id

app.get("/userInfoWithID/:userID", async (req, res) => {
    const User = Parse.Object.extend("User");
    const query = new Parse.Query(User);
    query.equalTo("objectId", req.params.userID);
    const result = await query.find();
    res.send(result);
});


app.get("/userInfoWithSessionToken", async (req, res) => {

    const user = req.user
    const userid = user.id
    const query = new Parse.Query(Parse.User);
    query.equalTo("objectId", userid);
    const result = await query.find();

    res.send(result);

})

app.get("/emailsWithBloodType", async (req, res) => {
    const User = Parse.Object.extend("User");
    const query = new Parse.Query(User);
    query.equalTo("tipoSangre", req.body.tipoSangre);
    const result = await query.find();
    const emailList = [];
    for (const userInfo of result) {
        emailList.push(userInfo.get("emailPublico"));
    }
    res.send(emailList);
});

app.post("/aumentarViews", async (req, res) => {
    console.log(req.body.petitionID)
    const peticionID = req.body.petitionID;
    const Peticiones = Parse.Object.extend("Peticiones")
    var query = new Parse.Query(Peticiones);
    query.equalTo("objectId", peticionID);
    console.log(query)
    const result = await query.first();
    console.log(result);
    result.set("views", result.get("views") + 1);
    result.save();
    res.send(200);

});

app.get("/petitionInfo/:petitionID", async (req, res) => {
    const Peticiones = Parse.Object.extend("Peticiones")
    var query = new Parse.Query(Peticiones);
    query.equalTo("objectId", req.params.petitionID);
    const result = await query.find();
    console.log(result)
    res.send(result);
});

app.get("/userPetitions/:userID", async (req,res)=>{
    const PeticionesActivas=Parse.Object.extend("PeticionesActivas")
    var query = new Parse.Query(PeticionesActivas);
    query.equalTo("userID", req.params.userID);
    const result=await query.first();
    res.send(result);
})



module.exports = app;

