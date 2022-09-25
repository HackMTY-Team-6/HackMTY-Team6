import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../lib/constants";
import parseDateYYYYMMDD from '../lib/parseDate';
import UserProvider from "./UserContext";

interface Props {
    handleCloseModal: () => void
    petitionID: string
}

interface UserID {
    __type: string;
    className: string;
    objectId: string;
}
interface User {
    nombreCompleto: string;
    emailPublico: string;
    ciudad: string;
    estado: string;
    telefono: string;
    tipoSangre: string;
}

interface Petition {
    userID: UserID;
    lugarParaRecibir: string;
    createdAt: string;
    updatedAt: string;
    objectId: string;
}

const PetitionModal = ({ handleCloseModal, petitionID }: Props) => {

    const [petitionInfoState, setPetitionInfoState] = useState<Petition>()
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const petitionInfo = (petitionID: string) => {
            axios
                .get(`${API_URL}/petitionInfo/${petitionID}`)
                .then((res) => {
                    setPetitionInfoState(res.data)
                    console.log(res.data)
                    const getUserById = (data: any) => {
                        console.log(data.userID.objectId)
                        const userID = data.userID.objectId
                        axios.get(`${API_URL}/userInfoWithID/${userID}`).then((res) => {
                            console.log(res.data);
                            setUser(res.data[0]);
                        });
                    };

                    getUserById(res.data[0]);
                });
        };

        petitionInfo(petitionID)

    }, [petitionID])

    const applyDonacion = (petitionID: string) => {
        axios.post(`${API_URL}/aumentarViews`, {
            "petitionID": petitionID,
        }).then((response) => {
            console.log("bien")
        }).catch((error) => {
            console.log(error)
        });
    }

    if (user && petitionInfoState) {
        return (
            <div
                className="
        block p-6 max-w-sm bg-white rounded-lg border 
        border-gray-200 shadow-md w-[500px] h-[300px] left-0 right-0 mx-auto relative"
            >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {user?.nombreCompleto}
                </h5>
                <p className="font-bold">{petitionInfoState.lugarParaRecibir}</p>
                <p className="font-normal">
                    {user?.ciudad}, {user?.estado}
                </p>
                <p className="font-normal" style={{ borderBottom: "none" }}>
                    {user.telefono}
                </p>
                <p className="absolute top-1 right-2 ">🩸O-</p>

                <div className="w-full px-[80px] mt-10">
                    <button onClick={() => {
                        console.log(petitionInfoState[0].objectId)
                        applyDonacion(petitionInfoState[0].objectId)
                    }} className="bg-blue-300 px-5 py-2 rounded-md cursor-pointer shadow-md mx-auto text-center">Estoy interesado</button>

                </div>
            </div>
        )
    } else {
        return null
    }

}

export default PetitionModal