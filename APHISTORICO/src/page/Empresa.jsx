import { useState } from "react";
import { NavBar } from "../components/NavBar"
import styled from 'styled-components';
import { TabelaAdicionarEmpresa } from "../components/TabelaEmpresa";

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

const Div = styled.div`
border-radius: 1em;
padding: 1em;
font-size: medium;
display: flex;
flex-direction: column;
gap:0.5em;
`;




const Button = ({ TipoButton, Titulo, onEmpresa, setEmpresa, onEmpregador, setEmpregador, onFuncionarios, setFuncionarios }) => {
    const handleClick = () => {
        setEmpresa(!onEmpresa);
        setEmpregador(false);
        setFuncionarios(false)
    }
    const handleClickFuncionario = () => {
        setFuncionarios(!onFuncionarios)
        setEmpresa(false);
        setEmpregador(false);
    }

    const handleClickEmpregador = () => {
        setEmpregador(!onEmpregador);
    }

    return (<>
        {TipoButton === 1 && <div onClick={handleClick}
            className={`p-1 px-3 mt-1 hover:bg-orange-500 hover:text-white ${onEmpresa ? "bg-orange-500 rounded-b-none" : "bg-[#fffafa]"} duration-300 rounded-xl font-semibold cursor-pointer`}
        >{Titulo}</div>}

        {TipoButton === 2 && <div onClick={handleClickEmpregador}
            className={`p-1 px-3 font-semibold cursor-pointer duration-300 ${onEmpregador ? "bg-orange-400" : "bg-orange-500"} hover:text-white`}
        >{Titulo}</div>
        }

        {TipoButton === 4 && <div onClick={handleClickFuncionario}
            className={`p-1 px-3 mt-1 hover:bg-orange-500 hover:text-white ${onFuncionarios ? "bg-orange-500 rounded-b-none" : "bg-[#fffafa]"} duration-300 rounded-xl font-semibold cursor-pointer`}
        >{Titulo}</div>}

        {TipoButton === 3 && <div
            className={`p-1 px-3 font-semibold cursor-pointer duration-300  hover:text-white`}
        >{Titulo}</div>
        }




    </>

    )
}



export const Empresa = () => {
    const [onEmpresa, setEmpresa] = useState(false);
    const [onEmpregador, setEmpregador] = useState(false);
    const [onFuncionarios, setFuncionarios] = useState(false);

    return (
        <>
            <NavBar Tipo={3} />
            <Header>
                <Nav>
                    <Div className=" shadow-md shadow-slate-600 ">
                        <nav className=" flex flex-col justify-center">
                            <Button TipoButton={1} Titulo={"Empresas"} onEmpresa={onEmpresa} setEmpresa={setEmpresa}></Button>
                            {onEmpresa &&
                                <div className="bg-orange-500 duration-300 rounded-b-xl">
                                    <Button TipoButton={2} Titulo={"Esab"} onEmpregador={onEmpregador} setEmpregador={setEmpregador} ></Button>
                                    {onEmpregador && <div className="bg-orange-400 duration-300 ">
                                        <Button TipoButton={3} Titulo={"Serviços"}></Button>
                                        <Button TipoButton={3} Titulo={"Notas Fiscais"}></Button>
                                        <Button TipoButton={3} Titulo={"Funcionario Cadastrado"}></Button>
                                    </div>}

                                    <Button TipoButton={3} Titulo={"Adicionar NF"}></Button>

                                    <Button TipoButton={3} Titulo={"Adcionar Empresa"}></Button>
                                </div>
                            }

                            <Button TipoButton={1} Titulo={"Gastos & Ganhos"} ></Button>

                            <Button TipoButton={4} Titulo={"Funcionarios"} onFuncionarios={onFuncionarios} setFuncionarios={setFuncionarios}></Button>
                            {onFuncionarios &&
                                <div className="bg-orange-500 duration-300 rounded-b-xl">
                                    <Button TipoButton={3} Titulo={"Admitidos"}  ></Button>
                                    <Button TipoButton={3} Titulo={"Demitidos"}  ></Button>
                                    <Button TipoButton={3} Titulo={"Cargo"}  ></Button>
                                    <Button TipoButton={3} Titulo={"Adcionar Funcionario"}  ></Button>
                                    <Button TipoButton={3} Titulo={"Adicionar Cargo"}  ></Button>
                                </div>
                            }

                            <Button TipoButton={1} Titulo={"Transporte"} ></Button>
                            <Button TipoButton={1} Titulo={"Impostos"} ></Button>
                        </nav>

                    </Div>
                    <Div className="shadow-md shadow-slate-600"><TabelaAdicionarEmpresa></TabelaAdicionarEmpresa></Div>
                </Nav>
            </Header>
        </>
    )
}