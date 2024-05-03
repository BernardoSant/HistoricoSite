import styled from "styled-components";
import { BsBuildings, BsHouse, BsList, BsPlus } from "react-icons/bs";
import { Empresa } from "../components/Empresa/Pagina/Empresa";
import { Dashboard } from "../components/Dashboard/Pagina/Dashboard";
import { useState } from "react";
import { TabelaConta } from "../Conta/Conta";

const Nav = styled.nav`
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 20;
`;

const Header = styled.header`
  height: 100vh;
  width: 100%;
  display: flex;
  background-color: #fffafa;
  padding-top: 2em;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 2em;
`;

const Div = styled.div`
  box-shadow: -5px 5px 11px #b5b2b2, -5px -5px 13px #ffffff;
  height: auto;
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
  z-index: 20;
  display: flex;
  flex-direction: column;
`;

const Div2 = styled.div`
  text-align: center;
  padding: 10px;
  transition: 200ms;
  font-size: 1.5vw;
`;

export const Inicio = () => {
  const [state, setState] = useState({
    Inicio: false,
    Empresa: true,
    Casa: false,
    Conta: false,
  });

  const handleClick2 = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleClick = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: true,
      ...(key !== "Inicio" && { Inicio: false }),
      ...(key !== "Empresa" && { Empresa: false }),
      ...(key !== "Casa" && { Casa: false }),
    }));
  };

  return (
    <div className="relative">
      <Header>
        <Nav>
          <Div className="bg-orange-400">
            <Div2
              className={`${
                state.Inicio &&
                "bg-[#fffafa] rounded-bl-[0.8em] rounded-tl-[0.8em] my-1 ml-1"
              } cursor-pointer ${
                !state.Inicio &&
                "hover:bg-[#fffafa] hover:rounded-full my-1 mx-1"
              }`}
              onClick={() => handleClick("Inicio")}
            >
              <BsList />
            </Div2>

            <Div2
              className={`${
                state.Empresa &&
                "bg-[#fffafa] rounded-bl-[0.8em] rounded-tl-[0.8em] my-1 ml-1"
              } cursor-pointer ${
                !state.Empresa &&
                "hover:bg-[#fffafa] hover:rounded-full my-1 mx-1"
              }`}
              onClick={() => handleClick("Empresa")}
            >
              <BsBuildings />
            </Div2>
            {/*
            <Div2
              className={`${
                state.Casa &&
                "bg-[#fffafa] rounded-bl-[0.8em] rounded-tl-[0.8em] my-1 ml-1"
              } cursor-pointer ${!state.Casa && "hover:bg-[#fffafa] hover:rounded-full my-1 mx-1"} `}
              onClick={() => handleClick("Casa")}
            >
              <BsHouse />
            </Div2>
*/}
            <Div2
              className={`${
                state.Conta &&
                "bg-[#d6d6d6] rounded-bl-[0.8em] rounded-tl-[0.8em] my-1 ml-1"
              } cursor-pointer ${
                !state.Conta &&
                "hover:bg-[#fffafa] hover:rounded-full my-1 mx-1"
              }`}
              onClick={() => handleClick2("Conta")}
            >
              <BsPlus />
            </Div2>
          </Div>
          {state.Conta && <TabelaConta></TabelaConta>}
        </Nav>

        {state.Inicio && <Dashboard />}
        {state.Empresa && <Empresa />}
      </Header>
      <div className="absolute bottom-1 right-4 text-slate-400 cursor-not-allowed text-[0.8vw]">
      1.00.01
      </div>
    </div>
  );
};
