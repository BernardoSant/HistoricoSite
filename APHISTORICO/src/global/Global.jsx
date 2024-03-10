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
  let ip = "http://localhost:3030";
  const [empresa, setEmpresa] = useState([]);
  useFetchData(ip + "/empresa", setEmpresa, 30 * 1000);

  const [nota, setNota] = useState([]);
  useFetchData(ip + "/nota", setNota, 30 * 1000);

  const [funcionario, setFuncionario] = useState([]);
  useFetchData(ip + "/funcionario", setFuncionario, 30 * 1000);

  const [pedido, setPedido] = useState([]);
  useFetchData(ip + "/pedido", setPedido, 30 * 1000);

  const [kinays, setKinay] = useState([]);
  useFetchData(ip + "/kinay", setKinay, 30 * 1000);

  const [impostos, setImpostos] = useState([]);
  useFetchData(ip + "/impostos", setImpostos, 30 * 1000);

  const [contrato, setContrato] = useState([]);
  useFetchData(ip + "/contrato", setContrato, 10 * 1000);
  
  const [cargo, setCargo] = useState([]);
  useFetchData(ip + "/cargo", setCargo, 10 * 1000);

  return (
    <GlobalContext.Provider
      value={{
        ip,
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
        contrato,
        setContrato,
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
