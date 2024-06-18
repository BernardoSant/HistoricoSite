import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { useGlobalContext } from "../../global/Global";

export const DashNotasPedidos = () => {
  const { pedido, nota } = useGlobalContext();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (pedido && nota) {
      const data = prepareChartData(pedido, nota);
      setChartData(data);
    }
  }, [pedido, nota]);

  const prepareChartData = (pedido, nota) => {
    const mesesAnos = Array.from(
      new Set([
        ...pedido.map((item) => item.dataPDD.slice(0, 7)),
        ...nota.map((item) => item.dataNF.slice(0, 7)),
      ])
    ).sort();

    const valoresAgrupados = mesesAnos.map((mesAno) => {
      const totalPedido = pedido.filter(
        (a) => a.dataPDD.slice(0, 7) === mesAno
      ).length;
      const totalNotas = nota.filter(
        (a) => a.dataNF.slice(0, 7) === mesAno
      ).length;

      return [mesAno, totalNotas, totalPedido];     });

    return [["", "Notas", "Pedidos"], ...valoresAgrupados];
  };

  const options = {
    legend: { position: "bottom" },
    backgroundColor: "transparent",
    fontSize: "0.4vw",
    tooltip: {
        isHtml: true,
        trigger: 'selection',
      },
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
