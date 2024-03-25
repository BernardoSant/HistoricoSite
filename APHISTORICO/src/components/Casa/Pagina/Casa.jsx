import styled from "styled-components";

const Nav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const Header = styled.header`
  height: 100%;
  width: 100%;
  display: flex;
  gap: 2em;
  background-color: #fffafa;
`;

const Tabela = styled.div`
  background-color: #f97316;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  flex-direction: column;
`;
const TabelaSecund = styled.div`
  background-color: #fb923c;
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
  box-shadow: -1px 2px 13px #b5b2b2, -4px -5px 13px #ffffff;
  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 1em;
  border-top-right-radius: 1em;
  padding-bottom: 1em;
  padding-left: 1em;
  padding-right: 1em;
  font-size: medium;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  overflow-x: auto;
  z-index: 10;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #575757;
    border-radius: 1em;
  }
`;

const Botao = styled.button`
  padding: 6px;
  padding-left: 16px;
  transition-duration: 200ms;
  cursor: pointer;
  text-align: start;
  font-weight: 600;
`;

const Button = ({
  TipoButton,
  Titulo,
  onClick,
  onSecundario,
  onPrimario,
  onFinal,
}) => {
  return (
    <>
      {TipoButton === 1 && (
        <Botao
          onClick={onClick}
          className={`mt-2 hover:bg-orange-500 hover:text-gray-200 ${
            onPrimario
              ? "bg-orange-600 rounded-b-none drop-shadow-xl underline"
              : "bg-[#fffafa]"
          } ${
            onFinal
              ? "bg-orange-600 drop-shadow-xl underline text-gray-200"
              : ""
          }  rounded-[20px]  `}
        >
          {Titulo}
        </Botao>
      )}

      {TipoButton === 2 && (
        <Botao
          onClick={onClick}
          className={`${
            onSecundario ? "text-gray-200 bg-orange-400 mt-1" : "text-black"
          } ${
            onFinal ? "text-gray-200 bg-orange-400 mt-1 rounded-b-[20px]" : ""
          } hover:text-gray-200 w-full`}
        >
          {Titulo}
        </Botao>
      )}

      {TipoButton === 3 && (
        <Botao onClick={onClick} className={`hover:text-gray-200`}>
          {Titulo}
        </Botao>
      )}
    </>
  );
};

export const Casa = () => {
  return (
    <>
      <Header>
        <Nav>
          <Div className="overflow-auto max-w-[13em] min-w-[13em]">
            <nav className="flex flex-col justify-center "></nav>
          </Div>
        </Nav>
        <Div className="w-full flex flex-col justify-center items-center rounded-[1em]">
          <img
            className="w-96"
            src="https://lh3.googleusercontent.com/pw/AP1GczMtirH7-4068vJ5XM3dp6u5Y2mqSfHsw7VxC6TaHNjXS3HRg_5e5jtTr1iF9AUMND1dftdlaD7iMPQfptmZbig9f9nw5_0udPffkIAHZSkoqBM0sEoNc54E2csxdAmVzUxsrHFtZMzH8TQ4D1IA9t6vLXqrDzCyOsnz__gSXropyxdpa0fVozXuJn1XSnIwXbk5V8lne8rurZjXCFwwHLZBuwj2lfjwF9TD73NOCnJyaK9rZE4rb7kRk9cGF_hw6B0w3me07c9--B10tUPxwBT7MmYxY0MzXq1GLiOi_b9gHi-DyKi_wcelFyzA0zoEsnfQKIIVhzjmseAfIHcP9OQyj_-YhRxMlXH0EnsBdiYPZy7s6wfS5exKNlDtL41r9IftSG3Nt_j5vIPgwzuxa5SFIm1ylkazzwfy4BGND5gg1T32sLO7jY1Ws8jmAHrvLf_8sZ5dXokTH8swnOSrYMHW-iCPrRZFsfH80kiPpDzIFi09aLn5s_E7Q3FYUWZHH-gB2lhQdj0VsnMw_V2NbN5faPt2Z6F2Fl8HOhmJiuoHhzziXzW5KcEaO2AGXwEdlMmQ9h1my9HnGTFO0mtTt7nazAql6gu_XclcEqW9m2VgRKb2naf1_e7awIlEAoE3PE1pPRhlgr13yKW7Nbv1JMLgMoOpaqCke-NMM4wIJIgSSWISV6UAp6LhuKrdiurADS8NqcGdleqwio2dP6KA3jKIzmHEcGn7MOX9U7aCjknbb0if7sjVXBZyhx8B74l70x5c7okp_cFU-HipYMSdkHoHRSU0zr_Bkg6gzYCGid8R8YDzF3ayDJ9xYc8ZNf1B47MXbobGr1aw7RWI2S8r22YnPTtL_LMSukcy3DIudGPqNGRe9kq04CyV_IY60383qEOKsa-8r8fzUchdEnfbiItj=w904-h270-s-no-gm?authuser=0"
            alt=""
          />
          <div className="text-3xl font-bold">
            Estamos trabalhando nesse Serviço.
          </div>
        </Div>
      </Header>
    </>
  );
};
