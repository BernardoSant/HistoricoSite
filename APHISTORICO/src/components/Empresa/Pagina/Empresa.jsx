import { useState } from "react";
import styled from "styled-components";
import { TabelaAdicionarEmpresa } from "../Prestadores/AddEmpresa";
import { MostruarioNota } from "../Nota/MtrNota";
import { TabelaAddNota } from "../Nota/AddNota";
import { TabelaAddPedido } from "../Pedidos/AddPedido";
import { TabelaAddFuncionario } from "../Funcionarios/AddFuncionario";
import { MostruarioFuncAdmitido } from "../Funcionarios/FuncionarioAdmitidos";
import { MostruarioFuncDemitido } from "../Funcionarios/FuncionarioDemitidos";
import { ResumoEmpresa } from "../Mostruario/ResumoEmpresa";
import { TabelaAddContrato } from "../Contrato/addContrato";
import { MtrPedidos } from "../Pedidos/MtrPedidos";
import { useGlobalContext } from "../../../global/Global";
import { Outros } from "../Outros/Outros";

const Nav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const Header = styled.header`
  height: 100%;
  width: 100%;
  display: flex;
  gap: 2em;
  background-color: #fffafa;
`;

const Tabela = styled.div`
  background-color: #f97316;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  flex-direction: column;
`;
const TabelaSecund = styled.div`
  background-color: #fb923c;
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
  box-shadow: -1px 2px 13px #b5b2b2, -4px -5px 13px #ffffff;
  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 1em;
  border-top-right-radius: 1em;
  padding-bottom: 1em;
  padding-left:1em;
  padding-right:1em;
  font-size: medium;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  overflow-x: auto;
  z-index: 10;
  
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #575757;
    border-radius: 1em;
  }
`;

const Botao = styled.button`
  padding: 6px;
  padding-left: 16px;
  transition-duration: 200ms;
  cursor: pointer;
  text-align: start;
  font-weight: 600;
`;

const Button = ({
  TipoButton,
  Titulo,
  onClick,
  onSecundario,
  onPrimario,
  onFinal,
}) => {
  return (
    <>
      {TipoButton === 1 && (
        <Botao
          onClick={onClick}
          className={`mt-2 hover:bg-orange-500 hover:text-gray-200 ${
            onPrimario
              ? "bg-orange-600 rounded-b-none drop-shadow-xl underline"
              : "bg-[#fffafa]"
          } ${
            onFinal
              ? "bg-orange-600 drop-shadow-xl underline text-gray-200"
              : ""
          }  rounded-[20px]  `}
        >
          {Titulo}
        </Botao>
      )}

      {TipoButton === 2 && (
        <Botao
          onClick={onClick}
          className={`${
            onSecundario ? "text-gray-200 bg-orange-400 mt-1" : "text-black"
          } ${
            onFinal ? "text-gray-200 bg-orange-400 mt-1 rounded-b-[20px]" : ""
          } hover:text-gray-200 w-full`}
        >
          {Titulo}
        </Botao>
      )}

      {TipoButton === 3 && (
        <Botao onClick={onClick} className={`hover:text-gray-200`}>
          {Titulo}
        </Botao>
      )}
    </>
  );
};

export const Empresa = () => {
  const { empresa } = useGlobalContext();
  const [empregadorState, setEmpregadorState] = useState({});
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);

  const handleClickEmpregador = (id) => {
    // Primeiro, crie um novo objeto onde todas as chaves são definidas como false
    const novoEstado = Object.keys(empregadorState).reduce((obj, key) => {
      obj[key] = false;
      return obj;
    }, {});

    // Em seguida, defina o estado do empregador clicado como true
    novoEstado[id] = true;
    novoEstado[id] = !empregadorState[id];

    // Finalmente, atualize o estado
    setEmpregadorState(novoEstado);
    setEmpresaSelecionada(id);
  };

  const [state, setState] = useState({
    empresa: false,
    funcionarios: false,
    gasto: false,
    transporte: false,
    outros: false,
    empregador: false,

    //Botões Secundarios
    resumoMensal: false,
    addEmpresa: false,
    addFuncionarios: false,
    addNotaF: false,
    addPedido: false,
    addContrato: false,
    alimentacao: false,
    cargos: false,
    ferramentas: false,
    uniformes: false,
    visualizar: false,

    //Botões Terciarios
    verNota: false,
    verPedidos: false,
    verContrato: false,
    verFunciAdmitido: false,
    verFunciDemitido: false,
  });

  const handleClick = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
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
      ...(key !== "verFunciAdmitido" && { verFunciAdmitido: false }),
      ...(key !== "verFunciDemitido" && { verFunciDemitido: false }),
      ...(key !== "alimentacao" && { alimentacao: false }),
      ...(key !== "cargos" && { cargos: false }),
      ...(key !== "ferramentas" && { ferramentas: false }),
      ...(key !== "uniformes" && { uniformes: false }),
      ...(key !== "visualizar" && { visualizar: false }),
      ...(key !== "outros" && { outros: false, icon: false }),
    }));
  };
  // ordernar por tamanho de digito
  empresa.sort(
    (a, b) => String(a.siglaEmpresa).length - String(b.siglaEmpresa).length
  );
  return (
    <>
      <Header>
        <Nav>
          <Div className="overflow-auto max-w-[13em] min-w-[13em]">
            <nav className="flex flex-col justify-center ">
              <Button
                TipoButton={1}
                Titulo={"Empresas"}
                onPrimario={state.empresa}
                onClick={() => handleClick("empresa")}
              ></Button>
              {state.empresa && (
                <Tabela>
                  {empresa.map((empresa) => (
                    <div key={empresa.id}>
                      <Button
                        TipoButton={2}
                        Titulo={empresa.siglaEmpresa}
                        onSecundario={empregadorState[empresa.id]}
                        onClick={() => handleClickEmpregador(empresa.id)}
                      ></Button>
                      {empregadorState[empresa.id] && (
                        <TabelaSecund>
                          <Button TipoButton={3} Titulo={"Serviços"}></Button>

                          <Button
                            TipoButton={2}
                            Titulo={"Notas Fiscais"}
                            onSecundario={state.verNota}
                            onClick={() => handleClick("verNota")}
                          ></Button>

                          {empresa.situacaoEmpresa === "Contrato" ? null : (
                            <Button
                              TipoButton={2}
                              Titulo={"Pedidos"}
                              onSecundario={state.verPedidos}
                              onClick={() => handleClick("verPedidos")}
                            ></Button>
                          )}

                          <Button
                            TipoButton={3}
                            Titulo={"Funcionario Cadastrado"}
                          ></Button>
                        </TabelaSecund>
                      )}
                    </div>
                  ))}
                  <Button
                    TipoButton={2}
                    Titulo={"Resumo Mensal"}
                    onSecundario={state.resumoMensal}
                    onClick={() => handleClick("resumoMensal")}
                  ></Button>
                  <Button
                    TipoButton={2}
                    Titulo={"Adcionar Pedido"}
                    onSecundario={state.addPedido}
                    onClick={() => handleClick("addPedido")}
                  ></Button>

                  <Button
                    TipoButton={2}
                    Titulo={"Adcionar Contrato"}
                    onSecundario={state.addContrato}
                    onClick={() => handleClick("addContrato")}
                  ></Button>

                  <Button
                    TipoButton={2}
                    Titulo={"Adicionar NF"}
                    onSecundario={state.addNotaF}
                    onClick={() => handleClick("addNotaF")}
                  ></Button>

                  <Button
                    TipoButton={2}
                    Titulo={"Adcionar Empresa"}
                    onFinal={state.addEmpresa}
                    onClick={() => handleClick("addEmpresa")}
                  ></Button>
                </Tabela>
              )}

              <Button
                TipoButton={1}
                Titulo={"Gastos & Ganhos"}
                onPrimario={state.gasto}
                onClick={() => handleClick("gasto")}
              ></Button>
              {state.gasto && (
                <Tabela>
                  <Button
                    TipoButton={2}
                    Titulo={"Ver Gastos e Lucros"}
                  ></Button>
                  <Button TipoButton={2} Titulo={"Adcionar Gastos"}></Button>
                </Tabela>
              )}

              <Button
                TipoButton={1}
                Titulo={"Funcionarios"}
                onPrimario={state.funcionarios}
                onClick={() => handleClick("funcionarios")}
              ></Button>
              {state.funcionarios && (
                <Tabela>
                  <Button
                    TipoButton={2}
                    Titulo={"Admitidos"}
                    onSecundario={state.verFunciAdmitido}
                    onClick={() => handleClick("verFunciAdmitido")}
                  ></Button>
                  <Button
                    TipoButton={2}
                    Titulo={"Demitidos"}
                    onSecundario={state.verFunciDemitido}
                    onClick={() => handleClick("verFunciDemitido")}
                  ></Button>
                  <Button
                    TipoButton={2}
                    Titulo={"Adcionar Funcionario"}
                    onFinal={state.addFuncionarios}
                    onClick={() => handleClick("addFuncionarios")}
                  ></Button>
                </Tabela>
              )}

              <Button
                TipoButton={1}
                Titulo={"Transportes"}
                onPrimario={state.transporte}
                onClick={() => handleClick("transporte")}
              ></Button>
              {state.transporte && (
                <Tabela>
                  <Button TipoButton={2} Titulo={"Ver Todos"}></Button>
                  <Button
                    TipoButton={2}
                    Titulo={"Adcionar Transporte"}
                  ></Button>
                  <Button
                    TipoButton={2}
                    Titulo={"Adcionar Manutenção"}
                  ></Button>
                </Tabela>
              )}

              <Button
                TipoButton={1}
                Titulo={"Outros"}
                onFinal={state.outros}
                className="rounded-1em"
                onClick={() => handleClick("outros")}
              ></Button>
            </nav>
          </Div>
        </Nav>
        <Div className="w-full flex flex-col justify-center items-center rounded-[1em] p-[1em]">
          {state.addContrato && <TabelaAddContrato />}

          {state.resumoMensal && <ResumoEmpresa />}

          {state.outros && <Outros />}

          {state.addPedido && <TabelaAddPedido />}

          {state.verNota && <MostruarioNota empresaId={empresaSelecionada} />}

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
