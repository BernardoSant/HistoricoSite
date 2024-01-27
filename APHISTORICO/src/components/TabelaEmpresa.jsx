import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Form = styled.form`
height: 100%;
width: 100%;
padding-left: 1em;
padding-right: 1em;
display: flex;
flex-wrap: wrap;
justify-content: start;
align-items: center;
flex-direction: column;
overflow: auto;
`;

const H1 = styled.h1`
font-weight: 600;
margin-top: 5px;
`;
const Div = styled.div`
display: grid;
grid-column: span 4;
gap: 12px;
`;



export const TabelaAdicionarEmpresa = () => {

    const [data, setData] = useState({
        nameEmpresa: '',
        siglaEmpresa: '',
        emailEmpresa: '',
        cepEmpresa: '',
        ruaEmpresa: '',
        bairroEmpresa: '',
        numeroEmpresa: '',
        complEmpresa: '',
        cidadeEmpresa: '',
        cnpjEmpresa: '',
        responsavelEmpresa: '',
        cadastroEmpresa: '',
        situacaoEmpresa: ''
    });

    // Receber os dados dos campos do formulário
    const valorInput = e => {
        let valor = e.target.value;
        if (e.target.name === "cepEmpresa") {
            valor = valor.replace(/\D/g, "");
            valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
        } else if (e.target.name === "cnpjEmpresa") {
            valor = valor.replace(/\D/g, "");
            valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
            valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
            valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
            valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
        }
        setData({ ...data, [e.target.name]: valor });
    };


    const sendEmpresa = async (e) => {

        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        };

        if (data.cepEmpresa === '' && data.cnpjEmpresa === '' && data.cadastroEmpresa === '' && data.nameEmpresa === '') {
            toast.error('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        axios.post('http://localhost:3030/empresa', data, headers)
            .then((response) => {
                toast.success(response.data.message);
                setData({
                    nameEmpresa: '',
                    siglaEmpresa: '',
                    emailEmpresa: '',
                    cepEmpresa: '',
                    ruaEmpresa: '',
                    bairroEmpresa: '',
                    numeroEmpresa: '',
                    complEmpresa: '',
                    cidadeEmpresa: '',
                    cnpjEmpresa: '',
                    responsavelEmpresa: '',
                    cadastroEmpresa: '',
                    situacaoEmpresa: ''
                });
            }).catch((err) => {
                toast.info(err.response.data.message);
            });
    }

    return (
        <>
            <Form onSubmit={sendEmpresa} >
                <h1 className='font-semibold w-full flex justify-center items-center text-3xl'>Adcionar Empresa</h1>
                <nav className='flex flex-col overflow-auto  max-w-[40em]  justify-center mt-[5em]' >
                    <div className=' grid grid-cols-4 gap-x-2'>
                        <H1 className='col-span-3'>Nome*</H1>

                        <H1 className='col-span-1'>Sigla*</H1>

                        <input
                            type="text"
                            name="nameEmpresa"
                            onChange={valorInput}
                            value={data.nameEmpresa}
                            className="col-span-3 border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                        <input
                            type="text"
                            name="siglaEmpresa"
                            onChange={valorInput}
                            value={data.siglaEmpresa}
                            className="col-span-1 border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    </div>

                    <H1>CNPJ*</H1>
                    <input
                        type="text"
                        maxlength="18"
                        name="cnpjEmpresa"
                        onChange={valorInput}
                        value={data.cnpjEmpresa}
                        className=" border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <div className=' grid grid-cols-4 gap-x-2'>
                        <H1 className='col-span-2'>Responsável</H1>
                        <H1 className='col-span-2'>Email</H1>

                        <input
                            type="text"
                            name="responsavelEmpresa"
                            onChange={valorInput}
                            value={data.responsavelEmpresa}
                            className="col-span-2 border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                        <input
                            type="text"
                            name="emailEmpresa"
                            onChange={valorInput}
                            value={data.emailEmpresa}
                            className="col-span-2 border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    </div>

                    <div className='grid grid-cols-4 gap-x-2'>
                        <H1 className='col-span-1'>CEP*</H1>
                        <H1 className='col-span-3'>Lougradouro*</H1>

                        <input
                            maxlength="9"
                            type="text"
                            name="cepEmpresa"
                            onChange={valorInput}
                            value={data.cepEmpresa}
                            className="col-span-1 border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                        <input
                            type="text"
                            name="ruaEmpresa"
                            onChange={valorInput}
                            value={data.ruaEmpresa}
                            className="col-span-3 border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />
                    </div>

                    <div className='grid grid-cols-5 gap-x-2'>
                        <H1 className='col-span-1'>Número*</H1>
                        <H1 className='col-span-4'>Bairro*</H1>

                        <input
                            type="number"
                            name="numeroEmpresa"
                            onChange={valorInput}
                            value={data.numeroEmpresa}
                            className="col-span-1 border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                        <input
                            type="text"
                            name="bairroEmpresa"
                            onChange={valorInput}
                            value={data.bairroEmpresa}
                            className="col-span-4 border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    </div>

                    <H1>Complemento</H1>
                    <input
                        type="text"
                        name="complEmpresa"
                        onChange={valorInput}
                        value={data.complEmpresa}
                        className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>Cidade</H1>
                    <input
                        type="text"
                        name="cidadeEmpresa"
                        onChange={valorInput}
                        value={data.cidadeEmpresa}
                        className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <div className='flex justify-between items-start md:items-end w-full mt-3 flex-col  md:flex-row gap-6 max-w-[40em] ' >
                        <dir className="flex flex-col ">
                            <H1 className='text-xl'>Campos Adcionais</H1>
                            <div className='flex gap-6 flex-wrap'>
                                <nav>
                                    <H1>Data de Contrato</H1>
                                    <input
                                        type="date"
                                        name="cadastroEmpresa"
                                        onChange={valorInput}
                                        value={data.cadastroEmpresa}
                                        className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2" />
                                </nav>
                                <nav className='flex flex-col justify-end'>
                                    <H1>Situação*</H1>
                                    <select
                                        id="situacaoEmpresa"
                                        name="situacaoEmpresa"
                                        onChange={valorInput}
                                        value={data.situacaoEmpresa}
                                        className="border-[1px] border-[#848484] rounded-md px-3 py-[0.3em]">
                                        <option value="Particular">Particular</option>
                                        <option value="Contrato">Contrato</option>
                                    </select>
                                </nav>
                            </div>
                        </dir>
                        <button type='submit' className='w-full mt-4 md:w-auto bg-orange-400 py-2 px-7 rounded-lg border-2 border-orange-500 font-semibold hover:text-white hover:scale-95 duration-500'>Salvar</button>
                    </div>
                </nav>
            </Form>
        </>
    )
}

export const TabelaAddNota = () => {
    return (
        <>
            <div className='flex flex-col'>
                <h1 className='font-semibold w-full h-auto flex justify-center items-center text-3xl'>Adcionar Nota Fiscal</h1>
                <Form>

                </Form>
            </div>
        </>
    )
}

export const TabelaAddImposto = () => {

    const [data, setData] = useState({
        siglaImposto: '',
        porcentagemImposto: '',
        tipoImposto: ''
    });

    const valorInput = e => {
        let valor = e.target.value;
        setData({ ...data, [e.target.name]: valor });
    };


    const sendImposto = async (e) => {

        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        };

        if (data.siglaImposto === '' && data.porcentagemImposto === '') {
            toast.error('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const dataParaEnviar = { ...data, porcentagemImposto: data.porcentagemImposto / 100 };

        axios.post('http://localhost:3030/impostos', dataParaEnviar, headers)
            .then((response) => {
                toast.success(response.data.message);
                setData({
                    siglaImposto: '',
                    porcentagemImposto: '',
                    tipoImposto: ''
                });
            }).catch((err) => {
                toast.info(err.response.data.message);
            });
    }

    return (
        <>
            <div className='flex flex-col h-full w-full'>
                <h1 className='font-semibold w-full h-auto flex justify-center items-center text-3xl'>Adcionar Impostos</h1>
                <Form onSubmit={sendImposto}>
                    <div className='grid grid-cols-4 grid-rows-1 items-start gap-x-4 mt-5 '>
                        <H1 className='col-span-1'>Sigla</H1>
                        <H1 className='col-span-1'>Porcentagem</H1>
                        <H1 className='col-span-1'>Atividade</H1>
                        <button type='submit' className='row-span-2 w-full mt-4 md:w-auto bg-orange-400 py-2 px-7 rounded-lg border-2 border-orange-500 font-semibold hover:text-white hover:scale-95 duration-500'>Salvar</button>

                        <input
                            type="text"
                            name="siglaImposto"
                            onChange={valorInput}
                            value={data.siglaImposto}
                            className="col-span-1 border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 "
                        />

                        <input
                            type="number"
                            name="porcentagemImposto"
                            onChange={valorInput}
                            value={data.porcentagemImposto}
                            className="col-span-1 border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 "
                        />

                        <select
                            id="tipoImposto"
                            name="tipoImposto"
                            onChange={valorInput}
                            value={data.tipoImposto}
                            className="border-[1px] border-[#848484] rounded-md px-3 py-[0.3em]">
                            <option value=""></option>
                            <option value="NF">Notas Fiscais</option>
                            <option value="Salario">Salário</option>
                            <option value="Todos">Todos</option>
                        </select>

                    </div>
                </Form>
            </div>
        </>
    )
}

export const MostrarImposto = () => {
    const [imposto, setImposto] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3030/impostos')
            .then((response) => {
                setImposto(response.data.data);
            }).catch((err) => {
                toast.error(err);
            });
    }, []);

    // Filtrar impostos do tipo 'NF'
    const impostoNotaFiscal = imposto.filter(imposto => imposto.tipoImposto === 'NF');

    return (
        <>
            <div className='flex flex-col justify-start h-full w-full'>
                <h1 className='font-semibold w-full h-auto flex justify-center items-center text-3xl'>Impostos</h1>
                {impostoNotaFiscal.map(imposto => (
                    <>
                        <div className='h-full w-full mt-3'>
                           <H1>{imposto.siglaImposto}</H1> 
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

