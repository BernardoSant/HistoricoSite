import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import { useGlobalContext } from "../../global/Global";
import { toast } from "react-toastify";
import { HiOutlinePlusSm } from "react-icons/hi";
import { RiSaveLine } from "react-icons/ri";
import { LuArrowRightFromLine } from "react-icons/lu";

const Footer = styled.footer`
  height: 100vh;
  width: 100%;
  padding: 1em;
  display: flex;
  justify-content: start;
  align-content: start;
  flex-direction: row;
  gap: 10px;
`;

const Header = styled.header`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 8px;
  width: 100%;
  margin-bottom: 7px;
  border-radius: 1em;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
`;

const Section = styled.section`
  height: 100%;
  display: flex;
  gap: 7px;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1 1 0%;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Dir = styled.div`
  border-top-right-radius: 1em;
  border-top-left-radius: 1em;
  border-bottom-right-radius: 0.3em;
  border-bottom-left-radius: 0.3em;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  background: #f97316;
  box-shadow: inset 3px -3px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
  z-index: 10;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;
  background-color: #d8d6d679;
  margin-top: -15px;
  z-index: 0;
  padding-top: 10px;
  padding-bottom: 5px;
  overflow: auto;
  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 1em;
  flex: 1 1 0%;
`;

const H1 = styled.h1`
  width: 100%;
  display: flex;
  flex-direction: space-between;
  font-weight: 700;
  font-size: larger;
`;

const H2 = styled.h2`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  text-align: center;
  font-weight: 600;
`;

const H3 = styled.h3`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  text-align: center;
  font-weight: 600;
`;

const H4 = styled.h3`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  text-align: center;
  font-weight: 600;
`;

const P = styled.p`
  text-align: center;
  width: 100%;
`;

const Input = styled.input`
  font-size: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 10px;
  padding-left: 8px;
`;

export const Outros = () => {
  const { cargo } = useGlobalContext();

  const [state, setState] = useState({
    addCargo: false,
  });

  const handleClick = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      ...(key !== "addCargo" && { addCargo: false }),
    }));
  };

  return (
    <>
      <Header>
        <h1 className=" w-full text-center text-3xl flex justify-center items-center font-bold">
          Outros
        </h1>
      </Header>
      <Footer>
        <Section>
          <Dir>
            <nav className="relative w-full flex flex-wrap justify-end ml-2 text-[1rem]">
              {state.addCargo && (
                <span
                  className={`absolute p-1 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer mt-[1.7em] xl:mt-0 xl:mr-[1.7em]`}
                  title="Salvar"
                  onClick={() => handleClick("addCargo")}
                >
                  <RiSaveLine />
                </span>
              )}

              <span
                className={`absolute p-1 rounded-full bg-gray-300 flex justify-center items-center cursor-pointer drop-shadow-lg ${
                  state.addCargo ? "bg-red-600" : ""
                }`}
                title={`${state.addCargo ? "Voltar" : "Adicionar"}`}
                onClick={() => handleClick("addCargo")}
              >
                {state.addCargo ? (
                  <LuArrowRightFromLine />
                ) : (
                  <HiOutlinePlusSm />
                )}
              </span>
            </nav>

            <H1 className="">
              {state.addCargo ? (
                <p className="flex flex-row flex-wrap gap-3 items-center justify-start pr-4">
                  <Input type="text" name="nomeCargo" placeholder="Cargo" />
                  <Input
                    type="text"
                    name="salarioCargo"
                    placeholder="Salario"
                  />
                </p>
              ) : (
                <p>Cargo</p>
              )}
            </H1>
            <H3>
              <P>Nome/Cargo</P>
              <P>Salario</P>
              <P>Quantidade</P>
            </H3>
          </Dir>
          <Div>
            {cargo.map((cargo) => {
              return (
                <H3 key={cargo.id}>
                  <P>{cargo.nomeCargo}</P>
                  <P>
                    {Number(cargo.salarioCargo).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </P>
                  <P>{cargo.quantidadeCargo}</P>
                </H3>
              );
            })}
          </Div>

          <Dir>
            <H1>Alimentação</H1>
          </Dir>
          <Div></Div>
        </Section>

        <Section>
          <Dir>
            <H1>Transporte</H1>
          </Dir>
          <Div></Div>

          <Dir>
            <H1>Kinay</H1>
          </Dir>
          <Div></Div>
        </Section>
      </Footer>
    </>
  );
};
