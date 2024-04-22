import styled from "styled-components";
import { useGlobalContext } from "../../../global/Global";
import { useState, useEffect } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";

const Div = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-content: start;
  flex-direction: row;
`;

const Article = styled.article`
  margin-top: 1em;
  width: 100%;
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

export const MtrTransporte = () => {
  const hoje = new Date();
  const dia = hoje.getDate();
  const mes = hoje.getMonth() + 1;
  const ano = hoje.getFullYear();
  let dataFormatada = `${ano}-${mes}-${dia}`;

  const { transporte, ip, abastecimento } = useGlobalContext();

  const [transporteState, setTransporteState] = useState({});
  const [transporteSelecionado, setTransporteSelecionado] = useState({});

  const [data, setData] = useState({
    idTransporte: "",
    vlrGasolina: "",
    totalAbastecido: "",
    diasAbastecido: "",
    kmRodadoAbastecido: "",
    dataCadastro: "",
  });

  const valorInput = (e) => {
    let valor = e.target.value;
    setData({ ...data, [e.target.name]: valor, idTransporte:transporteSelecionado, dataCadastro: dataFormatada });
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
        idTransporte: "",
        vlrGasolina: "",
        totalAbastecido: "",
        diasAbastecido: "",
        kmRodadoAbastecido: "",
      });
    })
    .catch((err) => {
      toast.info(err.response.data.message);
    });
  };

  const [state, setState] = useState({});

  const ButtomPrimario = (id) => {
    const novoEstado = Object.keys(transporteState).reduce((obj, key) => {
      obj[key] = false;
      setState((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
      setData({
        idTransporte: "",
        vlrGasolina: "",
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
  };

  return (
    <Div>
      <Header>Transportes</Header>
      <Article>
        {transporte.map((trans) => {
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

          return (
            <div
              key={trans.id}
              className="flex flex-col md:grid md:grid-cols-[0.3fr_1fr] gap-3 gap-y-3 shadow-inner bg-gray-200 rounded-[1em] p-3"
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

                  <BlockAgupado>
                    <BlockSeparacao>
                      <Topico>Km/Dia:</Topico>
                      <Descricao>
                        {Number(trans.kmPorDiaTransporte)
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
                        <Input
                          type="text"
                          value={data.vlrGasolina}
                          name="vlrGasolina"
                          onChange={valorInput}
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

                <div className=" bg-orange-300 h-full rounded-[0.6em] p-2 px-3 relative">
                  <Titulo className="flex-initial w-full xl:w-auto">
                    Resumo Mensal:
                  </Titulo>
                </div>
              </div>
            </div>
          );
        })}
      </Article>
    </Div>
  );
};
