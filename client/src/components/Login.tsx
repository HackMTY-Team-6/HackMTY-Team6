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
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values: Values, { resetForm }) => {
          handleLogin(values, () => resetForm());
        }}
      >
        <Form style={{}}>
          <div style={{}}>
            <label className="" htmlFor="email">
              email
            </label>
            <Field
              className=""
              id="email"
              name="email"
              placeholder="Correo"
            />
          </div>

          <div className="" style={{}}>
            <label htmlFor="password">Contraseña</label>
            <Field
              className=""
              id="password"
              name="password"
              placeholder="Password"
              type="password"
            />
            {submitMessage && <p className="">{submitMessage}</p>}
          </div>

          <div>
            <div className="">
              <button className="" type="submit">
                Enter
              </button>
              <div className="">
                <hr className="" />
                <p className="">Or</p>
                <hr className="" />
              </div>
              <button
                className=""
                type="button"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
