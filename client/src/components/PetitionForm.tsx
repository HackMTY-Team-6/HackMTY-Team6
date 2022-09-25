import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { API_URL } from "../lib/constants";
interface Values {
  date: string;
  place: string;
}

function PetitionForm() {
  const [dateForm, setDateForm] = useState("");
  const [userBloodType, setUserBloodType] = useState("");
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
          setUserBloodType(res.data[0].tipoSangre);
        });
    };

    getUserID(localStorage.getItem("session_key"));
  }, []);

  const handleSubmit = async (values: Values, callback: () => void) => {
    axios.post(`${API_URL}/newPetition`, {
      userID: userID,
      lugarParaRecibir: values.place,
      fecha: dateForm,
    });
  };

  const handleDateChange = (e: any) => {
    setDateForm(e.target.value);
  };
  return (
    <div className="w-full p-[100px]">
      <div className="bg-slate-50 w-[600px] m-auto p-[20px] rounded-md shadow-lg">
        <div className="text-center">
          <h1 className="mx-auto text-4xl font-semibold text-blue-400">
            Petición de donativo de sangre
          </h1>
        </div>
        <Formik
          initialValues={{
            place: "",
            date: "",
          }}
          onSubmit={(values: Values, { resetForm }) => {
            handleSubmit(values, () => resetForm());
          }}
        >
          <Form>
            <div className="mt-4">
              <label htmlFor="place" className="block">
                Lugar
              </label>
              <Field
                id="place"
                name="place"
                placeholder="Banco/Hospital al que se deberá hacer la donación"
                className="bg-white p-2 w-full"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="date" className="block">
                Fecha
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="p-2 w-full"
                placeholder="Seleccionar la fecha del donativo"
                onChange={(e) => handleDateChange(e)}
                onKeyDown={(e) => handleDateChange(e)}
              ></input>
            </div>
            <p
            className="font-bold mt-4 w-fit m-auto"
            >
              Estarás solicitando sangre tipo <span className="text-red-600">{userBloodType}</span>
            </p>
            <div
              className="
              bg-blue-400 w-fit
            px-5 py-2 m-auto mt-5 
            rounded-md transform transition 
            duration-500 hover:scale-110
            shadow-md"
            >
              <button
              type="submit"
              className="text-white font-medium "
              >Publicar petición</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default PetitionForm;
