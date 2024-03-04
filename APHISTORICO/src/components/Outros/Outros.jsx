import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import { useGlobalContext } from "../../global/Global";
import { toast } from "react-toastify";
import {
  HiOutlinePlusSm,
  HiOutlineDocumentDuplicate,
  HiOutlineTrash,
} from "react-icons/hi";
import { RiSaveLine } from "react-icons/ri";
import { LuArrowRightFromLine } from "react-icons/lu";

const Footer = styled.footer`
  height: 100vh;
  width: 100%;
  padding: 1em;
  display: flex;
  justify-content: start;
  align-content: start;
  flex-direction: column;
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
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1 1 0%;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
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
  font-size: 1.2em;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 20px;
  padding-bottom: 5px;
  background-color: #d8d6d679;
  margin-top: -15px;
  z-index: 0;
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

const H5 = styled.h3`
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
  font-size: 0.9em;
  border: 2px solid #5a5a5a;
  background-color: #dfdddd;
  border-radius: 10px;
  padding-left: 8px;
`;

export const Outros = () => {
  const { cargo, kinays } = useGlobalContext();

  const [data, setData] = useState({
    nomeCargo: "",
    salarioCargo: "",
    quantidadeCargo: "0",
    numeroKinay: "",
    descricaoKinay: "",
    porcentagemKinay: "",
  });
  const valorInput2 = (e) => {
    let valor = e.target.value;
    setData({ ...data, [e.target.name]: valor });
  };

  const valorInput = (e) => {
    let valor = e.target.value;
    let name = e.target.name;
    setData({ ...data, [e.target.name]: valor });

    if ((name === "nomeCargo" && state.delCargo) || state.edtCargo) {
      const parts = valor.split(" - ");
      const idCargo = parts[0];
      const NomeCargo = parts[1];

      setData({
        ...data,
        idCargo: idCargo,
        nomeCargo: NomeCargo,
      });
    }
    if (name === "descricaoKinay" && state.delKinay) {
      const parts = valor.split(" - ");
      const idKinay = parts[0];
      const descricaosKinay = parts[2];

      setData({
        ...data,
        idKinay: idKinay,
        descricaoKinay: descricaosKinay,
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
      .post("http://localhost:3030/cargo", data, headers)
      .then((response) => {
        toast.success(response.data.message);
        setData({
          nomeCargo: "",
          salarioCargo: "",
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

    if (data.nomeCargo === "" || data.salarioCargo === "") {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    axios
      .put("http://localhost:3030/cargo/" + data.idCargo, data, headers)
      .then((response) => {
        setData({
          idCargo: "",
          nomeCargo: "",
          salarioCargo: "",
          quantidadeCargo: "0",
          numeroKinay: "",
          descricaoKinay: "",
          porcentagemKinay: "",
        });
        toast.success(response.data.message);
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

    if (data.nomeCargo === "") {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    axios
      .delete("http://localhost:3030/cargo/" + data.idCargo, headers)
      .then((response) => {
        toast.success(response.data.message);
        setData({
          idCargo: "",
          nomeCargo: "",
          salarioCargo: "",
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
      .post("http://localhost:3030/kinay", dataParaEnviar, headers)
      .then((response) => {
        toast.success(response.data.message);
        setData({
          nomeCargo: "",
          salarioCargo: "",
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


  const DelKinay = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data.descricaoKinay === "") {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    axios
      .delete("http://localhost:3030/kinay/" + data.idKinay, headers)
      .then((response) => {
        setData({
          idKinay: "",
          nomeCargo: "",
          salarioCargo: "",
          quantidadeCargo: "0",
          numeroKinay: "",
          descricaoKinay: "",
          porcentagemKinay: "",
        });
        toast.success(response.data.message);
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
    }));

    setData({
      nomeCargo: "",
      salarioCargo: "",
      quantidadeCargo: "0",
      numeroKinay: "",
      descricaoKinay: "",
      porcentagemKinay: "",
    });
  };

  return (
    <>
      <Header>
        <h1 className=" w-full text-center text-3xl flex justify-center items-center font-bold">
          Outros
        </h1>
      </Header>

      <Footer>
        <Section className="min-h-[21em] max-h-[21em]">
          <Article>
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
                      <Input
                        type="number"
                        name="salarioCargo"
                        placeholder="Salario EX: 00.00"
                        onChange={valorInput2}
                        value={data.salarioCargo}
                      />
                    </form>
                  ) : state.edtCargo ? (
                    <form
                      id="edtCargoForm"
                      onSubmit={EdtCargo}
                      className="grid grid-cols-2 gap-3 pr-2"
                    >
                      <Input
                        type="text"
                        list="deltCargo"
                        name="nomeCargo"
                        placeholder="Selecione o cargo"
                        onChange={valorInput}
                        value={data.nomeCargo}
                      />
                      <datalist id="deltCargo">
                        {cargo.map((cargo) => (
                          <option
                            key={cargo.id}
                            value={`${cargo.id} - ${cargo.nomeCargo}`}
                          />
                        ))}
                      </datalist>

                      <Input
                        type="number"
                        name="salarioCargo"
                        placeholder="Atualizar Salario "
                        onChange={valorInput2}
                        value={data.salarioCargo}
                      />
                    </form>
                  ) : state.delCargo ? (
                    <form
                      onSubmit={DelCargo}
                      id="delCargoForm"
                      className="grid grid-cols-2 gap-3 pr-2"
                    >
                      <Input
                        type="text"
                        list="deltCargo"
                        name="nomeCargo"
                        className="col-span-2"
                        placeholder="Selecione o cargo"
                        onChange={valorInput}
                        value={data.nomeCargo}
                      />
                      <datalist id="deltCargo">
                        {cargo.map((cargo) => (
                          <option
                            key={cargo.id}
                            value={`${cargo.id} - ${cargo.nomeCargo}`}
                          />
                        ))}
                      </datalist>
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
                  ${state.addCargo ? "hidden" : ""} ${state.edtCargo ? "hidden" : ""
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
                  ${state.addCargo ? "hidden" : ""} ${state.delCargo ? "hidden" : ""
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
                  ${state.delCargo ? "hidden" : ""} ${state.edtCargo ? "hidden" : ""
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
                <P>Nome</P>
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
          </Article>

          <Article>
            <Dir>
              <H1>Transporte</H1>
              <H3 className="text-[0.9em]">
                <P>Nome/Cargo</P>
                <P>Salario</P>
                <P>Quantidade</P>
              </H3>
            </Dir>
            <Div>Planejar oque vai fazer aq</Div>

            <Dir>
              <H1>Alimentação</H1>
              <H3 className="text-[0.9em]">
                <P>Nome/Cargo</P>
                <P>Salario</P>
                <P>Quantidade</P>
              </H3>
            </Dir>
            <Div>Planejar oque vai fazer aq</Div>

          </Article>
        </Section>

        <Section>
          <Article>
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
                        onChange={valorInput2}
                        value={data.numeroKinay}
                        className="col-span-1 "
                      />

                      <Input
                        type="text"
                        name="descricaoKinay"
                        onChange={valorInput2}
                        placeholder="Descrição"
                        value={data.descricaoKinay}
                        className="col-span-2"
                      />

                      <Input
                        type="number"
                        name="porcentagemKinay"
                        placeholder="Porcentagem EX: 0.0"
                        onChange={valorInput2}
                        value={data.porcentagemKinay}
                        className="col-span-1"
                      />
                    </form>
                  ) : state.delKinay ? (
                    <form
                      onSubmit={DelKinay}
                      id="delkinayForm"
                    >

                      <Input
                        type="text"
                        list="deltkinay"
                        name="descricaoKinay"
                        placeholder="Selecione o kinay"
                        onChange={valorInput}
                        value={data.descricaoKinay}
                      />

                      <datalist id="deltkinay">
                        {kinays.map((kinay) => (
                          <option
                            key={kinay.id}
                            value={`${kinay.id} - ${kinay.numeroKinay} - ${kinay.descricaoKinay}`}
                          />
                        ))}
                      </datalist>
                    </form>
                  ) : (
                    <p>Kinay</p>
                  )}
                </H1>

                <nav className="flex flex-col md:flex-row  gap-2 justify-end text-[1rem]">
                  {state.addKinay || state.delKinay ? (
                    <button
                      className={`flex-1 p-1 rounded-full bg-gray-200 cursor-pointer drop-shadow-lg`}
                      title={
                        state.addKinay
                          ? "Salvar"
                          : "Excluir"
                      }
                      type="submit"
                      form={
                        state.addKinay ? "addKinayForm" : "delkinayForm"
                      }
                    >
                      <RiSaveLine />
                    </button>
                  ) : null}

                  <button
                    className={`p-1 rounded-full bg-red-600 cursor-pointer drop-shadow-lg text-[1.2em] 
                  ${state.addKinay ? "hidden" : ""} ${state.delKinay ? "bg-red-600" : ""}`}
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
                    className={`p-1 rounded-full bg-gray-300 cursor-pointer drop-shadow-lg text-[1.2em] 
                  ${state.delKinay ? "hidden" : ""} ${state.addKinay ? "bg-red-600" : ""}`}
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

              <H5 className="grid grid-cols-5 gap-3 text-[0.9em]">
                <P className="col-span-1">Numero</P>
                <P className="col-span-3">Descrição</P>
                <P className="col-span-1">Porcentagem</P>
              </H5>
            </Dir>
            <Div className="max-h-[22vh]">
              {kinays.map((kinay) => {

                return (
                  <H5 key={kinay.id} className="grid grid-cols-5 gap-3 text-[0.9em]">
                    <P className="col-span-1">{kinay.numeroKinay}</P>
                    <P className="col-span-3">{kinay.descricaoKinay}</P>
                    <P className="col-span-1">{kinay.porcentagemKinay * 100}%</P>
                  </H5>
                )
              })}
            </Div>
          </Article>
        </Section>
      </Footer>
    </>
  );
};
