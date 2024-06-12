import styled from "styled-components";
import { useGlobalContext } from "../global/Global";
import { NumericFormat } from "react-number-format";
import { DashGanhos } from "./Graficos/DashGanhos";
import { CarrocelDash } from "./Carrossel/CarrocelDash";

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.6vw;
  padding: 12px;
  padding-left: 1em;
  padding-right: 1em;
  font-weight: 600;
  border-radius: 0.4em;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.2vw;
  padding: 5px;
  font-weight: 600;
  border-radius: 0.7em;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 12px;
  font-size: 1vw;
`;

const Article = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 10px;
  padding-right: 5px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8f8f8f;
    border-radius: 1em;
  }
`;

const SectionBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ArticleBlock = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  background-color: #d8d6d679;
`;

const HeaderDados = styled.div`
  position: sticky;
  top: 0;
  flex: 0 1 auto;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-top-right-radius: 0.7em;
  border-top-left-radius: 0.7em;
  border-bottom-right-radius: 0.2em;
  border-bottom-left-radius: 0.2em;
  z-index: 10;
  background: #f97316;
`;

const ArticleDados = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Texto = styled.h1`
  flex: 1 1 0%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextoDesc = styled.h1`
  flex: 1 1 0%;
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Dados = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.2vw;
  font-weight: 650;
`;

const SeparacaoDados = styled.div`
  display: flex;
  width: 10%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NumberDados = styled.div`
  font-size: 1.7vw;
  height: auto;
  text-align: center;
`;

const DescricaoDados = styled.div`
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
  font-size: 1vw;
  overflow: hidden;
`;

const TituloDados = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2vw;
  font-weight: 650;
`;

const ArgumentosDados = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 550;
  border-radius: 1rem;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 3px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  --tw-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: inset 0 2px 4px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  cursor: pointer;
`;

export const Fort = () => {
  const { funcionario, nota, pedido, impostos, contrato } = useGlobalContext();

  const FuncAdmitido = funcionario.filter(
    (func) => func.statuFucionario === "Admitido"
  );
  const NtAnalise = nota.filter((not) => not.situacaoNF === "Em Análise");
  const NtAntecipada = nota.filter((not) => not.situacaoNF === "Antecipada");
  const NtRecebida = nota.filter((not) => not.situacaoNF === "Recebida");

  const PddCriado = pedido.filter((pdd) => pdd.situacaoPDD === "Criada");
  const PddAndamento = pedido.filter((pdd) => pdd.situacaoPDD === "Andamento");
  const PddFinalizada = pedido.filter(
    (pdd) => pdd.situacaoPDD === "Finalizada"
  );

  const CttAtivo = contrato.filter((ctt) => ctt.situacaoCT === "Ativo");

  const FuncionariosAdmitidos = funcionario.filter(
    (funcionario) => funcionario.statuFucionario === "Admitido"
  );

  const impostoSalarioINSS = impostos.find(
    (imposto) => imposto.siglaImposto.toLowerCase() === "salarioinss"
  );

  let impostoSalario = 0;
  if (!impostoSalarioINSS) {
    impostoSalario = 0;
  } else {
    impostoSalario = impostoSalarioINSS.porcentagemImposto;
  }

  const valorTotalSalario = FuncionariosAdmitidos.reduce((total, func) => {
    const salarioTotal = func.salarioFucionario;
    const salarioDia = salarioTotal / 30;
    const salarioMes = salarioDia * 30;
    const salarioMesImposto = salarioMes - salarioMes * impostoSalario;
    const descontoPorFalta = salarioDia * func.diasFaltas;

    return total + salarioMesImposto - descontoPorFalta;
  }, 0);

  const adiantamentoSalario = FuncionariosAdmitidos.reduce((total, func) => {
    const salarioTotal = func.salarioFucionario;
    const salarioDia = salarioTotal / 30;
    const salarioMes = salarioDia * 30;
    const procentagemAdiantamento = 0.4;
    const adiantamento = salarioMes * procentagemAdiantamento; // 0.4 E IGUAL A PORCENTAGEM DE ADIANTAMENTO

    return total + adiantamento;
  }, 0);

  const valorSalario = valorTotalSalario - adiantamentoSalario;

  function ValorTotal(parametro1, parametro2) {
    const valorTotal = parametro1.reduce(
      (total, func) => total + func[parametro2],
      0
    );
    return valorTotal;
  }

  const RecebidoTotalNota =
    ValorTotal(NtRecebida, "valorRecebidoNF") +
    ValorTotal(NtAntecipada, "valorRecebidoNF");

  const ImpostosPagos =
    ValorTotal(NtRecebida, "valorNF") -
    ValorTotal(NtRecebida, "valorRecebidoNF") +
    (ValorTotal(NtAntecipada, "valorNF") -
      ValorTotal(NtAntecipada, "valorRecebidoNF"));

  const ImpostosPagosAntecipar =
    ValorTotal(NtAntecipada, "valorNF") -
    ValorTotal(NtAntecipada, "valorRecebidoNF");

  const RecebidoTotalPedido =
    ValorTotal(PddAndamento, "valorRecebidoPDD") +
    ValorTotal(PddFinalizada, "valorRecebidoPDD");

  const ReceberTotalPedido =
    ValorTotal(PddCriado, "valorPDD") +
    (ValorTotal(PddAndamento, "valorPDD") -
      ValorTotal(PddAndamento, "valorRecebidoPDD"));

  const RecebidoContrato = ValorTotal(CttAtivo, "ValorRecebidoCT");

  console.log(ValorTotal(PddCriado, "valorPDD"), (ValorTotal(PddAndamento, "valorPDD") -
      ValorTotal(PddAndamento, "valorRecebidoPDD")))

  return (
    <Section>
      <Header>Dashboard</Header>
      <Article>
        <SectionBlock>
          <ArticleBlock>
            <HeaderDados>
              <TituloDados>Ganhos</TituloDados>{" "}
            </HeaderDados>

            <ArticleDados>
              <DashGanhos></DashGanhos>
            </ArticleDados>
          </ArticleBlock>

          <ArticleBlock>
            <HeaderDados>
              <TituloDados>Gastos</TituloDados>
            </HeaderDados>
            <ArticleDados>
              <Texto>texto</Texto>
            </ArticleDados>
          </ArticleBlock>
        </SectionBlock>

        <SectionBlock>
          <ArticleBlock>
            <HeaderDados>
              <TituloDados> Funcionario</TituloDados>
            </HeaderDados>
            <ArticleDados>
              <CarrocelDash>
                <Dados>
                  <SeparacaoDados>
                    <NumberDados>{FuncAdmitido.length}</NumberDados>
                    <DescricaoDados>Quantidade</DescricaoDados>
                  </SeparacaoDados>
                  <SeparacaoDados>
                    <NumberDados>
                      R$
                      {adiantamentoSalario.toLocaleString({
                        style: "currency",
                        currency: "BRL",
                      })}
                    </NumberDados>
                    <DescricaoDados>Adiantamento</DescricaoDados>
                  </SeparacaoDados>
                  <SeparacaoDados>
                    <NumberDados>
                      R$
                      {valorSalario.toLocaleString({
                        style: "currency",
                        currency: "BRL",
                      })}
                    </NumberDados>
                    <DescricaoDados>Salario</DescricaoDados>
                  </SeparacaoDados>
                </Dados>

                <Dados>
                  <SeparacaoDados>
                    <NumberDados>19</NumberDados>
                    <DescricaoDados>Quantidade</DescricaoDados>
                  </SeparacaoDados>
                  <SeparacaoDados>
                    <NumberDados>19</NumberDados>
                    <DescricaoDados>Salario</DescricaoDados>
                  </SeparacaoDados>
                </Dados>
              </CarrocelDash>
            </ArticleDados>
          </ArticleBlock>

          <ArticleBlock>
            <HeaderDados>
              <TituloDados>Notas</TituloDados>{" "}
            </HeaderDados>
            <ArticleDados>
              <CarrocelDash>
                <Dados>
                  <SeparacaoDados>
                    <NumberDados>{NtAnalise.length}</NumberDados>
                    <DescricaoDados>Analisando</DescricaoDados>
                  </SeparacaoDados>
                  <SeparacaoDados>
                    <NumberDados>{NtAntecipada.length}</NumberDados>
                    <DescricaoDados>Antecipadas</DescricaoDados>
                  </SeparacaoDados>
                  <SeparacaoDados>
                    <NumberDados>{NtRecebida.length}</NumberDados>
                    <DescricaoDados>Recebidas</DescricaoDados>
                  </SeparacaoDados>
                </Dados>

                <Dados>
                  <SeparacaoDados>
                    <NumberDados>
                      R$
                      {ValorTotal(NtAnalise, "valorReceberNF").toLocaleString({
                        style: "currency",
                        currency: "BRL",
                      })}
                    </NumberDados>
                    <DescricaoDados>Receber</DescricaoDados>
                  </SeparacaoDados>

                  <SeparacaoDados>
                    <NumberDados>Ganhos</NumberDados>
                  </SeparacaoDados>

                  <SeparacaoDados>
                    <NumberDados>
                      R$
                      {RecebidoTotalNota.toLocaleString({
                        style: "currency",
                        currency: "BRL",
                      })}
                    </NumberDados>
                    <DescricaoDados>Recebido</DescricaoDados>
                  </SeparacaoDados>
                </Dados>

                <Dados>
                  <SeparacaoDados>
                    <NumberDados>
                      R$
                      {ImpostosPagosAntecipar.toLocaleString({
                        style: "currency",
                        currency: "BRL",
                      })}
                    </NumberDados>
                    <DescricaoDados>Antecipar</DescricaoDados>
                  </SeparacaoDados>

                  <SeparacaoDados>
                    <NumberDados>Impostos</NumberDados>
                  </SeparacaoDados>

                  <SeparacaoDados>
                    <NumberDados>
                      R$
                      {ImpostosPagos.toLocaleString({
                        style: "currency",
                        currency: "BRL",
                      })}
                    </NumberDados>
                    <DescricaoDados>Imposto</DescricaoDados>
                  </SeparacaoDados>
                </Dados>
              </CarrocelDash>
            </ArticleDados>
          </ArticleBlock>

          <ArticleBlock>
            <HeaderDados>
              <TituloDados>Pedidos</TituloDados>
            </HeaderDados>
            <ArticleDados>
              <CarrocelDash>
                <Dados>
                  <SeparacaoDados>
                    <NumberDados>{PddCriado.length}</NumberDados>
                    <DescricaoDados>Criadas</DescricaoDados>
                  </SeparacaoDados>
                  <SeparacaoDados>
                    <NumberDados>{PddAndamento.length}</NumberDados>
                    <DescricaoDados>Adantamento</DescricaoDados>
                  </SeparacaoDados>
                  <SeparacaoDados>
                    <NumberDados>{PddFinalizada.length}</NumberDados>
                    <DescricaoDados>Finalizadas</DescricaoDados>
                  </SeparacaoDados>
                </Dados>

                <Dados>
                  <SeparacaoDados>
                    <NumberDados>
                      R$
                      {ReceberTotalPedido.toLocaleString({
                        style: "currency",
                        currency: "BRL",
                      })}
                    </NumberDados>
                    <DescricaoDados>Receber</DescricaoDados>
                  </SeparacaoDados>

                  <SeparacaoDados>
                    <NumberDados>Ganhos</NumberDados>
                  </SeparacaoDados>

                  <SeparacaoDados>
                    <NumberDados>
                      R$
                      {RecebidoTotalPedido.toLocaleString({
                        style: "currency",
                        currency: "BRL",
                      })}
                    </NumberDados>
                    <DescricaoDados>Recebido</DescricaoDados>
                  </SeparacaoDados>
                </Dados>

                <Dados>
                  <SeparacaoDados>
                    <NumberDados>
                      {CttAtivo.length}
                    </NumberDados>
                    <DescricaoDados>Quantidade</DescricaoDados>
                  </SeparacaoDados>

                  <SeparacaoDados>
                    <NumberDados>Contrato</NumberDados>
                  </SeparacaoDados>

                  <SeparacaoDados>
                    <NumberDados>
                      R$
                      {RecebidoContrato.toLocaleString({
                        style: "currency",
                        currency: "BRL",
                      })}
                    </NumberDados>
                    <DescricaoDados>Recebido</DescricaoDados>
                  </SeparacaoDados>
                </Dados>

                <Dados>
                  <SeparacaoDados>
                    <NumberDados>
                      R$
                      {ImpostosPagosAntecipar.toLocaleString({
                        style: "currency",
                        currency: "BRL",
                      })}
                    </NumberDados>
                    <DescricaoDados>Antecipar</DescricaoDados>
                  </SeparacaoDados>

                  <SeparacaoDados>
                    <NumberDados>Impostos</NumberDados>
                  </SeparacaoDados>

                  <SeparacaoDados>
                    <NumberDados>
                      R$
                      {ImpostosPagos.toLocaleString({
                        style: "currency",
                        currency: "BRL",
                      })}
                    </NumberDados>
                    <DescricaoDados>Imposto</DescricaoDados>
                  </SeparacaoDados>
                </Dados>
              </CarrocelDash>
            </ArticleDados>
          </ArticleBlock>

          <ArticleBlock>
            <HeaderDados>
              <TituloDados> Trasnporte</TituloDados>
            </HeaderDados>
            <ArticleDados>
              <CarrocelDash>
                <Dados>
                  <SeparacaoDados>
                    <NumberDados>{FuncAdmitido.length}</NumberDados>
                    <DescricaoDados>Quantidade</DescricaoDados>
                  </SeparacaoDados>
                  <SeparacaoDados>
                    <NumberDados>R$200,000</NumberDados>
                    <DescricaoDados>Adantamento</DescricaoDados>
                  </SeparacaoDados>
                  <SeparacaoDados>
                    <NumberDados>19</NumberDados>
                    <DescricaoDados>Salario</DescricaoDados>
                  </SeparacaoDados>
                </Dados>

                <Dados>
                  <SeparacaoDados>
                    <NumberDados>19</NumberDados>
                    <DescricaoDados>Quantidade</DescricaoDados>
                  </SeparacaoDados>
                  <SeparacaoDados>
                    <NumberDados>19</NumberDados>
                    <DescricaoDados>Salario</DescricaoDados>
                  </SeparacaoDados>
                </Dados>
              </CarrocelDash>
            </ArticleDados>
          </ArticleBlock>
        </SectionBlock>
      </Article>
    </Section>
  );
};
