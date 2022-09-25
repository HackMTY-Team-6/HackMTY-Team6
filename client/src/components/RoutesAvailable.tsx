import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import PeticionForm from "./PeticionForm";
import Donar from "./Donar";
import Feed from "./Feed";
import PetitionsFeed from "./PetitionsFeed";
import PetitionForm from "./PetitionForm";
import PetitionView from "./PetitionView";
import TopBar from "./TopBar";

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
        <TopBar />
        <Routes>
          <Route path="/home" element={<PeticionForm />} />
          <Route path="/donar" element={<Donar />} />
          <Route path="/peticion" element={<PetitionForm />} />
          <Route path="/feed" element={<PetitionsFeed />} />
          <Route path="/home2" element={<PetitionView />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    );
  }
};

export default RoutesAvailable