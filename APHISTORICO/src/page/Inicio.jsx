import styled from "styled-components";
import { TbSettings, TbBuildingCommunity, TbLicense } from "react-icons/tb";
import { Empresa } from "../components/Empresa/Pagina/Empresa";
import { Dashboard } from "../components/Dashboard/Pagina/Dashboard";
import { Config } from "../components/Config/Pagina/Page";
import { useState } from "react";
import { TabelaConta } from "../Conta/Conta";

const Nav = styled.nav`
  height: 100%;
  display: flex;
  justify-content: space-between;
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
  overflow: hidden;
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

const Button = styled.div`
  text-align: center;
  padding: 10px;
  font-size: 1.5vw;
`;

export const Inicio = () => {
  const [state, setState] = useState({
    Empresa: true ,
    Conta: false,
    Config: false,
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
      ...(key !== "Empresa" && { Empresa: false }),
      ...(key !== "Config" && { Config: false }),
    }));
  };

  const ButtonStyled = ({
    TipoButton,
    Titulo,
    onClick,
    onSecundario,
    onPrimario,
  }) => {
    return (
      <>
        {TipoButton === 1 && (
          <Button
            onClick={onClick}
            className={`${
              onPrimario &&
              "bg-[#fffafa] rounded-bl-[0.6em] rounded-tl-[0.6em] my-1 ml-1"
            } cursor-pointer duration-200 ${
              !onPrimario && "hover:bg-[#fffafa] hover:rounded-full my-1 mx-1"
            }`}
          >
            {Titulo}
          </Button>
        )}

        {TipoButton === 2 && (
          <Button
            onClick={onClick}
            className={`${
              onSecundario &&
              "bg-[#d6d6d6] rounded-bl-[0.6em] rounded-tl-[0.6em] my-1 ml-1"
            } cursor-pointer duration-200 ${
              !onSecundario && "hover:bg-[#fffafa] hover:rounded-full my-1 mx-1"
            }`}
          >
            {Titulo}
          </Button>
        )}
      </>
    );
  };

  return (
    <div className="relative">
      <Header>
        <Nav>
          <Div className="bg-CorPrimariaBT">
            <ButtonStyled
              TipoButton={1}
              onPrimario={state.Empresa}
              Titulo={<TbBuildingCommunity />}
              onClick={() => handleClick("Empresa")}
            ></ButtonStyled>

            <ButtonStyled
              TipoButton={2}
              onSecundario={state.Conta}
              Titulo={<TbLicense />}
              onClick={() => handleClick2("Conta")}
            ></ButtonStyled>
          </Div>
          {/*
          <Div className="bg-CorPrimariaBT">
            <ButtonStyled
              TipoButton={1}
              onPrimario={state.Config}
              Titulo={<TbSettings />}
              onClick={() => handleClick("Config")}
            ></ButtonStyled>
          </Div>*/}
        </Nav>
        <div className="w-full h-full">
          {state.Conta && <TabelaConta></TabelaConta>}
          {state.Inicio && <Dashboard />}
          {state.Empresa && <Empresa />}
          {state.Config && <Config />}
        </div>
      </Header>
      <div className="absolute bottom-1 right-4 text-slate-400 cursor-not-allowed text-[0.8vw]">
        2.00.10
      </div>
    </div>
  );
};
