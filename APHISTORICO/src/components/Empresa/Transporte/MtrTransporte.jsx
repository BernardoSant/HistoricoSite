import styled from "styled-components";
import { useGlobalContext } from "../../../global/Global";
import { BiCategory } from "react-icons/bi";
import { RiSaveLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { TiCancel } from "react-icons/ti";
import { useState, useEffect } from "react";
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
  gap: 0.5em;
  @media (max-width: 1000px) {
    flex-wrap: wrap;
  }
`;
const BlockSeparacao = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5em;
`;

export const MtrTransporte = () => {
  const { transporte } = useGlobalContext();
  return (
    <Div>
      <Header>Transportes</Header>
      <Article>
        {transporte.map((trans) => {
          var placaTransporte = trans.placaTransporte;
          var str = placaTransporte.toString();
          var placa = str.slice(0, 3) + "-" + str.slice(3);

          var diasRodado = 14; // dias uteis do mes
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
            <div className="grid grid-cols-[0.5fr_1fr] gap-3 shadow-inner bg-gray-200 rounded-[1em] p-3">
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
                      <Topico>Km/L</Topico>
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

              <div className="flex flex-col gap-3 ">
                <div className="bg-orange-300 h-full rounded-[0.6em] p-2 px-3 flex flex-col gap-2">
                  <div className="flex gap-x-10 flex-wrap">
                    <Titulo className="flex-initial">Estimativa Mensal:</Titulo>

                    <div className="flex-1 p-1 rounded-[0.6em] shadow-inner flex justify-around items-center bg-slate-100">
                      <div className="flex gap-2">
                        <Topico>Valor Gasolina:</Topico>
                        <Descricao>
                          {Number(valorGasolina).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </Descricao>
                      </div>

                      <div className="flex gap-2">
                        <Topico>Dias Rodado:</Topico>
                        <Descricao>{diasRodado}</Descricao>
                      </div>

                      <div className="flex gap-2">
                        <Topico>Km/Dia:</Topico>
                        <Descricao>
                          {Number(Kmdia).toLocaleString("pt-BR")}Km
                        </Descricao>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-around flex-wrap">
                    <div className="flex gap-2">
                      <Topico>Km/Mes:</Topico>
                      <Descricao>
                        {Number(kmMensal).toFixed(2).toLocaleString("pt-BR")}Km
                      </Descricao>
                    </div>

                    <div className="flex gap-2">
                      <Topico>Consumo/Dia:</Topico>
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
                <div className=" bg-orange-300 h-full rounded-[0.6em] p-2 px-3">
                  <Titulo>Resumo Mensal:</Titulo>
                </div>
              </div>
            </div>
          );
        })}
      </Article>
    </Div>
  );
};
