import styled from "styled-components";
import { useGlobalContext } from "../../../global/Global";
import { BiCategory } from "react-icons/bi";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Div = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-content: start;
  flex-direction: row;
`;

const Article = styled.article`
  width: 100%;
  max-height: 20em;
  overflow: auto;
  border-radius: 1em;
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #575757;
    border-radius: 1em;
  }
`;

const Header = styled.header`
  width: 100%;
  border-radius: 20px;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
  font-weight: 600;
  font-size: xx-large;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  padding-left: 1em;
  padding-right: 1em;
`;

const Th = styled.th``;

const Input = styled.input`
  width: 100%;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  max-width: 40em;
  padding-left: 8px;
`;

const Select = styled.select`
  width: 100%;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  max-width: 40em;
  padding-left: 8px;
  padding: 4px;
`;
const H1 = styled.h1`
  font-weight: 600;
  margin-top: 5px;
`;

const H2 = styled.h1`
  font-weight: 500;
  margin-top: 5px;
`;

const H4 = styled.h1`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  text-align: center;
  font-weight: 600;
`;
const P = styled.p`
  text-align: center;
  width: 100%;
`;

export const MostruarioNota = ({ empresaId }) => {
  const { ip, nota, empresa, contrato } = useGlobalContext();

  const handleDataChange = (event) => {
    setData(event.target.value);

    const dataSelecionada = new Date(event.target.value);
    const anoSelecionado = dataSelecionada.getFullYear();

    setAno(anoSelecionado);
  };

  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  const [ano, setAno] = useState(anoAtual);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const dataAtual = new Date();
      const anoAtual = dataAtual.getFullYear();

      setAno(anoAtual);
    }, 600000); 

    return () => clearInterval(intervalId);
  }, []);

  const pedidosFiltrados = nota.filter((nota) => {
    const dataNota = new Date(nota.dataNF);
    return dataNota.getFullYear() === parseInt(ano);
  });

  const empresaSelecionada = empresa.find(
    (empresas) => empresas.id === empresaId
  );

  const siglaEmpresa = empresaSelecionada
    ? empresaSelecionada.siglaEmpresa
    : "N/A";

  const notasDaEmpresaAntecipada = pedidosFiltrados.filter(
    (nota) => nota.idEmpresa === empresaId && nota.situacaoNF === "Antecipada"
  );
  const notasDaEmpresaRecebida = pedidosFiltrados.filter(
    (nota) => nota.idEmpresa === empresaId && nota.situacaoNF === "Recebida"
  );
  const notasDaEmpresaAnalise = pedidosFiltrados.filter(
    (nota) => nota.idEmpresa === empresaId && nota.situacaoNF === "Em Análise"
  );

  const valorTotalNotasAnalise = notasDaEmpresaAnalise.reduce(
    (total, nota) => total + nota.valorReceberNF,
    0
  );
  const valorTotalNotasAntecipadas = notasDaEmpresaAntecipada.reduce(
    (total, nota) => total + nota.valorRecebidoNF,
    0
  );
  const valorTotalNotasRecebidas = notasDaEmpresaRecebida.reduce(
    (total, nota) => total + nota.valorRecebidoNF,
    0
  );

  const valorTotal = valorTotalNotasAntecipadas + valorTotalNotasRecebidas;

  const [notaSelecionada, setNotaSelecionada] = useState(null);
  const [notaSelecionadaCompleta, setNotaSelecionadaCompleta] = useState(null);

  const [data, setData] = useState({
    valorPrcentagemAntNF: "",
    situacaoNF: "",
    valorRecebidoNF: "",
  });

  const valorInput = (e) => {
    const { name, value } = e.target;
    let newData = { ...data, [name]: value };

    if (name === "valorPrcentagemAntNF") {
      const porcentagemAntecipada = parseFloat(value / 100);
      const calculorAntercipa = data.valorReceberNF * porcentagemAntecipada;
      const valorRecebido = data.valorReceberNF - calculorAntercipa;
      newData = { ...newData, valorRecebidoNF: valorRecebido };
    } else if (name === "situacaoNF" && value === "Recebida") {
      newData = {
        ...newData,
        valorRecebidoNF: data.valorReceberNF,
        valorPrcentagemAntNF: "",
      };
    } else if (name === "situacaoNF" && value === "") {
      newData = {
        ...newData,
        valorRecebidoNF: "",
        situacaoNF: "",
        valorPrcentagemAntNF: "",
      };
    }

    setData(newData);
  };

  useEffect(() => {
    if (notaSelecionada) {
      setData((prevData) => ({ ...prevData, ...notaSelecionada }));
    }
  }, [notaSelecionada]);

  useEffect(() => {
    if (notaSelecionadaCompleta) {
      setData((prevData) => ({ ...prevData, ...notaSelecionadaCompleta }));
    }
  }, [notaSelecionadaCompleta]);

  const updateNota = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .put(ip + "/nota/" + notaSelecionada.id, data, headers)
      .then((response) => {
        toast.success(response.data.message);
        setNotaSelecionada(null);
        setData({
          valorPrcentagemAntNF: "",
          situacaoNF: "",
          valorRecebidoNF: "",
        });
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  const somaNotas = nota.reduce((acc, nota) => {
    if (acc[nota.numeroPedidoNF]) {
      acc[nota.numeroPedidoNF] += nota.valorRecebidoNF;
    } else {
      acc[nota.numeroPedidoNF] = nota.valorRecebidoNF;
    }
    return acc;
  }, {});

  const ContratoAtivo = contrato.filter(
    (ctt) => ctt.situacaoCT === "Ativo" && ctt.empresaCT === empresaId
  );

  const contratoAtualizado = ContratoAtivo.map((ctt) => {
    if (somaNotas[ctt.numeroCT] !== ctt.ValorRecebidoCT) {
      const cttAtualizado = {
        ...ctt,
        ValorRecebidoCT: somaNotas[ctt.numeroCT],
      };

      const headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios
        .put(
          ip + `/contrato/${ctt.numeroCT}`,
          { ValorRecebidoCT: somaNotas[ctt.numeroCT] },
          headers
        )
        .then((response) => {})
        .catch((err) => {
          toast.error(err.response.data.message);
        });

      return cttAtualizado;
    }

    return ctt;
  });

  return (
    <>
      <Div>
        {notaSelecionada ? (
          <>
            <button
              onClick={() => setNotaSelecionada(null)}
              className="w-full flex justify-end"
            >
              <h1 className="bg-red-600 w-auto font-bold p-1 px-3 rounded-full">
                Voltar
              </h1>
            </button>
            <form onSubmit={updateNota}>
              <div className=" grid grid-cols-4 gap-x-2">
                <H1 className="col-span-1">Numero Nota</H1>
                <H1 className="col-span-3">Numero Pedido</H1>
                <H2 className="col-span-1">
                  {String(data.numeroNotaNF).padStart(8, "0")}
                </H2>
                <H2 className="col-span-3">
                  {String(data.numeroPedidoNF).padStart(8, "0")}
                </H2>

                <H1 className="col-span-2">Nome da Empresa</H1>
                <H1 className="col-span-2">CNPJ</H1>
                <H2 className="col-span-2">{data.nomeEmpresaNF}</H2>
                <H2 className="col-span-2">{data.cnpjEmpresaNF}</H2>

                <H1 className="col-span-4">Local Retido</H1>
                <H2 className="col-span-4">{data.retidoNF}</H2>

                <H1 className="col-span-1">Numero(CNAE)</H1>
                <H1 className="col-span-3">Atividade (CNAE)</H1>

                <H2>{data.numeroKinayNF}</H2>
                <H2 className="col-span-3">{data.KinayNF}</H2>

                <H1 className="col-span-1">Porcentagem(CNAE)</H1>
                <H1 className="col-span-3">Imposto</H1>
                <H2 className="col-span-1">{data.porcentagemKinayNF}</H2>
                <H2 className="col-span-3">{data.ImpostoNF}</H2>

                <H1 className="col-span-1">Valor Total</H1>
                <H1 className="col-span-1">Valor Imposto</H1>
                <H1 className="col-span-2">Valor á Receber</H1>
                <H2>
                  {Number(data.valorNF).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </H2>
                <H2>
                  {Number(data.valorImpostoNF).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </H2>
                <H2>
                  {Number(data.valorReceberNF).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </H2>

                <H1 className="col-span-4">Descrição do Serviço</H1>
                <H2 className="col-span-4">{data.descricaoServNF}</H2>

                <H1 className="col-span-1">Situação</H1>
                {data.situacaoNF === "Antecipada" && (
                  <H1 className="col-span-1">Porcentagem</H1>
                )}

                <H1
                  className={`${
                    data.situacaoNF === "Antecipada"
                      ? "col-span-2"
                      : "col-span-3"
                  } `}
                >
                  Valor Recebido
                </H1>

                <Select
                  name="situacaoNF"
                  onChange={valorInput}
                  value={data.situacaoNF}
                >
                  <option></option>
                  <option value="Recebida">Recebida</option>
                  <option value="Antecipada">Antecipada</option>
                </Select>

                {data.situacaoNF === "Antecipada" && (
                  <Input
                    type="text"
                    name="valorPrcentagemAntNF"
                    onChange={valorInput}
                    value={data.valorPrcentagemAntNF}
                    className="col-span-1"
                  />
                )}

                <Input
                  type="text"
                  readOnly
                  name="valorRecebidoNF"
                  onChange={valorInput}
                  value={data.valorRecebidoNF}
                  className="col-span-1"
                />

                <p className="col-span-2"></p>

                <H1 className="col-span-4">Prazo de pagamento</H1>
                <H2 className="col-span-4">{data.prazoPagamentoNF}</H2>

                <H1 className="col-span-4">Observação</H1>
                <H2 className="col-span-4">{data.observacaoNF}</H2>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-orange-400 py-2 px-7 rounded-lg border-2 border-orange-500 font-semibold hover:text-white hover:scale-95 duration-500 mb-3"
              >
                Salvar
              </button>
            </form>
          </>
        ) : notaSelecionadaCompleta ? (
          <>
            <button
              onClick={() => setNotaSelecionadaCompleta(null)}
              className="w-full flex justify-end"
            >
              <h1 className="bg-red-600 w-auto font-bold p-1 px-3 rounded-full">
                Voltar
              </h1>
            </button>

            <div className=" grid grid-cols-4 gap-x-2">
              <H1 className="col-span-1">Numero Nota</H1>
              <H1 className="col-span-3">Numero Pedido</H1>
              <H2 className="col-span-1">
                {String(data.numeroNotaNF).padStart(8, "0")}
              </H2>
              <H2 className="col-span-3">
                {String(data.numeroPedidoNF).padStart(8, "0")}
              </H2>

              <H1 className="col-span-2">Nome da Empresa</H1>
              <H1 className="col-span-2">CNPJ</H1>
              <H2 className="col-span-2">{data.nomeEmpresaNF}</H2>
              <H2 className="col-span-2">{data.cnpjEmpresaNF}</H2>

              <H1 className="col-span-4">Local Retido</H1>
              <H2 className="col-span-4">{data.retidoNF}</H2>

              <H1 className="col-span-1">Numero(CNAE)</H1>
              <H1 className="col-span-3">Atividade (CNAE)</H1>

              <H2>{data.numeroKinayNF}</H2>
              <H2 className="col-span-3">{data.KinayNF}</H2>

              <H1 className="col-span-1">Porcentagem(CNAE)</H1>
              <H1 className="col-span-3">Imposto</H1>
              <H2 className="col-span-1">{data.porcentagemKinayNF}</H2>
              <H2 className="col-span-3">{data.ImpostoNF}</H2>

              <H1 className="col-span-1">Valor Total</H1>
              <H1 className="col-span-1">Valor Imposto</H1>
              <H1 className="col-span-2">Valor á Receber</H1>
              <H2>
                {Number(data.valorNF).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </H2>
              <H2>
                {Number(data.valorImpostoNF).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </H2>
              <H2>
                {Number(data.valorReceberNF).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </H2>

              <H1 className="col-span-4">Descrição do Serviço</H1>
              <H2 className="col-span-4">{data.descricaoServNF}</H2>

              <H1 className="col-span-1">Situação</H1>
              <H1 className="col-span-3">Valor Recebido</H1>
              <H2 className="col-span-1">{data.situacaoNF}</H2>
              <H2 className="col-span-3">
                {Number(data.valorRecebidoNF).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </H2>

              <H1 className="col-span-4">Prazo de pagamento</H1>
              <H2 className="col-span-4">{data.prazoPagamentoNF}</H2>

              <H1 className="col-span-4">Observação</H1>
              <H2 className="col-span-4">{data.observacaoNF}</H2>
            </div>
          </>
        ) : (
          <>
            <Header className="mb-4 ">
              <p>Notas da {siglaEmpresa}</p>
              <form
                onSubmit={handleDataChange}
                className="flex justify-center items-center "
              >
                <select
                  className="w-auto border-2 text-[2vh] rounded-xl border-gray-500 flex justify-center p-1 "
                  value={ano}
                  onChange={(event) => setAno(event.target.value)}
                >
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </form>
            </Header>
            {contratoAtualizado.length > 0 ? (
              <>
                <table className="w-full bg-orange-500 drop-shadow-2xl rounded-2xl mb-1 ">
                  <thead className="flex justify-between items-center px-4">
                    <Th className="text-start text-2xl pt-1">Contrato</Th>
                  </thead>
                  <thead className="grid grid-cols-5 justify-center items-center w-full rounded-b-lg drop-shadow-2xl text-lg pb-1">
                    <Th className="col-span-1">N° Contrato</Th>
                    <Th className="col-span-1">Situação</Th>
                    <Th className="col-span-1">Valor</Th>
                    <Th className="col-span-1">Recebido</Th>
                    <Th className="col-span-1">Data</Th>
                  </thead>
                </table>

                <Article className="min-h-[6vh]">
                  <Div>
                    {contratoAtualizado.map((ctt) => {
                      return (
                        <div key={ctt.id} className="w-full">
                          <thead
                            key={nota.id}
                            className="grid grid-cols-5 justify-center items-center shadow-inner bg-gray-200 rounded-2xl p-2 my-2"
                          >
                            <Th className="col-span-1">{ctt.numeroCT}</Th>

                            <Th className="col-span-1">{ctt.situacaoCT}</Th>

                            <Th className="col-span-1">
                              {Number(ctt.ValorCT).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </Th>

                            <Th className="col-span-1">
                              {Number(ctt.ValorRecebidoCT).toLocaleString(
                                "pt-BR",
                                {
                                  style: "currency",
                                  currency: "BRL",
                                }
                              )}
                            </Th>

                            <Th className="col-span-1">{ctt.dataCT}</Th>
                          </thead>
                        </div>
                      );
                    })}
                  </Div>
                </Article>
              </>
            ) : null}

            {notasDaEmpresaAnalise.length > 0 ? (
              <>
                <table className="w-full bg-orange-500 drop-shadow-2xl rounded-2xl mb-1 ">
                  <thead className="flex justify-between items-center px-4">
                    <Th className="text-start text-2xl pt-1">
                      Notas em Analise
                    </Th>
                    <nav className="bg-orange-600 px-3 rounded-full shadow-inner">
                      <Th className="text-lg text-end pr-2">
                        Valor a Receber:{" "}
                      </Th>
                      <Th className="text-lg text-start">
                        {Number(valorTotalNotasAnalise).toLocaleString(
                          "pt-BR",
                          { style: "currency", currency: "BRL" }
                        )}
                      </Th>
                    </nav>
                  </thead>
                  <thead className="grid grid-cols-7 justify-center items-center w-full rounded-b-lg drop-shadow-2xl text-lg pb-1">
                    <Th className="col-span-1">N° Pedido</Th>
                    <Th className="col-span-1">N° Nota</Th>
                    <Th className="col-span-2">Situação</Th>
                    <Th className="col-span-1">A Receber</Th>
                    <Th className="col-span-1">Recebido</Th>
                    <Th className="col-span-1">Data</Th>
                  </thead>
                </table>

                <Article>
                  {notasDaEmpresaAnalise.map((nota) => {
                    return (
                      <div key={nota.id}>
                        <thead className="relative w-auto flex justify-end ml-2">
                          <span
                            className="absolute h-6 w-6 rounded-full bg-orange-500 flex justify-center items-center cursor-pointer "
                            onClick={() => {
                              setNotaSelecionada(nota);
                            }}
                          >
                            <BiCategory />
                          </span>
                        </thead>
                        <thead
                          key={nota.id}
                          className="grid grid-cols-7 justify-center items-center shadow-inner bg-gray-200 rounded-2xl p-2 my-2"
                        >
                          <Th className="col-span-1">{nota.numeroPedidoNF}</Th>

                          <Th className="col-span-1">
                            {String(nota.numeroNotaNF).padStart(5, "0")}
                          </Th>

                          <Th className="col-span-2">{nota.situacaoNF}</Th>

                          <Th className="col-span-1">
                            {Number(nota.valorReceberNF).toLocaleString(
                              "pt-BR",
                              { style: "currency", currency: "BRL" }
                            )}
                          </Th>
                          <Th className="col-span-1">
                            {Number(nota.valorRecebidoNF).toLocaleString(
                              "pt-BR",
                              { style: "currency", currency: "BRL" }
                            )}
                          </Th>
                          <Th className="col-span-1">{nota.dataNF}</Th>
                        </thead>
                      </div>
                    );
                  })}
                </Article>
              </>
            ) : null}

            {notasDaEmpresaRecebida.length > 0 ? (
              <>
                <table className="w-full bg-orange-500 drop-shadow-2xl rounded-2xl ">
                  <thead className="flex justify-between items-center px-4">
                    <Th className="text-start text-2xl pt-1">
                      Notas Recebidas
                    </Th>
                    <nav className="bg-orange-600 px-3 rounded-full shadow-inner">
                      <Th className="text-lg text-end pr-2">
                        Valor Recebido:{" "}
                      </Th>
                      <Th className="text-lg text-start">
                        {Number(valorTotalNotasRecebidas).toLocaleString(
                          "pt-BR",
                          { style: "currency", currency: "BRL" }
                        )}
                      </Th>
                    </nav>
                  </thead>

                  <thead className="grid grid-cols-7 justify-center items-center w-full rounded-b-lg drop-shadow-2xl text-lg pb-1">
                    <Th className="col-span-1">N° Pedido</Th>
                    <Th className="col-span-1">N° Nota</Th>
                    <Th className="col-span-2">Situação</Th>
                    <Th className="col-span-1">A Receber</Th>
                    <Th className="col-span-1">Recebido</Th>
                    <Th className="col-span-1">Data</Th>
                  </thead>
                </table>

                <Article className="w-full max-h-[20em] overflow-auto mt-2 rounded-[1em]">
                  {notasDaEmpresaRecebida.map((nota) => {
                    return (
                      <>
                        <thead className="relative w-auto flex justify-end ml-2">
                          <span
                            className="absolute h-6 w-6 rounded-full bg-gray-400 flex justify-center items-center cursor-pointer "
                            onClick={() => {
                              setNotaSelecionadaCompleta(nota);
                            }}
                          >
                            <BiCategory />
                          </span>
                        </thead>
                        <thead
                          key={nota.id}
                          className="w-full grid grid-cols-7 justify-center items-center shadow-inner bg-gray-200 rounded-2xl p-2 my-2"
                        >
                          <Th className="col-span-1">{nota.numeroPedidoNF}</Th>

                          <Th className="col-span-1">
                            {String(nota.numeroNotaNF).padStart(5, "0")}
                          </Th>

                          <Th className="col-span-2">{nota.situacaoNF}</Th>

                          <Th className="col-span-1">
                            {Number(nota.valorReceberNF).toLocaleString(
                              "pt-BR",
                              { style: "currency", currency: "BRL" }
                            )}
                          </Th>
                          <Th className="col-span-1">
                            {Number(nota.valorRecebidoNF).toLocaleString(
                              "pt-BR",
                              { style: "currency", currency: "BRL" }
                            )}
                          </Th>
                          <Th className="col-span-1">{nota.dataNF}</Th>
                        </thead>
                      </>
                    );
                  })}
                </Article>
              </>
            ) : null}

            {notasDaEmpresaAntecipada.length > 0 ? (
              <>
                <table className="w-full bg-orange-500 drop-shadow-2xl rounded-2xl">
                  <thead className="flex justify-between items-center px-4">
                    <Th className="text-start text-2xl pt-1">
                      Notas Antecipadas
                    </Th>
                    <nav className="bg-orange-600 px-3 rounded-full shadow-inner">
                      <Th className="text-lg text-end pr-2">
                        Valor Recebido:{" "}
                      </Th>
                      <Th className="text-lg text-start">
                        {Number(valorTotalNotasAntecipadas).toLocaleString(
                          "pt-BR",
                          { style: "currency", currency: "BRL" }
                        )}
                      </Th>
                    </nav>
                  </thead>

                  <thead className="grid grid-cols-7 justify-center items-center w-full rounded-b-lg drop-shadow-2xl text-lg pb-1">
                    <Th className="col-span-1">N° Pedido</Th>
                    <Th className="col-span-1">N° Nota</Th>
                    <Th className="col-span-2">Situação</Th>
                    <Th className="col-span-1">A Receber</Th>
                    <Th className="col-span-1">Recebido</Th>
                    <Th className="col-span-1">Data</Th>
                  </thead>
                </table>

                <Article>
                  {notasDaEmpresaAntecipada.map((nota) => {
                    return (
                      <>
                        <thead className="relative w-auto flex justify-end ml-2">
                          <span
                            className="absolute h-6 w-6 rounded-full bg-gray-400 flex justify-center items-center cursor-pointer "
                            onClick={() => {
                              setNotaSelecionadaCompleta(nota);
                            }}
                          >
                            <BiCategory />
                          </span>
                        </thead>
                        <thead
                          key={nota.id}
                          className="grid grid-cols-7 justify-center items-center shadow-inner bg-gray-200 rounded-2xl p-2 my-2"
                        >
                          <Th className="col-span-1">{nota.numeroPedidoNF}</Th>

                          <Th className="col-span-1">
                            {String(nota.numeroNotaNF).padStart(5, "0")}
                          </Th>

                          <Th className="col-span-2">{nota.situacaoNF}</Th>

                          <Th className="col-span-1">
                            {Number(nota.valorReceberNF).toLocaleString(
                              "pt-BR",
                              { style: "currency", currency: "BRL" }
                            )}
                          </Th>
                          <Th className="col-span-1">
                            {Number(nota.valorRecebidoNF).toLocaleString(
                              "pt-BR",
                              { style: "currency", currency: "BRL" }
                            )}
                          </Th>
                          <Th className="col-span-1">{nota.dataNF}</Th>
                        </thead>
                      </>
                    );
                  })}
                </Article>
              </>
            ) : null}

            <div className="w-full px-3 pb-3 absolute bottom-0 left-0">
              <table className="w-full bg-orange-600 drop-shadow-2xl rounded-2xl mb-1 sticky">
                <thead className="grid grid-cols-4 justify-center items-center w-full rounded-b-lg drop-shadow-2xl text-lg py-1">
                  <Th className="col-span-1 text-end">Valor Recebido:</Th>
                  <Th className="col-span-1 text-start px-3">
                    {Number(valorTotal).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Th>
                  <Th className="col-span-1 text-end">A Receber:</Th>
                  <Th className="col-span-1 text-start px-3">
                    {Number(valorTotalNotasAnalise).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Th>
                </thead>
              </table>
            </div>
            <table className="w-full"></table>
          </>
        )}
      </Div>
    </>
  );
};
