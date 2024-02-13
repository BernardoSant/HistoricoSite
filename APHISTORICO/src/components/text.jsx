import styled from 'styled-components';
import { BsPencilSquare } from "react-icons/bs";
import { useGlobalContext } from '../global/Global';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const Main = styled.main`
width: 100%;
height: 100%;
border-radius: 1em;
font-size: medium;

`;

const Article = styled.article`
height: auto;
border-radius: 1em;
background: #fb923c;
box-shadow: inset 5px -5px 10px #a15d26,
            inset -5px 5px 10px #ffc752;

`;

const Div = styled.div`
border-top-right-radius: 1em;
border-top-left-radius: 1em;
display: flex;
flex-direction: column;
justify-content: space-between;
align-content: center;
padding: 0.7em;
padding-left: 1em;
padding-right: 1em;
background: #ea580c;
box-shadow: inset 5px -0px 10px #a15d26,
            inset -5px 7px 10px #ffc752;
font-weight: 600;

`;

const Input = styled.input`
width: 100%;
border: 2px solid #8f8f8f;
border-radius: 4px;
max-width: 40em;
padding-left: 8px;
`
const ButtonClick = styled.button`
background:#9ca3af;
display: flex;
flex-direction: row;
justify-content:center;
align-items: center;
gap: 8px;
border-radius: 9999px;
padding-left: 8px;
padding-right: 8px;
`;

const H1 = styled.h1`
font-weight: 600;
margin-top: 5px;
display: flex;
justify-content: start;
align-content: center;
padding-left: 0.7em;
`;


export const Teste = () => {
    const { cargo } = useGlobalContext();

    const [state, setState] = useState({
        AddCargo: false,
    });

    const handleClick = (key) => {
        setState(prevState => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    }

    const [data, setData] = useState({
        nomeCargo: '',
        salarioCargo: '',
        quantidadeCargo: '0'
    });

    const valorInput = e => {
        let valor = e.target.value;
        setData({ ...data, [e.target.name]: valor });
    };
    const sendCargo = async (e) => {
        e.preventDefault();
        
        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        };

        if (data.nomeCargo === '' || data.salarioCargo === '') {
            toast.error('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        axios.post('http://localhost:3030/cargo', data, headers)
            .then((response) => {
                toast.success(response.data.message);
                setData({
                    nomeCargo: '',
                    salarioCargo: '',
                    quantidadeCargo: ''
                });
            }).catch((err) => {
                toast.info(err.response.data.message);
            });
    }
    return (
        <Main className='grid grid-cols-2 gap-2 '>

            <Article>
                <Div>
                    <aside className='flex justify-between '>
                        <h1 className='text-xl'>Cargos</h1>
                        <ButtonClick onClick={() => handleClick('AddCargo')}><BsPencilSquare />Adicionar</ButtonClick>
                    </aside>
                    <thead className='grid grid-cols-3 justify-center items-center text-lg '>
                        <th className='col-span-1'>Cargo</th>
                        <th className='col-span-1'>Salario</th>
                        <th className='col-span-1'>Quant</th>
                    </thead>
                </Div>

                <div className='w-full '>
                    {state.AddCargo ? (
                        <form onSubmit={sendCargo} className=' grid grid-cols-5 gap-2'>

                            <H1>Cargo:</H1>
                            <Input
                                type="text"
                                name="nomeCargo"
                                onChange={valorInput}
                                value={data.nomeCargo}
                                className="col-span-4"
                            />

                            <H1>Salario:</H1>
                            <Input
                                type="text"
                                name="salarioCargo"
                                onChange={valorInput}
                                value={data.salarioCargo}
                                className="col-span-4"
                            />
                            <button type='submit' className='bg-green-400 col-span-5 rounded-lg font-semibold p-1 '>Salvar</button>
                        </form>) : (
                        <div className='flex flex-col items-center py-1 overflow-auto h-full max-h-[18em]'>
                            {cargo.map(cargo => {
                                return (
                                    <nav className='grid grid-cols-3 w-full h-full'>
                                        <th className='col-span-1'>{cargo.nomeCargo}</th>
                                        <th className='col-span-1'>{Number(cargo.salarioCargo).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</th>
                                        <th className='col-span-1'>{cargo.quantidadeCargo}</th>
                                    </nav>
                                )
                            })}
                        </div>
                    )}
                </div>
            </Article>

            <Article >
                <Div >
                    <h1>Ferramentas</h1>
                </Div>
            </Article>

            <Article className='col-span-2'>
                <Div >
                    <h1>Alimentação</h1>
                </Div>
            </Article>

            <Article >
                <Div >
                    <h1>Uniformes</h1>
                </Div>
            </Article>

            <Article >
                <Div >
                    <h1>Alimentação</h1>
                </Div>
            </Article>

            <Article >
                <Div >
                    <h1>Uniformes</h1>
                </Div>
            </Article>

        </Main>
    )
}