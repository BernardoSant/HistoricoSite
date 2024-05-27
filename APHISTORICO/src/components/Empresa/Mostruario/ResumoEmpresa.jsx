import styled from "styled-components";
import { useGlobalContext } from "../../../global/Global";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  padding: 8px;
  width: 100%;
  border-radius: 1em;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

`;

const Article = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const SectionBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ArticleBlock = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 1em;
  background-color: #d8d6d679;
`;


const HeaderDados = styled.div`
  flex: 0 1 auto;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-top-right-radius: 1em;
  border-top-left-radius: 1em;
  border-bottom-right-radius: 0.3em;
  border-bottom-left-radius: 0.3em;
  background: #f97316;
  box-shadow: inset 3px -3px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
`;

const ArticleDados = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.8vw;
  font-weight: bolder;
  padding-left: 10px;
  padding-right: 10px;
  overflow-y: auto;
  flex: 1 1 0%;

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
  text-align: center;
`;

const TituloDados = styled.div`
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
  border-radius: 9999px;
  --tw-bg-opacity: 1;
  background-color: rgb(203 213 225 / var(--tw-bg-opacity));
  cursor: pointer;
`;

export const ResumoEmpresa = () => {
  const {empresa, nota, pedido, contrato } = useGlobalContext();
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
    }, 6000000); // Atualiza a cada minuto
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

  const valorTotalNotasAReceber = notasReceberFiltradas.reduce(
    (total, nota) => total + nota.valorReceberNF,
    0
  );
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
    pieHole: 0.5,
    is3D: false,
    backgroundColor: "transparent",
    pieSliceTextStyle: {
      color: "black",
      fontSize: "1vw",
    },
  };
  return (
    <Section>
      <Header>
        <h1 className="w-full text-center text-[1.5vw] flex justify-center items-center font-bold">
          Resumo Mensal
        </h1>
        <form
          onSubmit={handleDataChange}
          className="flex flex-row gap-2 w-auto md:justify-end justify-center pr-4 text-[1vw] "
        >
          <select
            className="w-auto border-2 rounded-xl border-gray-500 flex justify-center p-1 font-bold"
            value={mes}
            onChange={(event) => setMes(event.target.value)}
          >
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
            className="w-auto border-2 rounded-xl border-gray-500 flex justify-center p-1 font-bold"
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

      <Article>
        <SectionBlock className=" max-w-[30em]">
          <ArticleBlock className="max-h-[38%]">
            <HeaderDados>
              <TituloDados>Nota Fiscal Recebida:</TituloDados>
              <TituloArgumentos>
                <Texto>N° Pedido</Texto>
                <Texto>N° Nota</Texto>
                <Texto>V.Recebido</Texto>
              </TituloArgumentos>
            </HeaderDados>

            <ArticleDados>
              {notasRecebidas.map((nota) => {
                return (
                  <ArgumentosDados key={nota.id}>
                    <Texto>{nota.numeroPedidoNF}</Texto>
                    <Texto>{String(nota.numeroNotaNF).padStart(5, "0")}</Texto>
                    <Texto>
                      {Number(nota.valorRecebidoNF).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Texto>
                  </ArgumentosDados>
                );
              })}
            </ArticleDados>
          </ArticleBlock>

          <ArticleBlock className="max-h-[40%]">
            <HeaderDados>
              <TituloDados className="flex justify-between pr-3 flex-wrap">
                <h1>Nota Fiscal em Análise:</h1>
                <p className="text-[1vw] flex justify-center items-center bg-orange-300 px-4 rounded-[1em] ">
                  {Number(valorTotalNotasAReceber).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </TituloDados>
              <TituloArgumentos>
                <Texto>N° Pedido</Texto>
                <Texto>N° Nota</Texto>
                <Texto>V.Receber</Texto>
              </TituloArgumentos>
            </HeaderDados>

            <ArticleDados>
              {notasReceberFiltradas.map((nota) => (
                <ArgumentosDados key={nota.id}>
                  <Texto>{nota.numeroPedidoNF}</Texto>
                  <Texto>{String(nota.numeroNotaNF).padStart(5, "0")}</Texto>
                  <Texto>
                    {Number(nota.valorReceberNF).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Texto>
                </ArgumentosDados>
              ))}
            </ArticleDados>
          </ArticleBlock>

          <ArticleBlock className=" rounded-t-[1em] max-h-[20%]">
            <HeaderDados>
              <TituloDados>Empresas Cadastradas:</TituloDados>
              <TituloArgumentos>
                <Texto>Sigla</Texto>
                <Texto>CNPJ</Texto>
              </TituloArgumentos>
            </HeaderDados>
            <ArticleDados>
              {empresa.map((empresas) => (
                <ArgumentosDados key={empresas.id}>
                  <Texto>{empresas.siglaEmpresa}</Texto>
                  <Texto>{empresas.cnpjEmpresa}</Texto>
                </ArgumentosDados>
              ))}
            </ArticleDados>
          </ArticleBlock>
        </SectionBlock>

        <SectionBlock>
          <ArticleBlock className="max-h-[30%]">
            <HeaderDados>
              <TituloDados>Pedidos:</TituloDados>
              <TituloArgumentos>
                <Texto>N° Pedido</Texto>
                <Texto>Empresa</Texto>
                <Texto>Situação</Texto>
                <Texto>V.Total</Texto>
                <Texto>V.Recebido</Texto>
              </TituloArgumentos>
            </HeaderDados>

            <ArticleDados>
              {pedidosFiltrados.map((pedido) => {
                const empresaEncontrada = empresa.find(
                  (empresas) => empresas.id === pedido.empresaPDD
                );
                const siglaEmpresa = empresaEncontrada
                  ? empresaEncontrada.siglaEmpresa
                  : "N/A";

                return (
                  <ArgumentosDados key={pedido.id}>
                    <Texto>{pedido.numeroPDD}</Texto>
                    <Texto>{siglaEmpresa}</Texto>
                    <Texto>{pedido.situacaoPDD}</Texto>
                    <Texto>
                      {Number(pedido.valorPDD).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Texto>
                    <Texto>
                      {Number(pedido.valorRecebidoPDD).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Texto>
                  </ArgumentosDados>
                );
              })}
              {pedidosFiltrados.map((pedido) => {
                const empresaEncontrada = empresa.find(
                  (empresas) => empresas.id === pedido.empresaPDD
                );
                const siglaEmpresa = empresaEncontrada
                  ? empresaEncontrada.siglaEmpresa
                  : "N/A";

                return (
                  <ArgumentosDados key={pedido.id}>
                    <Texto>{pedido.numeroPDD}</Texto>
                    <Texto>{siglaEmpresa}</Texto>
                    <Texto>{pedido.situacaoPDD}</Texto>
                    <Texto>
                      {Number(pedido.valorPDD).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Texto>
                    <Texto>
                      {Number(pedido.valorRecebidoPDD).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Texto>
                  </ArgumentosDados>
                );
              })}
            </ArticleDados>
          </ArticleBlock>

          <ArticleBlock className="max-h-[20%]">
            <HeaderDados>
              <TituloDados>Contrato:</TituloDados>
              <TituloArgumentos>
                <Texto>N° Contrato</Texto>
                <Texto>Empresa</Texto>
                <Texto>V.Total</Texto>
                <Texto>V.Recebido</Texto>
              </TituloArgumentos>
            </HeaderDados>

            <ArticleDados>
              {ContratoAtivo.map((ctt) => {
                const empresaEncontrada = empresa.find(
                  (empresas) => empresas.id === ctt.empresaCT
                );
                const siglaEmpresa = empresaEncontrada
                  ? empresaEncontrada.siglaEmpresa
                  : "N/A";

                return (
                  <>
                    <div
                      className="relative ml-2 flex "
                      title={
                        ctt.situacaoCT === "Ativo"
                          ? "Ativo"
                          : "Contrato Encerrado"
                      }
                    >
                      <p className="absolute bg-green-600 w-[0.8vw] h-[0.8vw] rounded-full mt-2"></p>
                    </div>
                    <ArgumentosDados key={ctt.id}>
                      <Texto>{ctt.numeroCT}</Texto>
                      <Texto>{siglaEmpresa}</Texto>
                      <Texto>
                        {Number(ctt.ValorCT).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Texto>
                      <Texto>
                        {Number(ctt.ValorRecebidoCT).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Texto>
                    </ArgumentosDados>
                  </>
                );
              })}
            </ArticleDados>
          </ArticleBlock>

          <ArticleBlock className="max-h-[50%]">
            <HeaderDados>
              <TituloDados className="flex justify-between pr-3">
                <h1>Ganhos Mensais:</h1>{" "}
                <div className="flex gap-x-2">
                  <p>Recebido:</p>
                  <p>
                    {Number(valorTotalNotasAnalise).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </TituloDados>
            </HeaderDados>
            <ArticleDados className=" flex justify-center">
              <Chart
                chartType="PieChart"
                width={"100%"}
                height={"96%"}
                data={grafico}
                options={options}
              />
            </ArticleDados>
          </ArticleBlock>
        </SectionBlock>
      </Article>
    </Section>
  );
};
