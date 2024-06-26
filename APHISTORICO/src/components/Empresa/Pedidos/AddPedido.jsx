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

const InputValor = styled(NumericFormat)`
  width: 100%;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  padding-left: 8px;
`;

export const TabelaAddPedido = () => {
  const { ip, empresa, pedido } = useGlobalContext();
  const EmpresaFiltrada = empresa.filter(
    (e) => e.situacaoEmpresa !== "Contrato"
  );

  const [data, setData] = useState({
    numeroPDD: "",
    valorPDD: null,
    valorRecebidoPDD: 0,
    nomePDD: "",
    descricaoServPDD: "",
    empresaPDD: "",
    situacaoPDD: "Criada",
    dataPDD: "",
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

    if (data.numeroPDD === "" || data.situacaoPDD === "") {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    axios
      .post(ip + "/pedido", data, headers)
      .then((response) => {
        toast.success(response.data.message);
        setData({
          numeroPDD: "",
          valorPDD: null,
          valorRecebidoPDD: 0,
          nomePDD: "",
          descricaoServPDD: "",
          empresaPDD: "",
          situacaoPDD: "Criada",
          dataPDD: "",
        });
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  return (
    <div className="h-full w-full flex-col justify-center items-start ">
      <Header>Adcionar Pedido</Header>

      <Form onSubmit={sendPedido}>
        <div className="grid grid-cols-4 grid-rows-1 items-start gap-x-4 w-full">
          <H1 className="col-span-1">Numero*</H1>
          <H1 className="col-span-1">Valor Total</H1>
          <H1 className="col-span-2">Nome Breve</H1>

          <Input
            type="number"
            list="numeroPDD"
            name="numeroPDD"
            onChange={valorInput}
            value={data.numeroPDD}
            className="col-span-1 "
          />

          <datalist id="numeroPDD">
            <option value="Pedidos Existentes">Não duplicar o pedido</option>
            {pedido.map((pdd) => (
              <option key={pdd.id} value={pdd.numeroPDD} readOnly>
                {pdd.nomePDD}.
              </option>
            ))}
          </datalist>

          <InputValor
            type="text"
            value={data.valorPDD || ""}
            className="col-span-1 "
            onValueChange={(e) => {
              setData({
                ...data,
                valorPDD: e.floatValue,
              });
            }}
            thousandSeparator="."
            decimalScale={2}
            fixedDecimalScale
            decimalSeparator=","
          />

          <Input
            type="text"
            name="nomePDD"
            onChange={valorInput}
            value={data.nomePDD}
            className="col-span-2"
          />
          <H1 className="col-span-1">Descrição</H1>
          <textarea
            type="text"
            name="descricaoServPDD"
            onChange={valorInput}
            value={data.descricaoServPDD}
            rows="5"
            className="col-span-4 border-2 border-gray-300 rounded-md px-2"
          ></textarea>

          <H1 className="col-span-2">Empresa</H1>

          <H1 className="col-span-1">Data Lançada</H1>

          <Select
            id="empresaPDD"
            name="empresaPDD"
            onChange={valorInput}
            value={data.empresaPDD}
            className="col-span-2 border-2 border-gray-300 rounded-[5px] px-2 py-[0.2em]"
          >
            <option></option>
            {EmpresaFiltrada.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.nameEmpresa}
              </option>
            ))}
          </Select>

          <Input
            type="date"
            name="dataPDD"
            onChange={valorInput}
            value={data.dataPDD}
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
