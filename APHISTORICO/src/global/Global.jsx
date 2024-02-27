import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

// Atualiza o banco
const useFetchData = (url, setData, interval) => {
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url)
        .then((response) => {
          setData(response.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, interval);
    return () => clearInterval(intervalId);
  }, [url, setData, interval]);
};

const AppContext = ({ children }) => {
  const [empresa, setEmpresa] = useState([]);
  useFetchData("http://localhost:3030/empresa", setEmpresa, 30 * 1000);

  const [nota, setNota] = useState([]);
  useFetchData("http://localhost:3030/nota", setNota, 30 * 1000);

  const [funcionario, setFuncionario] = useState([]);
  useFetchData("http://localhost:3030/funcionario", setFuncionario, 30 * 1000);

  const [pedido, setPedido] = useState([]);
  useFetchData("http://localhost:3030/pedido", setPedido, 30 * 1000);

  const [kinays, setKinay] = useState([]);
  useFetchData("http://localhost:3030/kinay", setKinay, 30 * 1000);

  const [impostos, setImpostos] = useState([]);
  useFetchData("http://localhost:3030/impostos", setImpostos, 30 * 1000);

  const [cargo, setCargo] = useState([]);
  useFetchData("http://localhost:3030/cargo", setCargo, 30 * 1000);

  return (
    <GlobalContext.Provider
      value={{
        empresa,
        setEmpresa,
        nota,
        setNota,
        kinays,
        setKinay,
        impostos,
        setImpostos,
        pedido,
        setPedido,
        funcionario,
        setFuncionario,
        cargo,
        setCargo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
