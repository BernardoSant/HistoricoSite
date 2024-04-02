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
  height: 100%;
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
  font-size: 1vw;
  font-weight: 700;
  @media (min-width: 1640px) {
    font-size: 0.8vw;
  }
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
  const { ip, conta } = useGlobalContext();

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

  const handleChange = (selectedOption) => {
    const valor = selectedOption.value;
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
      data.dataInicioConta === "" ||
      data.tipoConta === "" ||
      data.valorConta === ""
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    axios
      .post(ip + "/conta", data, headers)
      .then((response) => {
        setData({
          descricaoConta: "",
          tipoConta: "ads",
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
    TodasConta: false,
    TipodeConta: false,
  });

  const handleTipoConta = (key) => {
    setData((data) =>
      data.estadoConta === "Recorrente"
        ? { ...data, estadoConta: "Parcelada" }
        : { ...data, estadoConta: "Recorrente" }
    );

    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      ...(key !== "TipodeConta" && {
        TipodeConta: false,
      }),
    }));
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

  const contasEmpresasParcelada = conta.filter(
    (cont) => cont.tipoConta === "Empresa" && cont.estadoConta === "Parcelada"
  );

  const contasCasaParcelada = conta.filter(
    (cont) => cont.tipoConta === "Casa" && cont.estadoConta === "Parcelada"
  );

  const contasEmpresasRecorrente = conta.filter(
    (cont) => cont.tipoConta === "Empresa" && cont.estadoConta === "Recorrente"
  );

  const contasCasaRecorrente = conta.filter(
    (cont) => cont.tipoConta === "Casa" && cont.estadoConta === "Recorrente"
  );

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
              defaultValue={data.tipoConta}
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
          <label className="relative inline-flex items-center cursor-pointer my-2 ml-2">
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
          form={state.TipodeConta ? "contaParcelada" : "contaRecorrente"}
          className="bg-green-600 rounded-[1em] p-2 mt-3 font-semibold hover:bg-green-500 hover:scale-95"
        />
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div className="h-[19vw] w-full">
          {state.TodasConta && (
            <div className="bg-[#c2c2c2] flex flex-col justify-center items-center rounded-[1em] pb-2 px-2 h-full w-full">
              <h1 className=" text-[0.9vw] xl:[1.2vw] font-semibold pt-2">
                Todas as Contas
              </h1>

              <div className="overflow-auto h-full w-full px-2">
                {contasCasaRecorrente.map((conta) => (
                  <div
                    key={conta.id}
                    className="flex flex-row justify-between w-full gap-1"
                  >
                    <h1 className="text-[0.8vw] xl:[1.2vw] font-semibold">
                      {conta.descricaoConta}
                    </h1>
                    <h1 className="text-[0.8vw] xl:[1.2vw] font-semibold">
                      {conta.valorConta}
                    </h1>
                  </div>
                ))}

                {contasCasaParcelada.map((conta) => (
                  <div
                    key={conta.id}
                    className="flex flex-row justify-between w-full gap-1"
                  >
                    <h1 className="text-[0.8vw] xl:[1.2vw] font-semibold">
                      {conta.descricaoConta}
                    </h1>
                    <h1 className="text-[0.8vw] xl:[1.2vw] font-semibold">
                      {conta.valorConta}
                    </h1>
                  </div>
                ))}

                {contasEmpresasParcelada.map((conta) => (
                  <div
                    key={conta.id}
                    className="flex flex-row justify-between w-full gap-1"
                  >
                    <h1 className="text-[0.8vw] xl:[1.2vw] font-semibold">
                      {conta.descricaoConta}
                    </h1>
                    <h1 className="text-[0.8vw] xl:[1.2vw] font-semibold">
                      {conta.valorConta}
                    </h1>
                  </div>
                ))}
                {contasEmpresasParcelada.map((conta) => (
                  <div
                    key={conta.id}
                    className="flex flex-row justify-between w-full gap-1"
                  >
                    <h1 className="text-[0.8vw] xl:[1.2vw] font-semibold">
                      {conta.descricaoConta}
                    </h1>
                    <h1 className="text-[0.8vw] xl:[1.2vw] font-semibold">
                      {conta.valorConta}
                    </h1>
                  </div>
                ))}
                {contasEmpresasParcelada.map((conta) => (
                  <div
                    key={conta.id}
                    className="flex flex-row justify-between w-full gap-1"
                  >
                    <h1 className="text-[0.8vw] xl:[1.2vw] font-semibold">
                      {conta.descricaoConta}
                    </h1>
                    <h1 className="text-[0.8vw] xl:[1.2vw] font-semibold">
                      {conta.valorConta}
                    </h1>
                  </div>
                ))}
                {contasEmpresasRecorrente.map((conta) => (
                  <div
                    key={conta.id}
                    className="flex flex-row justify-between w-full gap-1"
                  >
                    <h1 className="text-[0.8vw] xl:[1.2vw] font-semibold">
                      {conta.descricaoConta}
                    </h1>
                    <h1 className="text-[0.8vw] xl:[1.2vw] font-semibold">
                      {conta.valorConta}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          className={`bg-[#c2c2c2] hover:bg-[#acacac] rounded-[1em] mt-2 py-[2px] font-semibold flex justify-center items-center `}
          onClick={() => handleTipoConta("TodasConta")}
        >
          <p>{state.TodasConta ? <BsCaretDownFill /> : <BsCaretUpFill />}</p>
        </button>
      </div>
    </BlockConta>
  );
};
