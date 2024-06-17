import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { useGlobalContext } from "../../global/Global";

export const DashGastosMensais = () => {
  const { ferias, conta, abastecimento, manutencao, salario } = useGlobalContext();
  const [chartData, setChartData] = useState([]);


  useEffect(() => {
    if (ferias && conta && abastecimento && manutencao && salario) {
      const data = prepareChartData(ferias, conta, abastecimento, manutencao, salario);
      setChartData(data);
    }
  }, [ferias, conta, abastecimento, manutencao, salario]);

  const prepareChartData = (ferias, conta, abastecimento, manutencao, salario) => {
    const dataAtual = new Date().toISOString().slice(0, 7);

    const totalFerias = ferias.filter((f) => f.dataInicioFerias.slice(0, 7) === dataAtual).reduce((acc, curr) => acc + curr.valorFerias, 0);
    const totalConta = conta.filter((c) => c.dataInConta.slice(0, 7) === dataAtual).reduce((acc, curr) => acc + curr.valorConta, 0);
    const totalAbastecimento = abastecimento.filter((a) => a.dataCadastro.slice(0, 7) === dataAtual).reduce((acc, curr) => acc + (curr.vlrGasolina * curr.totalAbastecido), 0);
    const totalManutencao = manutencao.filter((m) => m.dataManutencao.slice(0, 7) === dataAtual).reduce((acc, curr) => acc + curr.valorManutencao, 0);
    const totalSalario = salario.filter((s) => s.dataSalario.slice(0, 7) === dataAtual).reduce((acc, curr) => acc + curr.totalSalarioMes, 0);

     const dadosGrafico = [
      ["Categoria", "Valor"],
      ["Férias", totalFerias],
      ["Contas", totalConta],
      ["Abastecimentos", totalAbastecimento],
      ["Manutenções", totalManutencao],
      ["Salários", totalSalario]
    ];

    return dadosGrafico;
  };

  const options = {
      title: "Gastos Mensal da Empresa",
    curveType: "function",
    legend: { position: "bottom" },
    backgroundColor: "transparent",
    pieHole: 0.4,
    fontSize: "0.8vw",
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
      data={chartData}
      options={options}
    />
  );
};
