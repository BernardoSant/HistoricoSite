import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [empresa, setEmpresa] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3030/empresa')
      .then((response) => {
        setEmpresa(response.data.data);
      }).catch((err) => {
        console.error(err);
      });
  }, []);

  const [nota, setNota] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3030/nota')
      .then((response) => {
        setNota(response.data.data);
      }).catch((err) => {
        console.error(err);
      });
  }, []);

  const [funcionario, setFuncionario] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3030/funcionario')
      .then((response) => {
        setFuncionario(response.data.data);
      }).catch((err) => {
        console.error(err);
      });
  }, []);

  const [kinays, setKinay] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3030/kinay')
      .then((response) => {
        setKinay(response.data.data);
      }).catch((err) => {
        console.error(err);
      });
  }, []);

  const [impostos, setImpostos] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3030/impostos')
      .then((response) => {
        setImpostos(response.data.data);
      }).catch((err) => {
        console.error(err);
      });
  }, []);

  const [pedido, setPedido] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3030/pedido')
      .then((response) => {
        setPedido(response.data.data);
      }).catch((err) => {
        console.error(err);
      });
  }, []);


  

  return (
    <GlobalContext.Provider
      value={{empresa, setEmpresa, nota, setNota, kinays, setKinay, impostos, setImpostos, pedido, setPedido, funcionario, setFuncionario }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
