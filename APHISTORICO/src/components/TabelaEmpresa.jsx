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

const Input = styled.input`
width: 100%;
border-radius: 5px;
padding: 0.3em;
padding-left: 0.8em;
border: 1px solid ;
border-color: #848484;
`;
const H1 = styled.h1`
font-weight: 600;
`;

export const TabelaAdicionarEmpresa = () => {
    return (
        <>
            <Header>
                <h1 className='w-full flex justify-center items-center text-3xl'>Adcionar Empresa</h1>
                <nav className=' flex flex-col overflow-auto '>
                    <div>
                        <H1>Nome*</H1>
                        <Input type="text" />
                    </div>
                    <div>
                        <H1>Email</H1>
                        <Input type="email" />
                    </div>
                    <div>
                        <H1>CEP*</H1>
                        <InputMask mask={"99999-999"} className="border-[1px] border-[#848484] rounded-md px-3 py-[0.3em]" type="" />
                    </div>
                    <div>
                        <H1>Lougradouro*</H1>
                        <Input type="text" />
                    </div>
                    <div>
                        <H1>Bairro*</H1>
                        <Input type="text" />
                    </div>
                    <div>
                        <H1>Número*</H1>
                        <Input type="number" />
                    </div>
                    <div>
                        <H1>Complemento</H1>
                        <Input type="text" />
                    </div>
                    <div>
                        <H1>Cidade</H1>
                        <Input type="text" />
                    </div>
                    <div>
                        <H1>CNPJ*</H1>
                        <InputMask mask="99.999.999/9999-99" className="border-[1px] border-[#848484] rounded-md px-3 py-[0.3em]" type="text" />
                    </div>
                    <div>
                        <H1>Responsável</H1>
                        <Input type="text" />
                    </div>

                    <div className='flex justify-between items-end'>
                        <dir className="flex flex-row gap-10">
                            <nav>
                                <H1 className='text-xl'>Campos Adcionais</H1>
                                <H1>Data de Contrato</H1>
                                <Input type="date" />
                            </nav>
                            <nav className='flex flex-col justify-end'>
                                <H1>Situação*</H1>
                                <select id="SituaçãoEmpre" name="SituaçãoEmpre" className="border-[1px] border-[#848484] rounded-md px-3 py-[0.3em]">
                                    <option value="Particular">Particular</option>
                                    <option value="Contrato">Contrato</option>
                                </select>
                            </nav>
                        </dir>
                        <dir><button className='bg-orange-400 py-2 px-7 rounded-lg border-2 border-orange-500 font-semibold hover:text-white hover:scale-95 duration-500'>Salvar</button></dir>
                    </div>
                </nav>
            </Header>
        </>
    )
}