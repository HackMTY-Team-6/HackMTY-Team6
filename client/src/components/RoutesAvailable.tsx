import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import PeticionForm from "./PeticionForm";
import Donar from "./Donar";
import Feed from "./Feed";

const RoutesAvailable = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    );
  } else {
    return (
      <div>
        <Routes>
          <Route path="/home" element={<PeticionForm />} />
          <Route path="/donar" element={<Donar />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    );
  }
};

export default RoutesAvailable