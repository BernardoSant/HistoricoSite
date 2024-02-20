import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Form = styled.form`
  height: 100%;
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
  padding-top: 1em;
  gap: 3em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: start;
  flex-direction: row;
`;

const H1 = styled.h1`
  font-weight: 600;
  margin-top: 5px;
`;

const Input = styled.input`
  width: 100%;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  padding-left: 8px;
`;
const Header = styled.header`
  width: 100%;
  border-radius: 20px;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
  font-weight: 600;
  font-size: xx-large;
  display: flex;
  justify-content: center;
  padding: 5px;
`;

const Button = styled.button`
  width: auto;
  border-radius: 20px;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
  font-weight: 600;
  font-size: x-large;
  display: flex;
  justify-content: center;
  padding: 7px;
  padding-left: 3em;
  padding-right: 3em;
  transition-duration: 200ms;

  &:hover {
    cursor: pointer;
    color: white;
    scale: 97%;
  }
`;

export const TabelaAdicionarEmpresa = () => {
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
    cadastroEmpresa: "",
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
      data.cadastroEmpresa === "" ||
      data.nameEmpresa === ""
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    axios
      .post("http://localhost:3030/empresa", data, headers)
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
          cadastroEmpresa: "",
          situacaoEmpresa: "",
        });
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  return (
    <>
      <Form onSubmit={sendEmpresa}>
        <Header>Adcionar Empresa</Header>

        <section className="grid grid-cols-4 gap-x-2">
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

          <H1 className="col-span-1">Data de Contrato</H1>
          <H1 className="col-span-3">Situação*</H1>
          <Input
            type="date"
            name="cadastroEmpresa"
            onChange={valorInput}
            value={data.cadastroEmpresa}
            className="col-span-1"
          />

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
        </section>

        <section className="w-full flex justify-end">
          <Button type="submit" className="">
            Salvar
          </Button>
        </section>
      </Form>
    </>
  );
};
