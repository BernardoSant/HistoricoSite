import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../global/Global";

const Footer = styled.footer`
  height: 100%;
  width: 100%;
  padding: 1em;
  display: flex;
  flex-wrap: wrap;
  max-width: 50em;
  justify-content: start;
  align-content: start;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.header`
  width: 100%;
  margin-bottom: 7px;
  border-radius: 1em;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  flex: 1 1 0%;
`;

const Article = styled.article`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-height: 5em;
`;

const Dir = styled.div`
  border-top-right-radius: 1em;
  border-top-left-radius: 1em;
  border-bottom-right-radius: 0.3em;
  border-bottom-left-radius: 0.3em;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  align-content: center;
  padding: 0.7em;
  padding-left: 1em;
  padding-right: 1em;
  background: #f97316;
  box-shadow: inset 3px -3px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
  flex: none;
  z-index: 10;
`;

const Div = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;
  background-color: #d8d6d679;
  margin-top: -5px;
  z-index: 0;
  padding-top: 10px;
  overflow: auto;
  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 1em;
`;

const H1 = styled.h1`
  font-weight: 700;
  font-size: larger;
`;

const H2 = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 600;
  font-size: medium;
`;

const H3 = styled.h3`
  display: flex;
  flex-direction: row;
  font-weight: 600;
`;

const P = styled.p`
  text-align: center;
  width: 100%;
`;

export const ResumoEmpresa = () => {
  const { empresa } = useGlobalContext();

  return (
    <Footer>
      <Header>
        <thead className="flex justify-center items-center py-4 gap-5">
          <th className="text-start text-3xl pt-1">Resumo Mensal</th>
          <select name="" id="">
            <option value="01">Janeiro</option>
          </select>
        </thead>
      </Header>

      <Section>
        <Article>
          <Dir>
            <H1> Nota Fiscal Recebida</H1>

            <H2>
              <P>Nome</P>
              <P>CNPJ</P>
            </H2>
          </Dir>
          <Div>
            <H3></H3>
          </Div>
          <Dir>
            <H1> Nota Fiscal Recebida</H1>

            <H2>
              <P>Nome</P>
              <P>CNPJ</P>
            </H2>
          </Dir>
          <Div>
            <H3></H3>
          </Div>
        </Article>

        <Article>
          <Dir>
            <H1>Empresas Cadastradas</H1>

            <H2>
              <P>Nome</P>
              <P>CNPJ</P>
            </H2>
          </Dir>
          <Div>
            <H3></H3>
          </Div>
        </Article>
      </Section>

      <Section>
        <Article>
          <Dir>
            <H1>Empresas Cadastradas</H1>

            <H2>
              <P>Nome</P>
              <P>CNPJ</P>
            </H2>
          </Dir>
          <Div>
            {empresa.map((empresas) => (
              <H3>
                <P>{empresas.siglaEmpresa}</P>
                <P>{empresas.cnpjEmpresa}</P>
              </H3>
            ))}
          </Div>
        </Article>

        <Article>
          <Dir>Ganhos Mensal</Dir>
          <Div>OPA</Div>
        </Article>
      </Section>
    </Footer>
  );
};
