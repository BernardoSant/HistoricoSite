import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import { useGlobalContext } from "../../global/Global";
import { toast } from "react-toastify";

const Footer = styled.footer`
  height: 100vh;
  width: 100%;
  flex-wrap: wrap;
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
  width: 100%;
  display: flex;
  gap: 7px;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1 1 0%;
`;

const Article = styled.article`
  width: 100%;
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
  background-color: #d8d6d679;
  margin-top: -15px;
  z-index: 0;
  padding-top: 10px;
  padding-bottom: 5px;
  overflow: auto;
  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 1em;
  flex: 1 1 0%;

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

const H4 = styled(H3)`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`;

const H5 = styled(H3)`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;

const P = styled.p`
  text-align: center;
  width: 100%;
`;

export const ResumoEmpresa = () => {
  const {ip, empresa, nota, pedido, contrato } = useGlobalContext();
  const [data, setData] = useState("");

  const dataAtual = new Date();
  const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, "0");
  const anoAtual = dataAtual.getFullYear();

  const [mes, setMes] = useState(mesAtual);
  const [ano, setAno] = useState(anoAtual);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const dataAtual = new Date();
      const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, "0");
      const anoAtual = dataAtual.getFullYear();

      setMes(mesAtual);
      setAno(anoAtual);
    }, 600000); // Atualiza a cada minuto

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  const pedidosFiltrados = pedido.filter((pedido) => {
    const dataPedido = new Date(pedido.dataPDD);
    return (
      dataPedido.getMonth() + 1 === parseInt(mes) &&
      dataPedido.getFullYear() === parseInt(ano)
    );
  });

  const ContratoAtivo = contrato.filter((ctt) => ctt.situacaoCT === "Ativo");

  const somaNotas = nota.reduce((acc, nota) => {
    if (acc[nota.numeroPedidoNF]) {
      acc[nota.numeroPedidoNF] += nota.valorRecebidoNF;
    } else {
      acc[nota.numeroPedidoNF] = nota.valorRecebidoNF;
    }
    return acc;
  }, {});
console.log(ip)
  const contratoAtualizado = ContratoAtivo.map((ctt) => {
    if (somaNotas[ctt.numeroCT]) {
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

  const pedidosAtualizados = pedidosFiltrados.map((pedido) => {
    if (somaNotas[pedido.numeroPDD]) {
      const pedidoAtualizado = {
        ...pedido,
        valorRecebidoPDD: somaNotas[pedido.numeroPDD],
      };

      let status;
      if (somaNotas[pedido.numeroPDD] > pedido.valorPDD / 1.3) {
        status = "Finalizada";
      } else if (pedido.valorPDD > 0) {
        status = "Andamento";
      } else {
        status = "";
      }

      const headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios
        .put(
          ip +`/pedido/${pedido.numeroPDD}`,
          {
            valorRecebidoPDD: somaNotas[pedido.numeroPDD],
            situacaoPDD: status,
          },
          headers
        )
        .then((response) => {})
        .catch((err) => {
          toast.error(
            "Erro ao atualizar valor recebido:",
            err.response.data.message
          );
        });

      return pedidoAtualizado;
    }

    return pedido;
  });

  pedido.sort((a, b) => new Date(a.dataPDD) - new Date(b.dataPDD));

  const notasRecebidas = nota.filter((nota) => {
    const dataNota = new Date(nota.dataNF);
    return (
      (nota.situacaoNF === "Recebida" || nota.situacaoNF === "Antecipada") &&
      dataNota.getMonth() + 1 === parseInt(mes) &&
      dataNota.getFullYear() === parseInt(ano)
    );
  });

  notasRecebidas.sort((a, b) => new Date(a.dataNF) - new Date(b.dataNF));

  const valorTotalNotasAnalise = notasRecebidas.reduce(
    (total, nota) => total + nota.valorReceberNF,
    0
  );

  const notasReceber = nota.filter((nota) => nota.situacaoNF === "Em Análise");

  const notasReceberFiltradas = notasReceber.filter((nota) => {
    const dataNota = new Date(nota.dataNF);
    return (
      dataNota.getMonth() + 1 === parseInt(mes) &&
      dataNota.getFullYear() === parseInt(ano)
    );
  });

  notasReceber.sort((a, b) => new Date(a.dataNF) - new Date(b.dataNF));

  const handleDataChange = (event) => {
    setData(event.target.value);

    const dataSelecionada = new Date(event.target.value);
    const mesSelecionado = String(dataSelecionada.getMonth() + 1).padStart(
      2,
      "0"
    );
    const anoSelecionado = dataSelecionada.getFullYear();

    setMes(mesSelecionado);
    setAno(anoSelecionado);
  };

  // grafico  Donut
  const agrupado = notasRecebidas.reduce((acc, nota) => {
    const chave = nota.nomeEmpresaNF;

    if (!acc[chave]) {
      acc[chave] = { nomeEmpresaNF: nota.nomeEmpresaNF, valorRecebidoNF: 0 };
    }

    acc[chave].valorRecebidoNF += nota.valorRecebidoNF;

    return acc;
  }, {});

  const grafico = [];
  Object.values(agrupado).map((notaAgrupada) => {
    const empresaEncontrada = empresa.find(
      (empresa) => empresa.nameEmpresa === notaAgrupada.nomeEmpresaNF
    );
    grafico.push([
      empresaEncontrada
        ? empresaEncontrada.siglaEmpresa
        : notaAgrupada.nomeEmpresaNF,
      notaAgrupada.valorRecebidoNF,
    ]);
  });

  grafico.unshift(["Empresa", "Valor Recebido"]);

  const options = {
    pieHole: 0.4,
    is3D: false,
    backgroundColor: "transparent",
    pieSliceTextStyle: {
      color: "black",
    },
  };

  return (
    <>
      <Header>
        <h1 className=" w-full text-center text-3xl flex justify-center items-center font-bold">
          Resumo Mensal
        </h1>
        <form
          onSubmit={handleDataChange}
          className="flex flex-col gap-2 w-auto justify-end pr-4"
        >
          <select
            className="w-auto bg-gray-300 border-2 rounded-md border-gray-500"
            value={mes}
            onChange={(event) => setMes(event.target.value)}
          >
            <option value="">Selecione o mês</option>
            <option value="01">Janeiro</option>
            <option value="02">Fevereiro</option>
            <option value="03">Março</option>
            <option value="04">Abril</option>
            <option value="05">Maio</option>
            <option value="06">Junho</option>
            <option value="07">Julho</option>
            <option value="08">Agosto</option>
            <option value="09">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>

          <select
            className="w-auto bg-gray-300 border-2 rounded-md border-gray-500"
            value={ano}
            onChange={(event) => setAno(event.target.value)}
          >
            <option value="">Selecione o ano</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </form>
      </Header>

      <Footer>
        <Section className="lg:max-w-[23em] min-w-[27em] lg:min-w-[23em]">
          <Dir>
            <H1> Nota Fiscal Recebida</H1>

            <H3>
              <P>N° Pedido</P>
              <P>N° Nota</P>
              <P>V.Recebido</P>
            </H3>
          </Dir>

          <Div className="max-h-[18em]">
            {notasRecebidas.map((nota) => {
              return (
                <H3
                  key={nota.id}
                  className="cursor-pointer border-b-2 border-gray-400 text-[1.5vh] mx-[1em]"
                >
                  <P>{nota.numeroPedidoNF}</P>
                  <P>{String(nota.numeroNotaNF).padStart(5, "0")}</P>
                  <P>
                    {Number(nota.valorRecebidoNF).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </P>
                </H3>
              );
            })}
          </Div>

          <Dir>
            <H1> Nota Fiscal em Análise</H1>

            <H3>
              <P>N° Pedido</P>
              <P>N° Nota</P>
              <P>V.Receber</P>
            </H3>
          </Dir>

          <Div className="max-h-[18em]">
            {notasReceberFiltradas.map((nota) => (
              <H3
                key={nota.id}
                className="cursor-pointer border-b-2 border-gray-400 text-[1.5vh] mx-[1em]"
              >
                <P>{nota.numeroPedidoNF}</P>
                <P>{String(nota.numeroNotaNF).padStart(5, "0")}</P>
                <P>
                  {Number(nota.valorReceberNF).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </P>
              </H3>
            ))}
          </Div>

          <Article>
            <Dir>
              <H1>Empresas Cadastradas</H1>

              <H2>
                <P>Nome</P>
                <P>CNPJ</P>
              </H2>
            </Dir>

            <Div>
              {empresa.map((empresas) => (
                <H2
                  key={empresas.id}
                  className="cursor-pointer border-b-2 border-gray-400 text-[1.5vh] mx-[1em]"
                >
                  <P>{empresas.siglaEmpresa}</P>
                  <P>{empresas.cnpjEmpresa}</P>
                </H2>
              ))}
            </Div>
          </Article>
        </Section>

        <Section className=" min-w-[27em]">
          <Dir>
            <H1>Pedidos</H1>

            <H5>
              <P>N° Pedido</P>
              <P>Empresa</P>
              <P>Situação</P>
              <P>V.Total</P>
              <P>V.Recebido</P>
            </H5>
          </Dir>

          <Div className=" min-w-[27em]">
            {pedidosAtualizados.map((pedido) => {
              const empresaEncontrada = empresa.find(
                (empresas) => empresas.id === pedido.empresaPDD
              );
              const siglaEmpresa = empresaEncontrada
                ? empresaEncontrada.siglaEmpresa
                : "N/A";

              return (
                <H5
                  key={pedido.id}
                  className="cursor-pointer border-b-2 border-gray-400 text-[1.5vh] mx-[1em]"
                >
                  <P>{pedido.numeroPDD}</P>
                  <P>{siglaEmpresa}</P>
                  <P>{pedido.situacaoPDD}</P>
                  <P>
                    {Number(pedido.valorPDD).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </P>
                  <P>
                    {Number(pedido.valorRecebidoPDD).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </P>
                </H5>
              );
            })}
          </Div>

          <Dir>
            <H1>Contrato</H1>

            <H4>
              <P>N° Contrato</P>
              <P>Empresa</P>
              <P>V.Total</P>
              <P>V.Recebido</P>
            </H4>
          </Dir>

          <Article className="min-h-[7vh]">
            <Div>
              {contratoAtualizado.map((ctt) => {
                const empresaEncontrada = empresa.find(
                  (empresas) => empresas.id === ctt.empresaCT
                );
                const siglaEmpresa = empresaEncontrada
                  ? empresaEncontrada.siglaEmpresa
                  : "N/A";

                return (
                  <>
                    <div
                      className="relative ml-2 "
                      title={
                        ctt.situacaoCT === "Ativo"
                          ? "Ativo"
                          : "Contrato Encerrado"
                      }
                    >
                      <p className="absolute bg-green-600 w-3 h-3 rounded-full mt-1"></p>
                    </div>
                    <H4
                      key={ctt.id}
                      className="cursor-pointer border-b-2 border-gray-400 text-[1.5vh] mx-[1em]"
                    >
                      <P>{ctt.numeroCT}</P>
                      <P>{siglaEmpresa}</P>
                      <P>
                        {Number(ctt.ValorCT).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </P>
                      <P>
                        {Number(ctt.ValorRecebidoCT).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </P>
                    </H4>
                  </>
                );
              })}
            </Div>
          </Article>
          <Article>
            <Dir>
              <H1 className="flex justify-between w-full">
                Ganhos Mensal
                <div className="flex gap-x-3">
                  <p>Valor Ganho </p>
                  <p>
                    {Number(valorTotalNotasAnalise).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </H1>
            </Dir>
            <Div>
              <Chart
                chartType="PieChart"
                width="100%"
                height="100%"
                data={grafico}
                options={options}
              />
            </Div>
          </Article>
        </Section>
      </Footer>
    </>
  );
};
