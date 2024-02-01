import styled from 'styled-components';

import { useGlobalContext } from '../global/Global';


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


export const MostruarioNota = ({ empresaId }) => {
    
    const { nota } = useGlobalContext();

    const notasDaEmpresa = nota.filter(nota => nota.idEmpresa === empresaId);
    return (
        <>
            <Form>
                <h1>Notas da empresa {empresaId}</h1>
                {notasDaEmpresa.map(nota => (
                    <div key={nota.id}>
                        - {nota.numeroPedidoNF} -
                    </div>
                ))}
            </Form>
        </>
    )
}
