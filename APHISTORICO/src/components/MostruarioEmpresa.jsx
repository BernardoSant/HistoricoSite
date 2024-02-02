import styled from 'styled-components';
import { useGlobalContext } from '../global/Global';
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
const Th = styled.th`

`;

const Input = styled.input`
width: 100%;
border: 2px solid #d1d5db;
border-radius: 4px;
max-width: 40em;
padding-left: 8px;
`
const Select = styled.select`
width: 100%;
border: 2px solid #d1d5db;
border-radius: 4px;
max-width: 40em;
padding-left: 8px;
padding: 4px;
`
const H1 = styled.h1`
font-weight: 600;
margin-top: 5px;
`;

const H2 = styled.h1`
font-weight: 500;
margin-top: 5px;
`;


export const MostruarioNota = ({ empresaId }) => {
    const { nota } = useGlobalContext();
    const notasDaEmpresa = nota.filter(nota => nota.idEmpresa === empresaId);

    const [notaSelecionada, setNotaSelecionada] = useState(null);

    const [data, setData] = useState({
        situacaoNF: '',
        valorRecebidoNF: ''
    });

    const valorInput = e => {
        let valor = e.target.value;
        let newData = { ...data, [e.target.name]: valor };

        if (e.target.name === "situacaoNF" && valor === "Antecipada") {
            // Supondo que "valorReceberNF" seja o valor a receber
            let calculorAntercipa = data.valorReceberNF * 0.02;
            let valorRecebido = data.valorReceberNF - calculorAntercipa
            newData = { ...newData, valorRecebidoNF: valorRecebido };
        } else if (e.target.name === "situacaoNF" && valor === "Recebida") {
            newData = { ...newData, valorRecebidoNF: data.valorReceberNF };
        }

        setData(newData);
    };

    useEffect(() => {
        if (notaSelecionada) {
            setData(prevData => ({ ...prevData, ...notaSelecionada }));
        }
    }, [notaSelecionada]);


    const updateNota = async (e) => {
        e.preventDefault();

        console.log(notaSelecionada); // Adicione esta linha

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        };

        axios.put('http://localhost:3030/nota/' + notaSelecionada.id, data, headers)
            .then((response) => {
                toast.success(response.data.message);
            }).catch((err) => {
                toast.info(err.response.data.message);
            });
    }



    return (
        <>
            <Div >
                {notaSelecionada ? (<>
                    <button onClick={() => setNotaSelecionada(null)} className='w-full flex justify-end'><h1 className='bg-red-600 w-auto font-bold p-1 px-3 rounded-full'>Voltar</h1></button>
                    <form onSubmit={updateNota}>

                        <div className=' grid grid-cols-4 gap-x-2'>
                            <H1 className='col-span-1'>Numero Pedido*</H1>
                            <p className='col-span-3'></p>

                            <H2>{String(data.numeroPedidoNF).padStart(8, '0')}</H2>

                            <p className='col-span-2'></p>

                            <H1 className='col-span-2'>Nome da Empresa*</H1>
                            <H1 className='col-span-2'>CNPJ*</H1>
                            <H2 className='col-span-2'>{data.nomeEmpresaNF}</H2>
                            <H2 className='col-span-2'>{data.cnpjEmpresaNF}</H2>

                            <H1 className='col-span-4'>Local Retido*</H1>
                            <H2 className='col-span-4'>{data.retidoNF}</H2>


                            <H1 className='col-span-1'>Numero(CNAE)</H1>
                            <H1 className='col-span-3'>Atividade (CNAE)</H1>

                            <H2>{data.numeroKinayNF}</H2>
                            <H2 className='col-span-3'>{data.KinayNF}</H2>

                            <H1 className='col-span-1'>Porcentagem(CNAE)</H1>
                            <H1 className='col-span-3'>Imposto</H1>
                            <H2 className='col-span-1'>{data.porcentagemKinayNF}</H2>
                            <H2 className='col-span-3'>{data.ImpostoNF}</H2>


                            <H1 className='col-span-1'>Valor Total*</H1>
                            <H1 className='col-span-1'>Valor Imposto</H1>
                            <H1 className='col-span-2'>Valor á Receber</H1>
                            <H2 >{Number(data.valorNF).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</H2>
                            <H2 >{Number(data.valorImpostoNF).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</H2>
                            <H2 >{Number(data.valorReceberNF).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</H2>

                            <H1 className='col-span-4'>Descrição do Serviço</H1>
                            <H2 className='col-span-4'>{data.descricaoServNF}</H2>

                            <H1 className='col-span-1'>Situação</H1>
                            <H1 className='col-span-3'>Valor Recebido</H1>
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
                                type="text"
                                name="valorRecebidoNF"
                                onChange={valorInput}
                                value={data.valorRecebidoNF}
                                className="col-span-1 "
                            />

                            <p className='col-span-2'></p>

                            <H1 className='col-span-4'>Prazo de pagamento*</H1>
                            <H2 className='col-span-4'>{data.prazoPagamentoNF}</H2>

                            <H1 className='col-span-4'>Observação</H1>
                            <H2 className='col-span-4'>{data.observacaoNF}</H2>
                        </div>

                        <button type='submit' className='w-full mt-4 bg-orange-400 py-2 px-7 rounded-lg border-2 border-orange-500 font-semibold hover:text-white hover:scale-95 duration-500 mb-3'>Salvar</button>
                    </form>
                </>
                ) : (
                    <>
                        <h1 className='font-semibold w-full h-auto flex justify-center items-center text-3xl mb-5'>Notas da empresa</h1>

                        <table className='grid grid-cols-6 justify-center items-center w-full rounded-lg bg-orange-500 drop-shadow-2xl py-2 mb-2'>
                            <Th className='col-span-1'>N° Pedido</Th>
                            <Th className='col-span-2'>Situação</Th>
                            <Th className='col-span-1'>A Receber</Th>
                            <Th className='col-span-1'>Recebido</Th>
                            <Th className='col-span-1'>Data</Th>
                        </table>

                        <table className='w-full'>
                            {notasDaEmpresa.map(nota => {
                                let data = new Date(nota.createdAt);
                                let dataFormatada = data.toISOString().split('T')[0];
                                return (
                                    <>
                                        <thead className=' bg-black w-full flex justify-end ml-2'>
                                            <span key={nota.id} className="absolute h-6 w-6 rounded-full bg-gray-400 flex justify-center items-center cursor-pointer" onClick={() => {
                                                setNotaSelecionada(nota);
                                            }}>
                                                <BiCategory />
                                            </span>
                                        </thead>
                                        <thead key={nota.id} className='grid grid-cols-6 justify-center items-center shadow-inner bg-gray-200 rounded-2xl p-2 my-2'>
                                            <Th className='col-span-1'>{String(nota.numeroPedidoNF).padStart(8, '0')}</Th>
                                            <Th className='col-span-2'>{nota.situacaoNF}</Th>
                                            <Th className='col-span-1'>{Number(nota.valorReceberNF).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Th>
                                            <Th className='col-span-1'>{Number(nota.valorRecebidoNF).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Th>
                                            <Th className='col-span-1'>{dataFormatada}</Th>
                                        </thead>
                                    </>
                                )
                            })}

                        </table>
                    </>)}
            </Div>
        </>
    )
}
