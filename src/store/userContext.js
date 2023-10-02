import { createContext, useContext, useState } from "react";

import axios from "axios";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  // console.log("Change user:", user);
  const userAxios = axios.create({
    baseURL: "http://localhost:5000/user",
    headers: {
      Authorization: `${user?.username}`,
    },
  });

  return (
    <UserContext.Provider value={{ user, setUser, userAxios }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

export function useUser() {
  return useContext(UserContext);
}
