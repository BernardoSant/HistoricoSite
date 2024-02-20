import styled from "styled-components";
import { useGlobalContext } from "../../global/Global";


const H2 = styled.h2`
  width: auto;
  font-weight: 600;
  margin-top: 5px;
  text-align: center;
`;

const Td = styled.td`
  border-bottom: 2px solid #d1d5db;
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
  padding: 5px;
`;

export const MostrarImposto = () => {
  const { impostos } = useGlobalContext();

  // Filtrar impostos do tipo 'NF'
  const impostoNotaFiscal = impostos.filter(
    (imposto) => imposto.tipoImposto === "NF"
  );
  const impostoSalario = impostos.filter(
    (imposto) => imposto.tipoImposto === "Salario"
  );
  const impostoTodos = impostos.filter(
    (imposto) => imposto.tipoImposto === "Todos"
  );

  return (
    <>
      <div className="flex flex-col justify-start h-full w-full ">
        <Header className="font-semibold w-full h-auto flex justify-center items-center text-3xl mb-5">
          Impostos
        </Header>

        <table className="table-auto rounded-[10px] bg-gray-200">
          <thead className="border-b-2 border-gray-500">
            <tr>
              <th>Tipo</th>
              <th>Sigla</th>
              <th>Porcentagem</th>
              <th>Data de Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {impostoNotaFiscal.map((imposto) => {
              let data = new Date(imposto.createdAt);
              let opcoes = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              };
              let dataFormatada = data.toLocaleDateString("pt-BR", opcoes);
              return (
                <tr key={imposto.id}>
                  <Td>
                    <H2>Notas Fiscais</H2>
                  </Td>
                  <Td>
                    <H2>{imposto.siglaImposto}</H2>
                  </Td>
                  <Td>
                    <H2>{imposto.porcentagemImposto * 100}%</H2>
                  </Td>
                  <Td>
                    <H2>{dataFormatada}</H2>
                  </Td>
                </tr>
              );
            })}

            {impostoSalario.map((imposto) => {
              let data = new Date(imposto.createdAt);
              let opcoes = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              };
              let dataFormatada = data.toLocaleDateString("pt-BR", opcoes);
              return (
                <tr key={imposto.id}>
                  <Td>
                    <H2>Salário</H2>
                  </Td>
                  <Td>
                    <H2>{imposto.siglaImposto}</H2>
                  </Td>
                  <Td>
                    <H2>{imposto.porcentagemImposto * 100}%</H2>
                  </Td>
                  <Td>
                    <H2>{dataFormatada}</H2>
                  </Td>
                </tr>
              );
            })}

            {impostoTodos.map((imposto) => {
              let data = new Date(imposto.createdAt);
              let opcoes = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              };
              let dataFormatada = data.toLocaleDateString("pt-BR", opcoes);
              return (
                <tr key={imposto.id}>
                  <Td>
                    <H2>Todos</H2>
                  </Td>
                  <Td>
                    <H2>{imposto.siglaImposto}</H2>
                  </Td>
                  <Td>
                    <H2>{imposto.porcentagemImposto * 100}%</H2>
                  </Td>
                  <Td>
                    <H2>{dataFormatada}</H2>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
