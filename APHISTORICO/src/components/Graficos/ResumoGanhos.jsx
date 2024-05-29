import styled from "styled-components";
import { useGlobalContext } from "../../global/Global";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export const GanhosMensais = ({ mesSelecionado, anoSelecionado }) => {
  const { empresa, nota } = useGlobalContext();

  const notasRecebidas = nota.filter((nota) => {
    const dataNota = new Date(nota.dataNF);
    return (
      (nota.situacaoNF === "Recebida" || nota.situacaoNF === "Antecipada") &&
      dataNota.getMonth() + 1 === parseInt(mesSelecionado) &&
      dataNota.getFullYear() === parseInt(anoSelecionado)
    );
  });

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
    <Chart
      chartType="PieChart"
      width={"100%"}
      height={"100%"}
      data={grafico}
      options={options}
    />
  );
};
