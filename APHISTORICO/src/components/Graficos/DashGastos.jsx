import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { useGlobalContext } from "../../global/Global";

export const DashGastos = () => {
  const { ferias, conta, abastecimento, manutencao, salario } = useGlobalContext();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (ferias && conta && abastecimento && manutencao && salario) {
      const data = prepareChartData(ferias, conta, abastecimento, manutencao, salario);
      setChartData(data);
    }
  }, [ferias, conta, abastecimento, manutencao, salario]);

  const prepareChartData = (ferias, conta, abastecimento, manutencao, salario) => {
    const mesesAnos = Array.from(
      new Set([
        ...ferias.map((item) => item.dataInicioFerias.slice(0, 7)),
        ...conta.map((item) => item.dataInConta.slice(0, 7)),
        ...abastecimento.map((item) => item.dataCadastro.slice(0, 7)),
        ...manutencao.map((item) => item.dataManutencao.slice(0, 7)),
        ...salario.map((item) => item.dataSalario.slice(0, 7)),
      ])
    ).sort();
  
    const valoresAgrupados = mesesAnos.map((mesAno) => {
      const totalFerias = ferias.filter((f) => f.dataInicioFerias.slice(0, 7) === mesAno).reduce((acc, curr) => acc + curr.valorFerias, 0);
      const totalConta = conta.filter((c) => c.dataInConta.slice(0, 7) === mesAno).reduce((acc, curr) => acc + curr.valorConta, 0);
      const totalAbastecimento = abastecimento.filter((a) => a.dataCadastro.slice(0, 7) === mesAno).reduce((acc, curr) => acc + (curr.vlrGasolina * curr.totalAbastecido), 0);
      const totalManutencao = manutencao.filter((m) => m.dataManutencao.slice(0, 7) === mesAno).reduce((acc, curr) => acc + curr.valorManutencao, 0);
      const totalSalario = salario.filter((s) => s.dataSalario.slice(0, 7) === mesAno).reduce((acc, curr) => acc + curr.totalSalarioMes, 0);
  
      return [mesAno, totalFerias, totalConta, totalAbastecimento, totalManutencao, totalSalario];
    });
  
    return [["", "Férias", "Contas", "Abastecimentos", "Manutenções", "Salários"], ...valoresAgrupados];
  };
  

  const options = {
    title: "Gastos Mensais da Empresa",
    curveType: "function",
    legend: { position: "bottom" },
    backgroundColor: "transparent",
    fontSize: "0.8vw",
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
