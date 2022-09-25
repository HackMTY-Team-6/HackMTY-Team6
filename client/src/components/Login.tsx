import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useContext } from "react";
import { UserContext } from "./UserContext";

import { API_URL, SESSION_KEY } from "../lib/constants";

interface Values {
  email: string;
  password: string;
}

const Login = () => {
  const [submitMessage, setSubmitMessage] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // Handlers
  const handleLogin = (values: any, callback: () => void) => {
    axios
      .post(`${API_URL}/login`, {
        "email": values.email,
        "password": values.password,
      })
      .then((response) => {
        setSubmitMessage(response.data.message);
        console.log(response);
        localStorage.setItem(SESSION_KEY, response.data.payload.sessionToken);
        setUser(response.data.payload.sessionToken);
        callback();
        navigate("/home");
      })
      .catch((error) => {
        setSubmitMessage(error.response.data.message);
      });
  };

  return (
    <div className="w-fit mx-auto p-[25px]">
      <img className="h-48 mx-auto mb-4" src= "../../public/LogoBloodManager.svg"/>
      <div className="bg-slate-50 w-[600px] m-auto p-[20px] rounded-md shadow-lg">
        <div className="text-center">
          <h1 className="mx-auto text-7xl font-semibold text-red-400">Login</h1>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values: Values, { resetForm }) => {
            handleLogin(values, () => resetForm());
          }}
        >
          <Form>
            <div className="mt-6">
              <label className="block" htmlFor="email">
                Email
              </label>
              <Field
                className="p-2 w-full"
                id="email"
                name="email"
                placeholder="Correo"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="password">Contraseña</label>
              <Field
                className="p-2 w-full"
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />
              {submitMessage && <p className="">{submitMessage}</p>}
            </div>

            <div>
              <div className="bg-red-400 w-fit px-10 py-2 m-auto mt-5 rounded-md transform transition duration-500 hover:scale-110 shadow-md">
                <button
                  className=" text-white font-medium "
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </Form>
        </Formik>
        <p className="text-center">or</p>
        <p className="text-center">Don't have an account? <span className="text-red-400 cursor-pointer underline " onClick={() => navigate("/register")}>Register</span></p>
      </div>
    </div >
  );
};

export default Login;
