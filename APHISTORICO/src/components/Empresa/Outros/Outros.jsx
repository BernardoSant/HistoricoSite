import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../global/Global";
import { toast } from "react-toastify";
import {
  HiOutlinePlusSm,
  HiOutlineDocumentDuplicate,
  HiOutlineTrash,
} from "react-icons/hi";
import { RiSaveLine } from "react-icons/ri";
import { LuArrowRightFromLine } from "react-icons/lu";
import { NumericFormat } from "react-number-format";

const Footer = styled.footer`
  height: 100%;
  display: grid;
  padding-bottom: 1.5vw;
  grid-template-rows: 50% 50%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
`;

const Header = styled.header`
  display: flex;
  align-content: center;
  justify-content: center;
  margin-bottom: 12px;
  padding: 8px;
  width: 100%;
  border-radius: 1em;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
`;

const Article = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
`;

const Dir = styled.div`
  border-top-right-radius: 1em;
  border-top-left-radius: 1em;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  background: #f97316;
  box-shadow: inset 3px -3px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
  z-index: 10;
  font-size: 1.2em;
`;

const Div = styled.div`
  height: 100%;
  display: inline-block;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 10px;
  padding-bottom: 5px;
  background-color: #d8d6d679;
  overflow-x: auto;
  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 1em;
  max-height: 22em;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #575757;
    border-radius: 1em;
  }
`;

const H1 = styled.h1`
  width: 100%;
  display: flex;
  flex-direction: space-between;
  font-weight: 700;
`;

const H2 = styled(H1)`
  margin-top: 5px;
  display: grid;
  grid-template-columns: 0.1fr repeat(2, minmax(0, 1fr));
  text-align: center;
  font-weight: 600;
`;

const H3 = styled(H2)`
  grid-template-columns: 0.1fr 1fr 1fr 1fr;
`;

const H5 = styled(H2)`
  grid-template-columns: 0.1fr repeat(5, minmax(0, 1fr));
`;

const P = styled.p`
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const InputDinheiro = styled(NumericFormat)`
  font-size: 0.9em;
  border: 2px solid #5a5a5a;
  background-color: #dfdddd;
  border-radius: 10px;
  padding-left: 8px;
`;

const Input = styled.input`
  font-size: 0.9em;
  border: 2px solid #5a5a5a;
  background-color: #dfdddd;
  border-radius: 10px;
  padding-left: 8px;
`;

export const Outros = () => {
  const { ip, cargo, kinays, impostos } = useGlobalContext();

  const [itenState, setItenState] = useState({});
  const [itenSelecionado, setItenSelecionada] = useState(null);

  const handleSelect = (id) => {
    // Primeiro, crie um novo objeto onde todas as chaves são definidas como false
    const novoEstado = Object.keys(itenState).reduce((obj, key) => {
      obj[key] = false;
      setState((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
      return obj;
    }, {});

    // Em seguida, defina o estado do empregador clicado como true
    novoEstado[id] = true;
    novoEstado[id] = !itenState[id];

    // Finalmente, atualize o estado
    setItenState(novoEstado);
    setItenSelecionada(id);
  };

  const [data, setData] = useState({
    nomeCargo: "",
    salarioCargo: null,
    quantidadeCargo: "0",
    numeroKinay: "",
    descricaoKinay: "",
    porcentagemKinay: "",
    siglaImposto: "",
    porcentagemImposto: "",
  });

  // handleChange
  const valorInput = (e) => {
    const value = e.target.value;

    setData({ ...data, [e.target.name]: value });

    if (e.target.name === "nomeCargo") {
      const parts = valor.split(" - ");
      const idCargos = parts[0];
      const NomeCargo = parts[1];
      setData({
        ...data,
        idCargo: idCargos,
        nomeCargo: NomeCargo,
      });
    }
    if (e.target.name === "descricaoKinay" && state.delKinay) {
      const parts = valor.split(" - ");
      const idKinay = parts[0];
      const descricaosKinay = parts[2];

      setData({
        ...data,
        idKinay: idKinay,
        descricaoKinay: descricaosKinay,
      });
    }
    if (e.target.name === "siglaImposto" && state.delImposto) {
      const parts = valor.split(" - ");
      const idImposto = parts[0];
      const siglaImposto = parts[1];

      setData({
        ...data,
        idImposto: idImposto,
        siglaImposto: siglaImposto,
      });
    }
  };

  const sendCargo = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data.nomeCargo === "" || data.salarioCargo === "") {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    axios
      .post(ip + "/cargo", data, headers)
      .then((response) => {
        toast.success(response.data.message);
        setData({
          nomeCargo: "",
          salarioCargo: null,
          quantidadeCargo: "0",
          numeroKinay: "",
          descricaoKinay: "",
          porcentagemKinay: "",
        });
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  const EdtCargo = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (itenSelecionado === null || data.salarioCargo === "") {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    axios
      .put(
        ip + "/cargo/" + itenSelecionado,
        { salarioCargo: data.salarioCargo },
        headers
      )
      .then((response) => {
        setData({
          salarioCargo: "",
        });
        toast.success(response.data.message);
        setItenSelecionada(null);
        setItenState({});
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  const DelCargo = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (itenSelecionado === null) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    axios
      .delete(ip + "/cargo/" + itenSelecionado, headers)
      .then((response) => {
        toast.success(response.data.message);
        setItenSelecionada(null);
        setItenState({});
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  // Cnae
  //Adcionar CNAE
  const sendKinay = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data.numeroKinay === "" || data.porcentagemKinay === "") {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const dataParaEnviar = {
      ...data,
      porcentagemKinay: data.porcentagemKinay / 100,
    };

    axios
      .post(ip + "/kinay", dataParaEnviar, headers)
      .then((response) => {
        toast.success(response.data.message);
        setData({
          numeroKinay: "",
          descricaoKinay: "",
          porcentagemKinay: "",
        });
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };
  
  const EdtKinay = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (itenSelecionado === null || data.porcentagemKinay === "") {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    axios
      .put(
        ip + "/kinay/" + itenSelecionado,
        { porcentagemKinay: data.porcentagemKinay / 100 },
        headers
      )
      .then((response) => {
        setData({
          porcentagemKinay: "",
        });
        toast.success(response.data.message);
        setItenSelecionada(null);
        setItenState({});
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  const DelKinay = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (itenSelecionado === null) {
      toast.error("Selecione um Cnae para Excluir");
      return;
    }

    axios
      .delete(ip + "/kinay/" + itenSelecionado, headers)
      .then((response) => {
        toast.success(response.data.message);
        setItenSelecionada(null);
        setItenState({});
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };
  const sendImposto = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data.siglaImposto === "" || data.porcentagemImposto === "") {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const dataParaEnviar = {
      ...data,
      porcentagemImposto: data.porcentagemImposto / 100,
    };

    axios
      .post(ip + "/impostos", dataParaEnviar, headers)
      .then((response) => {
        toast.success(response.data.message);
        setData({
          siglaImposto: "",
          porcentagemImposto: "",
        });
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  const edtImposto = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (itenSelecionado === null || data.porcentagemImposto === "") {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    axios
      .put(
        ip + "/impostos/" + itenSelecionado,
        { porcentagemImposto: data.porcentagemImposto / 100 },
        headers
      )
      .then((response) => {
        setData({
          porcentagemImposto: "",
        });
        toast.success(response.data.message);
        setItenSelecionada(null);
        setItenState({});
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  const delImposto = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (itenSelecionado === "") {
      toast.error("Por favor, Selecione um imposto para excluir");
      return;
    }

    axios
      .delete(ip + "/impostos/" + itenSelecionado, headers)
      .then((response) => {
        toast.success(response.data.message);
        setItenSelecionada(null);
        setItenState({});
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  const [state, setState] = useState({
    addCargo: false,
    edtCargo: false,
    delCargo: false,
    addKinay: false,
    delKinay: false,
    edtKinay: false,
    addImposto: false,
    delImposto: false,
    edtImposto: false,
  });

  const handleClick = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      ...(key !== "addCargo" && {
        addCargo: false,
      }),
      ...(key !== "edtCargo" && {
        edtCargo: false,
      }),
      ...(key !== "delCargo" && {
        delCargo: false,
      }),

      ...(key !== "addKinay" && {
        addKinay: false,
      }),
      ...(key !== "delKinay" && {
        delKinay: false,
      }),

      ...(key !== "addImposto" && {
        addImposto: false,
      }),
      ...(key !== "delImposto" && {
        delImposto: false,
      }),
    }));

    setItenSelecionada(null);
    setItenState({});

    setData({
      nomeCargo: "",
      salarioCargo: "",
      quantidadeCargo: "0",
      numeroKinay: "",
      descricaoKinay: "",
      porcentagemKinay: "",
      siglaImposto: "",
      porcentagemImposto: "",
    });
  };

  return (
    <div className="h-full w-full flex flex-col ">
      <Header>
        <h1 className=" w-full text-center text-3xl flex justify-center items-center font-bold">
          Outros
        </h1>
      </Header>

      <Footer>
        <Article className="col-span-2 row-span-1">
          <Dir>
            <div className="flex flex-row justify-between items-center py-1">
              <H1 className="flex-auto">
                {state.addCargo ? (
                  <form
                    id="addCargoForm"
                    onSubmit={sendCargo}
                    className="grid grid-cols-2 gap-3 pr-2"
                  >
                    <Input
                      type="text"
                      name="nomeCargo"
                      placeholder="Cargo"
                      onChange={valorInput}
                      value={data.nomeCargo}
                    />

                    <InputDinheiro
                      placeholder="Salario"
                      value={data.salarioCargo || ""}
                      onValueChange={(e) => {
                        setData({
                          ...data,
                          salarioCargo: e.floatValue,
                        });
                      }}
                      thousandSeparator="."
                      decimalScale={2}
                      fixedDecimalScale
                      decimalSeparator=","
                    />
                  </form>
                ) : state.edtCargo ? (
                  <form id="edtCargoForm" onSubmit={EdtCargo} className="pr-2">
                    <InputDinheiro
                      placeholder="Salario"
                      value={data.salarioCargo || ""}
                      onValueChange={(e) => {
                        setData({
                          ...data,
                          salarioCargo: e.floatValue,
                        });
                      }}
                      thousandSeparator="."
                      decimalScale={2}
                      fixedDecimalScale
                      decimalSeparator=","
                    />
                  </form>
                ) : state.delCargo ? (
                  <form
                    onSubmit={DelCargo}
                    id="delCargoForm"
                    className="grid grid-cols-2 gap-3 pr-2"
                  >
                    <>Selecione o Cargo</>
                  </form>
                ) : (
                  <p>Cargo</p>
                )}
              </H1>

              <nav className="flex flex-col md:flex-row  gap-2 justify-end text-[1rem]">
                {state.addCargo || state.edtCargo || state.delCargo ? (
                  <button
                    className={`flex-1 p-1 rounded-full bg-gray-200 cursor-pointer drop-shadow-lg`}
                    title={
                      state.addCargo
                        ? "Salvar"
                        : state.edtCargo
                        ? "Atualizar"
                        : "Excluir"
                    }
                    type="submit"
                    form={
                      state.addCargo
                        ? "addCargoForm"
                        : state.edtCargo
                        ? "edtCargoForm"
                        : "delCargoForm"
                    }
                  >
                    <RiSaveLine />
                  </button>
                ) : null}

                <button
                  className={`p-1 rounded-full bg-red-600 cursor-pointer drop-shadow-lg text-[1.2em] 
                  ${state.addCargo ? "hidden" : ""} ${
                    state.edtCargo ? "hidden" : ""
                  } ${state.delCargo ? "bg-red-600" : ""}`}
                  title={`${state.delCargo ? "Voltar" : "Excluir"}`}
                  onClick={() => handleClick("delCargo")}
                >
                  {state.delCargo ? (
                    <LuArrowRightFromLine />
                  ) : (
                    <HiOutlineTrash />
                  )}
                </button>

                <button
                  className={`p-1 rounded-full bg-green-600 cursor-pointer drop-shadow-lg text-[1.2em] 
                  ${state.addCargo ? "hidden" : ""} ${
                    state.delCargo ? "hidden" : ""
                  } ${state.edtCargo ? "bg-red-600" : ""}`}
                  title={`${state.edtCargo ? "Voltar" : "Alterar"}`}
                  onClick={() => handleClick("edtCargo")}
                >
                  {state.edtCargo ? (
                    <LuArrowRightFromLine />
                  ) : (
                    <HiOutlineDocumentDuplicate />
                  )}
                </button>

                <button
                  className={`p-1 rounded-full bg-gray-300 cursor-pointer drop-shadow-lg text-[1.2em] 
                  ${state.delCargo ? "hidden" : ""} ${
                    state.edtCargo ? "hidden" : ""
                  } ${state.addCargo ? "bg-red-600" : ""}`}
                  title={`${state.addCargo ? "Voltar" : "Adicionar"}`}
                  onClick={() => handleClick("addCargo")}
                >
                  {state.addCargo ? (
                    <LuArrowRightFromLine />
                  ) : (
                    <HiOutlinePlusSm />
                  )}
                </button>
              </nav>
            </div>

            <H3 className="text-[0.9em]">
              <P></P>
              <P>Nome</P>
              <P>Salario</P>
              <P>Quantidade</P>
            </H3>
          </Dir>
          <Div>
            {cargo.map((cargo) => {
              return (
                <H3
                  key={cargo.id}
                  onClick={() => handleSelect(cargo.id)}
                  className={`text-[0.9em] bg-slate-300 rounded-[1em] ${
                    state.delCargo || state.edtCargo ? "cursor-pointer" : ""
                  } `}
                >
                  <P className="relative flex justify-center items-center">
                    {state.edtCargo || state.delCargo ? (
                      <div className="absolute bg-white h-[1em] w-[1em] rounded-full flex justify-center items-center">
                        {itenState[cargo.id] && (
                          <div className="bg-green-500 w-[0.7em] h-[0.7em] rounded-full"></div>
                        )}
                      </div>
                    ) : null}
                  </P>
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
        </Article>

        <Article className="col-span-1 row-span-1">
          <Dir>
            <H1>Transporte</H1>
            <H3 className="text-[0.9em]">
              <P></P>
              <P>Nome/Cargo</P>
              <P>Salario</P>
              <P>Quantidade</P>
            </H3>
          </Dir>
          <Div>Planejar oque vai fazer aq</Div>

          <Dir className="mt-3">
            <H1>Alimentação</H1>
            <H3 className="text-[0.9em]">
              <P></P>
              <P>Nome/Cargo</P>
              <P>Salario</P>
              <P>Quantidade</P>
            </H3>
          </Dir>
          <Div>Planejar oque vai fazer aq</Div>
        </Article>

        <Article className="col-span-2 row-span-1 ">
          <Dir>
            <div className="flex flex-row justify-between items-center py-1">
              <H1 className="flex-auto">
                {state.addKinay ? (
                  <form
                    id="addKinayForm"
                    onSubmit={sendKinay}
                    className="grid grid-cols-4 gap-3 pr-2"
                  >
                    <Input
                      type="number"
                      name="numeroKinay"
                      placeholder="Numero"
                      onChange={valorInput}
                      value={data.numeroKinay}
                      className="col-span-1 "
                    />

                    <Input
                      type="text"
                      name="descricaoKinay"
                      onChange={valorInput}
                      placeholder="Descrição"
                      value={data.descricaoKinay}
                      className="col-span-2"
                    />

                    <Input
                      type="number"
                      name="porcentagemKinay"
                      placeholder="Porcentagem EX: 0.0"
                      onChange={valorInput}
                      value={data.porcentagemKinay}
                      className="col-span-1"
                    />
                  </form>
                ) : state.delKinay ? (
                  <form onSubmit={DelKinay} id="delkinayForm">
                    <>Selecione um Cnae</>
                  </form>
                ) : state.edtKinay ? (
                  <form id="edtKinayForm" onSubmit={EdtKinay} className="pr-2">
                    <InputDinheiro
                      placeholder="Porcentagem"
                      value={data.porcentagemKinay || ""}
                      onValueChange={(e) => {
                        setData({
                          ...data,
                          porcentagemKinay: e.floatValue,
                        });
                      }}
                      decimalScale={2}
                      fixedDecimalScale
                      decimalSeparator=","
                    />
                  </form>
                ) : (
                  <p>Cnae</p>
                )}
              </H1>

              <nav className="flex flex-col md:flex-row  gap-2 justify-end text-[1rem]">
                {state.addKinay || state.delKinay || state.edtKinay ? (
                  <button
                    className={`flex-1 p-1 rounded-full bg-gray-200 cursor-pointer drop-shadow-lg`}
                    title={
                      state.addKinay || state.edtKinay ? "Salvar" : "Excluir"
                    }
                    type="submit"
                    form={
                      state.addKinay
                        ? "addKinayForm"
                        : state.delKinay
                        ? "delkinayForm"
                        : "edtKinayForm"
                    }
                  >
                    <RiSaveLine />
                  </button>
                ) : null}

                <button
                  className={`p-1 rounded-full bg-red-600 cursor-pointer drop-shadow-lg text-[1.2em] 
                  ${state.addKinay || state.edtKinay ? "hidden" : ""} ${
                    state.delKinay ? "bg-red-600" : ""
                  }`}
                  title={`${state.delKinay ? "Voltar" : "Excluir"}`}
                  onClick={() => handleClick("delKinay")}
                >
                  {state.delKinay ? (
                    <LuArrowRightFromLine />
                  ) : (
                    <HiOutlineTrash />
                  )}
                </button>

                <button
                  className={`p-1 rounded-full bg-green-600 cursor-pointer drop-shadow-lg text-[1.2em] 
                  ${state.addKinay ? "hidden" : ""} ${
                    state.delKinay ? "hidden" : ""
                  } ${state.edtKinay ? "bg-red-600" : ""}`}
                  title={`${state.edtKinay ? "Voltar" : "Alterar"}`}
                  onClick={() => handleClick("edtKinay")}
                >
                  {state.edtKinay ? (
                    <LuArrowRightFromLine />
                  ) : (
                    <HiOutlineDocumentDuplicate />
                  )}
                </button>

                <button
                  className={`p-1 rounded-full bg-gray-300 cursor-pointer drop-shadow-lg text-[1.2em] 
                  ${state.delKinay || state.edtKinay ? "hidden" : ""} ${
                    state.addKinay ? "bg-red-600" : ""
                  }`}
                  title={`${state.addKinay ? "Voltar" : "Adicionar"}`}
                  onClick={() => handleClick("addKinay")}
                >
                  {state.addKinay ? (
                    <LuArrowRightFromLine />
                  ) : (
                    <HiOutlinePlusSm />
                  )}
                </button>
              </nav>
            </div>

            <H5 className=" text-[0.9em]">
              <P></P>
              <P className="col-span-1">Numero</P>
              <P className="col-span-3">Descrição</P>
              <P className="col-span-1">Porcentagem</P>
            </H5>
          </Dir>
          <Div>
            {kinays.map((kinay) => {
              return (
                <H5
                  key={kinay.id}
                  onClick={() => handleSelect(kinay.id)}
                  className={`text-[0.9em] bg-slate-300 rounded-[1em] ${
                    state.delKinay || state.edtKinay ? "cursor-pointer" : ""
                  } `}
                >
                  <P className="relative flex justify-center items-center ml-1">
                    {state.edtKinay || state.delKinay ? (
                      <div className="absolute bg-white h-[1em] w-[1em] rounded-full flex justify-center items-center">
                        {itenState[kinay.id] && (
                          <div className="bg-green-500 w-[0.7em] h-[0.7em] rounded-full"></div>
                        )}
                      </div>
                    ) : null}
                  </P>
                  <P className="col-span-1 flex justify-center items-center">
                    {kinay.numeroKinay}
                  </P>
                  <P
                    className="col-span-3 cursor-pointer"
                    title={kinay.descricaoKinay}
                  >
                    {kinay.descricaoKinay}
                  </P>
                  <P className="col-span-1">{kinay.porcentagemKinay * 100}%</P>
                </H5>
              );
            })}
          </Div>
        </Article>

        <Article className="col-span-1  row-span-1">
          <Dir>
            <div className="flex flex-row justify-between items-center py-1">
              <H1 className="flex-auto">
                {state.addImposto ? (
                  <form
                    id="addImpostoForm"
                    onSubmit={sendImposto}
                    className="grid grid-cols-2 gap-3 pr-2"
                  >
                    <Input
                      type="text"
                      name="siglaImposto"
                      placeholder="Ex: INSS"
                      onChange={valorInput}
                      value={data.siglaImposto}
                      className="col-span-1"
                    />

                    <Input
                      type="text"
                      name="porcentagemImposto"
                      placeholder="Ex: 0.0"
                      onChange={valorInput}
                      value={data.porcentagemImposto}
                      className="col-span-1"
                    />
                  </form>
                ) : state.delImposto ? (
                  <form onSubmit={delImposto} id="delImpostoForm">
                    <>Selecione um Imposto</>
                  </form>
                ) : state.edtImposto ? (
                  <form
                    id="edtImpostoForm"
                    onSubmit={edtImposto}
                    className="pr-2"
                  >
                    <InputDinheiro
                      placeholder="Porcentagem"
                      value={data.porcentagemImposto || ""}
                      onValueChange={(e) => {
                        setData({
                          ...data,
                          porcentagemImposto: e.floatValue,
                        });
                      }}
                      decimalScale={2}
                      fixedDecimalScale
                      decimalSeparator=","
                    />
                  </form>
                ) : (
                  <p>Impostos</p>
                )}
              </H1>

              <nav className="flex flex-col md:flex-row  gap-2 justify-end text-[1rem]">
                {state.addImposto || state.delImposto || state.edtImposto ? (
                  <button
                    className={`flex-1 p-1 rounded-full bg-gray-200 cursor-pointer drop-shadow-lg`}
                    title={
                      state.addImposto || state.edtImposto
                        ? "Salvar"
                        : "Excluir"
                    }
                    type="submit"
                    form={
                      state.addImposto
                        ? "addImpostoForm"
                        : state.edtImposto
                        ? "edtImpostoForm"
                        : "delImpostoForm"
                    }
                  >
                    <RiSaveLine />
                  </button>
                ) : null}

                <button
                  className={`p-1 rounded-full bg-red-600 cursor-pointer drop-shadow-lg text-[1.2em] 
                  ${state.addImposto || state.edtImposto ? "hidden" : ""} ${
                    state.delImposto ? "bg-red-600" : ""
                  }`}
                  title={`${state.delImposto ? "Voltar" : "Excluir"}`}
                  onClick={() => handleClick("delImposto")}
                >
                  {state.delImposto ? (
                    <LuArrowRightFromLine />
                  ) : (
                    <HiOutlineTrash />
                  )}
                </button>

                <button
                  className={`p-1 rounded-full bg-green-600 cursor-pointer drop-shadow-lg text-[1.2em] 
                  ${state.addImposto ? "hidden" : ""} ${
                    state.delImposto ? "hidden" : ""
                  } ${state.edtImposto ? "bg-red-600" : ""}`}
                  title={`${state.edtImposto ? "Voltar" : "Alterar"}`}
                  onClick={() => handleClick("edtImposto")}
                >
                  {state.edtImposto ? (
                    <LuArrowRightFromLine />
                  ) : (
                    <HiOutlineDocumentDuplicate />
                  )}
                </button>

                <button
                  className={`p-1 rounded-full bg-gray-300 cursor-pointer drop-shadow-lg text-[1.2em] 
                  ${state.delImposto || state.edtImposto ? "hidden" : ""} ${
                    state.addImposto ? "bg-red-600" : ""
                  }`}
                  title={`${state.addImposto ? "Voltar" : "Adicionar"}`}
                  onClick={() => handleClick("addImposto")}
                >
                  {state.addImposto ? (
                    <LuArrowRightFromLine />
                  ) : (
                    <HiOutlinePlusSm />
                  )}
                </button>
              </nav>
            </div>

            <H2 className="text-[0.9em]">
              <P></P>
              <P className="col-span-1">Sigla</P>
              <P className="col-span-1">Porcentagem</P>
            </H2>
          </Dir>
          <Div>
            {impostos.map((impt) => {
              return (
                <H2
                  key={impt.id}
                  onClick={() => handleSelect(impt.id)}
                  className={`text-[0.9em] bg-slate-300 rounded-[1em] ${
                    state.delImposto || state.edtImposto ? "cursor-pointer" : ""
                  } `}
                >
                  <P className="relative flex justify-center items-center ml-1">
                    {state.edtImposto || state.delImposto ? (
                      <div className="absolute bg-white h-[1em] w-[1em] rounded-full flex justify-center items-center">
                        {itenState[impt.id] && (
                          <div className="bg-green-500 w-[0.7em] h-[0.7em] rounded-full"></div>
                        )}
                      </div>
                    ) : null}
                  </P>
                  <P className="col-span-1">{impt.siglaImposto}</P>
                  <P className="col-span-1">{impt.porcentagemImposto * 100}%</P>
                </H2>
              );
            })}
          </Div>
        </Article>
      </Footer>
    </div>
  );
};
