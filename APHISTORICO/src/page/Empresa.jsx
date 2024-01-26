import { useState } from "react";
import { NavBar } from "../components/NavBar"
import styled from 'styled-components';
import axios from "axios";
import { useEffect } from "react";
import { TabelaAdicionarEmpresa, TabelaAddNota } from "../components/TabelaEmpresa";

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

const Div = styled.div`
border-radius: 1em;
padding: 1em;
font-size: medium;
display: flex;
flex-direction: column;
gap:0.5em;
`;

const Botao = styled.button`
padding:6px;
padding-left:16px;
transition-duration: 200ms;
cursor: pointer;
text-align: start;
font-weight: 600;
`;




const Button = ({ TipoButton, Titulo, onEmpresa, onEmpregador, onFuncionarios, onAddEmpresa, onClick, onSecundario, onPrimario }) => {

    return (<>
        {TipoButton === 1 &&
            <Botao onClick={onClick}
                className={`mt-2 hover:bg-orange-500 hover:text-white ${onPrimario ? "bg-orange-600 rounded-b-none" : "bg-[#fffafa]"}  rounded-[20px]  `}
            >{Titulo}</Botao>}

        {TipoButton === 2 &&
            <Botao onClick={onClick}
                className={`${onSecundario ? "text-white" : "text-black"} hover:text-white`}
            >{Titulo}</Botao>
        }

        {TipoButton === 3 &&
            <Botao
                className={`hover:text-white`}
            >{Titulo}</Botao>
        }
    </>

    )
}

export const Empresa = () => {
    useEffect(() => {
        axios.get('http://localhost:3030/empresa')
            .then((response) => {
                setEmpresas(response.data.data);
            }).catch((err) => {
                console.error(err);
            });
    }, []);

    const [empresas, setEmpresas] = useState([]);
    const [empregadorState, setEmpregadorState] = useState({});

    const handleClickEmpregador = (id) => {
        setEmpregadorState(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    }

    const [state, setState] = useState({
        empresa: false,
        empregador: false,
        funcionarios: false,
        addEmpresa: false
    });

    const handleClick = (key) => {
        setState(prevState => ({
            ...prevState,
            [key]: !prevState[key],
            ...(key !== 'empregador' && { empregador: false })
        }));
    }

    return (
        <>
            <NavBar Tipo={3} />
            <Header>
                <Nav>
                    <Div className=" shadow-md shadow-slate-600 ">
                        <nav className=" flex flex-col justify-center">
                            <Button TipoButton={1} Titulo={"Empresas"} onPrimario={state.empresa} onClick={() => handleClick('empresa')}></Button>
                            {state.empresa &&
                                <Tabela>
                                    {empresas.map(empresa => (
                                        <>
                                            <Button TipoButton={2} Titulo={empresa.siglaEmpresa} onSecundario={state.empregador} onClick={() => handleClickEmpregador(empresa.id)} ></Button>
                                            {empregadorState[empresa.id] && <div className="bg-orange-400 flex flex-col">
                                                <Button TipoButton={3} Titulo={"Serviços"}></Button>
                                                <Button TipoButton={3} Titulo={"Notas Fiscais"}></Button>
                                                <Button TipoButton={3} Titulo={"Funcionario Cadastrado"}></Button>
                                            </div>}
                                        </>
                                    ))}
                                    <Button TipoButton={2} Titulo={"Adicionar NF"}></Button>

                                    <Button TipoButton={2} Titulo={"Adcionar Empresa"} onSecundario={state.addEmpresa} onClick={() => handleClick('addEmpresa')}></Button>

                                </Tabela>
                            }

                            <Button TipoButton={1} Titulo={"Gastos & Ganhos"} ></Button>

                            <Button TipoButton={1} Titulo={"Funcionarios"} onPrimario={state.funcionarios} onClick={() => handleClick('funcionarios')}></Button>
                            {state.funcionarios &&
                                <Tabela >
                                    <Button TipoButton={3} Titulo={"Admitidos"}  ></Button>
                                    <Button TipoButton={3} Titulo={"Demitidos"}  ></Button>
                                    <Button TipoButton={3} Titulo={"Cargo"}  ></Button>
                                    <Button TipoButton={3} Titulo={"Adcionar Funcionario"}  ></Button>
                                    <Button TipoButton={3} Titulo={"Adicionar Cargo"}  ></Button>
                                </Tabela>
                            }

                            <Button TipoButton={1} Titulo={"Transporte"} ></Button>
                            <Button TipoButton={1} Titulo={"Impostos"} ></Button>
                        </nav>

                    </Div>
                    <Div className="shadow-md shadow-slate-600 flex justify-center items-center">

                        {state.addEmpresa &&
                            <TabelaAdicionarEmpresa />
                        }
                    </Div>
                </Nav>
            </Header >
        </>
    )
}