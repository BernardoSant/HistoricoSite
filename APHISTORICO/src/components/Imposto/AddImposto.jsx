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

export const TabelaAddImposto = () => {
    const [data, setData] = useState({
      siglaImposto: "",
      porcentagemImposto: "",
      tipoImposto: "",
    });
  
    const valorInput = (e) => {
      let valor = e.target.value;
      setData({ ...data, [e.target.name]: valor });
    };
  
    const sendImposto = async (e) => {
      e.preventDefault();
  
      const headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      if (data.siglaImposto === "" || data.porcentagemImposto === "") {
        toast.error("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
  
      const dataParaEnviar = {
        ...data,
        porcentagemImposto: data.porcentagemImposto / 100,
      };
  
      axios
        .post("http://localhost:3030/impostos", dataParaEnviar, headers)
        .then((response) => {
          toast.success(response.data.message);
          setData({
            siglaImposto: "",
            porcentagemImposto: "",
            tipoImposto: "",
          });
        })
        .catch((err) => {
          toast.info(err.response.data.message);
        });
    };
  
    return (
      <>
        <div className="flex flex-col h-full w-full">
          <Header>Adcionar Impostos</Header>
          <Form onSubmit={sendImposto}>
            <div className="grid grid-cols-3 grid-rows-1 items-start gap-x-4 mt-5 ">
              <H1 className="col-span-1">Sigla</H1>
              <H1 className="col-span-1">Porcentagem</H1>
              <H1 className="col-span-1">Atividade</H1>
  
              <Input
                type="text"
                name="siglaImposto"
                onChange={valorInput}
                value={data.siglaImposto}
                className="col-span-1 "
              />
  
              <Input
                type="number"
                name="porcentagemImposto"
                onChange={valorInput}
                value={data.porcentagemImposto}
                className="col-span-1"
              />
  
              <select
                id="tipoImposto"
                name="tipoImposto"
                onChange={valorInput}
                value={data.tipoImposto}
                className="border-2 border-gray-300 rounded-[5px] px-2 py-[0.2em]"
              >
                <option value=""></option>
                <option value="NF">Notas Fiscais</option>
                <option value="Salario">Salário</option>
                <option value="Todos">Todos</option>
              </select>
            </div>
            <section className="w-full flex justify-end">
              <Button type="submit" className="">
                Salvar
              </Button>
            </section>
          </Form>
        </div>
      </>
    );
  };