import { createContext } from "react";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default ContextProvider;
