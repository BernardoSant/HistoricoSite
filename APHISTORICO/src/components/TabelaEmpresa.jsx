import styled from 'styled-components';

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


    const [data, setData] = useState({
        nameEmpresa: '',
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

    // Declarar a variável para receber a mensagem
    const [message, setMessage] = useState("");

    // Receber os dados dos campos do formulário
    const valorInput = e => setData({ ...data, [e.target.name]: e.target.value });

    const sendEmpresa = async (e) => {

        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        };

        await axios.post('http://localhost:3030/empresa', data, headers)
            .then((response) => {
                setMessage(response.data.message);

                setData({
                    nameEmpresa: '',
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
                setMessage(err.response.data.message);
            });
    }

    return (
        <>
            <Header onSubmit={sendEmpresa}>
                <h1 className='w-full flex justify-center items-center text-3xl'>Adcionar Empresa</h1>
                <nav className=' flex flex-col overflow-auto '>

                    <H1>Nome*</H1>
                    <input
                        type="text"
                        name="name"
                        onChange={valorInput}
                        value={data.nameEmpresa}
                        className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>Email</H1>
                    <input
                        type="text"
                        name="emailEmpresa"
                        onChange={valorInput}
                        value={data.emailEmpresa}
                        className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>CEP*</H1>
                    <input
                        type="text"
                        name="cepEmpresa"
                        onChange={valorInput}
                        value={data.cepEmpresa}
                        className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>Lougradouro*</H1>
                    <input
                        type="text"
                        name="ruaEmpresa"
                        onChange={valorInput}
                        value={data.ruaEmpresa}
                        className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>Bairro*</H1>
                    <input
                        type="text"
                        name="bairroEmpresa"
                        onChange={valorInput}
                        value={data.bairroEmpresa}
                        className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>Número*</H1>
                    <input
                        type="number"
                        name="numeroEmpresa"
                        onChange={valorInput}
                        value={data.numeroEmpresa}
                        className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

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

                    <H1>CNPJ*</H1>
                    <input
                        type="text"
                        name="cnpjEmpresa"
                        onChange={valorInput}
                        value={data.cnpjEmpresa}
                        className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />

                    <H1>Responsável</H1>
                    <input
                        type="text"
                        name="responsavelEmpresa"
                        onChange={valorInput}
                        value={data.responsavelEmpresa}
                        className="border-2 max-w-[40em] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2 " />


                    <table className='flex justify-between items-start md:items-end w-full mt-3 flex-col  md:flex-row gap-6 max-w-[40em] ' >
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
                        <button type='submit' className='w-full md:w-auto bg-orange-400 py-2 px-7 rounded-lg border-2 border-orange-500 font-semibold hover:text-white hover:scale-95 duration-500'>Salvar</button>
                    </table>
                </nav>
            </Header>
        </>
    )
}