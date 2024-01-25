import styled from 'styled-components';
import InputMask from 'react-input-mask';
const Header = styled.header`
height: 100%;
width: 100%;
padding-left: 1em;
padding-right: 1em;
display: flex;
flex-wrap: wrap;
flex-direction: column;
gap:0.5em;
overflow: auto;
`;

const H1 = styled.h1`
font-weight: 600;
margin-top: 5px;
`;

export const TabelaAdicionarEmpresa = () => {
    return (
        <>
            <Header>
                <h1 className='w-full flex justify-center items-center text-3xl'>Adcionar Empresa</h1>
                <nav className=' flex flex-col overflow-auto '>

                    <H1>Nome*</H1>
                    <input type="text" className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>Email</H1>
                    <input type="text" className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>CEP*</H1>
                    <input type="text" className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>Lougradouro*</H1>
                    <input type="text" className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>Bairro*</H1>
                    <input type="text" className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>Número*</H1>
                    <input type="number" className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>Complemento</H1>
                    <input type="text" className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>Cidade</H1>
                    <input type="text" className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>CNPJ*</H1>
                    <input type="text" className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>Responsável</H1>
                    <input type="text" className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />


                    <table className='flex justify-between items-start md:items-end w-full mt-3 flex-col  md:flex-row gap-6 max-w-[40em] ' >
                        <dir className="flex flex-col ">
                            <H1 className='text-xl'>Campos Adcionais</H1>
                            <div className='flex gap-6 flex-wrap'>
                                <nav>
                                    <H1>Data de Contrato</H1>
                                    <input type="date" className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2" />
                                </nav>
                                <nav className='flex flex-col justify-end'>
                                    <H1>Situação*</H1>
                                    <select id="SituaçãoEmpre" name="SituaçãoEmpre" className="border-[1px] border-[#848484] rounded-md px-3 py-[0.3em]">
                                        <option value="Particular">Particular</option>
                                        <option value="Contrato">Contrato</option>
                                    </select>
                                </nav>
                            </div>
                        </dir>
                        <button type='submit' className='w-full md:w-auto bg-orange-400 py-2 px-7 rounded-lg border-2 border-orange-500 font-semibold hover:text-white hover:scale-95 duration-500'>Salvar</button>
                    </table>
                </nav>
            </Header>
        </>
    )
}