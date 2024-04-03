import styled from "styled-components";
import { AlertConta } from "../../../Conta/AlertConta";

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

export const Dashboard = () => {
  return (
    <>
      <Header>
        <Div className="w-full flex flex-col justify-center items-center">
          <AlertConta></AlertConta>
        </Div>
      </Header>
    </>
  );
};
