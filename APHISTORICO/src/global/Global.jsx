import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);
const useFetchData = (url, setData) => {
    useEffect(() => {
      const fetchData = () => {
        axios.get(url)
          .then((response) => {
            setData(response.data.data);
          }).catch((err) => {
            console.error(err);
          });
      };
  
      fetchData();
      const intervalId = setInterval(fetchData, 1 * 60 * 1000);
      return () => clearInterval(intervalId);
    }, [url, setData]);
  };
  
const AppContext = ({ children }) => {
  
  
  // Uso do hook personalizado
  const [empresa, setEmpresa] = useState([]);
  useFetchData('http://localhost:3030/empresa', setEmpresa);
  
  const [nota, setNota] = useState([]);
  useFetchData('http://localhost:3030/nota', setNota);

  const [funcionario, setFuncionario] = useState([]);
  useFetchData('http://localhost:3030/funcionario', setFuncionario);
  
  const [kinays, setKinay] = useState([]);
  useFetchData('http://localhost:3030/kinay', setKinay);

  const [impostos, setImpostos] = useState([]);
  useFetchData('http://localhost:3030/impostos', setImpostos);

  const [pedido, setPedido] = useState([]);
  useFetchData('http://localhost:3030/pedido', setPedido);

  const [cargo, setCargo] = useState([]);
  useFetchData('http://localhost:3030/cargo', setCargo);

  return (
    <GlobalContext.Provider
      value={{ empresa, setEmpresa, nota, setNota, kinays, setKinay, impostos, setImpostos, pedido, setPedido, funcionario, setFuncionario, cargo, setCargo }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
