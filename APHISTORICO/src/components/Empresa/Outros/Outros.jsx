import styled from "styled-components";
import { useGlobalContext } from "../../../global/Global";
import { realFormat } from "../../../functions/realFormat";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {
  HiOutlinePlusSm,
  HiOutlineDocumentDuplicate,
  HiOutlineTrash,
} from "react-icons/hi";
import { RiSaveLine } from "react-icons/ri";
import { LuArrowRightFromLine } from "react-icons/lu";
import { NumericFormat } from "react-number-format";
import axios from "axios";

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.6vw;
  padding: 12px;
  padding-left: 1em;
  padding-right: 1em;
  font-weight: 600;
  border-radius: 0.4em;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.2vw;
  padding: 5px;
  font-weight: 600;
  border-radius: 0.7em;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 12px;
  font-size: 1vw;
`;

const Article = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 5px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8f8f8f;
    border-radius: 1em;
  }
`;

const H1 = styled.h1`
  width: 100%;
  display: flex;
  flex-direction: space-between;
  font-weight: 700;
`;

const Input = styled.input`
  max-width: 10em;
  text-align: center;
  align-items: center;
  border-radius: 0.5em;
  border: solid 2px #575757;
`;

const InputDinheiro = styled(NumericFormat)`
  max-width: 10em;
  text-align: center;
  align-items: center;
  border-radius: 0.5em;
  border: solid 2px #575757;
`;

const SectionBlock = styled.div`
  flex: 1 1 0%;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 12px;
  max-height: 45%;
`;

const ArticleBlock = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  background-color: #d8d6d679;
`;

const HeaderDados = styled.div`
  position: sticky;
  top: 0;
  flex: 0 1 auto;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-top-right-radius: 0.7em;
  border-top-left-radius: 0.7em;
  border-bottom-right-radius: 0.2em;
  border-bottom-left-radius: 0.2em;
  z-index: 10;
  background: #f97316;
`;

const ArticleDados = styled.div`
  flex: 0 1 auto;
  display: flex;
  background-color: #d8d6d679;
  flex-direction: column;
  font-size: 0.8vw;
  font-weight: bolder;
  padding-bottom: 2px;
  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 1em;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #575757;
    border-radius: 1em;
  }
`;

const Texto = styled.h1`
  flex: 1 1 0%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextoDesc = styled.h1`
  flex: 1 1 0%;
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TituloDados = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2vw;
  font-weight: 650;
`;

const TituloArgumentos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95vw;
  font-weight: 650;
`;

const ArgumentosDados = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 550;
  border-radius: 1rem;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 3px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  --tw-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: inset 0 2px 4px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  cursor: pointer;
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
    <Section>
      <Header>Outros Cadastros </Header>
      <Article>
        <SectionBlock>
          <ArticleBlock>
            <HeaderDados>
              <TituloDados>
                <div className="flex flex-row justify-between items-center py-1 w-full ">
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
                      <form
                        id="edtKinayForm"
                        onSubmit={EdtKinay}
                        className="pr-2"
                      >
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
                      <>Cnae</>
                    )}
                  </H1>

                  <nav className="flex flex-col md:flex-row  gap-2 justify-end text-[1rem]">
                    {state.addKinay || state.delKinay || state.edtKinay ? (
                      <button
                        className={`flex-1 p-1 rounded-full bg-gray-200 cursor-pointer drop-shadow-lg`}
                        title={
                          state.addKinay || state.edtKinay
                            ? "Salvar"
                            : "Excluir"
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
                      className={`p-1 rounded-full bg-red-600 cursor-pointer drop-shadow-lg 
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
                      className={`p-1 rounded-full bg-green-600 cursor-pointer drop-shadow-lg 
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
                      className={`p-1 rounded-full bg-gray-300 cursor-pointer drop-shadow-lg 
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
              </TituloDados>
              <TituloArgumentos className="px-1">
                <Texto>Numero</Texto>
                <Texto>Descrição</Texto>
                <Texto>Porcentagem</Texto>
              </TituloArgumentos>
            </HeaderDados>

            <ArticleDados className="px-1">
              {kinays.map((kinay) => {
                return (
                  <ArgumentosDados
                    key={kinay.id}
                    onClick={() => handleSelect(kinay.id)}
                    className={`text-[0.9em] bg-slate-300 rounded-[1em] ${
                      state.delKinay || state.edtKinay ? "cursor-pointer" : ""
                    } `}
                  >
                    <Texto className="col-span-1 flex justify-center items-center relative">
                      {kinay.numeroKinay}

                      {state.edtKinay || state.delKinay ? (
                        <div className="absolute bg-white h-[1vw] w-[1vw] rounded-full flex justify-center items-center  left-0">
                          {itenState[kinay.id] && (
                            <div className="bg-green-500 w-[0.6vw] h-[0.6vw] rounded-full"></div>
                          )}
                        </div>
                      ) : null}
                    </Texto>
                    <Texto
                      className="col-span-3 cursor-pointer"
                      title={kinay.descricaoKinay}
                    >
                      {kinay.descricaoKinay}
                    </Texto>
                    <Texto className="col-span-1">
                      {kinay.porcentagemKinay * 100}%
                    </Texto>
                  </ArgumentosDados>
                );
              })}
            </ArticleDados>
          </ArticleBlock>
        </SectionBlock>

        <SectionBlock className="mb-3">
          <ArticleBlock>
            <HeaderDados>
              <TituloDados>
                <div className="flex flex-row justify-between items-center py-1 w-full">
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
                      <form
                        id="edtCargoForm"
                        onSubmit={EdtCargo}
                        className="pr-2"
                      >
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
                      className={`p-1 rounded-full bg-red-600 cursor-pointer drop-shadow-lg
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
                      className={`p-1 rounded-full bg-green-600 cursor-pointer drop-shadow-lg
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
                      className={`p-1 rounded-full bg-gray-300 cursor-pointer drop-shadow-lg
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
              </TituloDados>
              <TituloArgumentos className="px-1">
                <Texto>Crago</Texto>
                <Texto>Salario</Texto>
                <Texto>Quantidade</Texto>
              </TituloArgumentos>
            </HeaderDados>

            <ArticleDados className="px-1">
              {cargo.map((cargo) => {
                return (
                  <ArgumentosDados
                    key={cargo.id}
                    onClick={() => handleSelect(cargo.id)}
                    className={`text-[0.9em] bg-slate-300 rounded-[1em] ${
                      state.delCargo || state.edtCargo ? "cursor-pointer" : ""
                    } `}
                  >
                    <Texto className="relative">
                      {cargo.nomeCargo}{" "}
                      {state.edtCargo || state.delCargo ? (
                        <div className="absolute bg-white h-[1vw] w-[1vw] rounded-full flex justify-center items-center left-0">
                          {itenState[cargo.id] && (
                            <div className="bg-green-500 w-[0.6vw] h-[0.6vw] rounded-full "></div>
                          )}
                        </div>
                      ) : null}
                    </Texto>
                    <Texto>
                      {realFormat(cargo.salarioCargo)}
                    </Texto>
                    <Texto>{cargo.quantidadeCargo}</Texto> 
                  </ArgumentosDados>
                );
              })}
            </ArticleDados>
          </ArticleBlock>

          <ArticleBlock>
            <HeaderDados>
              <TituloDados>
                <div className="flex flex-row justify-between items-center py-1 w-full">
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
                    {state.addImposto ||
                    state.delImposto ||
                    state.edtImposto ? (
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
              </TituloDados>
              <TituloArgumentos className="px-1">
                <Texto>N° Pedido</Texto>
                <Texto>N° Nota</Texto>
                <Texto>V.Recebido</Texto>
              </TituloArgumentos>
            </HeaderDados>

            <ArticleDados className="px-1">
              {" "}
              {impostos.map((impt) => {
                return (
                  <ArgumentosDados
                    key={impt.id}
                    onClick={() => handleSelect(impt.id)}
                    className={`text-[0.9em] bg-slate-300 rounded-[1em] ${
                      state.delImposto || state.edtImposto
                        ? "cursor-pointer"
                        : ""
                    } `}
                  >
                    <Texto className="col-span-1 relative">
                      {impt.siglaImposto}
                      {state.edtImposto || state.delImposto ? (
                        <div className="absolute bg-white h-[1vw] w-[1vw] rounded-full flex justify-center items-center left-0">
                          {itenState[impt.id] && (
                            <div className="bg-green-500 w-[0.7em] h-[0.7em] rounded-full"></div>
                          )}
                        </div>
                      ) : null}
                    </Texto>
                    <Texto className="col-span-1">
                      {impt.porcentagemImposto * 100}%
                    </Texto>
                  </ArgumentosDados>
                );
              })}
            </ArticleDados>
          </ArticleBlock>
        </SectionBlock>
      </Article>
    </Section>
  );
};
