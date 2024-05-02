import styled from "styled-components";
import { useGlobalContext } from "../../../global/Global";
import { useState, useEffect } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";
import { BsChevronCompactDown } from "react-icons/bs";
import { LuArrowRightFromLine } from "react-icons/lu";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { dateFormat } from "../../../functions/dateFormat";
import { NumericFormat } from "react-number-format";

const Div = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Article = styled.article`
  height: 100%;
  width: 100%;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
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
  align-items: center;
  padding: 5px;
  padding-left: 1em;
  padding-right: 1em;
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

const Titulo = styled.h1`
  font-weight: 600;
  font-size: x-large;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Topico = styled.h1`
  font-weight: 550;
  font-size: medium;
`;

const Descricao = styled.h1`
  display: flex;
  align-items: center;
`;

const BlockAgupado = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  gap: 0em;
`;

const BlockSeparacao = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5em;
`;

const BlockManutencao = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 12em;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #575757;
    border-radius: 1em;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (min-width: 1300px) {
    flex-direction: row;
  }
`;

const SectionMantencao = styled.div`
  border-radius: 0.4em;
  padding: 6px;
`;

const DescricaoMantencao = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
`;

export const MtrTransporte = () => {
  const hoje = new Date();
  let meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const dia = hoje.getDate();
  const mes = hoje.getMonth() + 1;
  const ano = hoje.getFullYear();
  let dataFormatada = `${ano}-${mes}-${dia}`;

  const { transporte, ip, abastecimento, manutencao } = useGlobalContext();

  const [data, setData] = useState({
    idTransporte: "",
    vlrGasolina: null,
    totalAbastecido: "",
    diasAbastecido: "",
    kmRodadoAbastecido: "",
    dataCadastro: "",
  });

  const [dataManutencao, setDataManutencao] = useState({
    idTransport: "",
    descricaoManutencao: "",
    dataManutencao: "",
    valorManutencao: null,
  });

  const valorInput = (e) => {
    let valor = e.target.value;
    setData({
      ...data,
      [e.target.name]: valor,
      idTransporte: transporteSelecionado,
      dataCadastro: dataFormatada,
    });
  };

  const valorInputManutencao = (e) => {
    let valor = e.target.value;
    setDataManutencao({
      ...dataManutencao,
      [e.target.name]: valor,
      idTransport: transporteSelecionado,
    });
  };

  const sendManutencao = (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(ip + "/manutencao", dataManutencao, headers)
      .then((response) => {
        toast.success(response.data.message);
        setDataManutencao({
          descricaoManutencao: "",
          dataManutencao: "",
          valorManutencao: null,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const sendKilometragem = (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(ip + "/abastecimento", data, headers)
      .then((response) => {
        toast.success(response.data.message);
        setData({
          vlrGasolina: null,
          totalAbastecido: "",
          diasAbastecido: "",
          kmRodadoAbastecido: "",
        });
        axios.put(ip + "/transporte/" + transporteSelecionado, {
          kmRodadoTransporte: data.kmRodadoAbastecido,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const [state, setState] = useState({
    addManutencao: false,
  });
  const [transporteState, setTransporteState] = useState({});
  const [manutencaoState, setManutencaoState] = useState({});
  const [transporteSelecionado, setTransporteSelecionado] = useState({});

  const ButtomPrimario = (id) => {
    const novoEstado = Object.keys(transporteState).reduce((obj, key) => {
      obj[key] = false;
      setState((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
      setData({
        idTransporte: "",
        vlrGasolina: null,
        totalAbastecido: "",
        diasAbastecido: "",
        kmRodadoAbastecido: "",
      });
      return obj;
    }, {});

    novoEstado[id] = true;
    novoEstado[id] = !transporteState[id];

    setTransporteState(novoEstado);
    setTransporteSelecionado(id);
    setManutencaoState({});
  };

  const ButtomManutencao = (id) => {
    const novoEstado = Object.keys(manutencaoState).reduce((obj, key) => {
      obj[key] = false;
      setState((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
      return obj;
    }, {});

    novoEstado[id] = true;
    novoEstado[id] = !manutencaoState[id];
    setManutencaoState(novoEstado);
    setTransporteSelecionado(id);
    setTransporteState({});
  };

  const Buttom = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      ...(key !== "addManutencao" && { addManutencao: false }),
    }));
  };

  return (
    <Div>
      <Header>Transportes</Header>
      <Article>
        {transporte.map((trans) => {
          const Hoje = new Date();

          var placaTransporte = trans.placaTransporte;
          var str = placaTransporte.toString();
          var placa = str.slice(0, 3) + "-" + str.slice(3);

          var diasRodado = 22; // dias uteis do mes
          var valorGasolina = 5.59;
          var Kmdia = trans.kmPorDiaTransporte;

          var kmMensal = Kmdia * diasRodado;
          var valorGastoMensal =
            (kmMensal / trans.kmPorLitroTransporte) * valorGasolina;
          var consumoGasolina =
            trans.kmPorDiaTransporte / trans.kmPorLitroTransporte;
          var quantidadeAbastecida =
            kmMensal / trans.kmPorLitroTransporte / trans.tanqueTransporte;

          var totalAbastecido =
            (Kmdia * diasRodado) / trans.kmPorLitroTransporte;

          const AbastecimentoMenAnterior = abastecimento.filter((abast) => {
            const isCurrentTransport = abast.idTransporte === trans.id;
            const abastDate = new Date(abast.dataCadastro);

            // Verifica se o abastecimento ocorreu neste mês
            const isThisMonth =
              abastDate.getMonth() === Hoje.getMonth() - 1 &&
              abastDate.getFullYear() === Hoje.getFullYear();

            return isCurrentTransport && isThisMonth;
          });

          const AbastecimentoMen = abastecimento.filter((abast) => {
            const isCurrentTransport = abast.idTransporte === trans.id;
            const abastDate = new Date(abast.dataCadastro);

            // Verifica se o abastecimento ocorreu neste mês
            const isThisMonth =
              abastDate.getMonth() === Hoje.getMonth() &&
              abastDate.getFullYear() === Hoje.getFullYear();

            return isCurrentTransport && isThisMonth;
          });

          const RelatorioMesAnterior = AbastecimentoMenAnterior.reduce(
            (total, abast) => total + abast.kmRodadoAbastecido,
            0
          );

          const RelatorioMes = AbastecimentoMen.reduce(
            (total, abast) => total + abast.kmRodadoAbastecido,
            0
          );

          const diferencaKm = RelatorioMes - RelatorioMesAnterior;

          //Manutenção
          const mantTransorte = manutencao.filter(
            (manut) => manut.idTransport === trans.id
          );

          const valorManutencaoTotal = mantTransorte.reduce(
            (total, manut) => total + manut.valorManutencao,
            0
          );

          return (
            <div
              key={trans.id}
              className="flex flex-col lg:grid lg:grid-cols-[0.3fr_1fr] gap-3 gap-y-3 shadow-inner bg-gray-200 rounded-[1em] p-3"
            >
              <div className=" bg-orange-400 rounded-[0.6em] p-2 px-3">
                <Titulo>Caracteristicas</Titulo>
                <div className="flex flex-col">
                  <div className="flex gap-x-2 flex-wrap">
                    <Topico>Nome:</Topico>
                    <Descricao>{trans.nomeTransporte}</Descricao>
                  </div>

                  <BlockAgupado>
                    <BlockSeparacao>
                      <Topico>Placa:</Topico>
                      <Descricao>{placa}</Descricao>
                    </BlockSeparacao>
                    <BlockSeparacao>
                      <Topico>Renavam:</Topico>
                      <Descricao>{trans.renavamTransporte}</Descricao>
                    </BlockSeparacao>
                  </BlockAgupado>

                  <BlockAgupado>
                    <BlockSeparacao>
                      <Topico>Ano:</Topico>
                      <Descricao>{trans.anoTransporte}</Descricao>
                    </BlockSeparacao>

                    <BlockSeparacao>
                      <Topico>Modelo:</Topico>
                      <Descricao>{trans.modeloTransporte}</Descricao>
                    </BlockSeparacao>
                  </BlockAgupado>

                  <BlockAgupado>
                    <BlockSeparacao>
                      <Topico>Capacidade:</Topico>
                      <Descricao>{trans.capacidadeTransporte}</Descricao>
                    </BlockSeparacao>

                    <BlockSeparacao>
                      <Topico>Tanque:</Topico>
                      <Descricao>{trans.tanqueTransporte}L</Descricao>
                    </BlockSeparacao>
                  </BlockAgupado>

                  <BlockAgupado>
                    <BlockSeparacao>
                      <Topico>Km:</Topico>
                      <Descricao>
                        {Number(trans.kmRodadoTransporte).toLocaleString(
                          "pt-BR"
                        )}
                        Km
                      </Descricao>
                    </BlockSeparacao>

                    <BlockSeparacao>
                      <Topico>Km/L:</Topico>
                      <Descricao>
                        {Number(trans.kmPorLitroTransporte)
                          .toFixed(2)
                          .toLocaleString("pt-BR")}
                        Km
                      </Descricao>
                    </BlockSeparacao>
                  </BlockAgupado>
                </div>
              </div>

              <div className="flex flex-col ">
                {transporteState[trans.id] ? (
                  <div className="bg-gray-100 h-full rounded-[0.6em] p-2 px-3 flex flex-col gap-2">
                    <div className="flex justify-between">
                      <Titulo className="flex-initial w-full xl:w-auto">
                        Adicionar Km:
                      </Titulo>

                      <button
                        form="AddKilo"
                        className="bg-green-500 rounded-[0.6em] px-3 font-semibold"
                      >
                        Adicionar
                      </button>
                    </div>

                    <form
                      onSubmit={sendKilometragem}
                      id="AddKilo"
                      className="bg-slate-200 px-1 gap-3 h-full rounded-[0.6em] flex justify-around items-center flex-wrap py-2"
                    >
                      <div>
                        <Topico>Vlr Gasolina:</Topico>
                        <InputDinheiro
                          type="text"
                          placeholder="1000.00"
                          value={data.vlrGasolina || ""}
                          onValueChange={(e) => {
                            setData({
                              ...data,
                              vlrGasolina: e.floatValue,
                            });
                          }}
                          thousandSeparator="."
                          decimalScale={2}
                          fixedDecimalScale
                          decimalSeparator=","
                        />
                      </div>
                      <div>
                        <Topico>Combustível:</Topico>
                        <Input
                          type="text"
                          value={data.totalAbastecido}
                          name="totalAbastecido"
                          onChange={valorInput}
                        />
                      </div>
                      <div>
                        <Topico>Dias Rodado:</Topico>
                        <Input
                          type="text"
                          value={data.diasAbastecido}
                          name="diasAbastecido"
                          onChange={valorInput}
                        />
                      </div>
                      <div>
                        <Topico>Kilometragem:</Topico>
                        <Input
                          type="text"
                          value={data.kmRodadoAbastecido}
                          name="kmRodadoAbastecido"
                          onChange={valorInput}
                        />
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="bg-orange-300 h-auto rounded-[0.6em] p-2 px-3 flex flex-col gap-2 duration-500">
                    <div className="flex gap-x-10 flex-wrap">
                      <Titulo className="flex-initial w-full xl:w-auto">
                        Estimativa Mensal:
                      </Titulo>

                      <div className="flex-1 p-1 rounded-[0.6em] shadow-inner flex justify-around items-center  duration-500 bg-slate-100">
                        <div className="flex flex-col">
                          <Topico>Valor Gasolina:</Topico>
                          <Descricao className="flex justify-center">
                            {Number(valorGasolina).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </Descricao>
                        </div>

                        <div className="flex flex-col ">
                          <Topico>Dias Rodado:</Topico>
                          <Descricao className="flex justify-center">
                            {diasRodado}
                          </Descricao>
                        </div>

                        <div className="flex flex-col ">
                          <Topico>Km/Dia:</Topico>
                          <Descricao className="flex justify-center">
                            {Number(Kmdia).toLocaleString("pt-BR")}Km
                          </Descricao>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-around flex-wrap gap-2">
                      <div className="flex gap-2">
                        <Topico>Km/Mes:</Topico>
                        <Descricao>
                          {Number(kmMensal).toFixed(2).toLocaleString("pt-BR")}
                          Km
                        </Descricao>
                      </div>

                      <div className="flex gap-2">
                        <Topico>Gasolina/Dia:</Topico>
                        <Descricao>
                          {Number(consumoGasolina)
                            .toFixed(2)
                            .toLocaleString("pt-BR")}
                          L
                        </Descricao>
                      </div>

                      <div className="flex gap-2">
                        <Topico>Gasolina/Mes:</Topico>
                        <Descricao>
                          {Number(totalAbastecido)
                            .toFixed(2)
                            .toLocaleString("pt-BR")}
                          L
                        </Descricao>
                      </div>

                      <div className="flex gap-2">
                        <Topico>Abastecimento:</Topico>
                        <Descricao>
                          {quantidadeAbastecida
                            .toFixed(0)
                            .toLocaleString("pt-BR")}{" "}
                          Vezes
                        </Descricao>
                      </div>

                      <div className="flex gap-2">
                        <Topico>Valor:</Topico>
                        <Descricao>
                          {Number(valorGastoMensal).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </Descricao>
                      </div>
                    </div>
                  </div>
                )}

                <div className="h-[6vh] lg:h-[3vh] relative z-20">
                  <p
                    className={`absolute top-1 right-0 p-1 rounded-full ${
                      transporteState[trans.id] ? "bg-red-500" : "bg-slate-500"
                    }`}
                    onClick={() => ButtomPrimario(trans.id)}
                  >
                    {transporteState[trans.id] ? (
                      <HiOutlinePlusSm className="rotate-45 duration-300" />
                    ) : (
                      <HiOutlinePlusSm className="duration-300" />
                    )}
                  </p>
                </div>

                <div className=" bg-orange-300 h-full rounded-[0.6em] p-2 px-3 flex flex-col gap-2">
                  <div className="flex justify-between flex-wrap">
                    <Titulo className="flex-initial w-auto">
                      Resumo Mensal:
                    </Titulo>
                    <div className="mr-6 bg-slate-100 text-center flex justify-center items-center px-5 rounded-[0.6em] border-2 border-orange-500 font-semibold">
                      {AbastecimentoMen.length === 1 ? (
                        <>{meses[hoje.getMonth()]}</>
                      ) : (
                        <>{meses[hoje.getMonth() - 1]}</>
                      )}
                    </div>
                  </div>
                  {AbastecimentoMen.length === 1 ? (
                    <>
                      {AbastecimentoMen.map((abast) => {
                        var KmDiario = diferencaKm / abast.diasAbastecido;
                        var KmPorLitroD = diferencaKm / abast.totalAbastecido;
                        var valorMes =
                          abast.vlrGasolina * abast.totalAbastecido;
                        return (
                          <div
                            key={abast.id}
                            className="p-1 rounded-[0.6em] flex-wrap shadow-inner h-full flex justify-around items-center gap-3 duration-500 bg-slate-100"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <Topico>Km:</Topico>
                                <Descricao>
                                  {Number(
                                    abast.kmRodadoAbastecido
                                  ).toLocaleString("pt-BR")}
                                  Km
                                </Descricao>
                              </div>

                              <div className="flex items-center gap-2">
                                <Topico>Km/L:</Topico>
                                <Descricao>
                                  {Number(KmPorLitroD)
                                    .toFixed(2)
                                    .toLocaleString("pt-BR")}
                                  Km
                                </Descricao>
                              </div>

                              <div className="flex items-center gap-2">
                                <Topico>Km/Dia:</Topico>
                                <Descricao>
                                  {Number(KmDiario)
                                    .toFixed(2)
                                    .toLocaleString("pt-BR")}
                                  Km
                                </Descricao>
                              </div>

                              <div className="flex items-center gap-2">
                                <Topico>Diferença:</Topico>
                                <Descricao>
                                  {Number(diferencaKm)
                                    .toFixed(2)
                                    .toLocaleString("pt-BR")}
                                  Km
                                </Descricao>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <Topico>Dias:</Topico>
                                <Descricao>{abast.diasAbastecido}</Descricao>
                              </div>

                              <div className="flex items-center gap-2">
                                <Topico>Total Abastecido:</Topico>
                                <Descricao>{abast.totalAbastecido}L</Descricao>
                              </div>

                              <div className="flex items-center gap-2">
                                <Topico>Valor Gasolina:</Topico>
                                <Descricao>
                                  {Number(abast.vlrGasolina).toLocaleString(
                                    "pt-BR",
                                    {
                                      style: "currency",
                                      currency: "BRL",
                                    }
                                  )}
                                </Descricao>
                              </div>

                              <div className="flex items-center gap-2">
                                <Topico>Gasto Mês:</Topico>
                                <Descricao>
                                  {Number(valorMes).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  })}
                                </Descricao>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {AbastecimentoMenAnterior.map((abast) => {
                        var diferencaKmAnt =
                          Number(trans.kmRodadoTransporte) -
                          abast.kmRodadoAbastecido;
                        var KmDiario = diferencaKmAnt / abast.diasAbastecido;
                        var KmPorLitroD =
                          diferencaKmAnt / abast.totalAbastecido;
                        var valorMes =
                          abast.vlrGasolina * abast.totalAbastecido;
                        return (
                          <div
                            key={abast.id}
                            className="p-1 rounded-[0.6em] flex-wrap shadow-inner h-full flex justify-around items-center gap-3 duration-500 bg-slate-100"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <Topico>Km:</Topico>
                                <Descricao>
                                  {Number(
                                    abast.kmRodadoAbastecido
                                  ).toLocaleString("pt-BR")}
                                  Km
                                </Descricao>
                              </div>
                              <div className="flex items-center gap-2">
                                <Topico>Km/L:</Topico>
                                <Descricao>
                                  {Number(KmPorLitroD)
                                    .toFixed(2)
                                    .toLocaleString("pt-BR")}
                                  Km
                                </Descricao>
                              </div>

                              <div className="flex items-center gap-2">
                                <Topico>Km/Dia:</Topico>
                                <Descricao>
                                  {Number(KmDiario)
                                    .toFixed(2)
                                    .toLocaleString("pt-BR")}
                                  Km
                                </Descricao>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <Topico>Dias:</Topico>
                                <Descricao>{abast.diasAbastecido}</Descricao>
                              </div>

                              <div className="flex items-center gap-2">
                                <Topico>Total Abastecido:</Topico>
                                <Descricao>{abast.totalAbastecido}L</Descricao>
                              </div>

                              <div className="flex items-center gap-2">
                                <Topico>Valor Gasolina:</Topico>
                                <Descricao>
                                  {Number(abast.vlrGasolina).toLocaleString(
                                    "pt-BR",
                                    {
                                      style: "currency",
                                      currency: "BRL",
                                    }
                                  )}
                                </Descricao>
                              </div>

                              <div className="flex items-center gap-2">
                                <Topico>Gasto Mês:</Topico>
                                <Descricao>
                                  {Number(valorMes).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  })}
                                </Descricao>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>

              {manutencaoState[trans.id] ? (
                <div className="flex flex-col col-span-2 bg-white shadow-inner rounded-[0.6em] p-2 gap-2  max-h-[23em] overflow-auto">
                  <div className="flex justify-between px-2 items-center flex-wrap">
                    <h1 className="text-2xl font-semibold">Manutenções</h1>
                    <div className="flex gap-2 justify-between w-full md:justify-normal md:w-auto">
                      {state.addManutencao ? (
                        <button
                          className={`bg-green-500 p-2 rounded-[0.6em] font-semibold  hover:scale-95 hover:bg-green-400`}
                          onClick={sendManutencao}
                        >
                          <HiOutlineDocumentDuplicate />
                        </button>
                      ) : (
                        <>
                          <h1 className="P-2 bg-orange-600 flex justify-center items-center px-4 rounded-[0.6em] font-semibold ">
                            {valorManutencaoTotal === 0 ? (
                              "Sem Manutenções"
                            ) : (
                              <div>
                                Valor Total:{" "}
                                {Number(valorManutencaoTotal).toLocaleString(
                                  "pt-BR",
                                  {
                                    style: "currency",
                                    currency: "BRL",
                                  }
                                )}
                              </div>
                            )}
                          </h1>
                        </>
                      )}

                      <button
                        className={`bg-orange-500 p-2 rounded-[0.6em] font-semibold  hover:scale-95 hover:bg-orange-400 ${
                          state.addManutencao && "bg-red-500 hover:bg-red-400"
                        } `}
                        onClick={() => Buttom("addManutencao")}
                      >
                        {state.addManutencao ? (
                          <LuArrowRightFromLine />
                        ) : (
                          <HiOutlinePlusSm />
                        )}
                      </button>
                    </div>
                  </div>
                  {state.addManutencao ? (
                    <div className="flex gap-3 flex-wrap">
                      <textarea
                        placeholder="Descrição da Manutenção..."
                        name="descricaoManutencao"
                        value={dataManutencao.descricaoManutencao}
                        onChange={valorInputManutencao}
                        className="bg-gray-100 flex-1  rounded-[0.6em] p-2 border-2 border-gray-400"
                      ></textarea>
                      <div className="bg-slate-200 p-2 rounded-[0.6em] w-full lg:w-auto shadow-inner">
                        <div className="">
                          <Topico>Data:</Topico>
                          <Input
                            type="date"
                            value={dataManutencao.dataManutencao}
                            name="dataManutencao"
                            onChange={valorInputManutencao}
                          />
                        </div>
                        <div className="">
                          <Topico>Valor:</Topico>
                          <InputDinheiro
                            type="text"
                            placeholder="1000.00"
                            value={dataManutencao.valorManutencao || ""}
                            onValueChange={(e) => {
                              setDataManutencao({
                                ...dataManutencao,
                                valorManutencao: e.floatValue,
                              });
                            }}
                            thousandSeparator="."
                            decimalScale={2}
                            fixedDecimalScale
                            decimalSeparator=","
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <BlockManutencao>
                      {mantTransorte.map((manuTrans) => {
                        return (
                          <Block>
                            <SectionMantencao className="bg-slate-200 flex-1 shadow-inner">
                              {manuTrans.descricaoManutencao}
                            </SectionMantencao>

                            <SectionMantencao className=" bg-slate-300 flex justify-around xl:flex-col flex-wrap min-w-[15em] shadow-inner">
                              <DescricaoMantencao>
                                <div className="font-bold">
                                  Data Manutenção:
                                </div>
                                <div>
                                  {dateFormat(manuTrans.dataManutencao)}
                                </div>
                              </DescricaoMantencao>
                              <DescricaoMantencao>
                                <div className="font-bold ">Valor Total:</div>
                                <div>
                                  {Number(
                                    manuTrans.valorManutencao
                                  ).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  })}
                                </div>
                              </DescricaoMantencao>
                            </SectionMantencao>
                          </Block>
                        );
                      })}
                    </BlockManutencao>
                  )}
                </div>
              ) : null}

              <div
                className={`col-span-2 flex justify-center items-center text-lg ${
                  manutencaoState[trans.id] ? "rotate-180" : " hover:mt-2"
                } duration-500`}
                onClick={() => ButtomManutencao(trans.id)}
              >
                <BsChevronCompactDown />
              </div>
            </div>
          );
        })}
      </Article>
    </Div>
  );
};
