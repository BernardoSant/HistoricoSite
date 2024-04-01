import styled from "styled-components";
import { BsBuildings, BsHouse, BsList, BsPlus } from "react-icons/bs";
import { Empresa } from "../components/Empresa/Pagina/Empresa";
import { Casa } from "../components/Casa/Pagina/Casa";
import { Dashboard } from "../components/Dashboard/Pagina/Dashboard";
import { useState } from "react";
import Select from "react-select";
import { FaBeer, FaCoffee, FaPizzaSlice } from "react-icons/fa";

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

  const options = [
    {
      value: "Empresa",
      label: (
        <div className="flex  items-center gap-3 font-semibold">
          <p className="h-[1vw] w-[1vw] rounded-full bg-orange-600 drop-shadow-md"></p>
          <p>Empresa</p>
        </div>
      ),
    },
    {
      value: "Casa",
      label: (
        <div className="flex  items-center gap-3 font-semibold">
          <p className="h-[1vw] w-[1vw] rounded-full bg-yellow-400 drop-shadow-md"></p>
          <p>Casa</p>
        </div>
      ),
    },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const [selectedOptionIcon, setSelectedOptionIcon] = useState(null);

  const handleChangeIcon = (selectedOptionIcon) => {
    setSelectedOptionIcon(selectedOptionIcon);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "20px",
      color: "black",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "orange" : "white",
      color: state.isSelected ? "white" : "black",
    }),
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

            <Div2
              className={`${
                state.Conta &&
                "bg-gray-300 rounded-bl-[0.8em] rounded-tl-[0.8em] mt-1"
              } cursor-pointer`}
              onClick={() => handleClick2("Conta")}
            >
              <BsPlus />
            </Div2>
          </Div>
          {state.Conta && (
            <nav className="bg-gray-300  h-auto absolute ml-[3.2em] z-30 w-[13.05em] rounded-tr-[1em] rounded-b-[1em] py-3 px-2 pb-5">
              <h1 className="text-center text-[1vw] xl:[1.2vw] font-semibold">
                Adicionar Conta
              </h1>
              <div className="flex flex-col gap-1">
                <p className="flex flex-col gap-1">
                  <div className="text-[0.8vw] xl:[1.2vw] font-semibold">
                    Descrição:
                  </div>
                  <input type="text" className="rounded-[1em] p-1 px-3" />
                </p>
                <p className="flex flex-col gap-1">
                  <div className="text-[0.8vw] xl:[1.2vw] font-semibold">
                    Tipo:
                  </div>

                  <Select
                    styles={customStyles}
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                  />
                </p>
                <p className="flex flex-col gap-1">
                  <div className="text-[0.8vw] xl:[1.2vw] font-semibold">
                    Mensalmente ou Parcelado
                  </div>
                </p>
                <p className="flex flex-col gap-1">
                  <div className="text-[0.8vw] xl:[1.2vw] font-semibold">
                    Data:
                  </div>
                  <input type="date" className="rounded-[1em] p-1 px-3" />
                </p>
                
                <p className="flex flex-col gap-1">
                  <div className="text-[0.8vw] xl:[1.2vw] font-semibold">
                    Parcelas:
                  </div>
                  <input type="number" className="rounded-[1em] p-1 px-3" />
                </p>

                <p className="flex flex-col gap-1">
                  <div className="text-[0.8vw] xl:[1.2vw] font-semibold">
                    Valor:
                  </div>
                  <input type="text" className="rounded-[1em] p-1 px-3" />
                </p>
                <p className="flex flex-col gap-1">
                  <div className="text-[0.8vw] xl:[1.2vw] font-semibold">
                    Valor Parcela:
                  </div>
                  <input type="text" className="rounded-[1em] p-1 px-3" />
                </p>

              </div>
            </nav>
          )}
        </Nav>

        {state.Inicio && <Dashboard />}
        {state.Empresa && <Empresa />}
        {state.Casa && <Casa />}
      </Header>
    </>
  );
};
