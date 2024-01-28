import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Form = styled.form`
height: 100%;
width: 100%;
padding-left: 1em;
padding-right: 1em;
padding-bottom: 1em;
padding-top: 1em;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: start;
flex-direction: row;
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

const H2 = styled.h2`
width: auto;
font-weight: 600;
margin-top: 5px;
text-align: center;
`
const Td = styled.td`
border-bottom: 2px solid #d1d5db;
`
const Input = styled.input`
width: 100%;
border: 2px solid #d1d5db;
border-radius: 4px;
max-width: 40em;
padding-left: 8px;
`

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

                <nav className='flex flex-col max-w-[40em] mt-[2em]' >
                    <div className='grid grid-cols-4 gap-x-2'>
                        <H1 className='col-span-3'>Nome*</H1>

                        <H1 className='col-span-1'>Sigla*</H1>

                        <Input
                            type="text"
                            name="nameEmpresa"
                            onChange={valorInput}
                            value={data.nameEmpresa}
                            className="col-span-3 " />

                        <Input
                            type="text"
                            name="siglaEmpresa"
                            onChange={valorInput}
                            value={data.siglaEmpresa}
                            className="col-span-1" />

                    </div>

                    <H1>CNPJ*</H1>
                    <Input
                        type="text"
                        maxlength="18"
                        name="cnpjEmpresa"
                        onChange={valorInput}
                        value={data.cnpjEmpresa}
                        className="" />

                    <div className=' grid grid-cols-4 gap-x-2'>
                        <H1 className='col-span-2'>Responsável</H1>
                        <H1 className='col-span-2'>Email</H1>

                        <Input
                            type="text"
                            name="responsavelEmpresa"
                            onChange={valorInput}
                            value={data.responsavelEmpresa}
                            className="col-span-2" />

                        <Input
                            type="text"
                            name="emailEmpresa"
                            onChange={valorInput}
                            value={data.emailEmpresa}
                            className="col-span-2" />

                    </div>

                    <div className='grid grid-cols-4 gap-x-2'>
                        <H1 className='col-span-1'>CEP*</H1>
                        <H1 className='col-span-3'>Lougradouro*</H1>

                        <Input
                            maxlength="9"
                            type="text"
                            name="cepEmpresa"
                            onChange={valorInput}
                            value={data.cepEmpresa}
                            className="col-span-1" />

                        <Input
                            type="text"
                            name="ruaEmpresa"
                            onChange={valorInput}
                            value={data.ruaEmpresa}
                            className="col-span-3" />
                    </div>

                    <div className='grid grid-cols-5 gap-x-2'>
                        <H1 className='col-span-1'>Número*</H1>
                        <H1 className='col-span-4'>Bairro*</H1>

                        <Input
                            type="number"
                            name="numeroEmpresa"
                            onChange={valorInput}
                            value={data.numeroEmpresa}
                            className="col-span-1" />

                        <Input
                            type="text"
                            name="bairroEmpresa"
                            onChange={valorInput}
                            value={data.bairroEmpresa}
                            className="col-span-4" />

                    </div>

                    <H1>Complemento</H1>
                    <Input
                        type="text"
                        name="complEmpresa"
                        onChange={valorInput}
                        value={data.complEmpresa}
                        />

                    <H1>Cidade</H1>
                    <Input
                        type="text"
                        name="cidadeEmpresa"
                        onChange={valorInput}
                        value={data.cidadeEmpresa}
                         />

                    <div className='flex justify-between items-start md:items-end w-full mt-3 flex-col  md:flex-row gap-6 max-w-[40em] ' >
                        <dir className="flex flex-col">
                            <H1 className='text-xl'>Campos Adcionais</H1>
                            <div className='flex gap-6 flex-wrap'>
                                <nav>
                                    <H1>Data de Contrato</H1>
                                    <Input
                                        type="date"
                                        name="cadastroEmpresa"
                                        onChange={valorInput}
                                        value={data.cadastroEmpresa}
                                        />
                                </nav>
                                <nav className='flex flex-col justify-end'>
                                    <H1>Situação*</H1>
                                    <select
                                        id="situacaoEmpresa"
                                        name="situacaoEmpresa"
                                        onChange={valorInput}
                                        value={data.situacaoEmpresa}
                                        className="border-2 border-gray-300 rounded-[5px] px-2 py-[0.2em]">
                                        <option></option>
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

                        <Input
                            type="text"
                            name="siglaImposto"
                            onChange={valorInput}
                            value={data.siglaImposto}
                            className="col-span-1 "
                        />

                        <Input
                            type="number"
                            name="porcentagemImposto"
                            onChange={valorInput}
                            value={data.porcentagemImposto}
                            className="col-span-1"
                        />

                        <select
                            id="tipoImposto"
                            name="tipoImposto"
                            onChange={valorInput}
                            value={data.tipoImposto}
                            className="border-2 border-gray-300 rounded-[5px] px-2 py-[0.2em]">
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
    const impostoSalario = imposto.filter(imposto => imposto.tipoImposto === 'Salario');
    const impostoTodos = imposto.filter(imposto => imposto.tipoImposto === 'Todos');

    return (
        <>
            <div className='flex flex-col justify-start h-full w-full '>
                <h1 className='font-semibold w-full h-auto flex justify-center items-center text-3xl mb-5'>Impostos</h1>

                <table class="table-auto rounded-[10px] bg-gray-200">
                    <thead className='border-b-2 border-gray-500'>
                        <tr >
                            <th>Tipo</th>
                            <th>Sigla</th>
                            <th>Porcentagem</th>
                            <th>Data de Cadastro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {impostoNotaFiscal.map(imposto => (
                            <tr>
                                <Td><H2>Notas Fiscais</H2></Td>
                                <Td><H2>{imposto.siglaImposto}</H2></Td>
                                <Td><H2>{imposto.porcentagemImposto * 100}%</H2></Td>
                                <Td><H2>{imposto.createdAt}</H2></Td>
                            </tr>
                        ))}

                        {impostoSalario.map(imposto => (
                            <tr>
                                <Td><H2>Salário</H2></Td>
                                <Td><H2>{imposto.siglaImposto}</H2></Td>
                                <Td><H2>{imposto.porcentagemImposto * 100}%</H2></Td>
                                <Td><H2>{imposto.createdAt}</H2></Td>
                            </tr>
                        ))}
                        {impostoTodos.map(imposto => (
                            <tr>
                                <Td><H2>Todos</H2></Td>
                                <Td><H2>{imposto.siglaImposto}</H2></Td>
                                <Td><H2>{imposto.porcentagemImposto * 100}%</H2></Td>
                                <Td><H2>{imposto.createdAt}</H2></Td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}

export const TabelaAddFuncionario = () => {
    const [empresas, setEmpresas] = useState([]);

    const [data, setData] = useState({
        nameFucionario: '',
        generoFucionario: '',
        cpfFucionario: '',
        rgFucionario: '',
        estadoCivilFucionario: '',
        conjugueFucionario: '',
        cpfConjugueFucionario: '',
        paiFucionario: '',
        maeFucionario: '',
        ruaFucionario: '',
        numFucionario: '',
        municipioFucionario: '',
        estadoFucionario: '',
        bairroFucionario: '',
        complFucionario: '',
        ctpsFucionario: '',
        titEleitorFucionario: '',
        dataAdmicaoFucionario: '',
        pisFucionario: '',
        salarioFucionario: '',
        funcaoFuncionario: '',
        horasTFucionario: '',
        CadastroEmprFuncionario: ''
    });

    // Receber os dados dos campos do formulário
    const valorInput = e => {
        let valor = e.target.value;
        if (e.target.name === "cpfFucionario") {
            valor = valor.replace(/\D/g, "");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else if (e.target.name === "cpfConjugueFucionario") {
            valor = valor.replace(/\D/g, "");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else if (e.target.name === "rgFucionario") {
            valor = valor.replace(/\D/g, "");
            valor = valor.replace(/(\d{2})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else if (e.target.name === "ctpsFucionario") {
            valor = valor.replace(/\D/g, "");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else if (e.target.name === "pisFucionario") {
            valor = valor.replace(/\D/g, "");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{5})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{2})(\d{1,2})$/, "$1-$2");
        } else if (e.target.name === "titEleitorFucionario") {
            valor = valor.replace(/\D/g, "");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else if (e.target.name === "salarioFucionario") {
            valor = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
        setData({ ...data, [e.target.name]: valor });
    };



    const sendFuncionario = async (e) => {

        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        };

        if (data.nameFucionario === '' && data.cpfFucionario === '' && data.rgFucionario === '') {
            toast.error('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        axios.post('http://localhost:3030/Funcionario', data, headers)
            .then((response) => {
                toast.success(response.data.message);
                setData({
                    nameFucionario: '',
                    generoFucionario: '',
                    cpfFucionario: '',
                    rgFucionario: '',
                    estadoCivilFucionario: '',
                    conjugueFucionario: '',
                    cpfConjugueFucionario: '',
                    paiFucionario: '',
                    maeFucionario: '',
                    ruaFucionario: '',
                    numFucionario: '',
                    municipioFucionario: '',
                    estadoFucionario: '',
                    bairroFucionario: '',
                    complFucionario: '',
                    ctpsFucionario: '',
                    titEleitorFucionario: '',
                    dataAdmicaoFucionario: '',
                    pisFucionario: '',
                    salarioFucionario: '',
                    funcaoFuncionario: '',
                    horasTFucionario: '',
                    CadastroEmprFuncionario: ''
                });
            }).catch((err) => {
                toast.info(err.response.data.message);
            });
    }

    useEffect(() => {
        axios.get('http://localhost:3030/empresa')
            .then((response) => {
                setEmpresas(response.data.data);
            }).catch((err) => {
                console.error(err);
            });
    }, []);


    return (
        <>
            <Form onSubmit={sendFuncionario} >
                <h1 className='font-semibold w-full flex justify-center items-center text-3xl'>Adcionar Funcionario</h1>

                <nav className='flex flex-col max-w-[40em] justify-center mt-[2em]' >
                    <div className=' grid grid-cols-4 gap-x-2'>
                        <H1 className='col-span-3'>Nome*</H1>
                        <H1 className='col-span-1'>Gênero*</H1>

                        <Input
                            type="text"
                            name="nameFucionario"
                            onChange={valorInput}
                            value={data.nameFucionario}
                            className="col-span-3 "
                        />

                        <select
                            id="generoFucionario"
                            name="generoFucionario"
                            onChange={valorInput}
                            value={data.generoFucionario}
                            className="col-span-1 border-2 border-gray-300 rounded-md px-2 ">
                            <option></option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                        </select>

                    </div>

                    <div className=' grid grid-cols-3 gap-x-2'>
                        <H1 className='col-span-1'>CPF*</H1>
                        <H1 className='col-span-1'>RG*</H1>
                        <H1 className='col-span-1'>Estado Civil*</H1>

                        <Input
                            type="text"
                            maxlength="14"
                            name="cpfFucionario"
                            onChange={valorInput}
                            value={data.cpfFucionario}
                            className="col-span-1"
                        />

                        <Input
                            type="text"
                            maxlength="12"
                            name="rgFucionario"
                            onChange={valorInput}
                            value={data.rgFucionario}
                            className="col-span-1"
                        />

                        <select
                            id="estadoCivilFucionario"
                            name="estadoCivilFucionario"
                            onChange={valorInput}
                            value={data.estadoCivilFucionario}
                            className="border-2 border-gray-300 rounded-md px-2 ">
                            <option></option>
                            <option value="Casado">Casado</option>
                            <option value="Solteiro">Solteiro</option>
                        </select>
                    </div>


                    <div className=' grid grid-cols-4 gap-x-2'>
                        <H1 className='col-span-3'>Cônjugue</H1>
                        <H1 className='col-span-1'>CPF Cônjugue</H1>

                        <Input
                            type="text"
                            name="conjugueFucionario"
                            onChange={valorInput}
                            value={data.conjugueFucionario}
                            className="col-span-3 "
                        />

                        <Input
                            maxlength="14"
                            type="text"
                            name="cpfConjugueFucionario"
                            onChange={valorInput}
                            value={data.cpfConjugueFucionario}
                            className="col-span-1 "
                        />

                    </div>

                    <div className='grid grid-cols-4 gap-x-2'>
                        <H1 className='col-span-4'>Pai*</H1>

                        <Input
                            maxlength="9"
                            type="text"
                            name="paiFucionario"
                            onChange={valorInput}
                            value={data.paiFucionario}
                            className="col-span-4 "
                        />

                        <H1 className='col-span-4'>Mãe*</H1>

                        <Input
                            maxlength="9"
                            type="text"
                            name="maeFucionario"
                            onChange={valorInput}
                            value={data.maeFucionario}
                            className="col-span-4 "
                        />

                    </div>

                    {/* Cadastro de endereço*/}
                    <div className='grid grid-cols-4 gap-x-2'>
                        <H1 className='col-span-3'>Rua*</H1>
                        <H1 className='col-span-1'>Numero*</H1>

                        <Input
                            type="text"
                            name="ruaFucionario"
                            onChange={valorInput}
                            value={data.ruaFucionario}
                            className="col-span-3 "
                        />

                        <Input
                            type="text"
                            name="numFucionario"
                            onChange={valorInput}
                            value={data.numFucionario}
                            className="col-span-1 "
                        />

                        <H1 className='col-span-2'>Munícipio*</H1>
                        <H1 className='col-span-2'>Estado*</H1>

                        <Input
                            type="text"
                            name="municipioFucionario"
                            onChange={valorInput}
                            value={data.municipioFucionario}
                            className="col-span-2 "
                        />

                        <Input
                            type="text"
                            name="estadoFucionario"
                            onChange={valorInput}
                            value={data.estadoFucionario}
                            className="col-span-2 "
                        />

                        <H1 className='col-span-2'>Bairro*</H1>
                        <H1 className='col-span-2'>Complemento*</H1>

                        <Input
                            type="text"
                            name="bairroFucionario"
                            onChange={valorInput}
                            value={data.bairroFucionario}
                            className="col-span-2 "
                        />

                        <Input
                            type="text"
                            name="complFucionario"
                            onChange={valorInput}
                            value={data.complFucionario}
                            className="col-span-2"
                        />
                    </div>

                    {/* Cadastro de Documentos*/}
                    <div className='grid grid-cols-4 gap-x-2'>
                        <H1 className='col-span-4'>CTPS*</H1>

                        <Input
                            maxlength="14"
                            type="text"
                            name="ctpsFucionario"
                            onChange={valorInput}
                            value={data.ctpsFucionario}
                            className="col-span-4 "
                        />

                        <H1 className='col-span-2'>TIT.Eleitor*</H1>
                        <H1 className='col-span-2'>Data Admissão*</H1>

                        <Input
                            maxlength="14"
                            type="text"
                            name="titEleitorFucionario"
                            onChange={valorInput}
                            value={data.titEleitorFucionario}
                            className="col-span-2 "
                        />

                        <Input
                            type="date"
                            name="dataAdmicaoFucionario"
                            onChange={valorInput}
                            value={data.dataAdmicaoFucionario}
                            className="col-span-2 "
                        />

                        <H1 className='col-span-2'>PIS*</H1>
                        <H1 className='col-span-2'>Salário*</H1>

                        <Input
                            maxlength="14"
                            type="text"
                            name="pisFucionario"
                            onChange={valorInput}
                            value={data.pisFucionario}
                            className="col-span-2 "
                        />

                        <Input
                            type="text"
                            name="salarioFucionario"
                            onChange={valorInput}
                            value={data.salarioFucionario}
                            className="col-span-2"
                        />
                    </div>

                    <div className='grid grid-cols-5 gap-x-2'>
                        <H1 className='col-span-1'>Função*</H1>
                        <H1 className='col-span-2'>Horário de Trabalho*</H1>
                        <H1 className='col-span-2'>Cadastro Empresa</H1>

                        <select
                            id="funcaoFuncionario"
                            name="funcaoFuncionario"
                            onChange={valorInput}
                            value={data.funcaoFuncionario}
                            className="col-span-1 border-2 border-gray-300 rounded-md  py-[0.2em]">
                            <option></option>
                            <option value="Pedreiro">Pedreiro</option>
                            <option value="Pintor">Pintor</option>
                            <option value="Ajudante">Ajudante</option>
                            <option value="Encarregado">Encarregado</option>
                            <option value="Soldador">Soldador</option>
                            <option value="Meio OFF.Pedreiro">Meio OFF.Pedreiro</option>
                            <option value="Meio OFF.Pintor">Meio OFF.Pintor</option>
                            <option value="Engenheiro">Engenheiro</option>
                            <option value="Tecnico Segurança">Técnico Segurança</option>
                        </select>

                        <select
                            id="horasTFucionario"
                            name="horasTFucionario"
                            onChange={valorInput}
                            value={data.horasTFucionario}
                            className="col-span-2 border-2 border-gray-300 rounded-md px-3 py-[0.2em]">
                            <option></option>
                            <option value="7:00h ás 16:00h">7:00h ás 16:00h</option>
                        </select>

                        <select
                            id="CadastroEmprFuncionario"
                            name="CadastroEmprFuncionario"
                            onChange={valorInput}
                            value={data.CadastroEmprFuncionario}
                            className="col-span-2 border-2 border-gray-300 rounded-md px-3 py-[0.2em]">
                            <option></option>
                            {empresas.map(empresa => (
                                <>
                                    <option value={empresa.nameEmpresa}>{empresa.nameEmpresa}</option>
                                </>

                            ))}
                        </select>

                    </div>

                    <button type='submit' className='w-full mt-4 bg-orange-400 py-2 px-7 rounded-lg border-2 border-orange-500 font-semibold hover:text-white hover:scale-95 duration-500 mb-3'>Salvar</button>
                </nav>
            </Form>
        </>
    )
}
