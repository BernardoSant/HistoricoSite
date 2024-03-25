import styled from "styled-components";
import { BsBuildings, BsHouse, BsList, BsBoxSeam } from "react-icons/bs";
import { Empresa } from "../components/Empresa/Pagina/Empresa";
import { Casa } from "../components/Casa/Pagina/Casa";
import { Dashboard } from "../components/Dashboard/Pagina/Dashboard";
import { useState } from "react";

const Nav = styled.nav`
  height: auto;
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
  font-size: 1.3em;
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  padding-left: 5px;
  padding-bottom: 5px;
`;

const Div2 = styled.div`
  text-align: center;
  padding: 10px;
  font-size: 1.3em;
`;

{
  /*const Nav = styled.nav`
height: 100%;
width: 100%;
padding: 3em;
overflow: auto;
`;*/
}
export const Inicio = () => {
  const [state, setState] = useState({
    Inicio: true,
    Empresa: false,
    Casa: false,
  });

  const handleClick = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      ...(key !== "Inicio" && { Inicio: false }),
      ...(key !== "Empresa" && { Empresa: false }),
      ...(key !== "Casa" && { Casa: false }),
    }));
  };

  return (
    <>
      <Header>
        <Nav>
          <Div className="bg-orange-400">
            <Div2
              className={`${
                state.Inicio &&
                "bg-[#fffafa] rounded-bl-[0.8em] rounded-tl-[0.8em]"
              } cursor-pointer`}
              onClick={() => handleClick("Inicio")}
            >
              <BsList />
            </Div2>

            <Div2
              className={`${
                state.Empresa &&
                "bg-[#fffafa] rounded-bl-[0.8em] rounded-tl-[0.8em]"
              } cursor-pointer`}
              onClick={() => handleClick("Empresa")}
            >
              <BsBuildings />
            </Div2>

            <Div2
              className={`${
                state.Casa &&
                "bg-[#fffafa] rounded-bl-[0.8em] rounded-tl-[0.8em]"
              } cursor-pointer`}
              onClick={() => handleClick("Casa")}
            >
              <BsHouse />
            </Div2>
          </Div>
        </Nav>

        {state.Inicio && <Dashboard/>}
        {state.Empresa && <Empresa />}
        {state.Casa && <Casa />}
      </Header>
    </>
  );
};
