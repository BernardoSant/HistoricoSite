import styled from 'styled-components';

const Header = styled.header`
    padding:1em;
    height: auto;
    min-width: 50em;
    border-radius: 20px;
    background: #fffafa;
    box-shadow:  0px 4px 2px #acacac,
             -5px -5px 10px #ececec;
`;

const Nav = styled.nav`
font-size: larger;
background-color: blue;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const BlockEstatistic = ({ Titulo, Estilo }) => {
    return (
        <> 
        {Estilo === 1 && 
        <Header>
            <nav className='w-full h-full   text-lg justify-center items-center'>
                <div className='grid grid-rows-3 grid-flow-col gap-4'>
                    <div className='row-span-1'>{Titulo}</div>
                    <div className='row-span-3 w-full h-full bg-slate-600'>Santos</div>
                    <div className='row-span-4'>03</div> 
                </div>
            </nav>
        </Header>}
        
        {Estilo === 2 && 
        <Header>
            <nav className='w-full h-full   text-lg justify-center items-center'>
                <div className='grid grid-rows-3 grid-flow-col gap-4'>
                    <div className='row-span-1'>{Titulo}</div>
                    <div className='row-span-3 w-full h-full bg-slate-600'>bernardo</div>
                    <div className='row-span-4'>03</div> 
                </div>
            </nav>
        </Header>}
        </>
        
    )
}