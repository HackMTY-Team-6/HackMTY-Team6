import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../lib/constants";

function PetitionView() {
  const [count, setCount] = useState(0);
  const [userID, setUserID] = useState("");
  useEffect(() => {
    const getUserID = (sessionToken: string) => {
      axios
        .get(`${API_URL}/userInfoWithSessionToken`, {
          headers: {
            "Content-Type": "application/json",
            authorization: sessionToken,
          },
        })
        .then((res) => {
          setUserID(res.data[0].objectId);
        });
    };

    getUserID(localStorage.getItem("session_key"));
  }, []);

  const stringCount =
    count === 0
      ? "Aún no encontramos a algún donador para tu solicitud"
      : `${count} se han postulador para donar. Les hemos compartido tu inormación de contacto.`;

  return (
    <div className="w-full p-[100px]">
      <div className="bg-slate-50 w-[600px] m-auto p-[20px] rounded-md shadow-lg">
        <div>
          <h1 className="mx-auto text-4xl font-semibold text-green-800 text-center">
            Petición de donativo
          </h1>
          <p className="text-3xl">{stringCount}</p>
        </div>
      </div>
    </div>
  );
}

export default PetitionView;
