import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../global/Global";

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

const Select = styled.select`
  width: 100%;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  max-width: 40em;
  padding-left: 8px;
  padding: 4px;
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

export const TabelaAddContrato = () => {
  const { empresa } = useGlobalContext();

  const [data, setData] = useState({
    numeroCT: "",
    ValorCT: "",
    valorRecebidoCT: 0,
    nomeCT: "",
    empresaCT: "",
    dataCT: "",
  });

  const valorInput = (e) => {
    let valor = e.target.value;
    setData({ ...data, [e.target.name]: valor });
  };

  const sendPedido = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data.numeroCT === "" || data.situacaoCT === "") {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    axios
      .post("http://localhost:3030/contrato", data, headers)
      .then((response) => {
        toast.success(response.data.message);
        setData({
          numeroCT: "",
          ValorCT: "",
          valorRecebidoCT: 0,
          nomeCT: "",
          empresaCT: "",
          dataCT: "",
        });
        console.log(data);
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  return (
    <>
      <Header>Adcionar Contrato</Header>

      <Form onSubmit={sendPedido}>
        <div className="grid grid-cols-4 grid-rows-1 items-start gap-x-4 ">
          <H1 className="col-span-1">Numero*</H1>
          <H1 className="col-span-3">Nome Breve</H1>

          <Input
            type="number"
            name="numeroCT"
            onChange={valorInput}
            value={data.numeroCT}
            className="col-span-1 "
          />

          <Input
            type="text"
            name="nomeCT"
            onChange={valorInput}
            value={data.nomeCT}
            className="col-span-3"
          />
          <H1 className="col-span-2">Valor Total</H1>
          <H1 className="col-span-2">Empresa</H1>

          <Input
            type="text"
            name="ValorCT"
            onChange={valorInput}
            value={data.ValorCT}
            className="col-span-2 "
          />

          <Select
            id="empresaCT"
            name="empresaCT"
            onChange={valorInput}
            value={data.empresaCT}
            className="col-span-2 border-2 border-gray-300 rounded-[5px] px-2 py-[0.2em]"
          >
            <option></option>
            {empresa.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.nameEmpresa}
              </option>
            ))}
          </Select>
          <H1 className="col-span-4">Data Lançada</H1>
          <Input
            type="date"
            name="dataCT"
            onChange={valorInput}
            value={data.dataCT}
            className="col-span-1"
          />
        </div>

        <section className="w-full flex justify-end py-4">
          <Button type="submit">Salvar</Button>
        </section>
      </Form>
    </>
  );
};
