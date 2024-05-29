import styled from "styled-components";
import { useGlobalContext } from "../global/Global";
import { useState, useEffect } from "react";
import { GanhosMensais } from "./Graficos/ResumoGanhos";

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
  display: grid;
  grid-template-columns: 50% 50%;
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

const SectionBlock = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ArticleBlock = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  border-radius: 1em;
  background-color: #d8d6d679;

  @media (max-height: 700px) {
    max-height: 14.8vw;
  }
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
  height: 100%;
  overflow: auto;
  padding-left: 0.5em;
  padding-right: 0.5em;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-top: 3px;
  padding-bottom: 3px;
  align-items: center;

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

const Dados = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.2vw;
  font-weight: 650;
`;

const SeparacaoDados = styled.div`
  display: flex;
  width: 10%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NumberDados = styled.div`
  font-size: 1.7vw;
  height: auto;
  text-align: center;
`;

const DescricaoDados = styled.div`
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
  font-size: 1vw;
  overflow: hidden;
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
  width: 100%;
  font-size: 0.9vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 550;
  border-radius: 1rem;

  padding-top: 2px;
  padding-bottom: 2px;
  --tw-bg-opacity: 1;
  cursor: pointer;
`;

export const Restaurando = () => {
  const { empresa, nota, pedido, contrato } = useGlobalContext();
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

  const valorTotalNotasAReceber = notasReceberFiltradas.reduce(
    (total, nota) => total + nota.valorReceberNF,
    0
  );

  const [state, setState] = useState({});

  const [selecaoState, setSelecaoState] = useState({});

  const ButtomSelecao = (id) => {
    // Primeiro, crie um novo objeto onde todas as chaves são definidas como false
    const novoEstado = Object.keys(selecaoState).reduce((obj, key) => {
      obj[key] = false;
      setState((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
      return obj;
    }, {});

    // Em seguida, defina o estado do selecao clicado como true
    novoEstado[id] = true;
    novoEstado[id] = !selecaoState[id];

    // Finalmente, atualize o estado
    setSelecaoState(novoEstado);
  };

  return (
    <Section>
      <Header>
        {" "}
        <>Resumo Mensal</>
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
        <SectionBlock>
          <ArticleBlock className="h-[40%] max-h-[23vw]">
            <HeaderDados>
              <TituloDados>Nota Fiscal Recebida:</TituloDados>
              <TituloArgumentos>
                <Texto>Pedido</Texto>
                <Texto>Nota</Texto>
                <Texto>Empresa</Texto>
                <Texto>Receber</Texto>
              </TituloArgumentos>
            </HeaderDados>
            <ArticleDados>
              {notasRecebidas.map((nota) => {
                const empresaEncontrada = empresa.find(
                  (empresas) => empresas.id === nota.idEmpresa
                );
                const siglaEmpresa = empresaEncontrada
                  ? empresaEncontrada.siglaEmpresa
                  : "N/A";
                return (
                  <ArgumentosDados
                    key={nota.id}
                    onClick={() => ButtomSelecao(nota.numeroPedidoNF)} 
                    className={`${
                      selecaoState[nota.numeroPedidoNF]
                        ? "bg-gray-400"
                        : "bg-gray-300"
                    }`}
                  >
                    <Texto>{nota.numeroPedidoNF}</Texto>
                    <Texto>{String(nota.numeroNotaNF).padStart(5, "0")}</Texto>
                    <Texto>{siglaEmpresa}</Texto>
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

          <ArticleBlock className="h-[40%] max-h-[22vw]">
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
                <Texto>Pedido</Texto>
                <Texto>Nota</Texto>
                <Texto>Empresa</Texto>
                <Texto>Receber</Texto>
              </TituloArgumentos>
            </HeaderDados>
            <ArticleDados>
              {notasReceberFiltradas.map((nota) => {
                const empresaEncontrada = empresa.find(
                  (empresas) => empresas.id === nota.idEmpresa
                );
                const siglaEmpresa = empresaEncontrada
                  ? empresaEncontrada.siglaEmpresa
                  : "N/A";
                return (
                  <ArgumentosDados
                  onClick={() => ButtomSelecao(nota.numeroPedidoNF)}
                    key={nota.id}
                    className={`${
                      selecaoState[nota.numeroPedidoNF]
                        ? "bg-gray-400"
                        : "bg-gray-300"
                    }`}
                  >
                    <Texto>{nota.numeroPedidoNF}</Texto>
                    <Texto>{String(nota.numeroNotaNF).padStart(5, "0")}</Texto>
                    <Texto>{siglaEmpresa}</Texto>
                    <Texto>
                      {Number(nota.valorReceberNF).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Texto>
                  </ArgumentosDados>
                );
              })}
            </ArticleDados>
          </ArticleBlock>

          <ArticleBlock className="h-[20%]">
            <HeaderDados>
              <TituloDados>Empresas Cadastradas:</TituloDados>
              <TituloArgumentos>
                <Texto>Sigla</Texto>
                <Texto>CNPJ</Texto>
              </TituloArgumentos>
            </HeaderDados>
            <ArticleDados>
              {empresa.map((empresas) => (
                <ArgumentosDados
                  key={empresas.id}
                  className={`bg-gray-300
                `}
                >
                  <Texto>{empresas.siglaEmpresa}</Texto>
                  <Texto>{empresas.cnpjEmpresa}</Texto>
                </ArgumentosDados>
              ))}
            </ArticleDados>
          </ArticleBlock>
        </SectionBlock>

        {
          // segundo
        }
        <SectionBlock>
          <ArticleBlock className="h-[40%] max-h-[23vw]">
            <HeaderDados>
              <TituloDados>Pedidos:</TituloDados>
              <TituloArgumentos>
                <Texto>Número</Texto>
                <Texto>Empresa</Texto>
                <Texto>Situação</Texto>
                <Texto>Valor</Texto>
                <Texto>Recebido</Texto>
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
                  <ArgumentosDados
                    key={pedido.id}
                    onClick={() => ButtomSelecao(pedido.numeroPDD)}
                    className={`${
                      selecaoState[pedido.numeroPDD]
                        ? "bg-gray-400"
                        : "bg-gray-300"
                    }`}
                  >
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

          <ArticleBlock className="h-[20%] max-h-[10vw]">
            <HeaderDados>
              <TituloDados>Contrato:</TituloDados>
              <TituloArgumentos>
                <Texto>Número</Texto>
                <Texto>Empresa</Texto>
                <Texto>Valor</Texto>
                <Texto>Recebido</Texto>
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
                  <ArgumentosDados
                    key={ctt.id}
                    className={`${
                      selecaoState[ctt.numeroCT]
                        ? "bg-gray-400"
                        : "bg-gray-300"
                    }`}
                    onClick={() => ButtomSelecao(ctt.numeroCT)}

                  >
                    <Texto className="relative">
                      {ctt.numeroCT}
                      <p
                        className="absolute bg-green-600 w-[0.8vw] h-[0.8vw] rounded-full left-[6px] "
                        title={
                          ctt.situacaoCT === "Ativo"
                            ? "Ativo"
                            : "Contrato Encerrado"
                        }
                      ></p>
                    </Texto>
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
                );
              })}
            </ArticleDados>
          </ArticleBlock>

          <ArticleBlock className="h-[40%] max-h-[24vw]">
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
            <ArticleDados>
              <GanhosMensais mesSelecionado={mes} anoSelecionado={ano} />
            </ArticleDados>
          </ArticleBlock>
        </SectionBlock>
      </Article>
    </Section>
  );
};
