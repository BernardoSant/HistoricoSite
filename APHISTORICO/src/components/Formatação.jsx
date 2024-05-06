import styled from "styled-components";
import { useGlobalContext } from "../global/Global";
import { dateFormat } from "../functions/dateFormat";
import { realFormat } from "../functions/realFormat";
import { numNotaFormat } from "../functions/numNotaFormat";
import {
  TbPencilCog,
  TbAlignLeft,
  TbArrowForward,
  TbFileXFilled,
} from "react-icons/tb";
import { RiSaveLine } from "react-icons/ri";
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
  flex-direction: column;
  gap: 12px;
  font-size: 1vw;
`;

const Article = styled.div`
  width: 100%;
  height: 100%;
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
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding: 5px;
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

export const Fort = () => {
  const { ip, empresa, nota, pedido, contrato } = useGlobalContext();

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

  let Idtemp = 1;

  const Empresa = empresa.find((emp) => emp.id === Idtemp);
  const siglaEmpresa = Empresa ? Empresa.siglaEmpresa : "N/A";
  const ContratoEmpresa = contrato.filter(
    (ct) => ct.empresaCT === Idtemp && ct.situacaoCT === "Ativo"
  );
  const NotasEmpresa = nota.filter((nota) => {
    const isSameEmpresa = nota.idEmpresa === Idtemp;
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

  const ValorReceberA = NAnalisada.reduce(
    (total, nota) => total + nota.valorReceberNF,
    0
  );

  const DiferencaAntecipada = NAntecipada.reduce(
    (total, nota) => total + (nota.valorReceberNF - nota.valorRecebidoNF),
    0
  );

  const ValorRecebidoAntecipada = NAntecipada.reduce(
    (total, nota) => total + nota.valorRecebidoNF,
    0
  );

  const ValorRecebido = NRecebida.reduce(
    (total, nota) => total + nota.valorReceberNF,
    0
  );

  const ValorTotalRecebido = ValorRecebidoAntecipada + ValorRecebido;

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

  const [stateContrato, setStateContrat] = useState({
    contratoAtualizado: false,
    AlertaContrato: false,
  });

  const ButtomContrato = (key) => {
    setStateContrat((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const [dataContrato, setDataContrato] = useState({
    ValorCT: "",
    DataCT: "",
  });

  //kdjajshdjkhsjhsdjhdjskhdsjkhdjkhdkjhdskj

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

  const atualizarPedido = pedido.find((pedido) => {
    return (
      notaSelecionada !== null &&
      pedido.numeroPDD === notaSelecionada.numeroPedidoNF
    );
  });

  const atualizarContrato = contrato.find((ct) => {
    return (
      notaSelecionada !== null && ct.numeroCT === notaSelecionada.numeroPedidoNF
    );
  });

  const somaNotas = nota.reduce((acc, nota) => {
    if (acc[nota.numeroPedidoNF]) {
      acc[nota.numeroPedidoNF] += nota.valorRecebidoNF;
    } else {
      acc[nota.numeroPedidoNF] = nota.valorRecebidoNF;
    }
    return acc;
  }, {});

  const InputContrato = (e) => {
    var Valor = e.target.value;
    setDataContrato({ ...dataContrato, [e.target.name]: Valor });
  };

  const sendContrato = (NumeroContrato) => {
    var ValorContrato = dataContrato.ValorCT;
    var DataContrato = dataContrato.DataCT;

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .put(
        ip + "/contrato/" + NumeroContrato,
        { ValorCT: ValorContrato, dataCT: DataContrato },
        headers
      )
      .then((response) => {
        setDataContrato({
          ValorCT: "",
          DataCT: "",
        });
        toast.success(response.data.message);
        ButtomContrato("contratoAtualizado");
      });
  };

  const deletContrato = (NumeroContrato) => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .put(
        ip + "/contrato/" + NumeroContrato,
        { situacaoCT: "Inativo" },
        headers
      )
      .then((response) => {
        toast.success(response.data.message);
      });
  };

  const somaValores = nota.reduce((acc, nota) => {
    if (nota.situacaoNF === "Recebida" || nota.situacaoNF === "Antecipada") {
      if (acc[nota.numeroPedidoNF]) {
        acc[nota.numeroPedidoNF] += nota.valorNF;
      } else {
        acc[nota.numeroPedidoNF] = nota.valorNF;
      }
    }
    return acc;
  }, {});

  const somaValoresRecebidos = nota.reduce((acc, nota) => {
    if (nota.situacaoNF === "Recebida" || nota.situacaoNF === "Antecipada") {
      if (acc[nota.numeroPedidoNF]) {
        acc[nota.numeroPedidoNF] += nota.valorRecebidoNF;
      } else {
        acc[nota.numeroPedidoNF] = nota.valorRecebidoNF;
      }
    }
    return acc;
  }, {});

  const updateNota = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (ContratoEmpresa.length <= 0) {
      let situacao;

      if (
        somaValores[notaSelecionada.numeroPedidoNF] +
          notaSelecionada.valorNF ===
        Number(atualizarPedido.valorPDD)
      ) {
        situacao = "Finalizada";
      } else if (Number(notaSelecionada.valorNF) > 0) {
        situacao = "Andamento";
      } else {
        situacao = "Criada";
      }

      const novoValor =
        atualizarPedido !== undefined
          ? somaValoresRecebidos[notaSelecionada.numeroPedidoNF] +
            Number(data.valorRecebidoNF)
          : 0;

      axios.put(
        ip + `/pedido/` + atualizarPedido.numeroPDD,
        {
          situacaoPDD: situacao,
          valorRecebidoPDD: novoValor,
        },
        headers
      );
    } else if (ContratoEmpresa.length > 0) {
      const novoValor =
        atualizarContrato !== undefined
          ? somaValoresRecebidos[notaSelecionada.numeroPedidoNF] +
            Number(data.valorRecebidoNF)
          : 0;

      axios.put(
        ip + `/contrato/` + atualizarContrato.numeroCT,
        {
          ValorRecebidoCT: novoValor,
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
            <SectionBlock className="gap-y-2 flex-1">
              <AgruparDNota>
                {Descricao(
                  "N° Nota:",
                  notaSelecionadaCompleta.numeroNotaNF + "°"
                )}
                {Descricao(
                  "Data Nota:",
                  dateFormat(notaSelecionadaCompleta.dataNF)
                )}
                {Descricao(
                  "N° Pedido:",
                  notaSelecionadaCompleta.numeroPedidoNF
                )}
              </AgruparDNota>
              <AgruparDNota>
                {Descricao(
                  "Data Nota:",
                  dateFormat(notaSelecionadaCompleta.dataNF)
                )}
                {Descricao("Situação:", notaSelecionadaCompleta.situacaoNF)}
              </AgruparDNota>

              <AgruparDNota>
                {Descricao(
                  "Nome da Empresa:",
                  notaSelecionadaCompleta.nomeEmpresaNF
                )}
                {Descricao("CNPJ:", notaSelecionadaCompleta.cnpjEmpresaNF)}
              </AgruparDNota>

              <AgruparDNota>
                {Descricao("Local Retido:", notaSelecionadaCompleta.retidoNF)}
              </AgruparDNota>

              <AgruparDNota>
                {Descricao("N° CNAE:", notaSelecionadaCompleta.numeroKinayNF)}
                {Descricao("Atividade CNAE:", notaSelecionadaCompleta.KinayNF)}
              </AgruparDNota>

              <AgruparDNota>
                {Descricao(
                  "Porcentagem CNAE:",
                  notaSelecionadaCompleta.porcentagemKinayNF
                )}
                {Descricao("Imposto:", notaSelecionadaCompleta.ImpostoNF)}
              </AgruparDNota>

              <AgruparDNota>
                {Descricao(
                  "Valor Total:",
                  realFormat(notaSelecionadaCompleta.valorNF)
                )}
                {Descricao(
                  "Valor Imposto:",
                  realFormat(notaSelecionadaCompleta.valorImpostoNF)
                )}
                {Descricao(
                  "Valor Receber:",
                  realFormat(notaSelecionadaCompleta.valorReceberNF)
                )}
                {Descricao(
                  "Valor Recebido:",
                  realFormat(notaSelecionadaCompleta.valorRecebidoNF)
                )}
              </AgruparDNota>

              <AgruparDNota>
                {Descricao(
                  "Descrição do Serviço:",
                  notaSelecionadaCompleta.descricaoServNF
                )}
              </AgruparDNota>

              <AgruparDNota>
                {Descricao(
                  "Prazo Pagamento:",
                  notaSelecionadaCompleta.prazoPagamentoNF
                )}
              </AgruparDNota>

              <AgruparDNota>
                {notaSelecionadaCompleta.observacaoNF === "" ? (
                  <>{Descricao("Observação:", "Sem Observação")}</>
                ) : (
                  <>
                    {Descricao(
                      "Observação:",
                      notaSelecionadaCompleta.observacaoNF
                    )}
                  </>
                )}
              </AgruparDNota>
            </SectionBlock>
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
            {ContratoEmpresa.length > 0 && (
              <SectionBlock>
                <HeaderDados>
                  <TituloDados className="text-center text-[1.2vw]">
                    <div className="w-full">Contrato</div>
                  </TituloDados>
                </HeaderDados>
                <ArticleDados>
                  <ArticleDados className="w-full">
                    {ContratoEmpresa.map((ct) => {
                      return (
                        <ArgumentosDados
                          onClick={() => ButtoSelecao(ct.id)}
                          className={` flex-col relative ${
                            notaState[ct.id] ? "bg-gray-300" : "bg-gray-200"
                          }`}
                        >
                          {" "}
                          {stateContrato.AlertaContrato && (
                            <div className="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center">
                              <div className="absolute top-0 left-0 w-full h-full bg-slate-400 opacity-40 rounded-[1em]"></div>
                              <div className="bg-white p-1 px-6 rounded-[1em] z-20 border-2 border-orange-400">
                                <h1>Você deseja desativar esse Contrato?</h1>
                                <h2 className="flex justify-around items-center">
                                  <button
                                    className="bg-gray-300 px-2 text-center rounded-[0.5em]"
                                    onClick={() =>
                                      ButtomContrato("AlertaContrato")
                                    }
                                  >
                                    Não
                                  </button>
                                  <button
                                    className="bg-orange-400 px-2 text-center rounded-[0.5em]"
                                    onClick={() => deletContrato(ct.numeroCT)}
                                  >
                                    Sim
                                  </button>
                                </h2>
                              </div>
                            </div>
                          )}
                          <TituloArgumentos className="w-full">
                            <Texto>N° Contrato</Texto>
                            <Texto>Situação</Texto>
                            <Texto>Vlr.Contrato</Texto>
                            <Texto>Vlr.Recebido</Texto>
                            <Texto className="relative">
                              Data
                              <div
                                className={`${
                                  stateContrato.contratoAtualizado &&
                                  "bg-gray-400"
                                } absolute top-[0.5px] right-3 p-1 flex justify-center items-center text-[0.8vw] bg-[#f97316] rounded-full`}
                                onClick={() => {
                                  stateContrato.contratoAtualizado
                                    ? sendContrato(ct.numeroCT)
                                    : ButtomContrato("contratoAtualizado");
                                }}
                              >
                                {stateContrato.contratoAtualizado ? (
                                  <RiSaveLine />
                                ) : (
                                  <TbPencilCog />
                                )}
                              </div>
                            </Texto>
                          </TituloArgumentos>
                          <div className="flex w-full">
                            <Texto>{ct.numeroCT}</Texto>
                            <Texto className="flex justify-center">
                              <div
                                className={`bg-green-500 px-6 rounded-full flex items-center`}
                              >
                                {ct.situacaoCT}
                              </div>
                            </Texto>
                            <Texto className="relative flex justify-center">
                              {stateContrato.contratoAtualizado ? (
                                <InputDinheiro
                                  type="text"
                                  placeholder="1.000,00"
                                  value={dataContrato.ValorCT || ""}
                                  onValueChange={(e) => {
                                    setDataContrato({
                                      ...dataContrato,
                                      ValorCT: e.floatValue,
                                    });
                                  }}
                                  thousandSeparator="."
                                  decimalScale={2}
                                  fixedDecimalScale
                                  decimalSeparator=","
                                ></InputDinheiro>
                              ) : (
                                <> {realFormat(ct.ValorCT)}</>
                              )}
                            </Texto>
                            <Texto>{realFormat(ct.ValorRecebidoCT)}</Texto>
                            <Texto className="relative flex justify-center">
                              {stateContrato.contratoAtualizado ? (
                                <Input
                                  type="date"
                                  onChange={InputContrato}
                                  name="DataCT"
                                  value={dataContrato.DataCT}
                                />
                              ) : (
                                <>{dateFormat(ct.dataCT)}</>
                              )}

                              <div
                                className={`bg-red-600 absolute top-[0.5px] right-3 p-1 flex justify-center items-center text-[0.8vw] rounded-full`}
                                onClick={() => {
                                  stateContrato.contratoAtualizado
                                    ? ButtomContrato("contratoAtualizado")
                                    : ButtomContrato("AlertaContrato");
                                }}
                              >
                                {stateContrato.contratoAtualizado ? (
                                  <TbArrowForward />
                                ) : (
                                  <TbFileXFilled />
                                )}
                              </div>
                            </Texto>
                          </div>
                        </ArgumentosDados>
                      );
                    })}
                  </ArticleDados>
                </ArticleDados>
                <p className="bg-[#f97316] w-full h-4 rounded-b-[1em] rounded-t-[0.2em]"></p>
              </SectionBlock>
            )}
            <SectionBlock>
              <HeaderDados>
                <TituloDados>
                  Nota Analisando
                  <div className="flex justify-center items-center gap-2 bg-orange-300 px-3 rounded-[1em]">
                    <Texto>Total a Receber:</Texto> {realFormat(ValorReceberA)}
                  </div>
                </TituloDados>
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
                          onClick={() => ButtoSelecao(nt.id)}
                          className={`${
                            notaState[nt.id] ? "bg-gray-300" : "bg-gray-200"
                          }`}
                        >
                          <Texto>{nt.numeroPedidoNF}</Texto>
                          <Texto>{numNotaFormat(nt.numeroNotaNF)}</Texto>
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
                <TituloDados>
                  Nota Antecipada
                  <div className="flex justify-center items-center gap-3 flex-wrap">
                    <div className="flex justify-center items-center gap-2 bg-orange-300 px-3 rounded-[1em]">
                      <Texto>Total Desconto:</Texto>{" "}
                      {realFormat(DiferencaAntecipada)}
                    </div>
                    <div className="flex justify-center items-center gap-2 bg-orange-300 px-3 rounded-[1em]">
                      <Texto>Total Recebido:</Texto>{" "}
                      {realFormat(ValorRecebidoAntecipada)}
                    </div>
                  </div>
                </TituloDados>
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
                          onClick={() => ButtoSelecao(nt.id)}
                          className={`${
                            notaState[nt.id] ? "bg-gray-300" : "bg-gray-200"
                          }`}
                        >
                          <Texto>{nt.numeroPedidoNF}</Texto>
                          <Texto>{numNotaFormat(nt.numeroNotaNF)}</Texto>
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
                <TituloDados>
                  Nota Recebida{" "}
                  <div className="flex justify-center items-center gap-2 bg-orange-300 px-3 rounded-[1em]">
                    <Texto>Total Recebido:</Texto> {realFormat(ValorRecebido)}
                  </div>
                </TituloDados>
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
                          onClick={() => ButtoSelecao(nt.id)}
                          className={`${
                            notaState[nt.id] ? "bg-gray-300" : "bg-gray-200"
                          }`}
                        >
                          <Texto>{nt.numeroPedidoNF}</Texto>
                          <Texto>{numNotaFormat(nt.numeroNotaNF)}</Texto>
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

          <Footer>
            <Texto>Total Recebido: {realFormat(ValorTotalRecebido)}</Texto>
          </Footer>
        </>
      )}
    </Section>
  );
};
