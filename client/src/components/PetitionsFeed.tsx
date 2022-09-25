import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL, SESSION_KEY } from "../lib/constants";
import PetitionCard from "./PetitionCard";
import parseDateYYYYMMDD from '../lib/parseDate';
import PetitionModal from "./PetitionModal"

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

  const [currentPetition, setCurrentPetition] = useState<string>()
  const [isOpen, setIsOpen] = useState(false)

  const handleSetCurrentPetition = (petitionID: string) => {
    console.log(petitionID)
    setIsOpen(true)
    setCurrentPetition(petitionID)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const petitionsElements = petitions.map((p, i) => {
    return (
      <PetitionCard
        key={i}
        petitionID={p.objectId}
        userID={p.userID.objectId}
        date={parseDateYYYYMMDD(p.createdAt)}
        place={p.lugarParaRecibir}
        handleSetCurrentPetition={handleSetCurrentPetition}
      />
    )
  })

  return (
    <div className="w-full flex">
      <div>
        {petitionsElements}
      </div>
      <div className="absolute bg-white border-2 left-0 right-0 mx-auto mt-5 w-[700px]">
        {isOpen && <PetitionModal handleCloseModal={handleCloseModal} />}
      </div>
    </div>
  )
}

export default PetitionsFeed;
