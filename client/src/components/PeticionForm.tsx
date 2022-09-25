import React from 'react'
import { BiDonateBlood, BiDonateHeart } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const PeticionForm = () => {

    const navigate = useNavigate();

    return (
        <div className='p-[350px] mx-auto'>
            <div className='flex gap-9 justify-between'>

                <div className='bg-slate-100 h-[200px] w-[350px] text-center shadow-lg transform transition duration-500 hover:scale-110 cursor-pointer hover:border-l-red-500 hover:border-l-8 rounded-lg'
                    onClick={() => navigate("/donar")}
                >
                    <BiDonateBlood className='text-8xl mx-auto mt-5' />
                    <p className='font-semibold mt-5 text-lg'>Donar</p>
                </div>

                <div className='bg-slate-100 h-[200px] w-[350px] text-center shadow-lg transform transition duration-500 hover:scale-110 cursor-pointer hover:border-l-red-500 hover:border-l-8 rounded-lg'
                    onClick={() => navigate("/solicitar")}
                >
                    <BiDonateHeart className='text-8xl mx-auto mt-5' />
                    <p className='font-semibold mt-5 text-lg'>Pedir donación</p>
                </div>

            </div>
        </div>
    )
}

export default PeticionForm