import styled from "styled-components";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../global/Global";

const Footer = styled.footer`
  height: 100vh;
  width: 100%;
  padding: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-content: start;
  flex-direction: row;
  gap: 10px;
`;

const Header = styled.header`
  width: 100%;
  margin-bottom: 7px;
  border-radius: 1em;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
`;

const Section = styled.section`
  height: 100%;
  display: flex;
  gap: 7px;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1 1 0%;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Dir = styled.div`
  border-top-right-radius: 1em;
  border-top-left-radius: 1em;
  border-bottom-right-radius: 0.3em;
  border-bottom-left-radius: 0.3em;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  background: #f97316;
  box-shadow: inset 3px -3px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
  z-index: 10;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;
  background-color: #d8d6d679;
  margin-top: -15px;
  z-index: 0;
  padding-top: 10px;
  padding-bottom: 5px;
  overflow: auto;
  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 1em;
  flex: 1 1 0%;
`;

const H1 = styled.h1`
  font-weight: 700;
  font-size: larger;
`;

const H2 = styled.h2`
display: grid;
grid-template-columns: repeat(2, minmax(0, 1fr));
text-align: center;
font-weight: 600;
`;

const H3 = styled.h3`
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
  text-align: center;
  font-weight: 600;
`;

const H4 = styled.h3`
display: grid;
grid-template-columns: repeat(5, minmax(0, 1fr));
  text-align: center;
  font-weight: 600;
`;

const P = styled.p`
  text-align: center;
  width: 100%;
`;

export const ResumoEmpresa = () => {
  const { empresa, nota, pedido } = useGlobalContext();
  const [data, setData] = useState('');

  const dataAtual = new Date();
  const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const anoAtual = dataAtual.getFullYear();

  const [mes, setMes] = useState(mesAtual);
  const [ano, setAno] = useState(anoAtual);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const dataAtual = new Date();
      const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, '0');
      const anoAtual = dataAtual.getFullYear();

      setMes(mesAtual);
      setAno(anoAtual);
    }, 60000); // Atualiza a cada minuto

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  const pedidosFiltrados = pedido.filter(pedido => {
    const dataPedido = new Date(pedido.dataPDD);
    return dataPedido.getMonth() + 1 === parseInt(mes) && dataPedido.getFullYear() === parseInt(ano);
  });

  const somaNotas = nota.reduce((acc, nota) => {
    if (acc[nota.numeroPedidoNF]) {
      acc[nota.numeroPedidoNF] += nota.valorRecebidoNF;
    } else {
      acc[nota.numeroPedidoNF] = nota.valorRecebidoNF;
    }
    return acc;
  }, {});

  const pedidosAtualizados = pedidosFiltrados.map(pedido => {
    if (somaNotas[pedido.numeroPDD]) {
      return {
        ...pedido,
        valorRecebidoPDD: somaNotas[pedido.numeroPDD],
      };
    }
    return pedido;
  });

  pedido.sort((a, b) => new Date(a.dataPDD) - new Date(b.dataPDD));

  const notasRecebidas = nota.filter(
    (nota) => nota.situacaoNF === "Recebida" || nota.situacaoNF === "Antecipada"
  );

  const notasRecebidasFiltradas = notasRecebidas.filter(nota => {
    const dataNota = new Date(nota.dataNF);
    return dataNota.getMonth() + 1 === parseInt(mes) && dataNota.getFullYear() === parseInt(ano);
  });

  notasRecebidas.sort((a, b) => new Date(a.dataNF) - new Date(b.dataNF));

  const notasReceber = nota.filter(
    (nota) => nota.situacaoNF === "Em Análise"
  );

  const notasReceberFiltradas = notasReceber.filter(nota => {
    const dataNota = new Date(nota.dataNF);
    return dataNota.getMonth() + 1 === parseInt(mes) && dataNota.getFullYear() === parseInt(ano);
  });

  notasReceber.sort((a, b) => new Date(a.dataNF) - new Date(b.dataNF));

  const handleDataChange = (event) => {
    setData(event.target.value);

    const dataSelecionada = new Date(event.target.value);
    const mesSelecionado = String(dataSelecionada.getMonth() + 1).padStart(2, '0');
    const anoSelecionado = dataSelecionada.getFullYear();

    setMes(mesSelecionado);
    setAno(anoSelecionado);
  };
  return (<>

    <Header>
      <div className="flex justify-end items-center py-4 gap-5">
        <th className="w-full text-center text-3xl pt-1">Resumo Mensal</th>
        <form onSubmit={handleDataChange} className="absolute flex flex-row gap-4 w-auto pr-4">
          <select value={mes} onChange={(event) => setMes(event.target.value)}>
            <option value="">Selecione o mês</option>
            <option value="01">Janeiro</option>
            <option value="02">Fevereiro</option>
            <option value="03">Março</option>
            <option value="04">Abril</option>
            <option value="05">Maio</option>
            <option value="06">Junho</option>
            <option value="07">Julho</option>
            <option value="08">Agosto</option>
            <option value="09">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>

          <select value={ano} onChange={(event) => setAno(event.target.value)}>
            <option value="">Selecione o ano</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </form>
      </div>
    </Header>

    <Footer>

      <Section className="max-w-[23em]">

        <Dir>
          <H1> Nota Fiscal Recebida</H1>

          <H3>
            <P>N° Pedido</P>
            <P>N° Nota</P>
            <P>V.Recebido</P>
          </H3>
        </Dir>

        <Div >
          {notasRecebidasFiltradas.map((nota) => {
            return (
              <H3 key={nota.id} className="cursor-pointer border-b-2 border-gray-400">
                <P>{nota.numeroPedidoNF}</P>
                <P>{String(nota.numeroNotaNF).padStart(5, "0")}</P>
                <P>{Number(nota.valorRecebidoNF).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</P>
              </H3>
            )
          })}
        </Div>


        <Dir>
          <H1> Nota Fiscal Em Análise</H1>

          <H3>
            <P>N° Pedido</P>
            <P>N° Nota</P>
            <P>V.Receber</P>
          </H3>
        </Dir>

        <Div >
          {notasReceberFiltradas.map((nota) => (
            <H3 key={nota.id} className="cursor-pointer border-b-2 border-gray-400">
              <P>{nota.numeroPedidoNF}</P>
              <P>{String(nota.numeroNotaNF).padStart(5, "0")}</P>
              <P>{Number(nota.valorReceberNF).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</P>
            </H3>
          ))}
        </Div>


        <Article >
          <Dir>
            <H1>Empresas Cadastradas</H1>

            <H2>
              <P>Nome</P>
              <P>CNPJ</P>
            </H2>
          </Dir>

          <Div>
            {empresa.map((empresas) => (
              <H2 key={empresas.id} className="cursor-pointer border-b-2 border-gray-400">
                <P>{empresas.siglaEmpresa}</P>
                <P>{empresas.cnpjEmpresa}</P>
              </H2>
            ))}
          </Div>
        </Article>

      </Section>

      <Section>

        <Dir>
          <H1>Pedidos</H1>

          <H4>
            <P>N° Pedido</P>
            <P>Empresa</P>
            <P>Situação</P>
            <P>V.Total</P>
            <P>V.Recebido</P>
          </H4>
        </Dir>

        <Div>
          {pedidosAtualizados.map((pedido) => {
            return (
              <H4 key={pedido.id} className="cursor-pointer border-b-2 border-gray-400">
                <P>{pedido.numeroPDD}</P>
                <P>{pedido.empresaPDD}</P>
                <P>{pedido.situacaoPDD}</P>
                <P>{Number(pedido.valorPDD).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</P>
                <P>{Number(pedido.valorRecebidoPDD).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</P>
              </H4>
            )
          })}

        </Div>

        <Dir>Ganhos Mensal</Dir>
        <Div>OPA</Div>

      </Section>

    </Footer>
  </>
  );
};
