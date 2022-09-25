import { useState } from "react";
import axios from "axios";
import { Formik, Field, Form } from "formik";
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

  // Handlers
  const handleRegister = (values: Values, callback: () => void) => {
    axios
      .post(`http://localhost:5173/register`, {
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
  };

  return (
    <div className="">
      <div
        className=""
      >
        <div className=" ">
          <h1 className="">Sign Up</h1>
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
            ciudad: ""
          }}
          onSubmit={(values: Values, { resetForm }) => {
            handleRegister(values, () => resetForm());
          }}
        >
          <Form >
            <div >
              <label htmlFor="email">Email</label>
              <Field
                className=""
                id="email"
                name="email"
                placeholder="email@email.com"
                type="email"
              />
            </div>

            <div>
              <label className="" htmlFor="password">
                Password
              </label>
              <Field
                className=""
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>

            <div>
              <label className="" htmlFor="nombreCompleto">
                Nombre completo
              </label>
              <Field
                className=""
                id="nombreCompleto"
                name="nombreCompleto"
                placeholder="nombreCompleto"
              />
            </div>

            <div>
              <label className="" htmlFor="telefono">
                Telefono
              </label>
              <Field
                className=""
                id="telefono"
                name="telefono"
                placeholder="Telefono"
              />
            </div>

            <div>
              <label className="" htmlFor="tipoSangre">
                Tipo de Sangre
              </label>
              <Field
                className=""
                as="select"
                id="tipoSangre"
                name="tipoSangre"
              >
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

            <div className="">
              <button
                className=""
                type="submit"
              >
                Register
              </button>
            </div>
          </Form>
        </Formik>
        {submitMessage && <p>{submitMessage}</p>}
      </div>
    </div >
  );
};

export default Register;