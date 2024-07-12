
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { useGlobalContext } from "../../global/Global";

export const DashAbastecimentosUni = ({IdTransporte}) => {
  const { abastecimento } = useGlobalContext();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if ( abastecimento) {
      const data = prepareChartData(abastecimento);
      setChartData(data);
    }
  }, [abastecimento]);

  const prepareChartData = (abastecimento) => {
    const mesesAnos = Array.from(
      new Set([
        ...abastecimento.map((item) => item.dataCadastro.slice(0, 7)),
      ])
    ).sort();
  
    const valoresAgrupados = mesesAnos.map((mesAno) => { 
        const totalKmL = abastecimento.filter((a) => a.dataCadastro.slice(0, 7) === mesAno && a.idTransporte === IdTransporte).reduce((acc, curr) => acc + (curr.kmDiferença / curr.totalAbastecido), 0);
        const totalDiferença = abastecimento.filter((a) => a.dataCadastro.slice(0, 7) === mesAno && a.idTransporte === IdTransporte).reduce((acc, curr) => acc + curr.kmDiferença, 0);     
        const totalGasolina = abastecimento.filter((a) => a.dataCadastro.slice(0, 7) === mesAno && a.idTransporte === IdTransporte).reduce((acc, curr) => acc + curr.totalAbastecido, 0);
      const totalAbastecimento = abastecimento.filter((a) => a.dataCadastro.slice(0, 7) === mesAno && a.idTransporte === IdTransporte).reduce((acc, curr) => acc + (curr.vlrGasolina * curr.totalAbastecido), 0);     
      return [mesAno, totalAbastecimento, totalGasolina, totalDiferença, totalKmL];
    });
  
    return [["", "Valor", "Qnt.Gasolina", "Km Rodado", "Km/Litro"], ...valoresAgrupados];
  };
  

  const options = {
    curveType: "function",
    legend: { position: "" },
    backgroundColor: "transparent",
    fontSize: "0.2vw",
    location: "pt-BR",
    tooltip: {
        isHtml: false, 
        trigger: 'focus', // Pode ser 'focus', 'selection', 'none'
  
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
