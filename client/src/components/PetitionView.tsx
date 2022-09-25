import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL, SESSION_KEY } from "../lib/constants";

function PetitionView() {
  const [count, setCount] = useState(0);
  const [petition, setPetition] = useState({});
  const [bloodType, setBloodType] = useState("");
  useEffect(() => {
    const getPetition = (sessionToken: string) => {
      axios
        .get(`${API_URL}/userInfoWithSessionToken`, {
          headers: {
            "Content-Type": "application/json",
            authorization: sessionToken,
          },
        })
        .then((res) => {
          const uID = res.data[0].objectId;
          setBloodType(res.data[0].tipoSangre);
          console.log(res.data[0]);
          axios.get(`${API_URL}/userPetitions/${uID}`).then((res) => {
            const pID = res.data.peticionID;
            axios.get(`${API_URL}/petitionInfo/${pID}`).then((res) => {
              setCount(res.data[0].views);
              setPetition(res.data[0]);
            });
          });
        });
    };
    getPetition(localStorage.getItem(SESSION_KEY));
  }, []);

  let stringCountMessages = ["", "", ""];
  if (count === 0) {
    stringCountMessages[0] =
      "Aún no encontramos a algún donador para tu solicitud";
  } else if (count === 1) {
    stringCountMessages[0] = `Hemos encontrado `;
    stringCountMessages[1] = " persona dispuesta a donar.";
    stringCountMessages[2] =
      "Se le compartió tu información de contacto para dar seguimiento.";
  } else {
    stringCountMessages[0] = `Hemos encontrado `;
    stringCountMessages[1] = "personas dispuesta a donar.";
    stringCountMessages[2] =
      "Se le compartió tu información de contacto para dar seguimiento.";
  }

  return (
    <div className="w-full p-[100px]">
      <div className="bg-slate-50 w-[600px] m-auto p-[20px] rounded-md shadow-lg">
        <div>
          <h1 className="mx-auto text-4xl font-semibold text-green-800 text-center">
            Petición de donativo
          </h1>
          <p className="text-2xl">
            {stringCountMessages[0]}
            <span className="font-bold text-red-600">{count}</span>
            {stringCountMessages[1]}
          </p>
          <p>{stringCountMessages[2]}</p>
          <br></br>
          <p className="font-bold text-green-800">Resumen de petición:</p>
          <p className="font-bold">🩸{bloodType}</p>
          <p className="font-bold">{petition.fecha}</p>
          <p className="font-bold">{petition.lugarParaRecibir}</p>
        </div>
      </div>
    </div>
  );
}

export default PetitionView;
