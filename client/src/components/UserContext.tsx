import { createContext } from "react";
import { useState } from "react";
import { SESSION_KEY } from "../lib/constants";

interface UserContext {
  user: string | null;
  setUser: (sessionToken: string | null) => null;
}

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContext>({} as UserContext);

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState(localStorage.getItem(SESSION_KEY));
  return (
    //@ts-ignore
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;