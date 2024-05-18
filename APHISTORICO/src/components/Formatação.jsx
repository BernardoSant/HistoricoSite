import styled from "styled-components";
import { useGlobalContext } from "../global/Global";
import { dateFormat } from "../functions/dateFormat";
import { realFormat } from "../functions/realFormat";
import { numNotaFormat } from "../functions/numNotaFormat";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { TbAlertCircle } from "react-icons/tb";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {
  HiOutlinePlusSm,
  HiOutlineDocumentDuplicate,
  HiOutlineTrash,
} from "react-icons/hi";
import { RiSaveLine } from "react-icons/ri";
import { LuArrowRightFromLine } from "react-icons/lu";
import { NumericFormat } from "react-number-format";
import axios from "axios";

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.6vw;
  padding: 12px;
  padding-left: 1em;
  padding-right: 1em;
  font-weight: 600;
  border-radius: 0.4em;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.2vw;
  padding: 5px;
  font-weight: 600;
  border-radius: 0.7em;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 12px;
  font-size: 1vw;
`;

const Article = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 5px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8f8f8f;
    border-radius: 1em;
  }
`;

const H1 = styled.h1`
  width: 100%;
  display: flex;
  flex-direction: space-between;
  font-weight: 700;
`;

const Input = styled.input`
  max-width: 10em;
  text-align: center;
  align-items: center;
  border-radius: 0.5em;
  border: solid 2px #575757;
`;

const InputDinheiro = styled(NumericFormat)`
  max-width: 10em;
  text-align: center;
  align-items: center;
  border-radius: 0.5em;
  border: solid 2px #575757;
`;

const SectionBlock = styled.div`
  flex: 1 1 0%;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 12px;
  max-height: 45%;
`;

const ArticleBlock = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  background-color: #d8d6d679;
`;

const HeaderDados = styled.div`
  position: sticky;
  top: 0;
  flex: 0 1 auto;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-top-right-radius: 0.7em;
  border-top-left-radius: 0.7em;
  border-bottom-right-radius: 0.2em;
  border-bottom-left-radius: 0.2em;
  z-index: 10;
  background: #f97316;
`;

const ArticleDados = styled.div`
  flex: 0 1 auto;
  display: flex;
  background-color: #d8d6d679;
  flex-direction: column;
  font-size: 0.8vw;
  font-weight: bolder;
  padding-bottom: 2px;
  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 1em;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #575757;
    border-radius: 1em;
  }
`;

const Texto = styled.h1`
  flex: 1 1 0%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextoDesc = styled.h1`
  flex: 1 1 0%;
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TituloDados = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2vw;
  font-weight: 650;
`;

const TituloArgumentos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95vw;
  font-weight: 650;
`;

const ArgumentosDados = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 550;
  border-radius: 1rem;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 3px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  --tw-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: inset 0 2px 4px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  cursor: pointer;
`;

export const Fort = () => {
  return <>dd</>;
};
