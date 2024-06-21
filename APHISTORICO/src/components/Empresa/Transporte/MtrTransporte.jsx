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
import { CarrocelDash } from "../../Carrossel/CarrocelDash";
import { Header } from "../../Componentes/Header";

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
  overflow: auto;
  padding-right: 6px;
  gap: 1em;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #575757;
    border-radius: 1em;
  }
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


  const { transporte, ip, abastecimento, manutencao } = useGlobalContext();
  const [state, setState] = useState({
    addManutencao: false,
  });
  const [transporteState, setTransporteState] = useState({});
  const [manutencaoState, setManutencaoState] = useState({});
  const [transporteSelecionado, setTransporteSelecionado] = useState({});

  const TransporteSelecionadoKm = transporte.find(
    (tr) => tr.id === transporteSelecionado
  );

  const [data, setData] = useState({
    idTransporte: "",
    vlrGasolina: null,
    totalAbastecido: "",
    diasRodadosAbastecido: "",
    kmRodadoAbastecido: "",
    dataCadastro: "",
  });

  const [dataManutencao, setDataManutencao] = useState({
    idTransport: "",
    descricaoManutencao: "",
    dataManutencao: "",
    valorManutencao: null,
  });

  const AbastecimentoMenAnterior = abastecimento
    .filter((abast) => {
      const isCurrentTransport = abast.idTransporte === transporteSelecionado;
      const abastDate = new Date(abast.dataCadastro);
      const isBeforeOrEqualToday = abastDate <= hoje;

      return isCurrentTransport && isBeforeOrEqualToday;
    })
    .sort((a, b) => new Date(b.dataCadastro) - new Date(a.dataCadastro));

  var penultimoAbastecimento;
  var ultimoAbastecimento;

  if (AbastecimentoMenAnterior.length >= 2) {
    ultimoAbastecimento = AbastecimentoMenAnterior[0];
    penultimoAbastecimento = AbastecimentoMenAnterior[1];
  } else if (AbastecimentoMenAnterior.length === 1) {
    ultimoAbastecimento = AbastecimentoMenAnterior[0];
    penultimoAbastecimento = 0;
  } else {
    ultimoAbastecimento = TransporteSelecionadoKm;
    penultimoAbastecimento = 0;
  }

  const valorInput = (e) => {
    let valor = e.target.value;
    if (e.target.name === "dataCadastro") {
      const DiferencaKm =
        data.kmRodadoAbastecido -
        (AbastecimentoMenAnterior.length === 0
          ? TransporteSelecionadoKm.kmRodadoTransporte
          : ultimoAbastecimento.kmRodadoAbastecido);
      setData({
        ...data,
        [e.target.name]: valor,
        idTransporte: transporteSelecionado,
        kmDiferença: DiferencaKm,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: valor,
        idTransporte: transporteSelecionado,
      });
    }
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
    if (
      data.dataCadastro === "" ||
      data.kmRodadoAbastecido === "" ||
      data.vlrGasolina === ""
    ) {
      toast.error("Esta faltando dados para cadastrar!");
      return;
    }

    axios
      .post(ip + "/abastecimento", data, headers)
      .then((response) => {
        toast.success(response.data.message);
        setData({
          idTransporte: "",
          vlrGasolina: null,
          totalAbastecido: "",
          diasRodadosAbastecido: "",
          kmRodadoAbastecido: "",
          dataCadastro: "",
        });
        ButtomPrimario(null);
        axios.put(ip + "/transporte/" + transporteSelecionado, {
          kmRodadoTransporte: data.kmRodadoAbastecido,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

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
        diasRodadosAbastecido: "",
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
          const [mes, setMes] = useState(new Date().getMonth() + 1);
          const [ano, setAno] = useState(new Date().getFullYear());

          const handleDataChange = (event) => {
            setData(event.target.value);

            const dataSelecionada = new Date(event.target.value);
            const mesSelecionado = String(
              dataSelecionada.getMonth() + 1
            ).padStart(2, "0");
            const anoSelecionado = dataSelecionada.getFullYear();

            setMes(mesSelecionado);
            setAno(anoSelecionado);
          };

          var placaTransporte = trans.placaTransporte;
          var str = placaTransporte.toString();
          var placa = str.slice(0, 3) + "-" + str.slice(3);

          const AbastecimentosCar = abastecimento
            .filter((abast) => {
              const DataAbaste = new Date(abast.dataCadastro);
              const TransAbastecimento = abast.idTransporte === trans.id;
              const DataAbasteMes =
                DataAbaste.getMonth() + 1 === parseInt(mes) &&
                DataAbaste.getFullYear() === parseInt(ano);

              return TransAbastecimento && DataAbasteMes;
            })
            .sort(
              (a, b) => new Date(b.dataCadastro) - new Date(a.dataCadastro)
            );

          const DiferençaResumo = AbastecimentosCar.reduce(
            (total, abast) => total + abast.kmDiferença,
            0
          );

          const TotalResumo = AbastecimentosCar.reduce(
            (total, abast) => total + abast.totalAbastecido * abast.vlrGasolina,
            0
          );

          const TotalAbastecidoResumo = AbastecimentosCar.reduce(
            (total, abast) => total + abast.totalAbastecido,
            0
          );

          const MediaGasolinaResumo = AbastecimentosCar.reduce(
            (total, abast) =>
              total + abast.vlrGasolina / AbastecimentosCar.length,
            0
          );

          const SomaDia = AbastecimentosCar.reduce(
            (total, abast) => total + abast.diasRodadosAbastecido,
            0
          );

          const MediaAbastecimento = AbastecimentosCar.reduce(
            (total, abast) =>
              total + abast.diasRodadosAbastecido / AbastecimentosCar.length,
            0
          );

          const KmDiario = DiferençaResumo / SomaDia;
          const GasolinaDia = DiferençaResumo / TotalAbastecidoResumo;

          const mantTransorte = manutencao.filter(
            (manut) => manut.idTransport === trans.id
          );

          const valorManutencaoTotal = mantTransorte.reduce(
            (total, manut) => total + manut.valorManutencao,
            0
          );

          const DataCar = abastecimento.filter(
            (abast) => abast.idTransporte === trans.id
          );
          const uniqueMonths = new Set();
          const uniqueYears = new Set();

          return (
            <div
              key={trans.id}
              className="flex flex-col lg:grid lg:grid-cols-[0.3fr_1fr] gap-3 gap-y-3 shadow-inner bg-gray-200 rounded-[1em] p-3"
            >
              <div className=" bg-CorPrimariaBT rounded-[0.6em] p-2 px-3">
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

              <div className="flex flex-col gap-3">
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
                        <Topico>Kilometragem:</Topico>
                        <InputDinheiro
                          type="text"
                          placeholder="1.000Km"
                          value={data.kmRodadoAbastecido || ""}
                          onValueChange={(e) => {
                            setData({
                              ...data,
                              kmRodadoAbastecido: e.floatValue,
                            });
                          }}
                          thousandSeparator="."
                          decimalScale={0}
                          fixedDecimalScale
                          decimalSeparator=","
                        />
                      </div>

                      <div>
                        <Topico>Vlr Gasolina:</Topico>
                        <InputDinheiro
                          type="text"
                          placeholder="0,00"
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
                        <Topico>Qnt.Combustível:</Topico>
                        <InputDinheiro
                          type="text"
                          placeholder="00,000"
                          value={data.totalAbastecido || ""}
                          onValueChange={(e) => {
                            setData({
                              ...data,
                              totalAbastecido: e.floatValue,
                            });
                          }}
                          thousandSeparator="."
                          decimalScale={3}
                          fixedDecimalScale
                          decimalSeparator=","
                        />
                      </div>
                      <div>
                        <Topico>Dias Rodados:</Topico>
                        <Input
                          type="number"
                          value={data.diasRodadosAbastecido}
                          name="diasRodadosAbastecido"
                          placeholder="00"
                          onChange={valorInput}
                        />
                      </div>
                      <div>
                        <Topico>Data:</Topico>
                        <Input
                          type="date"
                          value={data.dataCadastro}
                          name="dataCadastro"
                          onChange={valorInput}
                        />
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="bg-CorSecundariaTBLA h-auto rounded-[0.6em] p-2 px-3 flex flex-col gap-2 duration-500">
                    <div className="flex gap-x-10 flex-wrap">
                      <Titulo className="flex-initial w-full xl:w-auto">
                        Resumo Mensal:
                      </Titulo>

                      <div className="flex-1 p-1 rounded-[0.6em] shadow-inner flex justify-around items-center  duration-500 bg-slate-100">
                        <div className="flex flex-col">
                          <Topico>Total Gasto:</Topico>
                          <Descricao className="flex justify-center">
                            {Number(TotalResumo).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </Descricao>
                        </div>

                        <div className="flex flex-col ">
                          <Topico>Dias Rodado:</Topico>
                          <Descricao className="flex justify-center">
                            {SomaDia}
                          </Descricao>
                        </div>

                        <div className="flex flex-col ">
                          <Topico>Media Abastecer:</Topico>
                          <Descricao className="flex justify-center">
                            {MediaAbastecimento.toFixed(0)} Dias
                          </Descricao>
                        </div>

                        <div className="flex flex-col ">
                          <Topico>Km/Dia:</Topico>
                          <Descricao className="flex justify-center">
                            {Number(KmDiario).toLocaleString("pt-BR")}Km
                          </Descricao>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-around flex-wrap gap-2">
                      <div className="flex gap-2">
                        <Topico>Km/Mes:</Topico>
                        <Descricao>
                          {Number(DiferençaResumo)
                            .toFixed(2)
                            .toLocaleString("pt-BR")}
                          Km
                        </Descricao>
                      </div>

                      <div className="flex gap-2">
                        <Topico>Km/L:</Topico>
                        <Descricao>
                          {Number(GasolinaDia)
                            .toFixed(2)
                            .toLocaleString("pt-BR")}
                          L
                        </Descricao>
                      </div>

                      <div className="flex gap-2">
                        <Topico>Gasolina/Mes:</Topico>
                        <Descricao>
                          {Number(TotalAbastecidoResumo)
                            .toFixed(2)
                            .toLocaleString("pt-BR")}
                          L
                        </Descricao>
                      </div>

                      <div className="flex gap-2">
                        <Topico>Abastecimento:</Topico>
                        <Descricao>
                          {AbastecimentosCar.length
                            .toFixed(0)
                            .toLocaleString("pt-BR")}{" "}
                          Vezes
                        </Descricao>
                      </div>

                      <div className="flex gap-2">
                        <Topico>Media Gasolina:</Topico>
                        <Descricao>
                          {Number(MediaGasolinaResumo).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </Descricao>
                      </div>
                    </div>
                  </div>
                )}

                <div className=" bg-CorSecundariaTBLA h-full rounded-[0.6em] p-2 px-3 flex flex-col gap-2 relative">
                  <p
                    className={`absolute -top-2 -right-1 p-1 rounded-full ${
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
                  <div className="flex justify-between flex-wrap">
                    <Titulo className="flex-initial w-auto">
                      Abastecimentos:
                    </Titulo>
                    {DataCar.length > 0 && (
                      <form
                        onSubmit={handleDataChange}
                        className="flex flex-row gap-2 w-auto md:justify-end justify-center pr-4 "
                      >
                        <select
                          className=" bg-slate-100 text-center flex justify-center items-center rounded-[0.6em] border-2 border-orange-500 font-semibold"
                          value={mes}
                          onChange={(event) => setMes(event.target.value)}
                        >
                          {DataCar.map((abst) => {
                            const DateAbast = new Date(abst.dataCadastro);
                            const Mes = DateAbast.getMonth() + 1;
                            const MesAparencia = DateAbast.getMonth();
                            if (!uniqueMonths.has(Mes)) {
                              uniqueMonths.add(Mes);
                              return (
                                <option key={Mes} value={Mes}>
                                  {meses[MesAparencia]}
                                </option>
                              );
                            }
                          }).filter((option) => option !== null)}
                        </select>

                        <select
                          className=" bg-slate-100 text-center flex justify-center items-center rounded-[0.6em] border-2 border-orange-500 font-semibold"
                          value={ano}
                          onChange={(event) => setAno(event.target.value)}
                        >
                          {DataCar.map((abst) => {
                            const DateAbast = new Date(abst.dataCadastro);
                            const Ano = DateAbast.getFullYear();

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
                    )}
                  </div>

                  <div className="relative overflow-hidden h-[8em] rounded-[0.6em]  shadow-inner  gap-3 duration-500 bg-slate-100">
                    {DataCar.length > 0 ? (
                      <CarrocelDash>
                        {AbastecimentosCar.map((abst) => {
                          const KmPorLitro =
                            Number(abst.kmDiferença) /
                            Number(abst.totalAbastecido);

                          const ValorGasto =
                            abst.vlrGasolina * abst.totalAbastecido;

                          const KmAnterior =
                            abst.kmRodadoAbastecido - abst.kmDiferença;

                          return (
                            <div className="w-full  flex justify-around pt-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Topico>Km:</Topico>
                                  <Descricao>
                                    {Number(
                                      abst.kmRodadoAbastecido
                                    ).toLocaleString("pt-BR")}
                                    Km
                                  </Descricao>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Topico>Km Anterior:</Topico>
                                  <Descricao>
                                    {Number(KmAnterior).toLocaleString("pt-BR")}
                                    Km
                                  </Descricao>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Topico>Diferença:</Topico>
                                  <Descricao>
                                    {Number(abst.kmDiferença).toLocaleString({
                                      style: "currency",
                                      currency: "BRL",
                                    })}
                                    Km
                                  </Descricao>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Topico>Km/L:</Topico>
                                  <Descricao>
                                    {Number(KmPorLitro)
                                      .toFixed(2)
                                      .toLocaleString("pt-BR")}
                                    Km
                                  </Descricao>
                                </div>
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <Topico>Dias:</Topico>
                                  <Descricao>
                                    {abst.diasRodadosAbastecido}
                                  </Descricao>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Topico>Total Abastecido:</Topico>
                                  <Descricao>{abst.totalAbastecido}L</Descricao>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Topico>Valor Gasto:</Topico>
                                  <Descricao>
                                    {Number(ValorGasto).toLocaleString(
                                      "pt-BR",
                                      {
                                        style: "currency",
                                        currency: "BRL",
                                      }
                                    )}
                                  </Descricao>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Topico>Data:</Topico>
                                  <Descricao>
                                    {dateFormat(abst.dataCadastro)}
                                  </Descricao>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </CarrocelDash>
                    ) : (
                      <div className="w-full h-full flex justify-center items-center font-semibold text-gray-500/60">
                        Nenhum abastecimento encontrado!
                      </div>
                    )}
                  </div>
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
                          <h1 className="P-2 bg-CorEscurecidaBT flex justify-center items-center px-4 rounded-[0.6em] font-semibold ">
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
                        className={`bg-CorPrimariaBT p-2 rounded-[0.6em] font-semibold  hover:scale-95 hover:bg-CorPrimariaTBLA ${
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
