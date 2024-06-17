import { useGlobalContext } from "../../global/Global";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export const DashGanhos = () => {
  const { empresa, nota } = useGlobalContext();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (empresa && nota) {
      const data = prepareChartData(empresa, nota);
      setChartData(data);
    }
  }, [empresa, nota]);

  const prepareChartData = (empresa, nota) => {
    const empresasSiglas = empresa.map((emp) => emp.siglaEmpresa);
    const mesesAnos = Array.from(
      new Set(nota.map((n) => n.dataNF.slice(0, 7)))
    ).sort();

    const valoresAgrupados = {};

    nota.forEach((n) => {
      const { idEmpresa, valorRecebidoNF, dataNF } = n;
      const empresaEncontrada = empresa.find((emp) => emp.id === idEmpresa);

      if (empresaEncontrada) {
        const siglaEmpresa = empresaEncontrada.siglaEmpresa;
        const mesAno = dataNF.slice(0, 7);

        if (!valoresAgrupados[mesAno]) {
          valoresAgrupados[mesAno] = {};
        }

        if (!valoresAgrupados[mesAno][siglaEmpresa]) {
          valoresAgrupados[mesAno][siglaEmpresa] = 0;
        }

        valoresAgrupados[mesAno][siglaEmpresa] += valorRecebidoNF;
      }
    });

    const data = [["", ...empresasSiglas]];

    mesesAnos.forEach((mesAno) => {
      const row = [mesAno];
      empresasSiglas.forEach((siglaEmpresa) => {
        row.push(valoresAgrupados[mesAno][siglaEmpresa] || 0);
      });
      data.push(row);
    });

    return data;
  };

  const options = {
    title: "Performance da Empresa",
    curveType: "function",
    legend: { position: "", maxLines: 2 },
    backgroundColor: "transparent",
  };

  return (
    <Chart
      chartType="Line"
      width={"100%"}
      height={"100%"}
      data={chartData}
      options={options}
    />
  );
};
