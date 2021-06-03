import React, { createContext } from "react";

export const UserContext = createContext(undefined);

function UserProvider({ children, data }) {
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export default UserProvider;
