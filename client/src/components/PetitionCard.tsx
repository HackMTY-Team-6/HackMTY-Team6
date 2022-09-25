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
    <div
      className="
      block p-6 max-w-sm bg-white rounded-lg border 
      border-gray-200 shadow-md hover:bg-gray-100
      cursor-pointer relative"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {user?.nombreCompleto}
      </h5>
      <p className="font-bold">{place}</p>
      <p className="font-normal">
        {user?.ciudad}, {user?.estado}
      </p>
      <p className="font-normal" style={{ borderBottom: "none" }}>
        {date}
      </p>
      <p className="absolute top-1 right-2 ">🩸O-</p>
    </div>
  );
}

export default PetitionCard;
