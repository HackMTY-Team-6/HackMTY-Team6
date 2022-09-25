import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, SESSION_KEY } from "../lib/constants";

interface Props {
  petitionID: string;
  userID: string;
  date: string;
  place: string;
}

interface User {
  nombreCompleto: string;
  emailPublico: string;
  ciudad: string;
  estado: string;
  telefono: string;
  tipoSangre: string;
}

function PetitionCard({ petitionID, userID, date, place }: Props) {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const getUserById = async (userID: string) => {
      axios.get(`${API_URL}/userInfoWithID/${userID}`).then((res) => {
        console.log(res.data[0]);
        setUser(res.data[0]);
      });
    };

    getUserById(userID);
  }, []);

  return (
    <div>
      <h1>{user?.nombreCompleto} | {user?.tipoSangre}</h1>
      <h2>{place}</h2>
      <h2>Se necesita para {date}</h2>
      <br/>
    </div>
  );
}

export default PetitionCard;
