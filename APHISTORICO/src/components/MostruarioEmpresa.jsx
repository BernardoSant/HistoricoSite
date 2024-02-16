import styled from "styled-components";
import { useGlobalContext } from "../global/Global";
import { BiCategory } from "react-icons/bi";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Div = styled.div`
  height: 100%;
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
  padding-top: 1em;
  display: flex;
  flex-wrap: wrap;
  max-width: 50em;
  justify-content: start;
  align-content: start;
  flex-direction: row;
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

export const MostruarioNota = ({ empresaId }) => {
  const { nota } = useGlobalContext();
  const notasDaEmpresaAntecipada = nota.filter(
    (nota) => nota.idEmpresa === empresaId && nota.situacaoNF === "Antecipada"
  );
  const notasDaEmpresaRecebida = nota.filter(
    (nota) => nota.idEmpresa === empresaId && nota.situacaoNF === "Recebida"
  );
  const notasDaEmpresaAnalise = nota.filter(
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
    situacaoNF: "",
    valorRecebidoNF: "",
  });

  const valorInput = (e) => {
    let valor = e.target.value;
    let newData = { ...data, [e.target.name]: valor };

    if (e.target.name === "situacaoNF" && valor === "Antecipada") {
      // Supondo que "valorReceberNF" seja o valor a receber
      let calculorAntercipa = data.valorReceberNF * 0.02;
      let valorRecebido = data.valorReceberNF - calculorAntercipa;
      newData = { ...newData, valorRecebidoNF: valorRecebido };
    } else if (e.target.name === "situacaoNF" && valor === "Recebida") {
      newData = { ...newData, valorRecebidoNF: data.valorReceberNF };
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
      .put("http://localhost:3030/nota/" + notaSelecionada.id, data, headers)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

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
                <H1 className="col-span-3">Valor Recebido</H1>
                <Select
                  name="situacaoNF"
                  onChange={valorInput}
                  value={data.situacaoNF}
                >
                  <option></option>
                  <option value="Em Análise">Em Análise</option>
                  <option value="Recebida">Recebida</option>
                  <option value="Antecipada">Antecipada</option>
                </Select>

                <Input
                  type="text"
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
              <H2 className="col-span-3">{data.valorRecebidoNF}</H2>

              <H1 className="col-span-4">Prazo de pagamento</H1>
              <H2 className="col-span-4">{data.prazoPagamentoNF}</H2>

              <H1 className="col-span-4">Observação</H1>
              <H2 className="col-span-4">{data.observacaoNF}</H2>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-semibold w-full h-auto flex justify-center items-center text-3xl mb-5">
              Notas da empresa
            </h1>

            {notasDaEmpresaAnalise.length > 0 ? (
              <>
                <table className="w-full bg-orange-500 drop-shadow-2xl rounded-2xl mb-1">
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

                <table className="w-full">
                  {notasDaEmpresaAnalise.map((nota) => {
                    return (
                      <>
                        <thead className="w-full flex justify-end ml-2">
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
                          <Th className="col-span-1">
                            {nota.numeroPedidoNF}
                          </Th>

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
                </table>
              </>
            ) : null}

            {notasDaEmpresaRecebida.length > 0 ? (
              <>
                <table className="w-full bg-orange-500 drop-shadow-2xl rounded-2xl">
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

                <table className="w-full">
                  {notasDaEmpresaRecebida.map((nota) => {

                    return (
                      <>
                        <thead className=" w-full flex justify-end ml-2">
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
                          <Th className="col-span-1">
                            {nota.numeroPedidoNF}
                          </Th>

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
                </table>
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

                <table className="w-full">
                  {notasDaEmpresaAntecipada.map((nota) => {
                    return (
                      <>
                        <thead className="w-full flex justify-end ml-2">
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
                          <Th className="col-span-1">
                            {nota.numeroPedidoNF}
                          </Th>

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
                </table>
                
              </>
            ) : null}

            <table className="w-full bg-orange-500 drop-shadow-2xl rounded-2xl mb-1">
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
            <table className="w-full">
    </table>
          </>
        )}
      </Div>
    </>
  );
};
