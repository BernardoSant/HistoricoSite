import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../global/Global";
import { FaArrowDown } from "react-icons/fa";
import { Header } from "../../Componentes/Header";
import { Button } from "../../Componentes/Button";

const Form = styled.form`
  font-size: 1.2vw;
  height: 100%;
  width: 100%;
  gap: 1em;
  display: flex;
  flex-direction: column;
`;

const H1 = styled.h1`
  font-weight: 600;
  margin-top: 5px;
`;

const Section = styled.div`
  overflow: auto;
  padding-right: 6px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #575757;
    border-radius: 1em;
  }
`;

const Input = styled.input`
  width: 100%;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  padding-left: 8px;
`;

export const TabelaAdicionarEmpresa = () => {
  const { ip } = useGlobalContext();
  const [data, setData] = useState({
    nameEmpresa: "",
    siglaEmpresa: "",
    emailEmpresa: "",
    cepEmpresa: "",
    ruaEmpresa: "",
    bairroEmpresa: "",
    numeroEmpresa: "",
    complEmpresa: "",
    cidadeEmpresa: "",
    cnpjEmpresa: "",
    responsavelEmpresa: "",
    situacaoEmpresa: "",
  });

  // Receber os dados dos campos do formulário
  const valorInput = (e) => {
    let valor = e.target.value;
    if (e.target.name === "cepEmpresa") {
      valor = valor.replace(/\D/g, "");
      valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
    } else if (e.target.name === "cnpjEmpresa") {
      valor = valor.replace(/\D/g, "");
      valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
      valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
      valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    }
    setData({ ...data, [e.target.name]: valor });
  };

  const sendEmpresa = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (
      data.cepEmpresa === "" ||
      data.cnpjEmpresa === "" ||
      data.nameEmpresa === ""
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    axios
      .post(ip + "/empresa", data, headers)
      .then((response) => {
        toast.success(response.data.message);
        setData({
          nameEmpresa: "",
          siglaEmpresa: "",
          emailEmpresa: "",
          cepEmpresa: "",
          ruaEmpresa: "",
          bairroEmpresa: "",
          numeroEmpresa: "",
          complEmpresa: "",
          cidadeEmpresa: "",
          cnpjEmpresa: "",
          responsavelEmpresa: "",
          situacaoEmpresa: "",
        });
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const navRef = useRef(null);

  const handleScroll = () => {
    const isBottom =
      navRef.current.scrollHeight - navRef.current.scrollTop ===
      navRef.current.clientHeight;
    setIsScrolledToBottom(isBottom);
  };

  useEffect(() => {
    const navElement = navRef.current;
    if (navElement) {
      navElement.addEventListener("scroll", handleScroll);
      setIsScrollable(navElement.scrollHeight > navElement.clientHeight);
      return () => navElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleClick = () => {
    const navElement = navRef.current;
    if (navElement) {
      navElement.scrollTop = navElement.scrollHeight;
    }
  };

  return (
    <>
      <Form onSubmit={sendEmpresa} className="relative">
        <Header>Adcionar Empresa</Header>

        <div className="absolute bottom-[11%] right-2/4 z-50">
          {isScrollable && !isScrolledToBottom && (
            <div className="flex flex-col justify-center items-center">
              <h1
                className="text-xl bg-gray-300 p-1 rounded-full opacity-60"
                onClick={handleClick}
              >
                <FaArrowDown />
              </h1>
            </div>
          )}
        </div>

        <Section
          className="grid grid-cols-4 gap-x-2 overflow-auto"
          useRef={navRef}
        >
          <H1 className="col-span-3">Nome*</H1>

          <H1 className="col-span-1">Sigla*</H1>

          <Input
            type="text"
            name="nameEmpresa"
            onChange={valorInput}
            value={data.nameEmpresa}
            className="col-span-3"
          />

          <Input
            type="text"
            name="siglaEmpresa"
            onChange={valorInput}
            value={data.siglaEmpresa}
            className="col-span-1"
          />

          <H1 className="col-span-4">CNPJ*</H1>
          <Input
            type="text"
            maxLength="18"
            name="cnpjEmpresa"
            onChange={valorInput}
            value={data.cnpjEmpresa}
            className="col-span-4"
          />

          <H1 className="col-span-2">Responsável</H1>
          <H1 className="col-span-2">Email</H1>

          <Input
            type="text"
            name="responsavelEmpresa"
            onChange={valorInput}
            value={data.responsavelEmpresa}
            className="col-span-2"
          />

          <Input
            type="text"
            name="emailEmpresa"
            onChange={valorInput}
            value={data.emailEmpresa}
            className="col-span-2"
          />

          <H1 className="col-span-1">CEP*</H1>
          <H1 className="col-span-3">Lougradouro*</H1>

          <Input
            maxLength="9"
            type="text"
            name="cepEmpresa"
            onChange={valorInput}
            value={data.cepEmpresa}
            className="col-span-1"
          />

          <Input
            type="text"
            name="ruaEmpresa"
            onChange={valorInput}
            value={data.ruaEmpresa}
            className="col-span-3"
          />

          <H1 className="col-span-1">Número*</H1>
          <H1 className="col-span-3">Bairro*</H1>

          <Input
            type="number"
            name="numeroEmpresa"
            onChange={valorInput}
            value={data.numeroEmpresa}
            className="col-span-1"
          />

          <Input
            type="text"
            name="bairroEmpresa"
            onChange={valorInput}
            value={data.bairroEmpresa}
            className="col-span-3"
          />

          <H1 className="col-span-2">Complemento</H1>
          <H1 className="col-span-2">Cidade</H1>

          <Input
            type="text"
            name="complEmpresa"
            onChange={valorInput}
            value={data.complEmpresa}
            className="col-span-2"
          />

          <Input
            type="text"
            name="cidadeEmpresa"
            onChange={valorInput}
            value={data.cidadeEmpresa}
            className="col-span-2"
          />

          <H1 className="col-span-4">Situação*</H1>

          <select
            id="situacaoEmpresa"
            name="situacaoEmpresa"
            onChange={valorInput}
            value={data.situacaoEmpresa}
            className="col-span-1 border-2 border-gray-300 rounded-[5px] px-2 py-[0.2em]"
          >
            <option></option>
            <option value="Particular">Particular</option>
            <option value="Contrato">Contrato</option>
          </select>
        </Section>

        <section className="w-full flex justify-end">
          <Button type="submit" className="">
            Salvar
          </Button>
        </section>
      </Form>
    </>
  );
};
