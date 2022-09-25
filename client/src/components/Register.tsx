import { useState } from "react";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../lib/constants";

interface Values {
  email: string;
  password: string;
  emailPublico: string;
  nombreCompleto: string;
  telefono: string;
  tipoSangre: string;
  estado: string;
  ciudad: string;
}

const Register = () => {
  const [submitMessage, setSubmitMessage] = useState(null);
  const navigate = useNavigate();

  // Handlers
  const handleRegister = (values: Values, callback: () => void) => {
    axios
      .post(`${API_URL}/newUser`, {
        email: values.email,
        password: values.password,
        emailPublico: values.email,
        nombreCompleto: values.nombreCompleto,
        telefono: values.telefono,
        tipoSangre: values.tipoSangre,
        estado: values.estado,
        ciudad: values.ciudad,
      })
      .then((response) => {
        setSubmitMessage(response.data.message);
        callback();
      })
      .catch((error) => {
        setSubmitMessage(error.response.data.message);
      });
    alert("User created succesfully!");
    navigate("./login");
  };

  return (
    <div className="w-full p-[25px]">
      <img
        className="h-48 mx-auto mb-4"
        src="../../public/LogoBloodManager.svg"
      />
      <div className="bg-slate-50 w-[600px] m-auto p-[20px] rounded-md shadow-lg">
        <div className="text-center">
          <h1 className="mx-auto text-7xl font-semibold text-red-400">
            Registro
          </h1>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
            emailPublico: "",
            nombreCompleto: "",
            telefono: "",
            tipoSangre: "",
            estado: "",
            ciudad: "",
          }}
          onSubmit={(values: Values, { resetForm }) => {
            handleRegister(values, () => resetForm());
          }}
        >
          <Form>
            <div className="mt-4">
              <label htmlFor="email" className="block">
                Email
              </label>
              <Field
                className="bg-white p-2 w-full"
                id="email"
                name="email"
                placeholder="email@email.com"
                type="email"
              />
            </div>

            <div className="mt-4">
              <label className="block" htmlFor="password">
                Password
              </label>
              <Field
                className="p-2 w-full"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="mt-4">
              <label className="block" htmlFor="nombreCompleto">
                Nombre completo
              </label>
              <Field
                className="p-2 w-full"
                id="nombreCompleto"
                name="nombreCompleto"
                placeholder="Nombre Completo"
              />
            </div>

            <div className="mt-5">
              <label className="block" htmlFor="telefono">
                Telefono
              </label>
              <Field
                className="p-2 w-full"
                id="telefono"
                name="telefono"
                placeholder="Telefono"
              />
            </div>

            <div className="mt-4">
              <label className="block" htmlFor="tipoSangre">
                Tipo de Sangre
              </label>
              <Field
                className="p-2 w-full"
                as="select"
                id="tipoSangre"
                name="tipoSangre"
              >
                <option value="" disabled selected>
                  Select your option
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </Field>
            </div>

            <div className="mt-4">
              <label className="block" htmlFor="estado">
                Estado
              </label>
              <Field
                className="p-2 w-full"
                id="estado"
                name="estado"
                placeholder="Estado"
              />
            </div>

            <div className="mt-4">
              <label className="block" htmlFor="ciudad">
                Ciudad
              </label>
              <Field
                className="p-2 w-full"
                id="ciudad"
                name="ciudad"
                placeholder="Ciudad"
              />
            </div>

            <div className="bg-red-400 w-fit px-5 py-2 m-auto mt-5 rounded-md transform transition duration-500 hover:scale-110 shadow-md">
              <button className=" text-white font-medium " type="submit">
                Register
              </button>
            </div>
          </Form>
        </Formik>
        {submitMessage && <p>{submitMessage}</p>}
        <p className="text-center">or</p>
        <p className="text-center">
          Already have an account?{" "}
          <span
            className="text-red-400 cursor-pointer underline "
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
