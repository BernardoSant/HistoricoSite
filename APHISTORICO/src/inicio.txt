import { NavBar } from "../components/NavBar"
import { BlockEstatistic } from "../components/BlockEstatistic"
import styled from 'styled-components';

const Div = styled.div`
width: 100%;
align-items: center;
display: flex;
align-content: center;
justify-content: center;
flex-wrap: wrap;
gap: 20px;
`;

const Nav = styled.nav`
height: 100%;
width: 100%;
padding: 3em;
overflow: auto;
`;
export const Inicio = () => {

    return (
        <>
            <NavBar Tipo={1}/>
            <header className="h-[100vh] w-full pt-20 flex flex-col justify-start items-center bg-[#fffafa] ">
                <Nav >
                    <Div>
                        <BlockEstatistic Estilo={2} Titulo={"Gasto"}></BlockEstatistic>
                        <BlockEstatistic Estilo={1} Titulo={"Gasto"}></BlockEstatistic>
                        <BlockEstatistic Estilo={2} Titulo={"Gasto"}></BlockEstatistic>
                        <BlockEstatistic Estilo={1} Titulo={"Gasto"}></BlockEstatistic>
                        <BlockEstatistic Estilo={2} Titulo={"Gasto"}></BlockEstatistic>
                        <BlockEstatistic Estilo={1} Titulo={"Gasto"}></BlockEstatistic>
                        <BlockEstatistic Estilo={2} Titulo={"Gasto"}></BlockEstatistic>
                        <BlockEstatistic Estilo={1} Titulo={"Gasto"}></BlockEstatistic>
                    </Div>
                </Nav>
            </header>
        </>
    )
}  