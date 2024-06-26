import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../global/Global";
import { NumericFormat } from "react-number-format";
import { Header } from "../../Componentes/Header";
import { Button } from "../../Componentes/Button";

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
  padding-left: 8px;
  padding: 4px;
`;

const Input = styled.input`
  width: 100%;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  padding-left: 8px;
`;

const InputDinheiro = styled(NumericFormat)`
  width: 100%;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  padding-left: 8px;
`;


export const TabelaAddContrato = () => {
  const {ip, empresa } = useGlobalContext();
  const empresasContrato = empresa.filter((ct) => ct.situacaoEmpresa === "Contrato");

  const [data, setData] = useState({
    numeroCT: "",
    ValorCT: "",
    ValorRecebidoCT: 0,
    nomeCT: "",
    situacaoCT: "Ativo",
    empresaCT: "",
    dataCT: "",
  });

  const valorInput = (e) => {
    let valor = e.target.value;
    setData({ ...data, [e.target.name]: valor });
  };

  const sendContrato = async (e) => {
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
      .post(ip + "/contrato", data, headers)
      .then((response) => {
        toast.success(response.data.message);
        setData({
          numeroCT: "",
          ValorCT: "",
          ValorRecebidoCT: 0,
          nomeCT: "",
          situacaoCT: "Ativo",
          empresaCT: "",
          dataCT: "",
        });
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  return (
    <div className="w-full h-full">
      <Header>Adcionar Contrato</Header>

      <Form onSubmit={sendContrato}>
        <div className="grid grid-cols-4 grid-rows-1 items-start gap-x-4 w-full">
          <H1 className="col-span-1">Numero*</H1>
          <H1 className="col-span-3">Nome do Contrato</H1>

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
          <H1 className="col-span-2">Empresa Prestadora</H1>

          <InputDinheiro
            type="text"
            value={data.ValorCT || ""}
            className="col-span-2 "
            onValueChange={(e) => {
              setData({
                ...data,
                ValorCT: e.floatValue,
              });
            }}
            thousandSeparator="."
            decimalScale={2}
            fixedDecimalScale
            decimalSeparator=","
          />

          <Select
            id="empresaCT"
            name="empresaCT"
            onChange={valorInput}
            value={data.empresaCT}
            className="col-span-2 border-2 border-gray-300 rounded-[5px] px-2 py-[0.2em]"
          >
            <option></option>
            {empresasContrato.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.nameEmpresa}
              </option>
            ))}
          </Select>
          <H1 className="col-span-4">Data Contrato</H1>
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
    </div>
  );
};
