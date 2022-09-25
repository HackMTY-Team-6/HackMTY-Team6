import axios from 'axios';
import React, {useEffect, useState} from 'react'

import { BiDonateBlood, BiDonateHeart } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../lib/constants';

const PeticionForm = () => {
    const navigate = useNavigate();
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
    
    

    return (
        <div className='px-[350px] py-[100px] mx-auto'>
            <div className='flex gap-9 justify-between'>

                <div className='bg-slate-100 h-[200px] w-[350px] text-center shadow-lg transform transition duration-500 hover:scale-110 cursor-pointer hover:border-l-red-500 hover:border-l-8 rounded-lg'
                    onClick={() => navigate("/donar")}
                >
                    <BiDonateBlood className='text-8xl mx-auto mt-5' />
                    <p className='font-semibold mt-5 text-lg'>Donar</p>
                </div>

                <div className='bg-slate-100 h-[200px] w-[350px] text-center shadow-lg transform transition duration-500 hover:scale-110 cursor-pointer hover:border-l-red-500 hover:border-l-8 rounded-lg'
                    onClick={() => navigate("/peticion")}
                >
                    <BiDonateHeart className='text-8xl mx-auto mt-5' />
                    <p className='font-semibold mt-5 text-lg'>Pedir donación</p>
                </div>

            </div>
        </div>
    )
}

export default PeticionForm