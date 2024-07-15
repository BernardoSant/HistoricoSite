import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  TbBuildingCommunity,
  TbChartPie,
  TbBriefcaseFilled,
  TbUser,
  TbCar,
  TbDots,
  TbTool,
} from "react-icons/tb";
import styled from "styled-components";
import { TabelaAdicionarEmpresa } from "../Prestadores/AddEmpresa";
import { MostruarioNota } from "../Nota/MtrNota";
import { TabelaAddNota } from "../Nota/AddNota";
import { TabelaAddPedido } from "../Pedidos/AddPedido";
import { TabelaAddFuncionario } from "../Funcionarios/AddFuncionario";
import { MostruarioFuncAdmitido } from "../Funcionarios/FuncionarioAdmitidos";
import { MtrTransporte } from "../Transporte/MtrTransporte";
import { MostruarioFuncDemitido } from "../Funcionarios/FuncionarioDemitidos";
import { AddTransporte } from "../Transporte/AddTransporte";
import { ResumoEmpresa } from "../Mostruario/ResumoEmpresa";
import { TabelaAddContrato } from "../Contrato/addContrato";
import { MtrPedidos } from "../Pedidos/MtrPedidos";
import { useGlobalContext } from "../../../global/Global";
import { Outros } from "../Outros/Outros";
import { MdClose } from "react-icons/md";
import { DashGeral } from "../Dashboard/DashBoard";

const Nav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const Header = styled.header`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1em;
  background-color: #fffafa;
`;

const Tabela = styled.div`
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  flex-direction: column;
`;
const TabelaSecund = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom-right-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
`;

const Div = styled.div`
  box-shadow: -1px 2px 13px #b5b2b2, -4px -5px 13px #ffffff;
  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 1em;
  border-top-right-radius: 1em;
  padding: 1em;
  font-size: medium;
  gap: 0.5em;
  position: relative;
  overflow: hidden;
  z-index: 10;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #575757;
    border-radius: 1em;
  }
`;
const Div2 = styled(Div)`
  overflow: auto;
  padding-top: 0px;
`;

const Botao = styled.button`
  padding: 6px;
  padding-left: 16px;
  transition-duration: 200ms;
  cursor: pointer;
  text-align: start;
  font-size: 0.9vw;
  font-weight: 600;
`;

const Button = ({
  TipoButton,
  Titulo,
  onClick,
  onTerceiro,
  onSecundario,
  onPrimario,
  onFinal,
  Icon,
}) => {
  return (
    <>
      {TipoButton === 1 && (
        <Botao
          onClick={onClick}
          className={`mt-2 hover:bg-CorPrimariaBT hover:text-gray-200 ${
            onPrimario
              ? "bg-CorPrimariaBT rounded-b-none underline"
              : "bg-[#fffafa]"
          } ${
            onFinal && "bg-CorPrimariaBT underline text-gray-200"
          }  rounded-[20px] flex items-center gap-1 `}
        >
          <div className="text-lg"> {Icon}</div> {Titulo}
        </Botao>
      )}

      {TipoButton === 4 && (
        <Botao
          onClick={onClick}
          className={`mt-2 hover:bg-CorPrimariaBT hover:text-gray-200  ${
            onFinal && "bg-CorPrimariaBT underline text-gray-200"
          }  rounded-[20px]  flex items-center gap-1`}
        >
          <div className="text-lg"> {Icon}</div> {Titulo}
        </Botao>
      )}

      {TipoButton === 2 && (
        <Botao
          onClick={onClick}
          className={`
          ${
            onTerceiro
              ? " bg-CorSecundariaBT mt-1 rounded-t-[0.5em] flex justify-between items-center"
              : "text-[#432007]"
          } ${
            onSecundario
              ? " bg-CorSecundariaBT mt-1 flex justify-between items-center"
              : "text-[#432007]"
          } ${
            onFinal
              ? "bg-CorSecundariaBT mt-1 flex justify-between items-center rounded-b-[20px]"
              : ""
          } ${
            !onSecundario && !onFinal && !onTerceiro
              ? "hover:text-gray-300"
              : ""
          }  w-full `}
        >
          {Titulo}
        </Botao>
      )}

      {TipoButton === 3 && (
        <Botao
          onClick={onClick}
          className={`hover:underline ${
            onSecundario
              ? " bg-CorTerciariaBT mt-1 flex justify-between items-center"
              : "text-[#432007]"
          } ${
            onFinal
              ? "bg-CorTerciariaBT mt-1 flex justify-between items-center rounded-b-[0.5em]"
              : ""
          }`}
        >
          {Titulo} {onSecundario || onFinal ? <MdClose /> : null}
        </Botao>
      )}
    </>
  );
};

export const Empresa = () => {
  const { ip, empresa, impostos, funcionario } = useGlobalContext();
  const [state, setState] = useState({
    Prestadores: false,
    funcionarios: false,
    gasto: false,
    transporte: false,
    ferramentas: false,
    outros: false,
    empregador: false,
    Dashboard: true,

    //Botões Secundarios
    resumoMensal: false,
    addEmpresa: false,
    addFuncionarios: false,
    addNotaF: false,
    addPedido: false,
    addContrato: false,
    addTransporte: false,

    //Botões Terciarios
    verNota: false,
    verPedidos: false,
    verContrato: false,
    verFunciAdmitido: false,
    verFunciDemitido: false,
    verTransporte: false,
  });
  const [empregadorState, setEmpregadorState] = useState({});
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);

  const ButtomPrimarioEmpregador = (id) => {
    // Primeiro, crie um novo objeto onde todas as chaves são definidas como false
    const novoEstado = Object.keys(empregadorState).reduce((obj, key) => {
      obj[key] = false;
      setState((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
      return obj;
    }, {});

    // Em seguida, defina o estado do empregador clicado como true
    novoEstado[id] = true;
    novoEstado[id] = !empregadorState[id];

    // Finalmente, atualize o estado
    setEmpregadorState(novoEstado);
    setEmpresaSelecionada(id);
  };

  const ButtomPrimario = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      ...(key !== "Prestadores" && { Prestadores: false }),
      ...(key !== "funcionarios" && { funcionarios: false }),
      ...(key !== "gasto" && { gasto: false }),
      ...(key !== "transporte" && { transporte: false }),
      ...(key !== "ferramentas" && { ferramentas: false }),
      ...(key !== "empregador" && { empregador: false }),
      ...(!key && { Dashboard: true }),
    }));
  };

  const ButtomSecundario = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: true,
      ...(key !== "resumoMensal" && { resumoMensal: false }),
      ...(key !== "empregadorState" && { empregadorState: false }),
      ...(key !== "addEmpresa" && { addEmpresa: false }),
      ...(key !== "addFuncionarios" && { addFuncionarios: false }),
      ...(key !== "addNotaF" && { addNotaF: false }),
      ...(key !== "addPedido" && { addPedido: false }),
      ...(key !== "addContrato" && { addContrato: false }),
      ...(key !== "verNota" && { verNota: false }),
      ...(key !== "verPedidos" && { verPedidos: false }),
      ...(key !== "verContrato" && { verContrato: false }),
      ...(key !== "addTransporte" && { addTransporte: false }),
      ...(key !== "verFunciAdmitido" && { verFunciAdmitido: false }),
      ...(key !== "verFunciDemitido" && { verFunciDemitido: false }),
      ...(key !== "alimentacao" && { alimentacao: false }),
      ...(key !== "uniformes" && { uniformes: false }),
      ...(key !== "visualizar" && { visualizar: false }),
      ...(key !== "outros" && { outros: false }),
      ...(key !== "Dashboard" && { Dashboard: false }),
      ...(key !== "verTransporte" && { verTransporte: false }),
    }));
  };

  const ButtomTerciario = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: true,
      ...(key !== "resumoMensal" && { resumoMensal: false }),
      ...(key !== "empregadorState" && { empregadorState: false }),
      ...(key !== "addEmpresa" && { addEmpresa: false }),
      ...(key !== "addFuncionarios" && { addFuncionarios: false }),
      ...(key !== "addNotaF" && { addNotaF: false }),
      ...(key !== "addPedido" && { addPedido: false }),
      ...(key !== "addContrato" && { addContrato: false }),
      ...(key !== "addTransporte" && { addTransporte: false }),
      ...(key !== "verNota" && { verNota: false }),
      ...(key !== "verPedidos" && { verPedidos: false }),
      ...(key !== "verContrato" && { verContrato: false }),
      ...(key !== "verFunciAdmitido" && { verFunciAdmitido: false }),
      ...(key !== "verFunciDemitido" && { verFunciDemitido: false }),
      ...(key !== "alimentacao" && { alimentacao: false }),
      ...(key !== "uniformes" && { uniformes: false }),
      ...(key !== "visualizar" && { visualizar: false }),
      ...(key !== "outros" && { outros: false }),
      ...(key !== "Dashboard" && { Dashboard: false }),
      ...(key !== "verTransporte" && { verTransporte: false }),
    }));
  };
  // ordernar por tamanho de digito
  empresa.sort(
    (a, b) => String(a.siglaEmpresa).length - String(b.siglaEmpresa).length
  );

  const FuncionariosAdmitidos = funcionario.filter(
    (funcionario) => funcionario.statuFucionario === "Admitido"
  );

  const impostoSalarioINSS = impostos.find(
    (imposto) => imposto.siglaImposto.toLowerCase() === "salarioinss"
  );

  let impostoSalario = 0;
  if (!impostoSalarioINSS) {
    impostoSalario = 7.5;
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

  const impostoSalarioFGTS = impostos.find(
    (imposto) => imposto.siglaImposto.toLowerCase() === "fgts"
  );

  let impostoFGTS = 0;
  if (!impostoSalarioFGTS) {
    impostoFGTS = 8;
  } else {
    impostoFGTS = impostoSalarioFGTS.porcentagemImposto;
  }

  const fgtsSalario = FuncionariosAdmitidos.reduce((total, func) => {
    const salarioTotal = func.salarioFucionario;
    const salarioDia = salarioTotal / 30;
    const salarioMes = salarioDia * 30;
    const descontoPorFalta = salarioDia * func.diasFaltas;
    const salarioFunc = salarioMes - descontoPorFalta;
    const inssSobSalario = salarioFunc * impostoFGTS;

    return total + inssSobSalario;
  }, 0);

  const valorSalario = FuncionariosAdmitidos.reduce((total, func) => {
    return valorTotalSalario - adiantamentoSalario;
  }, 0);

  const hoje = new Date();
  const diaAtual = hoje.getDate();
  const mesAtual = hoje.getMonth() + 1;
  const anoAtual = hoje.getFullYear();

  const MesAnterior = new Date();
  MesAnterior.setMonth(MesAnterior.getMonth() - 1);

  useEffect(() => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const ultimoMesExecutado = localStorage.getItem("ultimoMesExecutado");
    const mesExecutado = Number(ultimoMesExecutado);
    if (diaAtual >= 1 && mesAtual !== mesExecutado) {
      axios.post(
        ip + "/salario",
        {
          totalFgtsSalario: fgtsSalario,
          totalSalarioMes: valorTotalSalario,
          adiantamentoSalario: adiantamentoSalario,
          salarioFinal: valorSalario,
          dataSalario: MesAnterior,
        },
        headers
      );
      toast.success("Salario enviado com sucesso");
      var TotalFaltas = 0;
      funcionario.forEach((funcionario) => {
        axios.put(
          ip + "/funcionario/" + funcionario.id,
          { diasFaltas: TotalFaltas },
          headers
        );
      });

      localStorage.setItem("ultimoMesExecutado", mesAtual);
    }
  }, [diaAtual, mesAtual, anoAtual]);

  return (
    <>
      <Header>
        <Nav>
          <Div2 className="overflow-auto max-w-[20em] min-w-[13em] max-h-[90vh] 2xl:max-h-[100%]">
            <div className="sticky top-0 bg-white z-10 pt-[1em] pb-1">
              <div className="w-full text-center bg-CorSecundariaBT  rounded-full py-1 font-bold text-[1.1vw] sticky top-0 ">
                <p className="absolute  left-0 top-0 ml-4 h-full flex justify-center items-center">
                  <TbBuildingCommunity />
                </p>
                Empresa
              </div>
            </div>
            <nav className="flex flex-col justify-center relative z-0">
              <Button
                TipoButton={4}
                Titulo={"Dashboard"}
                Icon={<TbChartPie />}
                onFinal={state.Dashboard}
                onClick={() => ButtomSecundario("Dashboard")}
              ></Button>

              <Button
                TipoButton={1}
                Icon={<TbBriefcaseFilled />}
                Titulo={"Prestadores"}
                onPrimario={state.Prestadores}
                onClick={() => ButtomPrimario("Prestadores")}
              ></Button>

              {state.Prestadores && (
                <Tabela className="bg-CorPrimariaTBLA">
                  {empresa.map((empresa) => (
                    <div key={empresa.id}>
                      <Button
                        TipoButton={2}
                        Titulo={empresa.siglaEmpresa}
                        onTerceiro={empregadorState[empresa.id]}
                        onClick={() => ButtomPrimarioEmpregador(empresa.id)}
                      ></Button>
                      {empregadorState[empresa.id] && (
                        <TabelaSecund className="bg-CorSecundariaTBLA">
                          <Button
                            TipoButton={3}
                            Titulo={"Notas Fiscais"}
                            onSecundario={state.verNota}
                            onClick={() => ButtomTerciario("verNota")}
                          ></Button>

                          {empresa.situacaoEmpresa === "Contrato" ? (
                            <Button
                              TipoButton={3}
                              Titulo={"Adicionar Contrato"}
                              onSecundario={state.addContrato}
                              onClick={() => ButtomSecundario("addContrato")}
                            ></Button>
                          ) : (
                            <>
                              <Button
                                TipoButton={3}
                                Titulo={"Pedidos"}
                                onSecundario={state.verPedidos}
                                onClick={() => ButtomTerciario("verPedidos")}
                              ></Button>

                              <Button
                                TipoButton={3}
                                Titulo={"Adicionar Pedido"}
                                onSecundario={state.addPedido}
                                onClick={() => ButtomSecundario("addPedido")}
                              ></Button>
                            </>
                          )}

                          <Button
                            TipoButton={3}
                            Titulo={"Adicionar NF"}
                            onFinal={state.addNotaF}
                            onClick={() => ButtomSecundario("addNotaF")}
                          ></Button>
                        </TabelaSecund>
                      )}
                    </div>
                  ))}
                  <Button
                    TipoButton={2}
                    Titulo={"Resumo Mensal"}
                    onSecundario={state.resumoMensal}
                    onClick={() => ButtomSecundario("resumoMensal")}
                  ></Button>

                  <Button
                    TipoButton={2}
                    Titulo={"Adicionar Empresa"}
                    onFinal={state.addEmpresa}
                    onClick={() => ButtomSecundario("addEmpresa")}
                  ></Button>
                </Tabela>
              )}

              <Button
                TipoButton={1}
                Icon={<TbUser />}
                Titulo={"Funcionarios"}
                onPrimario={state.funcionarios}
                onClick={() => ButtomPrimario("funcionarios")}
              ></Button>
              {state.funcionarios && (
                <Tabela className="bg-CorPrimariaTBLA">
                  <Button
                    TipoButton={2}
                    Titulo={"Admitidos"}
                    onSecundario={state.verFunciAdmitido}
                    onClick={() => ButtomSecundario("verFunciAdmitido")}
                  ></Button>
                  <Button
                    TipoButton={2}
                    Titulo={"Demitidos"}
                    onSecundario={state.verFunciDemitido}
                    onClick={() => ButtomSecundario("verFunciDemitido")}
                  ></Button>
                  <Button
                    TipoButton={2}
                    Titulo={"Adicionar Funcionario"}
                    onFinal={state.addFuncionarios}
                    onClick={() => ButtomSecundario("addFuncionarios")}
                  ></Button>
                </Tabela>
              )}

              <Button
                TipoButton={1}
                Icon={<TbCar />}
                Titulo={"Transportes"}
                onPrimario={state.transporte}
                onClick={() => ButtomPrimario("transporte")}
              ></Button>
              {state.transporte && (
                <Tabela className="bg-CorPrimariaTBLA">
                  <Button
                    TipoButton={2}
                    Titulo={"Ver Todos"}
                    onSecundario={state.verTransporte}
                    onClick={() => ButtomSecundario("verTransporte")}
                  ></Button>
                  <Button
                    TipoButton={2}
                    Titulo={"Adicionar Transporte"}
                    onFinal={state.addTransporte}
                    onClick={() => ButtomSecundario("addTransporte")}
                  ></Button>
                </Tabela>
              )}
              {/* 
              <Button
                TipoButton={1}
                Icon={<TbTool />}
                Titulo={"Ferramentas"}
                onPrimario={state.ferramentas}
                onClick={() => ButtomPrimario("ferramentas")}
              ></Button>
              {state.ferramentas && (
                <Tabela className="bg-CorPrimariaTBLA">
                  <Button
                    TipoButton={2}
                    Titulo={"Ver Ferramentas"}
                    onSecundario={state.verTransporte}
                    onClick={() => ButtomSecundario("verTransporte")}
                  ></Button>
                  <Button
                    TipoButton={2}
                    Titulo={"Adicionar Ferramentas"}
                    onFinal={state.addTransporte}
                    onClick={() => ButtomSecundario("addTransporte")}
                  ></Button>
                </Tabela>
              )}
*/}
              <Button
                TipoButton={4}
                Icon={<TbDots />}
                Titulo={"Outros"}
                onFinal={state.outros}
                className="rounded-1em"
                onClick={() => {
                  ButtomSecundario("outros");
                }}
              ></Button>
            </nav>
          </Div2>
        </Nav>
        <Div className="w-full relative rounded-[1em] flex justify-center items-center">
          {state.addTransporte && <AddTransporte></AddTransporte>}

          {state.Dashboard && <DashGeral />}

          {state.addContrato && <TabelaAddContrato />}

          {state.resumoMensal && <ResumoEmpresa />}

          {state.outros && <Outros />}

          {state.addPedido && <TabelaAddPedido />}

          {state.verNota && <MostruarioNota empresaId={empresaSelecionada} />}

          {state.verTransporte && <MtrTransporte />}

          {state.verPedidos && <MtrPedidos empresaId={empresaSelecionada} />}

          {state.addEmpresa && <TabelaAdicionarEmpresa />}

          {state.addNotaF && <TabelaAddNota />}

          {state.addFuncionarios && <TabelaAddFuncionario />}
          {state.verFunciAdmitido && <MostruarioFuncAdmitido />}
          {state.verFunciDemitido && <MostruarioFuncDemitido />}
        </Div>
      </Header>
    </>
  );
};
