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

const BlockConta = styled.div`
  position: absolute;
  height: auto;
  width: 13.05em;
  margin-left: 3.25em;
  z-index: 30;
  border-top-right-radius: 1em;
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 12px;
  padding-bottom: 20px;
  background-color: #d6d6d6;
  --tw-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast)
    var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate)
    var(--tw-sepia) var(--tw-drop-shadow);
`;

const H1Conta = styled.div`
  font-size: 1.2vw;
  font-weight: 700;
  @media (min-width: 1640px) {
    font-size: 0.8vw;
  }
`;

const PConta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InputConta = styled.input`
  border-radius: 1em;
  padding-left: 12px;
  padding-right: 12px;
  font-size: 1.2vw;
  @media (min-width: 1640px) {
    font-size: 0.8vw;
  }
`;

export const Inicio = () => {
  const [data, setData] = useState({
    descricaoConta: "",
    tipoConta: "",
    estadoConta: "Recorrente",
    parcelasConta: 0,
    dataInicioConta: "",
    valorConta: "",
  });

  const valorInput = (e) => {
    let valor = e.target.value;
    setData({ ...data, [e.target.name]: valor });
  };

  const sendConta = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(data);
    axios
      .post(ip + "/conta", data, headers)
      .then((response) => {
        setData({
          descricaoConta: "",
          tipoConta: "",
          estadoConta: "",
          parcelasConta: 0,
          dataInicioConta: "",
          valorConta: "",
        });

        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  const [state, setState] = useState({
    Inicio: true,
    Empresa: false,
    Casa: false,
    Conta: false,
    TipodeConta: false,
  });

  const handleClick2 = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      ...(key !== "TipodeConta" && {
        TipodeConta: false,
      }),
    }));
    setData({
      descricaoConta: "",
      tipoConta: "",
      estadoConta: "",
      parcelasConta: 0,
      dataInicioConta: "",
      valorConta: "",
    });
  };

  const handleClick = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: true,
      ...(key !== "Inicio" && { Inicio: false }),
      ...(key !== "Empresa" && { Empresa: false }),
      ...(key !== "Casa" && { Casa: false }),
    }));
    setData({
      descricaoConta: "",
      tipoConta: "",
      estadoConta: "",
      parcelasConta: 0,
      dataInicioConta: "",
      valorConta: "",
    });
  };

  const handleTipoConta = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      ...(key !== "TipodeConta" && {
        TipodeConta: false,
      }),
    }));
    setData({
      descricaoConta: "",
      tipoConta: "",
      estadoConta: "",
      parcelasConta: 0,
      dataInicioConta: "",
      valorConta: "",
    });
  };

  const options = [
    {
      value: "Empresa",
      label: (
        <div className="flex  items-center gap-3 font-semibold">
          <PConta className="h-[1vw] w-[1vw] rounded-full bg-orange-600 drop-shadow-md"></PConta>
          <PConta>Empresa</PConta>
        </div>
      ),
    },
    {
      value: "Casa",
      label: (
        <div className="flex  items-center gap-3 font-semibold">
          <PConta className="h-[1vw] w-[1vw] rounded-full bg-yellow-400 drop-shadow-md"></PConta>
          <PConta>Casa</PConta>
        </div>
      ),
    },
  ];

  const handleChange = (tipoConta) => {
    setData(tipoConta);
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
                "bg-[#d6d6d6] rounded-bl-[0.8em] rounded-tl-[0.8em] mt-1"
              } cursor-pointer`}
              onClick={() => handleClick2("Conta")}
            >
              <BsPlus />
            </Div2>
          </Div>

          {state.Conta && (
            <BlockConta>
              <h1 className="text-center text-[1.1vw] xl:[1.2vw] font-semibold">
                Adicionar Conta
              </h1>
              <div className="flex flex-col gap-1">
                <form id={state.TipodeConta ? "contaParcelada" : "contaRecorrente" } onSubmit={sendConta}>
                  <PConta className="flex flex-col gap-1">
                    <H1Conta className="text-[0.8vw] md:[0.9vw] xl:[1.2vw] font-semibold">
                      Descrição:
                    </H1Conta>
                    <InputConta
                      type="text"
                      className="rounded-[1em] p-1 px-3"
                      onChange={valorInput}
                      value={data.descricaoConta}
                      name="descricaoConta"
                    />
                  </PConta>
                  <PConta className="flex flex-col gap-1">
                    <H1Conta className="text-[0.8vw] xl:[1.2vw] font-semibold">
                      Tipo:
                    </H1Conta>

                    <Select
                      styles={customStyles}
                      value={data.tipoConta}
                      onChange={handleChange}
                      name="tipoConta"
                      options={options}
                    />
                  </PConta>
                </form>
                <PConta className="justify-center items-start">
                  <H1Conta className="text-[0.8vw] xl:[1.2vw] font-semibold">
                    Parcelada:
                  </H1Conta>
                  <label class="relative inline-flex items-center cursor-pointer my-2 ml-2">
                    <input
                      type="checkbox"
                      onClick={() => handleTipoConta("TipodeConta")}
                      class="sr-only peer"
                    />
                    <div
                      class="text-sm group peer ring-0 bg-orange-600 
                      rounded-full outline-none duration-300 after:duration-300 w-12 h-6  shadow-md 
                      peer-focus:outline-none   after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-5
                      after:w-5 after:top-0.5 after:left-0.5 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 
                      peer-hover:after:scale-95 peer-checked:after:rotate-0 peer-checked:bg-green-500 "
                    ></div>
                  </label>
                </PConta>

                {!state.TipodeConta ? (
                  <form id="contaRecorrente" onSubmit={sendConta}>
                    <PConta className="flex flex-col gap-1">
                      <H1Conta className="text-[0.8vw] xl:[1.2vw] font-semibold">
                        Data:
                      </H1Conta>
                      <InputConta
                        type="date"
                        value={data.dataInicioConta}
                        onChange={valorInput}
                        name="dataInicioConta"
                        className="rounded-[1em] p-1 px-3"
                      />
                    </PConta>

                    <PConta className="flex flex-col gap-1">
                      <H1Conta className="text-[0.8vw] xl:[1.2vw] font-semibold">
                        Valor:
                      </H1Conta>
                      <InputConta
                        type="text"
                        value={data.valorConta}
                        onChange={valorInput}
                        name="valorConta"
                        className="rounded-[1em] p-1 px-3"
                      />
                    </PConta>
                  </form>
                ) : (
                  <form id="contaParcelada" onSubmit={sendConta}>
                    <PConta className="flex flex-col gap-1">
                      <H1Conta className="text-[0.8vw] xl:[1.2vw] font-semibold">
                        Data:
                      </H1Conta>
                      <InputConta
                        type="date"
                        value={data.dataInicioConta}
                        onChange={valorInput}
                        name="dataInicioConta"
                        className="rounded-[1em] p-1 px-3"
                      />
                    </PConta>

                    <PConta className="flex flex-col gap-1">
                      <H1Conta className="text-[0.8vw] xl:[1.2vw] font-semibold">
                        Valor da Parcela:
                      </H1Conta>
                      <InputConta
                        type="text"
                        value={data.valorConta}
                        onChange={valorInput}
                        name="valorConta"
                        className="rounded-[1em] p-1 px-3"
                      />
                    </PConta>

                    <PConta className="flex flex-col gap-1">
                      <H1Conta className="text-[0.8vw] xl:[1.2vw] font-semibold">
                        Parcelas:
                      </H1Conta>
                      <InputConta
                        type="number"
                        value={data.parcelasConta}
                        onChange={valorInput}
                        name="parcelasConta"
                        className="rounded-[1em] p-1 px-3"
                      />
                    </PConta>
                  </form>
                )}
                <input
                  type="submit"
                  form={
                    state.TipodeConta ? "contaParcelada" : "contaRecorrente"
                  }
                  className="bg-green-600 rounded-[1em] p-2 mt-3 font-semibold hover:bg-green-500 hover:scale-95"
                />
              </div>
            </BlockConta>
          )}
        </Nav>

        {state.Inicio && <Dashboard />}
        {state.Empresa && <Empresa />}
        {state.Casa && <Casa />}
      </Header>
    </>
  );
};
