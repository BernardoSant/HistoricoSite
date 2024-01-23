import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [produto, setProduto] = useState({
    id: Date.now(),
    nome: '',
    tipo: '',
    quantidade: 0,
    dataCadastro: new Date(),
  });


  return (
    <GlobalContext.Provider
      value={{ produto, setProduto }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
