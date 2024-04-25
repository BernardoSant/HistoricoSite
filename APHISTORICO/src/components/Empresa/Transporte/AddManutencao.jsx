import styled from "styled-components";
import { useGlobalContext } from "../../../global/Global";
import { useState, useEffect } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";

const Header = styled.header`
  width: 100%;
  border-radius: 20px;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
  font-weight: 600;
  font-size: xx-large;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-left: 1em;
  padding-right: 1em;
`;

const Article = styled.article`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Section = styled.div`
  height: 100%;
  width: 100%;
  background-color: burlywood;
  display: flex;
  flex-direction: column;
`;


export const AddManutencao = () => {
  return (
    <Article>
      <Header>Adicionar Manutenção</Header>
      <Section>skjdskldsj</Section>
    </Article>
  );
};
