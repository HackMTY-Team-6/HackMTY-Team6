import axios from "axios";
import React, { useEffect, useState } from "react";

import { BiDonateBlood, BiDonateHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../lib/constants";
import PetitionView from "./PetitionView";

const PeticionForm = () => {
  const navigate = useNavigate();
  const [hasPetition, setHasPetition] = useState(false);
  useEffect(() => {
    const getUserHasPetition = (sessionToken: string) => {
      axios
        .get(`${API_URL}/userInfoWithSessionToken`, {
          headers: {
            "Content-Type": "application/json",
            authorization: sessionToken,
          },
        })
        .then((res) => {
          const uID = res.data[0].objectId;

          axios.get(`${API_URL}/userPetitions/${uID}`).then((res) => {
            if (res.data) {
              setHasPetition(true);
            }
          });
        });
    };
    getUserHasPetition(localStorage.getItem("session_key"));
  }, []);

  const options = (
    <div className="px-[350px] py-[100px] mx-auto">
      <div className="flex gap-9 justify-between">
        <div
          className="bg-slate-100 h-[200px] w-[350px] text-center shadow-lg transform transition duration-500 hover:scale-110 cursor-pointer hover:border-l-red-500 hover:border-l-8 rounded-lg"
          onClick={() => navigate("/donar")}
        >
          <BiDonateBlood className="text-8xl mx-auto mt-5" />
          <p className="font-semibold mt-5 text-lg">Donar</p>
        </div>

        <div
          className="bg-slate-100 h-[200px] w-[350px] text-center shadow-lg transform transition duration-500 hover:scale-110 cursor-pointer hover:border-l-red-500 hover:border-l-8 rounded-lg"
          onClick={() => navigate("/peticion")}
        >
          <BiDonateHeart className="text-8xl mx-auto mt-5" />
          <p className="font-semibold mt-5 text-lg">Pedir donación</p>
        </div>
      </div>
    </div>
  );

  const petition = <PetitionView />;
  return <div>{hasPetition === undefined ? petition : options}</div>;
};

export default PeticionForm;
