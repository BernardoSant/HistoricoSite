import { createContext, useContext } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {

  return (
    <GlobalContext.Provider
      value={{}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
