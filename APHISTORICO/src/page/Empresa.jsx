import { useState } from "react";
import { NavBar } from "../components/NavBar"
import styled from 'styled-components';
import { TabelaAdicionarEmpresa, TabelaAddImposto, TabelaAddNota, MostrarImposto, TabelaAddFuncionario, TabelaAddKinay } from "../components/TabelaEmpresa";
import { MostruarioNota } from "../components/MostruarioEmpresa";
import { useGlobalContext } from '../global/Global';

const Nav = styled.nav`
width: 100%;
height: 100%;
display: grid;
grid-template-columns: 25% auto;
gap: 2em;
`;


const Header = styled.header`
height: 100vh;
width: 100%;
padding-top:7em;
background-color:#fffafa;
padding-left:2em;
padding-right:2em;
padding-bottom:2em;
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
border-radius: 1em;
padding: 1em;
font-size: medium;
display: flex;
flex-direction: column;
gap:0.5em;
overflow-x: auto;
`;

const Botao = styled.button`
padding:6px;
padding-left:16px;
transition-duration: 200ms;
cursor: pointer;
text-align: start;
font-weight: 600;
`;




const Button = ({ TipoButton, Titulo, onClick, onSecundario, onPrimario, onFinal }) => {

    return (<>
        {TipoButton === 1 &&
            <Botao onClick={onClick}
                className={`mt-2 hover:bg-orange-500 hover:text-gray-200 ${onPrimario ? "bg-orange-600 rounded-b-none drop-shadow-xl underline" : "bg-[#fffafa]"}  rounded-[20px]  `}
            >{Titulo}</Botao>}

        {TipoButton === 2 &&
            <Botao onClick={onClick}
                className={`${onSecundario ? "text-gray-200 bg-orange-400 mt-1" : "text-black"} ${onFinal ? "text-gray-200 bg-orange-400 mt-1 rounded-b-[20px]" : ""} hover:text-gray-200 w-full`}
            >{Titulo}</Botao>
        }

        {TipoButton === 3 &&
            <Botao
                className={`hover:text-gray-200`}
            >{Titulo}</Botao>
        }
    </>

    )
}

export const Empresa = () => {
    const {empresa} = useGlobalContext();
    const [empregadorState, setEmpregadorState] = useState({});
    const [empresaSelecionada, setEmpresaSelecionada] = useState(null);

    const handleClickEmpregador = (id) => {
        setEmpregadorState(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
        setEmpresaSelecionada(id);
    }

    const [state, setState] = useState({
        empresa: false,
        funcionarios: false,
        gasto: false,
        transporte: false,
        impostos: false,
        empregador: false,

        //Botões Secundarios
        addEmpresa: false,
        addFuncionarios: false,
        addNotaF: false,
        addImposto: false,
        addKinay: false,
        verImposto: false
    });


    const handleClick = (key) => {
        setState(prevState => ({
            ...prevState,
            [key]: !prevState[key],
            ...(key !== 'addEmpresa' && { addEmpresa: false }),
            ...(key !== 'addFuncionarios' && { addFuncionarios: false }),
            ...(key !== 'addNotaF' && { addNotaF: false }),
            ...(key !== 'addImposto' && { addImposto: false }),
            ...(key !== 'addKinay' && { addKinay: false }),
            ...(key !== 'verImposto' && { verImposto: false }),

        }));
    }

    return (
        <>
            <NavBar Tipo={3} />
            <Header>
                <Nav>
                    <Div className=" shadow-md shadow-slate-600 overflow-auto">
                        <nav className=" flex flex-col justify-center ">
                            <Button TipoButton={1} Titulo={"Empresas"} onPrimario={state.empresa} onClick={() => handleClick('empresa')}></Button>
                            {state.empresa &&
                                <Tabela >
                                    {empresa.map(empresa => (
                                        <div key={empresa.id} >
                                            <Button  TipoButton={2} Titulo={empresa.siglaEmpresa} onSecundario={empregadorState[empresa.id]} onClick={() => handleClickEmpregador(empresa.id)} ></Button>
                                            {empregadorState[empresa.id] &&
                                                <TabelaSecund >
                                                    <Button TipoButton={3} Titulo={"Serviços"}></Button>
                                                    <Button TipoButton={3} Titulo={"Notas Fiscais"}></Button>
                                                    <Button TipoButton={3} Titulo={"Funcionario Cadastrado"}></Button>
                                                </TabelaSecund>}
                                        </div>
                                    ))}
                                    <Button TipoButton={2} Titulo={"Adicionar NF"} onSecundario={state.addNotaF} onClick={() => handleClick('addNotaF')}></Button>

                                    <Button TipoButton={2} Titulo={"Adcionar Empresa"} onFinal={state.addEmpresa} onClick={() => handleClick('addEmpresa')}></Button>

                                </Tabela>
                            }

                            <Button TipoButton={1} Titulo={"Gastos & Ganhos"} onPrimario={state.gasto} onClick={() => handleClick('gasto')} ></Button>
                            {state.gasto &&
                                <Tabela>
                                    <Button TipoButton={2} Titulo={"Ver Gastos e Lucros"}></Button>
                                    <Button TipoButton={2} Titulo={"Adcionar Gastos"}></Button>
                                </Tabela>}

                            <Button TipoButton={1} Titulo={"Funcionarios"} onPrimario={state.funcionarios} onClick={() => handleClick('funcionarios')}></Button>
                            {state.funcionarios &&
                                <Tabela >
                                    <Button TipoButton={2} Titulo={"Admitidos"}  ></Button>
                                    <Button TipoButton={2} Titulo={"Demitidos"}  ></Button>
                                    <Button TipoButton={2} Titulo={"Adcionar Funcionario"} onFinal={state.addFuncionarios} onClick={() => handleClick('addFuncionarios')} ></Button>
                                </Tabela>
                            }

                            <Button TipoButton={1} Titulo={"Transportes"} onPrimario={state.transporte} onClick={() => handleClick('transporte')} ></Button>
                            {state.transporte &&
                                <Tabela>
                                    <Button TipoButton={2} Titulo={"Ver Todos"}></Button>
                                    <Button TipoButton={2} Titulo={"Adcionar Transporte"}></Button>
                                </Tabela>
                            }

                            <Button TipoButton={1} Titulo={"Impostos"} onPrimario={state.impostos} onClick={() => handleClick('impostos')} ></Button>
                            {state.impostos &&
                                <Tabela>
                                    <Button TipoButton={2} Titulo={"Ver Impostos"} onSecundario={state.verImposto} onClick={() => handleClick('verImposto')}></Button>
                                    <Button TipoButton={2} Titulo={"Adcionar Imposto"} onSecundario={state.addImposto} onClick={() => handleClick('addImposto')}></Button>
                                    <Button TipoButton={2} Titulo={"Adcionar Kinay"} onFinal={state.addKinay} onClick={() => handleClick('addKinay')}></Button>
                                </Tabela>
                            }

                        </nav>

                    </Div>
                    <Div className="shadow-md shadow-slate-600 flex flex-col justify-center items-center">
                    <MostruarioNota empresaId={empresaSelecionada} />

                        {state.addKinay &&
                            <TabelaAddKinay />
                        }
                        {state.addEmpresa &&
                            <TabelaAdicionarEmpresa />
                        }

                        {state.addNotaF &&
                            <TabelaAddNota />
                        }

                        {state.addFuncionarios &&
                            <TabelaAddFuncionario />
                        }

                        {state.addImposto &&
                            <TabelaAddImposto />
                        }

                        {state.verImposto &&
                            <MostrarImposto />
                        }
                    </Div>
                </Nav>
            </Header >
        </>
    )
}