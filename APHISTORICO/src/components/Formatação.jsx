import styled from "styled-components";
import { useGlobalContext } from "../global/Global";
import { dateFormat } from "../functions/dateFormat";
import { realFormat } from "../functions/realFormat";
import { TbPencilCog, TbAlignLeft, TbArrowForward } from "react-icons/tb";
import Select from "react-select";
import { NumericFormat } from "react-number-format";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.6vw;
  padding: 12px;
  padding-left: 1em;
  padding-right: 1em;
  font-weight: 600;
  border-radius: 0.7em;
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

const SectionBlock = styled.div`
  flex: 1 1 0%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderDados = styled.div`
  flex: 0 1 auto;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-top-right-radius: 1em;
  border-top-left-radius: 1em;
  border-bottom-right-radius: 0.2em;
  border-bottom-left-radius: 0.2em;
  background: #f97316;
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

const AgruparDNota = styled.div`
  margin-left: 1em;
  gap: 1em;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const SectionBlockNota = styled.div`
  width: auto;
  min-width: 7em;
  max-width: 35em;
  display: flex;
  flex-direction: column;
`;
const TituloNota = styled.div`
  font-size: 1.1vw;
  font-weight: 650;
`;

const DescriçãoNota = styled.div`
  background-color: #d1d5db;
  border-radius: 0.6em;
  font-size: 0.9vw;

  padding-left: 10px;
  padding-right: 10px;
`;

const TabelaAtual = styled.div`
  background-color: #d1d5db;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: auto;
  border-radius: 1em;
`;

const InputTabela = styled.input`
  border-radius: 0.5em;
  padding: 3px;
  padding-left: 10px;
`;

const AgruparTabelaN = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 20em;
`;

export function Descricao(Titulo, Texto) {
  return (
    <SectionBlockNota>
      <TituloNota>{Titulo}</TituloNota>
      <DescriçãoNota>{Texto}</DescriçãoNota>
    </SectionBlockNota>
  );
}

export const Fort = ({ empresaId }) => {
  const {ip, empresa, nota, pedido, contrato, setPedido } = useGlobalContext();

  const [data, setData] = useState({
    valorPrcentagemAntNF: "",
    situacaoNF: null,
    valorRecebidoNF: "",
  });

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

  const Empresa = empresa.find((emp) => emp.id === 1);
  const siglaEmpresa = Empresa ? Empresa.siglaEmpresa : "N/A";
  const ContratoEmpresa = contrato.find((ct) => ct.empresaCT === Empresa.id);
  const NotasEmpresa = nota.filter((nota) => {
    const isSameEmpresa = nota.idEmpresa === Empresa.id;
    const dataNota = new Date(nota.dataNF);
    const isSameYear = dataNota.getFullYear() === parseInt(ano);
    return isSameEmpresa && isSameYear;
  });

  NotasEmpresa.sort((a, b) => b.numeroNotaNF - a.numeroNotaNF);

  const NAnalisada = NotasEmpresa.filter(
    (nota) => nota.situacaoNF === "Em Análise"
  );
  const NAntecipada = NotasEmpresa.filter(
    (nota) => nota.situacaoNF === "Antecipada"
  );
  const NRecebida = NotasEmpresa.filter(
    (nota) => nota.situacaoNF === "Recebida"
  );

  const [state, setState] = useState({});
  const [notaState, setNotaState] = useState({});
  const [notaSelecionada, setNotaSelecionada] = useState(null);
  const [notaSelecionadaCompleta, setNotaSelecionadaCompleta] = useState(null);

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

  const [stateContrato, setStateContrat] = useState({
    contratoAtualizado: false,
    AlertaContrato: false,
  });

  const atualizarPedido = pedido.filter((pedido) => {
    const idPedido =
      notaSelecionada !== null && (
      notaSelecionada.numeroPedidoNF === pedido.numeroPDD);
    return idPedido;
  });
  console.log(notaSelecionada.numeroPedidoNF , atualizarPedido.nu) 

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

  const ButtoSelecao = (id) => {
    const novoEstado = Object.keys(notaState).reduce((obj, key) => {
      obj[key] = false;
      setState((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
      return obj;
    }, {});

    novoEstado[id] = true;
    novoEstado[id] = !notaState[id];

    setNotaState(novoEstado);
  };

  const valorInput = (e) => {
    const { name, value } = e.target;
    let newData = { ...data, [name]: value };

    if (name === "valorPrcentagemAntNF") {
      const porcentagemAntecipada = parseFloat(value / 100);
      const calculorAntercipa =
        notaSelecionada.valorReceberNF * porcentagemAntecipada;
      const valorRecebido = notaSelecionada.valorReceberNF - calculorAntercipa;
      newData = { ...newData, valorRecebidoNF: valorRecebido };
    }

    setData(newData);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
    const valor = option.value;
    var ValorNota = notaSelecionada.valorReceberNF;
    if (valor === "Recebida") {
      setData({ ...data, situacaoNF: valor, valorRecebidoNF: ValorNota });
    } else {
      setData({ ...data, situacaoNF: valor });
    }
  };

  const options = [
    {
      value: "Recebida",
      label: (
        <div className="flex justify-start items-center gap-3">
          <p className="w-[1vw] h-[1vw] bg-red-500 rounded-full drop-shadow-md"></p>
          <p>Recebida</p>
        </div>
      ),
    },
    {
      value: "Antecipada",
      label: (
        <div className="flex justify-start items-center gap-3">
          <p className="w-[1vw] h-[1vw] bg-yellow-400 rounded-full drop-shadow-md"></p>
          <p>Antecipada</p>
        </div>
      ),
    },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "10px",
      color: "black",
      fontSize: "1vw",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "orange" : "white",
      color: state.isSelected ? "white" : "black",
    }),
  };

  const updateNota = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (contratoAtualizado.length <= 0) {
      const novoValor =
        atualizarPedido !== undefined
          ? Number(notaSelecionada.valorRecebidoNF) +
            atualizarPedido.valorRecebidoPDD
          : 0;

      axios.put(
        ip + `/pedido/` + atualizarPedido.numeroPDD,
        {
          valorRecebidoPDD: novoValor,
        },
        headers
      );
    }

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

  console.log(atualizarPedido.numeroPDD);

  return (
    <Section>
      {notaSelecionada ? (
        <>
          <Header>
            <p>
              Nota da {siglaEmpresa} - N°{notaSelecionada.numeroNotaNF}
            </p>

            <button onClick={() => setNotaSelecionada(null)} title="Voltar">
              <TbArrowForward />
            </button>
          </Header>

          <Article>
            <div className="flex flex-row items-start">
              <SectionBlock className="gap-y-2 flex-1">
                <AgruparDNota>
                  {Descricao("N° Nota:", notaSelecionada.numeroNotaNF + "°")}
                  {Descricao("Data Nota:", dateFormat(notaSelecionada.dataNF))}
                  {Descricao("N° Pedido:", notaSelecionada.numeroPedidoNF)}
                </AgruparDNota>
                <AgruparDNota>
                  {Descricao("Data Nota:", dateFormat(notaSelecionada.dataNF))}
                  {Descricao("Situação:", notaSelecionada.situacaoNF)}
                </AgruparDNota>

                <AgruparDNota>
                  {Descricao("Nome da Empresa:", notaSelecionada.nomeEmpresaNF)}
                  {Descricao("CNPJ:", notaSelecionada.cnpjEmpresaNF)}
                </AgruparDNota>

                <AgruparDNota>
                  {Descricao("Local Retido:", notaSelecionada.retidoNF)}
                </AgruparDNota>

                <AgruparDNota>
                  {Descricao("N° CNAE:", notaSelecionada.numeroKinayNF)}
                  {Descricao("Atividade CNAE:", notaSelecionada.KinayNF)}
                </AgruparDNota>

                <AgruparDNota>
                  {Descricao(
                    "Porcentagem CNAE:",
                    notaSelecionada.porcentagemKinayNF
                  )}
                  {Descricao("Imposto:", notaSelecionada.ImpostoNF)}
                </AgruparDNota>

                <AgruparDNota>
                  {Descricao(
                    "Valor Total:",
                    realFormat(notaSelecionada.valorNF)
                  )}
                  {Descricao(
                    "Valor Imposto:",
                    realFormat(notaSelecionada.valorImpostoNF)
                  )}
                  {Descricao(
                    "Valor Receber:",
                    realFormat(notaSelecionada.valorReceberNF)
                  )}
                  {Descricao(
                    "Valor Recebido:",
                    realFormat(notaSelecionada.valorRecebidoNF)
                  )}
                </AgruparDNota>

                <AgruparDNota>
                  {Descricao(
                    "Descrição do Serviço:",
                    notaSelecionada.descricaoServNF
                  )}
                </AgruparDNota>

                <AgruparDNota>
                  {Descricao(
                    "Prazo Pagamento:",
                    notaSelecionada.prazoPagamentoNF
                  )}
                </AgruparDNota>

                <AgruparDNota>
                  {notaSelecionada.observacaoNF === "" ? (
                    <>{Descricao("Observação:", "Sem Observação")}</>
                  ) : (
                    <>
                      {Descricao("Observação:", notaSelecionada.observacaoNF)}
                    </>
                  )}
                </AgruparDNota>
              </SectionBlock>

              <TabelaAtual className="flex-initial">
                <AgruparTabelaN>
                  <TituloNota className="text-center text-[1.2vw]">
                    Atualizar Nota
                  </TituloNota>
                </AgruparTabelaN>

                <AgruparTabelaN>
                  <TituloNota>Situação:</TituloNota>

                  <Select
                    styles={customStyles}
                    isClearable
                    value={selectedOption}
                    onChange={handleChange}
                    name="tipoConta"
                    options={options}
                  />
                </AgruparTabelaN>

                {data.situacaoNF === "Antecipada" && (
                  <AgruparTabelaN>
                    <TituloNota>Porcentagem:</TituloNota>
                    <InputTabela
                      type="text"
                      placeholder="10%"
                      name="valorPrcentagemAntNF"
                      onChange={valorInput}
                      value={data.valorPrcentagemAntNF}
                    />
                  </AgruparTabelaN>
                )}

                <AgruparTabelaN>
                  <TituloNota>Valor Recebido:</TituloNota>
                  <InputTabela
                    type="text"
                    value={realFormat(data.valorRecebidoNF)}
                    readOnly
                  />
                </AgruparTabelaN>

                <button
                  className="w-full bg-orange-500 p-1 font-semibold rounded-[1em] mt-1 drop-shadow-sm"
                  onClick={updateNota}
                >
                  Atualizar
                </button>
              </TabelaAtual>
            </div>
          </Article>
        </>
      ) : notaSelecionadaCompleta ? (
        <>
          <Header>
            <p>
              Nota da {siglaEmpresa} - N°{notaSelecionadaCompleta.numeroNotaNF}
            </p>

            <button
              onClick={() => setNotaSelecionadaCompleta(null)}
              title="Voltar"
            >
              <TbArrowForward />
            </button>
          </Header>

          <Article>
            <SectionBlock></SectionBlock>
          </Article>
        </>
      ) : (
        <>
          <Header>
            <p>Notas da {siglaEmpresa}</p>

            <form
              className="flex justify-center items-center "
              onSubmit={handleDataChange}
            >
              <select
                className="w-auto border-2 text-[1vw] rounded-xl border-gray-500 flex justify-center p-1"
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
              <HeaderDados>
                <TituloDados>Nota Analisando</TituloDados>
                <TituloArgumentos>
                  <Texto>N° Pedido</Texto>
                  <Texto>N° Nota</Texto>
                  <Texto>Situação</Texto>
                  <Texto>Receber</Texto>
                  <Texto>Recebido</Texto>
                  <Texto>Data</Texto>
                </TituloArgumentos>
              </HeaderDados>
              <ArticleDados>
                {NAnalisada.length <= 0 ? (
                  <ArgumentosDados className=" text-[1.2vw] text-center bg-gray-200">
                    <Texto>Nenhuma nota cadastrada!</Texto>
                  </ArgumentosDados>
                ) : (
                  <ArticleDados>
                    {NAnalisada.map((nt) => {
                      return (
                        <ArgumentosDados
                          key={nt.id}
                          onClick={() => ButtoSelecao(nt.id)}
                          className={`${
                            notaState[nt.id] ? "bg-gray-300" : "bg-gray-200"
                          }`}
                        >
                          <Texto>{nt.numeroPedidoNF}</Texto>
                          <Texto>{nt.numeroNotaNF}</Texto>
                          <Texto>{nt.situacaoNF}</Texto>
                          <Texto>{realFormat(nt.valorReceberNF)}</Texto>
                          <Texto>{realFormat(nt.valorRecebidoNF)}</Texto>
                          <Texto className="relative">
                            {dateFormat(nt.dataNF)}{" "}
                            <div
                              className="absolute top-[0.5px] right-3 p-1 flex justify-center items-center text-[0.8vw] bg-[#f97316] rounded-full"
                              onClick={() => setNotaSelecionada(nt)}
                            >
                              <TbPencilCog />
                            </div>
                          </Texto>
                        </ArgumentosDados>
                      );
                    })}
                  </ArticleDados>
                )}
              </ArticleDados>
              <p className="bg-[#f97316] w-full h-4 rounded-b-[1em] rounded-t-[0.2em]"></p>
            </SectionBlock>

            <SectionBlock>
              <HeaderDados>
                <TituloDados>Nota Antecipada</TituloDados>
                <TituloArgumentos>
                  <Texto>N° Pedido</Texto>
                  <Texto>N° Nota</Texto>
                  <Texto>Situação</Texto>
                  <Texto>Receber</Texto>
                  <Texto>Recebido</Texto>
                  <Texto>Data</Texto>
                </TituloArgumentos>
              </HeaderDados>
              <ArticleDados>
                {NAntecipada.length <= 0 ? (
                  <ArgumentosDados className=" text-[1.2vw] text-center bg-gray-200">
                    <Texto>Nenhuma nota cadastrada!</Texto>
                  </ArgumentosDados>
                ) : (
                  <ArticleDados>
                    {NAntecipada.map((nt) => {
                      return (
                        <ArgumentosDados
                          key={nt.id}
                          onClick={() => ButtoSelecao(nt.id)}
                          className={`${
                            notaState[nt.id] ? "bg-gray-300" : "bg-gray-200"
                          }`}
                        >
                          <Texto>{nt.numeroPedidoNF}</Texto>
                          <Texto>{nt.numeroNotaNF}</Texto>
                          <Texto>{nt.situacaoNF}</Texto>
                          <Texto>{realFormat(nt.valorReceberNF)}</Texto>
                          <Texto>{realFormat(nt.valorRecebidoNF)}</Texto>
                          <Texto className="relative">
                            {dateFormat(nt.dataNF)}{" "}
                            <div
                              className="absolute top-[0.5px] right-3 p-1 flex justify-center items-center text-[0.8vw] bg-gray-400 rounded-full"
                              onClick={() => setNotaSelecionadaCompleta(nt)}
                            >
                              <TbAlignLeft />
                            </div>
                          </Texto>
                        </ArgumentosDados>
                      );
                    })}
                  </ArticleDados>
                )}
              </ArticleDados>
              <p className="bg-[#f97316] w-full h-4 rounded-b-[1em] rounded-t-[0.2em]"></p>
            </SectionBlock>

            <SectionBlock>
              <HeaderDados>
                <TituloDados>Nota Recebida</TituloDados>
                <TituloArgumentos>
                  <Texto>N° Pedido</Texto>
                  <Texto>N° Nota</Texto>
                  <Texto>Situação</Texto>
                  <Texto>Receber</Texto>
                  <Texto>Recebido</Texto>
                  <Texto>Data</Texto>
                </TituloArgumentos>
              </HeaderDados>
              <ArticleDados>
                {NRecebida.length <= 0 ? (
                  <ArgumentosDados className=" text-[1.2vw] text-cente bg-gray-200">
                    <Texto>Nenhuma nota cadastrada!</Texto>
                  </ArgumentosDados>
                ) : (
                  <ArticleDados>
                    {NRecebida.map((nt) => {
                      return (
                        <ArgumentosDados
                          key={nt.id}
                          onClick={() => ButtoSelecao(nt.id)}
                          className={`${
                            notaState[nt.id] ? "bg-gray-300" : "bg-gray-200"
                          }`}
                        >
                          <Texto>{nt.numeroPedidoNF}</Texto>
                          <Texto>{nt.numeroNotaNF}</Texto>
                          <Texto>{nt.situacaoNF}</Texto>
                          <Texto>{realFormat(nt.valorReceberNF)}</Texto>
                          <Texto>{realFormat(nt.valorRecebidoNF)}</Texto>
                          <Texto className="relative">
                            {dateFormat(nt.dataNF)}{" "}
                            <div
                              className="absolute top-[0.5px] right-3 p-1 flex justify-center items-center text-[0.8vw] bg-gray-400 rounded-full"
                              onClick={() => setNotaSelecionadaCompleta(nt)}
                            >
                              <TbAlignLeft />
                            </div>
                          </Texto>
                        </ArgumentosDados>
                      );
                    })}
                  </ArticleDados>
                )}
              </ArticleDados>
              <p className="bg-[#f97316] w-full h-4 rounded-b-[1em] rounded-t-[0.2em]"></p>
            </SectionBlock>
          </Article>
        </>
      )}
    </Section>
  );
};
