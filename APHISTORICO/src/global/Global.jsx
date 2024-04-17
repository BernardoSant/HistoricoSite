import { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

let ip = "http://localhost:2523";
let socket;

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [cargo, setCargo] = useState([]);
  const [empresa, setEmpresa] = useState([]);
  const [nota, setNota] = useState([]);
  const [funcionario, setFuncionario] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [kinays, setKinay] = useState([]);
  const [impostos, setImpostos] = useState([]);
  const [contrato, setContrato] = useState([]);
  const [ferias, setFerias] = useState([]);
  const [conta, setConta] = useState([]);
  const [transporte, setTransporte] = useState([]);

  useEffect(() => {
    (async () => {
      socket = await io.connect(ip);

      const dataTypes = [
        { type: "cargo", setData: setCargo },
        { type: "empresa", setData: setEmpresa },
        { type: "nota", setData: setNota },
        { type: "funcionario", setData: setFuncionario },
        { type: "pedido", setData: setPedido },
        { type: "kinay", setData: setKinay },
        { type: "impostos", setData: setImpostos },
        { type: "ferias", setData: setFerias },
        { type: "contrato", setData: setContrato },
        { type: "conta", setData: setConta },
        { type: "transporte", setData: setTransporte },
      ];

      dataTypes.forEach(({ type, setData }) => {
        socket.emit(`fetch ${type}`);
        const handleData = (data) => {
          setData(data);
        };
        socket.on(`${type} data`, handleData);
        return () => {
          socket.off(`${type} data`, handleData);
        };
      });
    })();
  }, []);

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
        ferias,
        setFerias,
        conta,
        setConta,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
