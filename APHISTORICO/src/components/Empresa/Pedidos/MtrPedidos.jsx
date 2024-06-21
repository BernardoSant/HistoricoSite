import styled from "styled-components";
import { useGlobalContext } from "../../../global/Global";
import { dateFormat } from "../../../functions/dateFormat";
import { realFormat } from "../../../functions/realFormat";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { TbAlertCircle } from "react-icons/tb";
import { NumericFormat } from "react-number-format";
import { useState, useEffect } from "react";
import { Header } from "../../Componentes/Header";
import { CorClara, CorEscura } from "../../../../tailwind.config";

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.2vw;
  padding: 5px;
  font-weight: 600;
  border-radius: 0.4em;
  background: ${CorClara(0)};
  box-shadow: inset 5px -5px 10px ${CorEscura(0.2)}, inset -5px 5px 10px ${CorClara(0.1)};
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 1vw;
`;

const Article = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 12px;
  padding-right: 5px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8f8f8f;
    border-radius: 1em;
  }
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
  flex-direction: column;
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
  background: ${CorClara(0)};
`;

const ArticleDados = styled.div`
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  max-height: 15.5em;
  font-size: 0.8vw;
  font-weight: bolder;
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
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Textorg = styled.h1`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
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

export const MtrPedidos = ({ empresaId }) => {
  const { empresa, pedido, contrato } = useGlobalContext();

  const handleDataChange = (event) => {
    setData(event.target.value);

    const dataSelecionada = new Date(event.target.value);
    const anoSelecionado = dataSelecionada.getFullYear();

    setAno(anoSelecionado);
  };

  const [ano, setAno] = useState(new Date().getFullYear());
  const uniqueYears = new Set();

  const Empresa = empresa.find((emp) => emp.id === empresaId);
  const siglaEmpresa = Empresa ? Empresa.siglaEmpresa : "N/A";
  const ContratoEmpresa = contrato.filter(
    (ct) => ct.empresaCT === empresaId && ct.situacaoCT === "Ativo"
  );

  const PedidoEmpresa = pedido.filter((pdd) => {
    const isSameEmpresa = pdd.empresaPDD === empresaId;
    const dataPedido = new Date(pdd.dataPDD);
    const isSameYear = dataPedido.getFullYear() === parseInt(ano);
    return isSameEmpresa && isSameYear;
  });

  const PedidosFiltro = pedido.filter((pdd) => pdd.empresaPDD === empresaId);
  PedidosFiltro.sort((a, b) => new Date(b.dataPDD) - new Date(a.dataPDD));

  PedidoEmpresa.sort((a, b) => new Date(b.dataPDD) - new Date(a.dataPDD));

  const PCriada = PedidoEmpresa.filter((pdd) => pdd.situacaoPDD === "Criada");

  const PAndamento = PedidoEmpresa.filter(
    (pdd) => pdd.situacaoPDD === "Andamento"
  );

  const PFinalizada = PedidoEmpresa.filter(
    (pdd) => pdd.situacaoPDD === "Finalizada"
  );

  const VlrReceber = PCriada.reduce((total, pdd) => total + pdd.valorPDD, 0);
  const VlrAndamento = PAndamento.reduce(
    (total, pdd) => total + pdd.valorRecebidoPDD,
    0
  );
  const VlrRecebido = PFinalizada.reduce(
    (total, pdd) => total + pdd.valorRecebidoPDD,
    0
  );

  const VlrTotalRecebido = VlrAndamento + VlrRecebido;

  const [state, setState] = useState({});

  const [pedidoState, setPedidoState] = useState({});
  const ButtoSelecao = (id) => {
    const novoEstado = Object.keys(pedidoState).reduce((obj, key) => {
      obj[key] = false;
      setState((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
      return obj;
    }, {});

    novoEstado[id] = true;
    novoEstado[id] = !pedidoState[id];

    setPedidoState(novoEstado);
  };

  const [seachState, setSeachState] = useState({});
  const ButtoSeach = (id) => {
    const novoEstado = Object.keys(seachState).reduce((obj, key) => {
      obj[key] = false;
      setState((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
      return obj;
    }, {});

    novoEstado[id] = true;

    setSeachState(novoEstado);
  };

  console.log(seachState);

  return (
    <Section>
      {ContratoEmpresa.length > 0 ? (
        <div className="w-full h-full justify-center items-center flex drop-shadow-md">
          <nav className="flex flex-col justify-center items-center">
            <h1 className="text-[2.5vw] text-red-500 ">
              <TbAlertCircle />
            </h1>
            <h1 className="w-full h-full justify-center items-center flex flex-col text-[1.8vw]">
              Alerta! {siglaEmpresa} não contem pedidos.
            </h1>
            <h2 className="text-[0.8vw] ">
              Contrator e seviços estão disponiveis na tela <u>Notas Fiscais</u>
              .
            </h2>
          </nav>
        </div>
      ) : (
        <>
          <Header>
            <div className="w-full justify-between flex items-center">
              <p>Pedidos da {siglaEmpresa}</p>

              <input
                list="Serch"
                type="text"
                placeholder="Pesquisar Pedido"
                title="Informe o N° do Pedido"
                className="w-auto border-2 text-[1vw] rounded-xl border-gray-500 flex justify-center p-1 h-8"
                onChange={(e) => ButtoSeach(e.target.value)}
              />

              <datalist id="Serch" className="">
                {PedidoEmpresa.map((pdd) => {
                  return (
                    <option value={pdd.numeroPDD}>
                      {pdd.nomePDD} - {pdd.situacaoPDD}
                    </option>
                  );
                })}
              </datalist>
              <form
                className="flex justify-center items-center "
                onSubmit={handleDataChange}
              >
                <select
                  className="w-auto border-2 text-[1vw] rounded-xl border-gray-500 flex justify-center p-1"
                  value={ano}
                  onChange={(event) => setAno(event.target.value)}
                >
                  {PedidosFiltro.map((nt) => {
                    const Data = new Date(nt.dataPDD);
                    const Ano = Data.getFullYear();

                    if (!uniqueYears.has(Ano)) {
                      uniqueYears.add(Ano);
                      return (
                        <option key={Ano} value={Ano}>
                          {Ano}
                        </option>
                      );
                    }
                  }).filter((option) => option !== null)}
                </select>
              </form>
            </div>
          </Header>
          <Article className="h-full overflow-auto">
            <Article>
              {PCriada.length > 0 && (
                <SectionBlock>
                  <HeaderDados>
                    <TituloDados>
                      Pedido Criado
                      <div
                        className={`flex justify-center items-center gap-2 bg-CorTerciariaBT px-3 rounded-[1em] ${
                          PCriada.length <= 0 && "hidden"
                        }`}
                      >
                        <Texto>Total Receber: {realFormat(VlrReceber)}</Texto>
                      </div>
                    </TituloDados>

                    <TituloArgumentos>
                      <Texto>N° Pedido</Texto>
                      <Texto>Situação</Texto>
                      <Textorg className="w-[17em]">Descrição</Textorg>
                      <Texto>Receber</Texto>
                      <Texto>Data</Texto>
                    </TituloArgumentos>
                  </HeaderDados>
                  <ArticleDados>
                    <ArticleDados>
                      {PCriada.map((pdd) => {
                        return (
                          <ArgumentosDados
                            onClick={() => ButtoSelecao(pdd.id)}
                            className={`${
                              pedidoState[pdd.id]
                                ? "bg-gray-300"
                                : "bg-gray-200"
                            } ${seachState[pdd.numeroPDD] && "bg-gray-400/60"}`}
                          >
                            <Texto className="relative">
                              <div
                                title={`${pdd.descricaoServPDD}`}
                                className="
                        absolute top-0 left-0  p-1 flex justify-center items-center text-[0.8vw] bg-gray-400 rounded-full z-0"
                              >
                                <AiOutlineQuestionCircle />
                              </div>
                              {pdd.numeroPDD}
                            </Texto>
                            <Texto>{pdd.situacaoPDD}</Texto>
                            <Textorg
                              className=" w-[20em] max-w-[20em]"
                              title={`${pdd.nomePDD}`}
                            >
                              {pdd.nomePDD}
                            </Textorg>
                            <Texto>{realFormat(pdd.valorPDD)}</Texto>
                            <Texto>{dateFormat(pdd.dataPDD)}</Texto>
                          </ArgumentosDados>
                        );
                      })}
                    </ArticleDados>
                  </ArticleDados>
                  <p className="bg-CorPrimariaBT w-full h-4 rounded-b-[0.7em] rounded-t-[0.2em]"></p>
                </SectionBlock>
              )}
              {PAndamento.length > 0 && (
                <SectionBlock>
                  <HeaderDados>
                    <TituloDados>
                      Pedido Andamento
                      <div
                        className={`flex justify-center items-center gap-2 bg-CorTerciariaBT px-3 rounded-[1em] ${
                          PAndamento.length <= 0 && "hidden"
                        }`}
                      >
                        <Texto>
                          Total Recebido: {realFormat(VlrAndamento)}
                        </Texto>
                      </div>
                    </TituloDados>

                    <TituloArgumentos>
                      <Texto>N° Pedido</Texto>
                      <Texto>Situação</Texto>
                      <Textorg className="w-[17em]">Descrição</Textorg>
                      <Texto>Receber</Texto>
                      <Texto>Recebido</Texto>
                      <Texto>Data Alteração</Texto>
                    </TituloArgumentos>
                  </HeaderDados>
                  <ArticleDados>
                    <ArticleDados>
                      {PAndamento.map((pdd) => {
                        return (
                          <ArgumentosDados
                            onClick={() => ButtoSelecao(pdd.id)}
                            className={`${
                              pedidoState[pdd.id]
                                ? "bg-gray-300"
                                : "bg-gray-200"
                            } ${seachState[pdd.numeroPDD] && "bg-gray-400/60"}`}
                          >
                            <Texto className="relative">
                              <div
                                title={`${pdd.descricaoServPDD}`}
                                className="
                        absolute top-0 left-0  p-1 flex justify-center items-center text-[0.8vw] bg-gray-400 rounded-full z-0"
                              >
                                <AiOutlineQuestionCircle />
                              </div>
                              {pdd.numeroPDD}
                            </Texto>
                            <Texto>{pdd.situacaoPDD}</Texto>
                            <Textorg
                              className=" w-[20em] max-w-[20em]"
                              title={`${pdd.nomePDD}`}
                            >
                              {pdd.nomePDD}
                            </Textorg>
                            <Texto>{realFormat(pdd.valorPDD)}</Texto>
                            <Texto>{realFormat(pdd.valorRecebidoPDD)}</Texto>
                            <Texto>{dateFormat(pdd.updatedAt)}</Texto>
                          </ArgumentosDados>
                        );
                      })}
                    </ArticleDados>
                  </ArticleDados>
                  <p className="bg-CorPrimariaBT w-full h-4 rounded-b-[0.7em] rounded-t-[0.2em]"></p>
                </SectionBlock>
              )}
              {PFinalizada.length > 0 && (
                <SectionBlock>
                  <HeaderDados>
                    <TituloDados>
                      Pedido Finalizado
                      <div
                        className={`flex justify-center items-center gap-2 bg-CorTerciariaBT px-3 rounded-[1em] ${
                          PFinalizada.length <= 0 && "hidden"
                        }`}
                      >
                        <Texto>Total Recebido: {realFormat(VlrRecebido)}</Texto>
                      </div>
                    </TituloDados>

                    <TituloArgumentos>
                      <Texto>N° Pedido</Texto>
                      <Texto>Situação</Texto>
                      <Textorg className="w-[17em]">Descrição</Textorg>
                      <Texto>Receber</Texto>
                      <Texto>Recebido</Texto>
                      <Texto>Data Concluida</Texto>
                    </TituloArgumentos>
                  </HeaderDados>
                  <ArticleDados>
                    <ArticleDados>
                      {PFinalizada.map((pdd) => {
                        return (
                          <ArgumentosDados
                            onClick={() => ButtoSelecao(pdd.id)}
                            className={`${
                              pedidoState[pdd.id]
                                ? "bg-gray-300"
                                : "bg-gray-200"
                            } ${seachState[pdd.numeroPDD] && "bg-gray-400/60"}`}
                          >
                            <Texto className="relative">
                              <div
                                title={`${pdd.descricaoServPDD}`}
                                className="
                        absolute top-0 left-0  p-1 flex justify-center items-center text-[0.8vw] bg-gray-400 rounded-full z-0"
                              >
                                <AiOutlineQuestionCircle />
                              </div>
                              {pdd.numeroPDD}
                            </Texto>
                            <Texto>{pdd.situacaoPDD}</Texto>
                            <Textorg
                              className=" w-[20em] max-w-[20em]"
                              title={`${pdd.nomePDD}`}
                            >
                              {pdd.nomePDD}
                            </Textorg>
                            <Texto>{realFormat(pdd.valorPDD)}</Texto>
                            <Texto>{realFormat(pdd.valorRecebidoPDD)}</Texto>
                            <Texto>{dateFormat(pdd.updatedAt)}</Texto>
                          </ArgumentosDados>
                        );
                      })}
                    </ArticleDados>
                  </ArticleDados>
                  <p className="bg-CorPrimariaBT w-full h-4 rounded-b-[0.7em] rounded-t-[0.2em]"></p>
                </SectionBlock>
              )}
            </Article>
          </Article>
          <Footer>
            <Texto>Total Recebido: {realFormat(VlrTotalRecebido)}</Texto>
          </Footer>
        </>
      )}
    </Section>
  );
};
