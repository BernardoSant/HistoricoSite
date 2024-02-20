import styled from 'styled-components';
import { useGlobalContext } from '../../global/Global';
import { BiCategory } from "react-icons/bi";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Div = styled.div`
height: 100%;
width: 100%;
padding-left: 1em;
padding-right: 1em;
padding-bottom: 1em;
padding-top: 1em;
display: flex;
flex-wrap: wrap;
max-width: 50em;
justify-content: start;
align-content: start;
flex-direction: row;
`;

const H1 = styled.h1`
font-weight: 600;
margin-top: 5px;
`;

const H2 = styled.h1`
font-weight: 500;
margin-top: 5px;
`;

const Header = styled.header`
width: 100%;
border-radius: 1em;
background: #f97316;
box-shadow: inset 5px -5px 10px #9f4a0e,
            inset -5px 5px 10px #ff9c1e;
`

export const MostruarioFuncDemitido = () => {
    const { funcionario } = useGlobalContext();

    const FuncionariosDemitidos = funcionario.filter(funcionario => funcionario.statuFucionario === 'Demitido');
    function getInitials(name) {
        const splitName = name.trim().split(' ');

        if (splitName.length === 1) {
            return splitName[0];
        } else if (splitName.length === 2) {
            return `${splitName[0]} ${splitName[1]}`;
        } else {
            return `${splitName[0]} ${splitName[1]} .${splitName[2].charAt(0).toUpperCase()}`;
        }
    }

    FuncionariosDemitidos.sort((a, b) => a.nameFucionario.localeCompare(b.nameFucionario))

    const [data, setData] = useState({
        nameFucionario: '',
        cpfFucionario: '',
        rgFucionario: '',
        estadoCivilFucionario: '',
        ruaFucionario: '',
        numFucionario: '',
        bairroFucionario: '',
        municipioFucionario: '',
        estadoFucionario: '',
        ctpsFucionario: '',
        pisFucionario: '',
        titEleitorFucionario: '',
        funcaoFuncionario: '',
        cargoFuncionario: '',
        horasTFucionario: '',
        dataAdmicaoFucionario: '',
        conjugueFucionario: '',
        cpfConjugueFucionario: '',
        paiFucionario: '',
        maeFucionario: '',
        complementoFucionario: '',
        generoFucionario: '',
        salarioFucionario: '',
        CadastroEmprFuncionario: ''
    });


    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);

    useEffect(() => {
        if (funcionarioSelecionado) {
            setData(prevData => ({ ...prevData, ...funcionarioSelecionado }))
        }
    }, [funcionarioSelecionado]);

    const demitirFuncionario = async (e) => {
        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        };

        axios.put('http://localhost:3030/funcionario/' + funcionarioSelecionado.id, { statuFucionario: 'Admitido' }, headers)
            .then((response) => {
                toast.success("Funcionário Admitido com sucesso!");
            }).catch((err) => {
                toast.info(err.response.data.message);
            });
    }


    return (
        <Div>
            {funcionarioSelecionado ? (
                <>
                    <nav className='w-full flex flex-row justify-end items-center gap-3'>
                        <button onClick={demitirFuncionario} className='w-full flex justify-end'>
                            <h1 className='bg-green-600 w-auto font-bold p-1 px-3 rounded-full'>Admitir</h1>
                        </button>

                        <button onClick={() => setFuncionarioSelecionado(null)} >
                            <h1 className='bg-red-600 w-auto font-bold p-1 px-3 rounded-full'>Voltar</h1>
                        </button>

                    </nav>

                    <div className=' grid grid-cols-5 gap-x-2 mt-3'>

                        <h3 className='text-3xl mb-5 font-semibold col-span-5 -ml-3'>Identificação</h3>

                        <p className='col-span-1 row-span-4 flex justify-center items-center'>
                            <img className='w-30 h-32 drop-shadow-lg' src="data:image/png;base64,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" alt="" />
                        </p>
                        <H1 className='col-span-3'>Nome</H1>
                        <H1 className='col-span-1'>Gênero</H1>
                        <H2 className='col-span-3'>{data.nameFucionario}</H2>
                        <H2 className='col-span-1'>{data.generoFucionario}</H2>


                        <H1 className='col-span-1'>CPF</H1>
                        <H1 className='col-span-2'>RG</H1>
                        <H1 className='col-span-1'>Estado Civil</H1>

                        <H2 className='col-span-1'>{data.cpfFucionario}</H2>
                        <H2 className='col-span-2'>{data.rgFucionario}</H2>
                        <H2 className='col-span-1'>{data.estadoCivilFucionario}</H2>

                        <p className='mt-3 col-span-5'></p>

                        <H1 className='col-span-2'>Pai</H1>
                        <H1 className='col-span-3'>Mãe</H1>

                        <H2 className='col-span-2'>{data.paiFucionario}</H2>
                        <H2 className='col-span-3'>{data.maeFucionario}</H2>

                        <H1 className='col-span-4'>Lougradouro</H1>
                        <H1 className='col-span-1'>Número</H1>

                        <H2 className='col-span-4'>{data.ruaFucionario}</H2>
                        <H2 className='col-span-1'>{data.numFucionario}°</H2>

                        <H1 className='col-span-3'>Bairro</H1>
                        <H1 className='col-span-1'>Cidade</H1>
                        <H1 className='col-span-1'>Estado</H1>
                        <H2 className='col-span-3'>{data.bairroFucionario}</H2>
                        <H2 className='col-span-1'>{data.municipioFucionario}</H2>
                        <H2 className='col-span-1'>{data.estadoFucionario}</H2>

                        <h3 className='text-3xl my-4 font-semibold col-span-5 -ml-3'>Documentos</h3>

                        <H1 className='col-span-2'>CTPS</H1>
                        <H1 className='col-span-2'>PIS</H1>
                        <H1 className='col-span-1'>TIT.Eleitor</H1>
                        <H2 className='col-span-2'>{data.ctpsFucionario}</H2>
                        <H2 className='col-span-2'>{data.pisFucionario}</H2>
                        <H2 className='col-span-1'>{data.titEleitorFucionario}</H2>

                        <H1 className='col-span-2'>Função</H1>
                        <H1 className='col-span-2'>Salario</H1>
                        <H1 className='col-span-1'>Horas trabalhada</H1>
                        <H2 className='col-span-2'>{data.funcaoFuncionario}</H2>
                        <H2 className='col-span-2'>{Number(data.salarioFucionario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</H2>
                        <H2 className='col-span-1'>{data.horasTFucionario}</H2>

                        <H1 className='col-span-2'>Data Admição</H1>
                        <H1 className='col-span-3'>Cadastro em Empresa</H1>
                        <H2 className='col-span-2'>{data.dataAdmicaoFucionario}</H2>
                        <H2 className='col-span-3'>{data.CadastroEmprFuncionario}</H2>

                    </div>
                </>
            ) : (
                <>
                    <Header >

                        <thead className='flex justify-center items-center py-4'>
                            <th className='text-start text-3xl pt-1'>Funcionarios Demitidos</th>
                        </thead>

                        <thead className='grid grid-cols-6 justify-center items-center w-full rounded-b-lg drop-shadow-2xl text-lg pb-1 '>
                            <th className='col-span-2'>Nome</th>
                            <th className='col-span-2'>Cargo</th>
                            <th className='col-span-1'>Salario</th>
                            <th className='col-span-1'>Data</th>
                        </thead>
                    </Header>
                    <table className='w-full'>
                        {FuncionariosDemitidos.map(func => {
                            let data = new Date(func.updatedAt);
                            let opcoes = { year: 'numeric', month: '2-digit', day: '2-digit' };
                            let dataFormatada = data.toLocaleDateString('pt-BR', opcoes);
                            let nameWithInitials = getInitials(func.nameFucionario);

                            return (
                                <>
                                    <thead className='w-full flex justify-end ml-2'>
                                        <span className="absolute h-6 w-6 rounded-full bg-gray-400 flex justify-center items-center cursor-pointer " onClick={() => {
                                            setFuncionarioSelecionado(func);
                                        }}>
                                            <BiCategory />
                                        </span>
                                    </thead>
                                    <thead className='grid grid-cols-6 justify-center items-center shadow-inner bg-gray-200 rounded-2xl p-2 my-2'>
                                        <th className='col-span-2'>{nameWithInitials}</th>
                                        <th className='col-span-2'>{func.funcaoFuncionario}</th>
                                        <th className='col-span-1'>{Number(func.salarioFucionario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</th>
                                        <th className='col-span-1'>{dataFormatada}</th>
                                    </thead>
                                </>
                            )

                        })}
                    </table>
                </>
            )}

        </Div >
    )
}
