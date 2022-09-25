import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL, SESSION_KEY } from "../lib/constants";
import PetitionCard from "./PetitionCard";
import parseDateYYYYMMDD   from '../lib/parseDate';

interface UserID {
  __type: string;
  className: string;
  objectId: string;
}

interface Petition {
  userID: UserID;
  lugarParaRecibir: string;
  createdAt: string;
  updatedAt: string;
  objectId: string;
}

const tipoSangre = "O-";
function PetitionsFeed() {
  const [petitions, setPetitions] = useState<Petition[]>([]);
  useEffect(() => {
    const getPetitions = async (tipoSangre: string) => {
      await axios
        .get(`${API_URL}/peticionesPorTipoSangre/${tipoSangre}`)
        .then((res) => setPetitions(res.data));
    };

    getPetitions(tipoSangre);
  }, []);

  const petitionsElements = petitions.map((p, i) => {
    return(
      <PetitionCard
        key={i}
        petitionID={p.objectId}
        userID={p.userID.objectId}
        date={parseDateYYYYMMDD(p.createdAt)}
        place={p.lugarParaRecibir}
      />
    )
  })

  return (
    <div>
      {petitionsElements}
    </div>
  )
}

export default PetitionsFeed;
