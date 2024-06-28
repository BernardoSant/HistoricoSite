import styled from "styled-components";
import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../global/Global";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

const BlockConta = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 13em;
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
  font-size: 1vw;
  font-weight: 700;
  @media (min-width: 1640px) {
    font-size: 0.8vw;
  }
  flex: none;
`;

const PConta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 1vw;
  @media (min-width: 1640px) {
    font-size: 0.8vw;
  }
`;

const InputConta = styled.input`
  border-radius: 1em;
  padding-left: 12px;
  padding-right: 12px;
  font-size: 1vw;
  @media (min-width: 1640px) {
    font-size: 0.8vw;
  }
`;

export const TabelaConta = () => {
  const { ip } = useGlobalContext();

  const [data, setData] = useState({
    descricaoConta: "",
    tipoConta: "",
    Conta: "Recorrente",
    frequenciaConta: 0,
    parcelasConta: undefined,
    parcelasPagasConta: undefined,
    dataInConta: "",
    dataFnConta: undefined,
    valorParcelaConta: undefined,
    valorConta: "",
    valorContaInput: "",
  });

  const valorInput = (e) => {
    let valor = e.target.value;
    setData({ ...data, [e.target.name]: valor });
  };

  const valorInputConta = (e) => {
    let valor = e.target.value;
    setData({ ...data, [e.target.name]: valor, valorConta: valor });
  };

  const valorInputContaParcelada = (e) => {
    const hoje = new Date();
    let valor = e.target.value;
    let valorTotal = data.valorParcelaConta * valor;
    let DataIn = new Date(data.dataInConta);
    DataIn.setMonth(DataIn.getMonth() + Number(valor));
    let DataFinal = DataIn.toISOString().slice(0, 10);
    setData({
      ...data,
      [e.target.name]: valor,
      valorConta: valorTotal,
      dataFnConta: DataFinal,
      parcelasPagasConta: 0,
    });
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
    const valor = option.value;
    setData({ ...data, tipoConta: valor });
  };

  const sendConta = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (
      data.descricaoConta === "" ||
      data.dataInConta === "" ||
      data.tipoConta === ""
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    axios
      .post(ip + "/conta", data, headers)
      .then((response) => {
        setSelectedOption(null);
        setData({
          descricaoConta: "",
          tipoConta: "",
          Conta: "Parcelada",
          frequenciaConta: 0,
          parcelasConta: "",
          parcelasPagasConta: "",
          dataInConta: "",
          dataFnConta: "",
          valorParcelaConta: "",
          valorConta: "",
          valorContaInput: "",
        });
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  const [state, setState] = useState({
    TodasConta: false,
    TipodeConta: false,
  });

  const handleTipoConta = (key) => {
    setData((data) =>
      data.Conta === "Recorrente"
        ? { ...data, Conta: "Parcelada", frequenciaConta: 0 }
        : {
            descricaoConta: "",
            tipoConta: "",
            Conta: "Recorrente",
            frequenciaConta: 0,
            parcelasConta: undefined,
            parcelasPagasConta: undefined,
            dataInConta: "",
            dataFnConta: undefined,
            valorParcelaConta: undefined,
            valorConta: "",
            valorContaInput: "",
          }
    );

    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      ...(key !== "TipodeConta" && {
        TipodeConta: false,
      }),
    }));
  };

  const handleFrequenciaConta = () => {
    setData((data) =>
      data.frequenciaConta === 0
        ? { ...data, frequenciaConta: 1 }
        : { ...data, frequenciaConta: 0 }
    );
  };

  const options = [
    {
      value: "Empresa",
      label: (
        <div className="flex justify-start items-center gap-3">
          <PConta className="w-[1vw] h-[1vw] bg-red-500 rounded-full drop-shadow-md"></PConta>
          <PConta>Empresa</PConta>
        </div>
      ),
    },
    {
      value: "Casa",
      label: (
        <div className="flex justify-start items-center gap-3">
          <PConta className="w-[1vw] h-[1vw] bg-yellow-400 rounded-full drop-shadow-md"></PConta>
          <PConta>Casa</PConta>
        </div>
      ),
    },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "20px",
      color: "black",
      fontSize: "1vw",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "orange" : "white",
      color: state.isSelected ? "white" : "black",
    }),
  };

  return (
    <BlockConta>
      <h1 className="flex-none text-center text-[1.1vw] xl:[1.2vw] font-semibold">
        Adicionar Conta
      </h1>
      <div className="flex-none flex flex-col gap-1">
        <form
          id={state.TipodeConta ? "contaParcelada" : "contaRecorrente"}
          onSubmit={sendConta}
        >
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
              isClearable
              value={selectedOption}
              onChange={handleChange}
              name="tipoConta"
              options={options}
            />
          </PConta>
        </form>

        <div className="flex justify-around">
          <div className="flex flex-col justify-center items-center">
            <H1Conta className="text-[0.8vw] xl:[1.2vw] font-semibold flex justify-around w-full">
              <p>Parcelada:</p>
            </H1Conta>
            <div>
              <label className="relative inline-flex items-center cursor-pointer my-2 w-full justify-center">
                <input
                  type="checkbox"
                  onClick={() => handleTipoConta("TipodeConta")}
                  className="sr-only peer"
                />
                <div
                  className="text-sm group peer ring-0 bg-orange-600  
                      rounded-full outline-none duration-300 after:duration-300 w-12 h-6  shadow-md 
                      peer-focus:outline-none   after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-5
                      after:w-5 after:top-0.5 after:left-0.5 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 
                      peer-hover:after:scale-95 peer-checked:after:rotate-0 peer-checked:bg-green-500 "
                ></div>
              </label>
            </div>
          </div>

          {!state.TipodeConta && (
            <div className="flex flex-col justify-center items-center ">
              <H1Conta className="text-[0.8vw] xl:[1.2vw] font-semibold flex justify-around w-full">
                <p>Frequente:</p>
              </H1Conta>

              <div className="pt-3">
                <input
                  type="checkbox"
                  className="ui-checkbox "
                  onClick={() => handleFrequenciaConta()}
                />
              </div>
            </div>
          )}
        </div>

        {!state.TipodeConta ? (
          <form id="contaRecorrente" onSubmit={sendConta}>
            <PConta className="flex flex-col gap-1">
              <H1Conta className="text-[0.8vw] xl:[1.2vw] font-semibold">
                Data:
              </H1Conta>
              <InputConta
                type="date"
                value={data.dataInConta}
                onChange={valorInput}
                name="dataInConta"
                className="rounded-[1em] p-1 px-3"
              />
            </PConta>

            <PConta className="flex flex-col gap-1">
              <H1Conta className="text-[0.8vw] xl:[1.2vw] font-semibold">
                Valor:
              </H1Conta>
              <InputConta
                type="text"
                value={data.valorContaInput}
                onChange={valorInputConta}
                name="valorContaInput"
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
                value={data.dataInConta}
                onChange={valorInput}
                name="dataInConta"
                className="rounded-[1em] p-1 px-3"
              />
            </PConta>

            <PConta className="flex flex-col gap-1">
              <H1Conta className="text-[0.8vw] xl:[1.2vw] font-semibold">
                Valor da Parcela:
              </H1Conta>
              <InputConta
                type="text"
                value={data.valorParcelaConta}
                onChange={valorInput}
                name="valorParcelaConta"
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
                onChange={valorInputContaParcelada}
                name="parcelasConta"
                className="rounded-[1em] p-1 px-3"
              />
            </PConta>
          </form>
        )}
        <input
          type="submit"
          form={state.TipodeConta ? "contaParcelada" : "contaRecorrente"}
          className="bg-green-600 rounded-[1em] p-2 mt-3 font-semibold hover:bg-green-500 hover:scale-95"
        />
      </div>
    </BlockConta>
  );
};
