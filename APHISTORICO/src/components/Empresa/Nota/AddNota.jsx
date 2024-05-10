import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../global/Global";
import { NumericFormat } from "react-number-format";
import { FaArrowDown } from "react-icons/fa";

const Form = styled.form`
  height: 100%;
  width: 100%;
  gap: 1em;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.div`
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #575757;
    border-radius: 1em;
  }
`;

const H1 = styled.h1`
  font-weight: 600;
  margin-top: 5px;
`;

const Select = styled.select`
  width: 100%;
  border: 2px solid #d1d5db;
  border-radius: 4px;
`;

const Input = styled.input`
  width: 100%;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  padding-left: 8px;
`;

const InputDinheiro = styled(NumericFormat)`
  width: 100%;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  padding-left: 8px;
`;

const Header = styled.header`
  width: 100%;
  border-radius: 20px;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
  font-weight: 600;
  font-size: xx-large;
  display: flex;
  justify-content: center;
  padding: 5px;
`;

const Button = styled.button`
  width: auto;
  border-radius: 20px;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
  font-weight: 600;
  font-size: x-large;
  display: flex;
  justify-content: center;
  padding: 7px;
  padding-left: 3em;
  padding-right: 3em;
  transition-duration: 200ms;

  &:hover {
    cursor: pointer;
    color: white;
    scale: 97%;
  }
`;
export const TabelaAddNota = () => {
  const { ip, empresa, kinays, impostos, pedido, contrato, nota } =
    useGlobalContext();

  const [data, setData] = useState({
    numeroPedidoNF: "",
    numeroNotaNF: "",
    idEmpresa: 0,
    nomeEmpresaNF: "",
    cnpjEmpresaNF: "",
    retidoNF: "",
    numeroKinayNF: "",
    KinayNF: "",
    porcentagemKinayNF: 0,
    descricaoServNF: "",
    ImpostoNF: "",
    totalImpostoNF: "",
    valorNF: "",
    valorImpostoNF: "",
    valorReceberNF: "",
    valorRecebidoNF: null,
    situacaoNF: "",
    prazoPagamentoNF: "",
    dataNF: "",
    observacaoNF: "",
  });

  const calcularImposto = () => {
    if (data.ImpostoNF === " " && data.porcentagemKinayNF === " ") {
      toast.info("Por favor, preencha todos os Impostos");
    } else {
      const CNAE = parseFloat(data.porcentagemKinayNF.replace("%", "")) / 100;
      const Imposto = parseFloat(data.ImpostoNF.replace("%", "")) / 100;
      const valorImpostoCNAE = CNAE * data.valorNF;
      const valorImposto = Imposto * data.valorNF;
      const valorImpostocalc = valorImpostoCNAE + valorImposto;
      const valorReceber = data.valorNF - valorImpostocalc;

      const totalImposto = CNAE * 100 + Imposto * 100;

      setData({
        ...data,
        valorImpostoNF: valorImpostocalc.toFixed(2),
        valorReceberNF: valorReceber.toFixed(2),
        totalImpostoNF: totalImposto,
      });
    }
  };

  const valorInput = (event) => {
    const { name, value } = event.target;

    if (name === "nomeEmpresaNF") {
      const parts = value.split(" - ");
      const idEmpresa = Number(parts[0]);
      const NomeEmpresa = parts[1];
      const CNPJEmpresa = parts[2];

      setData({
        ...data,
        idEmpresa: idEmpresa,
        nomeEmpresaNF: NomeEmpresa,
        cnpjEmpresaNF: CNPJEmpresa,
      });
    } else if (name === "numeroPedidoNF") {
      const parts = value.split(" - ");
      const NumeroPDD = parts[0];

      setData({ ...data, numeroPedidoNF: NumeroPDD });
    } else if (name === "numeroKinayNF") {
      const parts = value.split(" - ");
      const numeroKinay = parts[0];
      const descricaoKinay = parts[1];
      const porcentagemKinay = parts[2];

      setData({
        ...data,
        numeroKinayNF: numeroKinay,
        KinayNF: descricaoKinay,
        porcentagemKinayNF: porcentagemKinay,
      });
    } else if (name === "ImpostoNF") {
      const parts = value.split(" - ");
      const porcentagemImposto = parts[1];

      setData({ ...data, ImpostoNF: porcentagemImposto });
    } else if (name === "situacaoNF" && value === "Antecipada") {
      const calculorAntercipa = Number(data.valorReceberNF) * 0.02;
      const valorRecebido = data.valorReceberNF - calculorAntercipa;

      setData({
        ...data,
        valorRecebidoNF: valorRecebido,
        situacaoNF: "Antecipada",
      });
    } else if (name === "situacaoNF" && value === "Recebida") {
      setData({
        ...data,
        valorRecebidoNF: data.valorReceberNF,
        situacaoNF: "Recebida",
      });
    } else if (name === "situacaoNF" && value === "Em Análise") {
      setData({
        ...data,
        valorRecebidoNF: 0,
        situacaoNF: "Em Análise",
      });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const filtroPedido = pedido.filter((pedido) => {
    const idEmpresa =
      data.idEmpresa === pedido.empresaPDD &&
      pedido.situacaoPDD !== "Finalizada";
    return idEmpresa;
  });

  const ContratoEmpresa = contrato.filter((contrato) => {
    const isEmpresaCorrespondente = contrato.empresaCT === data.idEmpresa;

    const empresaEncontrada = empresa.find((emp) => emp.id === data.idEmpresa);
    const isContratada = empresaEncontrada?.situacaoEmpresa === "Contrato";

    return isEmpresaCorrespondente && isContratada;
  });

  const atualizarPedido = pedido.find((pedido) => {
    const idPedido = pedido.numeroPDD === data.numeroPedidoNF;
    return idPedido;
  });

  const atualizarContrato = ContratoEmpresa.find((Contrato) => {
    const idContrato = Contrato.numeroCT === data.numeroPedidoNF;
    return idContrato;
  });

  const somaValores = nota.reduce((acc, nota) => {
    if (acc[nota.numeroPedidoNF]) {
      acc[nota.numeroPedidoNF] += nota.valorNF;
    } else {
      acc[nota.numeroPedidoNF] = nota.valorNF;
    }
    return acc;
  }, {});

  const sendNF = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (
      data.numeroPedidoNF === "" ||
      data.nomeEmpresaNF === "" ||
      data.valorNF === ""
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    let situacao;
    if (ContratoEmpresa.length <= 0) {
      if (
        somaValores[data.numeroPedidoNF] + Number(data.valorNF) ===
        atualizarPedido.valorPDD
      ) {
        situacao = "Finalizada";
      } else if (Number(data.valorNF) > 0) {
        situacao = "Andamento";
      } else {
        situacao = "Criada";
      }
    }

    if (data.situacaoNF === "Antecipada") {
      if (ContratoEmpresa.length > 0) {
        const calculorAntercipa =
          data.valorReceberNF - data.valorReceberNF * 0.02;
        var novoValor =
          Number(calculorAntercipa) + atualizarContrato.ValorRecebidoCT;

        axios.put(
          ip + `/contrato/` + atualizarContrato.numeroCT,
          {
            ValorRecebidoCT: novoValor,
          },
          headers
        );
      } else {
        var calculorAntercipa =
          data.valorReceberNF - data.valorReceberNF * 0.02;
        var novoValor =
          Number(calculorAntercipa) + atualizarPedido.valorRecebidoPDD;

        axios.put(
          ip + `/pedido/` + atualizarPedido.numeroPDD,
          {
            situacaoPDD: situacao,
            valorRecebidoPDD: novoValor,
          },
          headers
        );
      }

      axios
        .post(
          ip + "/nota",
          { ...data, valorRecebidoNF: calculorAntercipa },
          headers
        )
        .then((response) => {
          toast.success(response.data.message);
          setData({
            numeroPedidoNF: "",
            numeroNotaNF: "",
            idEmpresa: 0,
            nomeEmpresaNF: "",
            cnpjEmpresaNF: "",
            retidoNF: "",
            numeroKinayNF: "",
            KinayNF: "",
            porcentagemKinayNF: 0,
            descricaoServNF: "",
            ImpostoNF: "",
            totalImpostoNF: "",
            valorNF: "",
            valorImpostoNF: "",
            valorReceberNF: "",
            valorRecebidoNF: null,
            situacaoNF: "",
            prazoPagamentoNF: "",
            dataNF: "",
            observacaoNF: "",
          });
        })
        .catch((err) => {
          toast.info(err.response.data.message);
        });
    } else {
      if (data.situacaoNF === "Recebida") {
        if (ContratoEmpresa.length > 0) {
          const novoValor =
            Number(data.valorReceberNF) + atualizarContrato.ValorRecebidoCT;

          axios.put(
            ip + `/contrato/` + atualizarContrato.numeroCT,
            {
              ValorRecebidoCT: novoValor,
            },
            headers
          );
        } else {
          const novoValor =
            Number(data.valorReceberNF) + atualizarPedido.valorRecebidoPDD;

          axios.put(
            ip + `/pedido/` + atualizarPedido.numeroPDD,
            {
              situacaoPDD: situacao,
              valorRecebidoPDD: novoValor,
            },
            headers
          );
        }
      }

      axios
        .post(ip + "/nota", data, headers)
        .then((response) => {
          toast.success(response.data.message);
          setData({
            numeroPedidoNF: "",
            numeroNotaNF: "",
            idEmpresa: 0,
            nomeEmpresaNF: "",
            cnpjEmpresaNF: "",
            retidoNF: "",
            numeroKinayNF: "",
            KinayNF: "",
            porcentagemKinayNF: 0,
            descricaoServNF: "",
            ImpostoNF: "",
            totalImpostoNF: "",
            valorNF: "",
            valorImpostoNF: "",
            valorReceberNF: "",
            valorRecebidoNF: null,
            situacaoNF: "",
            prazoPagamentoNF: "",
            dataNF: "",
            observacaoNF: "",
          });
        })
        .catch((err) => {
          toast.info(err.response.data.message);
        });
    }
  };

  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const navRef = useRef(null);

  const handleScroll = () => {
    const isBottom =
      navRef.current.scrollHeight - navRef.current.scrollTop ===
      navRef.current.clientHeight;
    setIsScrolledToBottom(isBottom);
  };

  useEffect(() => {
    const navElement = navRef.current;
    if (navElement) {
      navElement.addEventListener("scroll", handleScroll);
      setIsScrollable(navElement.scrollHeight > navElement.clientHeight);
      return () => navElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleClick = () => {
    const navElement = navRef.current;
    if (navElement) {
      navElement.scrollTop = navElement.scrollHeight;
    }
  };


  return (
    <>
      <Form onSubmit={sendNF}>
        <Header>Adcionar Nota Fiscal</Header>
        <div className="absolute bottom-[10%] right-2/4 z-50">
          {isScrollable && !isScrolledToBottom && (
            <div className="flex flex-col justify-center items-center">
              <h1
                className="text-xl bg-gray-300 p-1 rounded-full opacity-60"
                onClick={handleClick}
              >
                <FaArrowDown />
              </h1>
            </div>
          )}
        </div>

        <Nav className="w-full overflow-auto " ref={navRef}>
          <div className=" grid grid-cols-4 gap-x-2 w-full">
            <H1 className="col-span-4">Numero Nota*</H1>

            <Input
              type="number"
              name="numeroNotaNF"
              onChange={valorInput}
              value={data.numeroNotaNF}
              className="col-span-1"
            />

            <p className="col-span-3"></p>

            <H1 className="col-span-2">Nome da Empresa*</H1>
            <H1 className="col-span-2">CNPJ*</H1>

            <label className="col-span-2">
              <Input
                type="text"
                list="nameE"
                name="nomeEmpresaNF"
                onChange={valorInput}
                value={data.nomeEmpresaNF}
              />

              <datalist id="nameE">
                {empresa.map((empresa) => (
                  <option
                    key={empresa.id}
                    value={`${empresa.id} - ${empresa.nameEmpresa} - ${empresa.cnpjEmpresa}`}
                  ></option>
                ))}
              </datalist>
            </label>

            <Input
              type="text"
              maxLength="18"
              readOnly
              name="cnpjEmpresaNF"
              onChange={valorInput}
              value={data.cnpjEmpresaNF}
              className="col-span-2"
            />
            {ContratoEmpresa.length > 0 ? (
              <H1 className="col-span-4">Numero Contrato*</H1>
            ) : (
              <H1 className="col-span-4">Numero Pedido*</H1>
            )}

            <label className="col-span-1">
              <Input
                type="text"
                list="PEDIDO"
                name="numeroPedidoNF"
                onChange={valorInput}
                value={data.numeroPedidoNF}
              />

              <datalist id="PEDIDO">
                {ContratoEmpresa.length > 0 ? (
                  <>
                    {ContratoEmpresa.map((contrato) => (
                      <option
                        key={contrato.id}
                        value={`${contrato.numeroCT} - ${contrato.nomeCT}`}
                      ></option>
                    ))}
                  </>
                ) : filtroPedido.length > 0 ? (
                  <>
                    {filtroPedido.map((pedido) => (
                      <option
                        key={pedido.id}
                        title={pedido.nomePDD}
                        value={`${pedido.numeroPDD} - ${pedido.nomePDD}`}
                      ></option>
                    ))}
                  </>
                ) : (
                  <option value="Não encontrado. Por favor, insira um novo pedido, contrato na aba Adicionar Pedido ou Contratos."></option>
                )}
              </datalist>
            </label>

            <Input
              type="text"
              name="idEmpresa"
              onChange={valorInput}
              value={data.idEmpresa}
              className="hidden"
            />

            <H1 className="col-span-4">Local Retido*</H1>

            <label className="col-span-1">
              <Input
                type="text"
                list="Retido"
                name="retidoNF"
                onChange={valorInput}
                value={data.retidoNF}
              />
              <datalist id="Retido">
                <option value="Retida em Outro Munic."></option>
                <option value="Tributada"></option>
              </datalist>
            </label>

            <p className="col-span-3"></p>

            <H1 className="col-span-1">Numero(CNAE)</H1>
            <H1 className="col-span-3">Atividade (CNAE)</H1>
            <label>
              <Input
                type="text"
                list="CNAE"
                name="numeroKinayNF"
                onChange={valorInput}
                value={data.numeroKinayNF}
              />

              <datalist id="CNAE">
                {kinays.map((kinay) => (
                  <option
                    key={kinay.id}
                    value={`${kinay.numeroKinay} - ${kinay.descricaoKinay} - ${
                      kinay.porcentagemKinay * 100
                    }%`}
                  ></option>
                ))}
              </datalist>
            </label>
            <Input
              className="col-span-3 flex flex-row"
              readOnly
              type="text"
              name="KinayNF"
              onChange={valorInput}
              value={data.KinayNF}
            />

            <H1 className="col-span-1">Porcentagem(CNAE)</H1>
            <H1 className="col-span-3">Imposto</H1>

            <Input
              type="text"
              name="porcentagemKinayNF"
              onChange={valorInput}
              value={data.porcentagemKinayNF}
            />

            <label className="col-span-1 flex flex-row">
              <Input
                type="text"
                list="IMPST"
                name="ImpostoNF"
                onChange={valorInput}
                value={data.ImpostoNF}
              />

              <datalist id="IMPST">
                {impostos.map((imposto) => (
                  <option
                    key={imposto.id}
                    value={`${imposto.siglaImposto} - ${
                      imposto.porcentagemImposto * 100
                    }%`}
                  ></option>
                ))}
              </datalist>
            </label>
            <p className="col-span-2"></p>

            <H1 className="col-span-1">Valor Total*</H1>
            <H1 className="col-span-1">Valor Imposto</H1>
            <H1 className="col-span-2">Valor á Receber</H1>

            <InputDinheiro
              type="text"
              placeholder="1000.00"
              onBlur={calcularImposto}
              value={data.valorNF || ""}
              onValueChange={(e) => {
                setData({
                  ...data,
                  valorNF: e.floatValue,
                });
              }}
              thousandSeparator="."
              decimalScale={2}
              fixedDecimalScale
              decimalSeparator=","
            />

            <Input
              maxLength="10"
              readOnly
              type="text"
              name="valorImpostoNF"
              onChange={valorInput}
              value={data.valorImpostoNF}
            />

            <Input
              maxLength="10"
              readOnly
              type="text"
              name="valorReceberNF"
              onChange={valorInput}
              value={data.valorReceberNF}
            />

            <H1 className="col-span-4">Descrição do Serviço</H1>
            <textarea
              type="text"
              name="descricaoServNF"
              onChange={valorInput}
              value={data.descricaoServNF}
              rows="3"
              className="col-span-4 border-2 border-gray-300 rounded-md px-2"
            ></textarea>

            <H1 className="col-span-1">Situação</H1>
            <H1 className="col-span-3">Data de Lançamento</H1>

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
              type="date"
              name="dataNF"
              onChange={valorInput}
              value={data.dataNF}
            />

            <p className="col-span-2"></p>

            <H1 className="col-span-4">Prazo de pagamento*</H1>

            <label className="col-span-2">
              <Input
                type="text"
                list="PRAPAG"
                name="prazoPagamentoNF"
                onChange={valorInput}
                value={data.prazoPagamentoNF}
              />
              <datalist id="PRAPAG">
                <option value="90 Dias"></option>
                <option value="45 Dias"></option>
                <option value="15 Dias"></option>
                <option value="7 Dias"></option>
              </datalist>
            </label>
            <H1 className="col-span-4">Observação</H1>
            <textarea
              type="text"
              name="observacaoNF"
              onChange={valorInput}
              value={data.observacaoNF}
              rows="3"
              className="col-span-4 border-2 border-gray-300 rounded-md px-2"
            ></textarea>
          </div>
        </Nav>
        <section className="w-full flex justify-end my-4">
          <Button type="submit" className="">
            Salvar
          </Button>
        </section>
      </Form>
    </>
  );
};
