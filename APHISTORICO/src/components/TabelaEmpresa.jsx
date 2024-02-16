import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../global/Global';

const Form = styled.form`
height: 100%;
width: 100%;
padding-left: 1em;
padding-right: 1em;
padding-bottom: 1em;
padding-top: 1em;
gap: 3em;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-content: start;
flex-direction: row;
`;

const H1 = styled.h1`
font-weight: 600;
margin-top: 5px;
`;
const Select = styled.select`
width: 100%;
border: 2px solid #d1d5db;
border-radius: 4px;
max-width: 40em;
padding-left: 8px;
padding: 4px;
`

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
padding-left: 8px;
`
const Header = styled.header`
width: 100%;
border-radius: 20px;
background: #f97316;
box-shadow: inset 5px -5px 10px #9f4a0e,
            inset -5px 5px 10px #ff9c1e;
font-weight: 600;
font-size: xx-large;
display: flex;
justify-content: center;
padding:5px;
`

const Button = styled.button`
width: auto;
border-radius: 20px;
background: #f97316;
box-shadow: inset 5px -5px 10px #9f4a0e,
            inset -5px 5px 10px #ff9c1e;
font-weight: 600;
font-size: x-large;
display: flex;
justify-content: center;
padding: 7px;
padding-left: 3em;
padding-right: 3em;
transition-duration: 200ms;

&:hover{
    cursor: pointer;
    color: white;
    scale: 97%;
}
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

        if (data.cepEmpresa === '' || data.cnpjEmpresa === '' || data.cadastroEmpresa === '' || data.nameEmpresa === '') {
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
                <Header>Adcionar Empresa</Header>

                <section className='grid grid-cols-4 gap-x-2' >

                    <H1 className='col-span-3'>Nome*</H1>

                    <H1 className='col-span-1'>Sigla*</H1>

                    <Input
                        type="text"
                        name="nameEmpresa"
                        onChange={valorInput}
                        value={data.nameEmpresa}
                        className="col-span-3" />

                    <Input
                        type="text"
                        name="siglaEmpresa"
                        onChange={valorInput}
                        value={data.siglaEmpresa}
                        className="col-span-1" />

                    <H1 className='col-span-4'>CNPJ*</H1>
                    <Input
                        type="text"
                        maxLength="18"
                        name="cnpjEmpresa"
                        onChange={valorInput}
                        value={data.cnpjEmpresa}
                        className="col-span-4" />

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

                    <H1 className='col-span-1'>CEP*</H1>
                    <H1 className='col-span-3'>Lougradouro*</H1>

                    <Input
                        maxLength="9"
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

                    <H1 className='col-span-1'>Número*</H1>
                    <H1 className='col-span-3'>Bairro*</H1>

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
                        className="col-span-3" />

                    <H1 className='col-span-2'>Complemento</H1>
                    <H1 className="col-span-2">Cidade</H1>

                    <Input
                        type="text"
                        name="complEmpresa"
                        onChange={valorInput}
                        value={data.complEmpresa}
                        className='col-span-2'
                    />

                    <Input
                        type="text"
                        name="cidadeEmpresa"
                        onChange={valorInput}
                        value={data.cidadeEmpresa}
                        className='col-span-2'
                    />

                    <H1 className='col-span-1'>Data de Contrato</H1>
                    <H1 className='col-span-3'>Situação*</H1>
                    <Input
                        type="date"
                        name="cadastroEmpresa"
                        onChange={valorInput}
                        value={data.cadastroEmpresa}
                        className='col-span-1'
                    />


                    <select
                        id="situacaoEmpresa"
                        name="situacaoEmpresa"
                        onChange={valorInput}
                        value={data.situacaoEmpresa}
                        className="col-span-1 border-2 border-gray-300 rounded-[5px] px-2 py-[0.2em]">
                        <option></option>
                        <option value="Particular">Particular</option>
                        <option value="Contrato">Contrato</option>
                    </select>

                </section>

                <section className='w-full flex justify-end'>
                    <Button type='submit' className=''>Salvar</Button>
                </section>

            </Form >
        </>
    )
}

export const TabelaAddNota = () => {

    const { empresa, kinays, impostos, pedido } = useGlobalContext();

    const [data, setData] = useState({
        numeroPedidoNF: '',
        numeroNotaNF: '',
        idEmpresa: '',
        nomeEmpresaNF: '',
        cnpjEmpresaNF: '',
        retidoNF: '',
        numeroKinayNF: '',
        KinayNF: '',
        porcentagemKinayNF: '',
        descricaoServNF: '',
        ImpostoNF: '',
        totalImpostoNF: '',
        valorNF: '',
        valorImpostoNF: '',
        valorReceberNF: '',
        valorRecebidoNF: null,
        situacaoNF: '',
        prazoPagamentoNF: '',
        dataNF: '',
        observacaoNF: ''
    });

    const calcularImposto = () => {
        const CNAE = parseFloat(data.porcentagemKinayNF.replace('%', '')) / 100;
        const Imposto = parseFloat(data.ImpostoNF.replace('%', '')) / 100;
        const valorImpostoCNAE = CNAE * data.valorNF;
        const valorImposto = Imposto * data.valorNF;
        const valorImpostocalc = valorImpostoCNAE + valorImposto;
        const valorReceber = data.valorNF - valorImpostocalc;

        const totalImposto = CNAE * 100 + Imposto * 100

        setData({ ...data, valorImpostoNF: valorImpostocalc, valorReceberNF: valorReceber, totalImpostoNF: totalImposto });
    };

    const valorInput = (event) => {
        const { name, value } = event.target;

        if (name === "nomeEmpresaNF") {
            const parts = value.split(' - ');
            const idEmpresa = parts[0];
            const NomeEmpresa = parts[1];
            const CNPJEmpresa = parts[2];

            setData({ ...data, idEmpresa: idEmpresa, nomeEmpresaNF: NomeEmpresa, cnpjEmpresaNF: CNPJEmpresa });
        } else if (name === "numeroPedidoNF") {
            const parts = value.split(' - ');
            const NumeroPDD = parts[0];

            setData({ ...data, numeroPedidoNF: NumeroPDD });
        } else if (name === "KinayNF") {
            const parts = value.split(' - ');
            const numeroKinay = parts[0];
            const descricaoKinay = parts[1];
            const porcentagemKinay = parts[2];

            setData({ ...data, numeroKinayNF: numeroKinay, KinayNF: descricaoKinay, porcentagemKinayNF: porcentagemKinay });
        } else if (name === "ImpostoNF") {
            const parts = value.split(' - ');
            const porcentagemImposto = parts[1];

            setData({ ...data, ImpostoNF: porcentagemImposto });
        } else if (name === "situacaoNF" && value === "Antecipada") {

            const calculorAntercipa = data.valorReceberNF * 0.02;
            const valorRecebido = data.valorReceberNF - calculorAntercipa

            setData({ ...data, valorRecebidoNF: valorRecebido, situacaoNF: 'Antecipada' });
        } else if (name === "situacaoNF" && value === "Recebida") {

            setData({ ...data, valorRecebidoNF: data.valorReceberNF, situacaoNF: 'Recebida' });
        } else {
            setData({ ...data, [name]: value });
        }

    };

    const sendNF = async (e) => {

        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        };

        if (data.numeroPedidoNF === '' || data.nomeEmpresaNF === '' || data.valorNF === '') {
            toast.error('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        axios.post('http://localhost:3030/nota', data, headers)
            .then((response) => {
                toast.success(response.data.message);
                console.log(data)
                setData({
                    numeroPedidoNF: '',
                    numeroNotaNF: '',
                    idEmpresa: '',
                    nomeEmpresaNF: '',
                    cnpjEmpresaNF: '',
                    retidoNF: '',
                    numeroKinayNF: '',
                    KinayNF: '',
                    porcentagemKinayNF: '',
                    descricaoServNF: '',
                    ImpostoNF: '',
                    totalImpostoNF: '',
                    valorNF: '',
                    valorImpostoNF: '',
                    valorReceberNF: '',
                    valorRecebidoNF: null,
                    situacaoNF: '',
                    prazoPagamentoNF: '',
                    dataNF: '',
                    observacaoNF: ''
                });
            }).catch((err) => {
                toast.info(err.response.data.message);
            });
    }

    return (
        <>
            <Form onSubmit={sendNF} >
                <Header>Adcionar Nota Fiscal</Header>

                <nav >
                    <div className=' grid grid-cols-4 gap-x-2'>
                        <H1 className='col-span-1'>Numero Nota*</H1>
                        <H1 className='col-span-1'>Numero Pedido*</H1>
                        <p className='col-span-2'></p>
                        <Input
                            type="number"
                            name="numeroNotaNF"
                            onChange={valorInput}
                            value={data.numeroNotaNF}
                            className="col-span-1 "
                        />

                        <label className='col-span-1'>
                            <Input
                                type='text'
                                list='PEDIDO'
                                name="numeroPedidoNF"
                                onChange={valorInput}
                                value={data.numeroPedidoNF}
                            />

                            <datalist id='PEDIDO'>
                                {pedido.map(pedido => (
                                    <option key={pedido.id} value={`${pedido.numeroPDD} - ${pedido.nomePDD}`}></option>
                                ))}
                            </datalist>
                        </label>

                        <p className='col-span-2'></p>

                        <H1 className='col-span-2'>Nome da Empresa*</H1>
                        <H1 className='col-span-2'>CNPJ*</H1>

                        <label className='col-span-2'>
                            <Input
                                type='text'
                                list='nameE'
                                name="nomeEmpresaNF"
                                onChange={valorInput}
                                value={data.nomeEmpresaNF}
                            />

                            <datalist id='nameE'>
                                {empresa.map(empresa => (
                                    <option key={empresa.id} value={`${empresa.id} - ${empresa.nameEmpresa} - ${empresa.cnpjEmpresa}`}></option>
                                ))}
                            </datalist>
                        </label>

                        <Input
                            type="text"
                            maxLength="18"
                            name="cnpjEmpresaNF"
                            onChange={valorInput}
                            value={data.cnpjEmpresaNF}
                            className="col-span-2"
                        />

                        <Input
                            type="text"
                            name="idEmpresa"
                            onChange={valorInput}
                            value={data.idEmpresa}
                            className="hidden"
                        />

                        <H1 className='col-span-4'>Local Retido*</H1>


                        <label className='col-span-1'>
                            <Input
                                type="text"
                                list='Retido'
                                name="retidoNF"
                                onChange={valorInput}
                                value={data.retidoNF}
                            />
                            <datalist id='Retido'>
                                <option value="Retida em Outro Munic." ></option>
                                <option value="Tributada" ></option>
                            </datalist>
                        </label>

                        <p className='col-span-3'></p>

                        <H1 className='col-span-1'>Numero(CNAE)</H1>
                        <H1 className='col-span-3'>Atividade (CNAE)</H1>


                        <Input
                            type="number"
                            name="numeroKinayNF"
                            onChange={valorInput}
                            value={data.numeroKinayNF}
                        />


                        <label className='col-span-3 flex flex-row'>
                            <Input
                                type="text"
                                list='CNAE'
                                name="KinayNF"
                                onChange={valorInput}
                                value={data.KinayNF}
                            />
                            <datalist id='CNAE'>
                                {kinays.map(kinay => (
                                    <option key={kinay.id} value={`${kinay.numeroKinay} - ${kinay.descricaoKinay} - ${kinay.porcentagemKinay * 100}%`}></option>
                                ))}
                            </datalist>
                        </label>

                        <H1 className='col-span-1'>Porcentagem(CNAE)</H1>
                        <H1 className='col-span-3'>Imposto</H1>

                        <Input
                            type='text'
                            name="porcentagemKinayNF"
                            onChange={valorInput}
                            value={data.porcentagemKinayNF}
                        />

                        <label className='col-span-1 flex flex-row'>
                            <Input
                                type="text"
                                list='IMPST'
                                name="ImpostoNF"
                                onChange={valorInput}
                                value={data.ImpostoNF}
                            />

                            <datalist id='IMPST'>
                                {impostos.map(imposto => (
                                    <option key={imposto.id} value={`${imposto.siglaImposto} - ${imposto.porcentagemImposto * 100}%`}></option>
                                ))}
                            </datalist>
                        </label>
                        <p className='col-span-2'></p>

                        <H1 className='col-span-1'>Valor Total*</H1>
                        <H1 className='col-span-1'>Valor Imposto</H1>
                        <H1 className='col-span-2'>Valor á Receber</H1>

                        <Input
                            type='text'
                            name="valorNF"
                            onChange={valorInput}
                            onBlur={calcularImposto}
                            value={data.valorNF}
                        />

                        <Input
                            maxLength="10"
                            type='text'
                            name="valorImpostoNF"
                            onChange={valorInput}
                            value={data.valorImpostoNF}
                        />

                        <Input
                            maxLength="10"
                            type='text'
                            name="valorReceberNF"
                            onChange={valorInput}
                            value={data.valorReceberNF}
                        />

                        <H1 className='col-span-4'>Descrição do Serviço</H1>
                        <textarea
                            type="text"
                            name="descricaoServNF"
                            onChange={valorInput}
                            value={data.descricaoServNF}
                            rows="3"
                            className='col-span-4 border-2 border-gray-300 rounded-md px-2'>

                        </textarea>


                        <H1 className='col-span-1'>Situação</H1>
                        <H1 className='col-span-3'>Data de Lançamento</H1>

                        <Select
                            name="situacaoNF"
                            onChange={valorInput}
                            value={data.situacaoNF}>
                            <option ></option>
                            <option value="Em Análise">Em Análise</option>
                            <option value="Recebida">Recebida</option>
                            <option value="Antecipada">Antecipada</option>
                        </Select>

                        <Input
                                type="date"
                                name="dataNF"
                                onChange={valorInput}
                                value={data.dataNFNF}
                            />

                        <p className='col-span-2'></p>

                        <H1 className='col-span-4'>Prazo de pagamento*</H1>

                        <label className='col-span-2'>
                            <Input
                                type="text"
                                list='PRAPAG'
                                name="prazoPagamentoNF"
                                onChange={valorInput}
                                value={data.prazoPagamentoNF}
                            />
                            <datalist id='PRAPAG'>
                                <option value="90 Dias" ></option>
                                <option value="45 Dias" ></option>
                                <option value="15 Dias" ></option>
                                <option value="7 Dias" ></option>
                            </datalist>
                        </label>
                        <H1 className='col-span-4'>Observação</H1>
                        <textarea
                            type="text"
                            name="observacaoNF"
                            onChange={valorInput}
                            value={data.observacaoNF}
                            rows="3"
                            className='col-span-4 border-2 border-gray-300 rounded-md px-2'>

                        </textarea>
                    </div>

                    <section className='w-full flex justify-end my-4'>
                        <Button type='submit' className=''>Salvar</Button>
                    </section>

                </nav>
            </Form >
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

        if (data.siglaImposto === '' || data.porcentagemImposto === '') {
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
                <Header>Adcionar Impostos</Header>
                <Form onSubmit={sendImposto}>

                    <div className='grid grid-cols-3 grid-rows-1 items-start gap-x-4 mt-5 '>
                        <H1 className='col-span-1'>Sigla</H1>
                        <H1 className='col-span-1'>Porcentagem</H1>
                        <H1 className='col-span-1'>Atividade</H1>

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
                    <section className='w-full flex justify-end'>
                        <Button type='submit' className=''>Salvar</Button>
                    </section>
                </Form>
            </div>
        </>
    )
}

export const TabelaAddKinay = () => {

    const [data, setData] = useState({
        numeroKinay: '',
        descricaoKinay: '',
        porcentagemKinay: ''
    });

    const valorInput = e => {
        let valor = e.target.value;
        setData({ ...data, [e.target.name]: valor });
    };


    const sendKinay = async (e) => {

        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        };

        if (data.numeroKinay === '' || data.porcentagemKinay === '') {
            toast.error('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const dataParaEnviar = { ...data, porcentagemKinay: data.porcentagemKinay / 100 };

        axios.post('http://localhost:3030/kinay', dataParaEnviar, headers)
            .then((response) => {
                toast.success(response.data.message);
                setData({
                    numeroKinay: '',
                    descricaoKinay: '',
                    porcentagemKinay: ''
                });
            }).catch((err) => {
                toast.info(err.response.data.message);
            });
    }

    return (
        <>
            <div className='flex flex-col h-full w-full'>
                <Header>Adcionar Kinay</Header>
                <Form onSubmit={sendKinay}>
                    <div className='grid grid-cols-6 grid-rows-1 items-start gap-x-4 mt-5 '>
                        <H1 className='col-span-1'>Número</H1>
                        <H1 className='col-span-4'>Descrição</H1>
                        <H1 className='col-span-1'>Porcentagem</H1>

                        <Input
                            type="number"
                            name="numeroKinay"
                            onChange={valorInput}
                            value={data.numeroKinay}
                            className="col-span-1 "
                        />

                        <Input
                            type="text"
                            name="descricaoKinay"
                            onChange={valorInput}
                            value={data.descricaoKinay}
                            className="col-span-4"
                        />

                        <Input
                            type="number"
                            name="porcentagemKinay"
                            onChange={valorInput}
                            value={data.porcentagemKinay}
                            className="col-span-1"
                        />


                        <section className='col-span-6 w-full flex justify-end py-4'>
                            <Button type='submit' className=''>Salvar</Button>
                        </section>
                    </div>


                </Form>
            </div>
        </>
    )
}

export const MostrarImposto = () => {
    const { impostos } = useGlobalContext();

    // Filtrar impostos do tipo 'NF'
    const impostoNotaFiscal = impostos.filter(imposto => imposto.tipoImposto === 'NF');
    const impostoSalario = impostos.filter(imposto => imposto.tipoImposto === 'Salario');
    const impostoTodos = impostos.filter(imposto => imposto.tipoImposto === 'Todos');

    return (
        <>
            <div className='flex flex-col justify-start h-full w-full '>
                <Header className='font-semibold w-full h-auto flex justify-center items-center text-3xl mb-5'>Impostos</Header>

                <table className="table-auto rounded-[10px] bg-gray-200">
                    <thead className='border-b-2 border-gray-500'>
                        <tr >
                            <th>Tipo</th>
                            <th>Sigla</th>
                            <th>Porcentagem</th>
                            <th>Data de Cadastro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {impostoNotaFiscal.map(imposto => {
                            let data = new Date(imposto.createdAt);
                            let opcoes = { year: 'numeric', month: '2-digit', day: '2-digit' };
                            let dataFormatada = data.toLocaleDateString('pt-BR', opcoes);
                            return (
                                <tr key={imposto.id}>
                                    <Td><H2>Notas Fiscais</H2></Td>
                                    <Td><H2>{imposto.siglaImposto}</H2></Td>
                                    <Td><H2>{imposto.porcentagemImposto * 100}%</H2></Td>
                                    <Td><H2>{dataFormatada}</H2></Td>
                                </tr>
                            )

                        })}

                        {impostoSalario.map(imposto => {
                            let data = new Date(imposto.createdAt);
                            let opcoes = { year: 'numeric', month: '2-digit', day: '2-digit' };
                            let dataFormatada = data.toLocaleDateString('pt-BR', opcoes);
                            return (
                                <tr key={imposto.id}>
                                    <Td><H2>Salário</H2></Td>
                                    <Td><H2>{imposto.siglaImposto}</H2></Td>
                                    <Td><H2>{imposto.porcentagemImposto * 100}%</H2></Td>
                                    <Td><H2>{dataFormatada}</H2></Td>
                                </tr>
                            )
                        })}

                        {impostoTodos.map(imposto => {
                            let data = new Date(imposto.createdAt);
                            let opcoes = { year: 'numeric', month: '2-digit', day: '2-digit' };
                            let dataFormatada = data.toLocaleDateString('pt-BR', opcoes);
                            return (
                                <tr key={imposto.id}>
                                    <Td><H2>Todos</H2></Td>
                                    <Td><H2>{imposto.siglaImposto}</H2></Td>
                                    <Td><H2>{imposto.porcentagemImposto * 100}%</H2></Td>
                                    <Td><H2>{dataFormatada}</H2></Td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </>
    )
}

export const TabelaAddFuncionario = () => {
    const { empresa } = useGlobalContext();

    const [data, setData] = useState({
        statuFucionario: 'Admitido',
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

        if (data.nameFucionario === '' || data.cpfFucionario === '' || data.rgFucionario === '') {
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

    return (
        <>
            <Form onSubmit={sendFuncionario} >
                <Header >Adcionar Funcionario</Header>

                <nav className='flex flex-col justify-center ' >

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
                            maxLength="14"
                            name="cpfFucionario"
                            onChange={valorInput}
                            value={data.cpfFucionario}
                            className="col-span-1"
                        />

                        <Input
                            type="text"
                            maxLength="12"
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
                            maxLength="14"
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
                            type="text"
                            name="paiFucionario"
                            onChange={valorInput}
                            value={data.paiFucionario}
                            className="col-span-4 "
                        />

                        <H1 className='col-span-4'>Mãe*</H1>

                        <Input
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
                    <div className='grid grid-cols-6 gap-x-2'>
                        <H1 className='col-span-2'>CTPS*</H1>
                        <H1 className='col-span-2'>TIT.Eleitor*</H1>
                        <H1 className='col-span-2'>PIS*</H1>

                        <Input
                            maxLength="14"
                            type="text"
                            name="ctpsFucionario"
                            onChange={valorInput}
                            value={data.ctpsFucionario}
                            className="col-span-2"
                        />

                        <Input
                            maxLength="14"
                            type="text"
                            name="titEleitorFucionario"
                            onChange={valorInput}
                            value={data.titEleitorFucionario}
                            className="col-span-2 "
                        />

                        <Input
                            maxLength="14"
                            type="text"
                            name="pisFucionario"
                            onChange={valorInput}
                            value={data.pisFucionario}
                            className="col-span-2 "
                        />


                        <H1 className='col-span-2'>Data Admissão*</H1>
                        <H1 className='col-span-3'>Salário*</H1>

                        <Input
                            type="date"
                            name="dataAdmicaoFucionario"
                            onChange={valorInput}
                            value={data.dataAdmicaoFucionario}
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
                            {empresa.map(empresa => (
                                <option key={empresa.id} value={empresa.nameEmpresa} >{empresa.nameEmpresa}</option>
                            ))}
                        </select>

                    </div>

                    <section className='w-full flex justify-end py-4'>
                        <Button type='submit' className=''>Salvar</Button>
                    </section>
                </nav>


            </Form>
        </>
    )
}

export const TabelaAddPedido = () => {
    const { empresa } = useGlobalContext();
    const [data, setData] = useState({
        numeroPDD: '',
        valorPDD: '',
        nomePDD: '',
        descricaoServPDD: '',
        empresaPDD: '',
        situacaoPDD: '',
        dataPDD: ''
    });

    const valorInput = e => {
        let valor = e.target.value;
        setData({ ...data, [e.target.name]: valor });
    };


    const sendPedido = async (e) => {

        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        };

        if (data.numeroPDD === '' || data.situacaoPDD === '') {
            toast.error('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        axios.post('http://localhost:3030/pedido', data, headers)
            .then((response) => {
                toast.success(response.data.message);
                setData({
                    numeroPDD: '',
                    valorPDD: '',
                    nomePDD: '',
                    descricaoServPDD: '',
                    empresaPDD: '',
                    situacaoPDD: '',
                    dataPDD: ''
                });
                console.log(data)
            }).catch((err) => {
                toast.info(err.response.data.message);
            });
    }

    return (
        <>
            <Form>
                <Header>Adcionar Pedido</Header>

                <form onSubmit={sendPedido}>
                    <div className='grid grid-cols-4 grid-rows-1 items-start gap-x-4 '>
                        <H1 className='col-span-1'>Numero*</H1>
                        <H1 className='col-span-1'>Valor Total</H1>
                        <H1 className='col-span-2'>Nome Brevê</H1>

                        <Input
                            type="number"
                            name="numeroPDD"
                            onChange={valorInput}
                            value={data.numeroPDD}
                            className="col-span-1 "
                        />

                        <Input
                            type="text"
                            name="valorPDD"
                            onChange={valorInput}
                            value={data.valorPDD}
                            className="col-span-1 "
                        />

                        <Input
                            type="text"
                            name="nomePDD"
                            onChange={valorInput}
                            value={data.nomePDD}
                            className="col-span-2"
                        />
                        <H1 className='col-span-1'>Descrição</H1>
                        <textarea
                            type="text"
                            name="descricaoServPDD"
                            onChange={valorInput}
                            value={data.descricaoServPDD}
                            rows="5"
                            className='col-span-4 border-2 border-gray-300 rounded-md px-2'>
                        </textarea>

                        <H1 className='col-span-2'>Empresa</H1>
                        <H1 className='col-span-1'>Situação</H1>
                        <H1 className='col-span-1'>Data Lançada</H1>

                        <Select
                            id="empresaPDD"
                            name="empresaPDD"
                            onChange={valorInput}
                            value={data.empresaPDD}
                            className="col-span-2 border-2 border-gray-300 rounded-[5px] px-2 py-[0.2em]">
                            <option></option>
                            {empresa.map((empresa) => (
                                <option key={empresa.id} value={empresa.nameEmpresa} >{empresa.nameEmpresa}</option>
                            ))}
                        </Select>

                        <Select
                            name="situacaoPDD"
                            onChange={valorInput}
                            value={data.situacaoPDD}>
                            <option ></option>
                            <option value="Criada">Criada</option>
                            <option value="Andamento">Em Andamento</option>
                            <option value="Finalizada">Finalizada</option>
                        </Select>

                        <Input
                            type="date"
                            name="dataPDD"
                            onChange={valorInput}
                            value={data.dataPDD}
                            className="col-span-1"
                        />

                    </div>
                    <section className='w-full flex justify-end py-4'>
                        <Button type='submit' className=''>Salvar</Button>
                    </section>
                </form>
            </Form>
        </>
    )
}
