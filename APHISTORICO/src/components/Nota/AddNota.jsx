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
export const TabelaAddNota = () => {
    const { empresa, kinays, impostos, pedido } = useGlobalContext();

    const [data, setData] = useState({
      numeroPedidoNF: "",
      numeroNotaNF: "",
      idEmpresa: "",
      nomeEmpresaNF: "",
      cnpjEmpresaNF: "",
      retidoNF: "",
      numeroKinayNF: "",
      KinayNF: "",
      porcentagemKinayNF: "",
      descricaoServNF: "",
      ImpostoNF: "",
      totalImpostoNF: "",
      valorNF: "",
      valorImpostoNF: "",
      valorReceberNF: "",
      valorRecebidoNF: null,
      situacaoNF: "",
      prazoPagamentoNF: "",
      dataNF: "",
      observacaoNF: "",
    });
  
    const calcularImposto = () => {
      const CNAE = parseFloat(data.porcentagemKinayNF.replace("%", "")) / 100;
      const Imposto = parseFloat(data.ImpostoNF.replace("%", "")) / 100;
      const valorImpostoCNAE = CNAE * data.valorNF;
      const valorImposto = Imposto * data.valorNF;
      const valorImpostocalc = valorImpostoCNAE + valorImposto;
      const valorReceber = data.valorNF - valorImpostocalc;
  
      const totalImposto = CNAE * 100 + Imposto * 100;
  
      setData({
        ...data,
        valorImpostoNF: valorImpostocalc,
        valorReceberNF: valorReceber,
        totalImpostoNF: totalImposto,
      });
    };
  
    const valorInput = (event) => {
      const { name, value } = event.target;
  
      if (name === "nomeEmpresaNF") {
        const parts = value.split(" - ");
        const idEmpresa = parts[0];
        const NomeEmpresa = parts[1];
        const CNPJEmpresa = parts[2];
  
        setData({
          ...data,
          idEmpresa: idEmpresa,
          nomeEmpresaNF: NomeEmpresa,
          cnpjEmpresaNF: CNPJEmpresa,
        });
      } else if (name === "numeroPedidoNF") {
        const parts = value.split(" - ");
        const NumeroPDD = parts[0];
  
        setData({ ...data, numeroPedidoNF: NumeroPDD });
      } else if (name === "KinayNF") {
        const parts = value.split(" - ");
        const numeroKinay = parts[0];
        const descricaoKinay = parts[1];
        const porcentagemKinay = parts[2];
  
        setData({
          ...data,
          numeroKinayNF: numeroKinay,
          KinayNF: descricaoKinay,
          porcentagemKinayNF: porcentagemKinay,
        });
      } else if (name === "ImpostoNF") {
        const parts = value.split(" - ");
        const porcentagemImposto = parts[1];
  
        setData({ ...data, ImpostoNF: porcentagemImposto });
      } else if (name === "situacaoNF" && value === "Antecipada") {
        const calculorAntercipa = data.valorReceberNF * 0.02;
        const valorRecebido = data.valorReceberNF - calculorAntercipa;
  
        setData({
          ...data,
          valorRecebidoNF: valorRecebido,
          situacaoNF: "Antecipada",
        });
      } else if (name === "situacaoNF" && value === "Recebida") {
        setData({
          ...data,
          valorRecebidoNF: data.valorReceberNF,
          situacaoNF: "Recebida",
        });
      } else {
        setData({ ...data, [name]: value });
      }
    };
  
    const sendNF = async (e) => {
      e.preventDefault();
  
      const headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      if (
        data.numeroPedidoNF === "" ||
        data.nomeEmpresaNF === "" ||
        data.valorNF === ""
      ) {
        toast.error("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
  
      axios
        .post("http://localhost:3030/nota", data, headers)
        .then((response) => {
          toast.success(response.data.message);
          console.log(data);
          setData({
            numeroPedidoNF: "",
            numeroNotaNF: "",
            idEmpresa: "",
            nomeEmpresaNF: "",
            cnpjEmpresaNF: "",
            retidoNF: "",
            numeroKinayNF: "",
            KinayNF: "",
            porcentagemKinayNF: "",
            descricaoServNF: "",
            ImpostoNF: "",
            totalImpostoNF: "",
            valorNF: "",
            valorImpostoNF: "",
            valorReceberNF: "",
            valorRecebidoNF: null,
            situacaoNF: "",
            prazoPagamentoNF: "",
            dataNF: "",
            observacaoNF: "",
          });
        })
        .catch((err) => {
          toast.info(err.response.data.message);
        });
    };
  
    return (
      <>
        <Form onSubmit={sendNF}>
          <Header>Adcionar Nota Fiscal</Header>
  
          <nav>
            <div className=" grid grid-cols-4 gap-x-2">
              <H1 className="col-span-1">Numero Nota*</H1>
              <H1 className="col-span-1">Numero Pedido*</H1>
              <p className="col-span-2"></p>
              <Input
                type="number"
                name="numeroNotaNF"
                onChange={valorInput}
                value={data.numeroNotaNF}
                className="col-span-1 "
              />
  
              <label className="col-span-1">
                <Input
                  type="text"
                  list="PEDIDO"
                  name="numeroPedidoNF"
                  onChange={valorInput}
                  value={data.numeroPedidoNF}
                />
  
                <datalist id="PEDIDO">
                  {pedido.map((pedido) => (
                    <option
                      key={pedido.id}
                      value={`${pedido.numeroPDD} - ${pedido.nomePDD}`}
                    ></option>
                  ))}
                </datalist>
              </label>
  
              <p className="col-span-2"></p>
  
              <H1 className="col-span-2">Nome da Empresa*</H1>
              <H1 className="col-span-2">CNPJ*</H1>
  
              <label className="col-span-2">
                <Input
                  type="text"
                  list="nameE"
                  name="nomeEmpresaNF"
                  onChange={valorInput}
                  value={data.nomeEmpresaNF}
                />
  
                <datalist id="nameE">
                  {empresa.map((empresa) => (
                    <option
                      key={empresa.id}
                      value={`${empresa.id} - ${empresa.nameEmpresa} - ${empresa.cnpjEmpresa}`}
                    ></option>
                  ))}
                </datalist>
              </label>
  
              <Input
                type="text"
                maxLength="18"
                name="cnpjEmpresaNF"
                onChange={valorInput}
                value={data.cnpjEmpresaNF}
                className="col-span-2"
              />
  
              <Input
                type="text"
                name="idEmpresa"
                onChange={valorInput}
                value={data.idEmpresa}
                className="hidden"
              />
  
              <H1 className="col-span-4">Local Retido*</H1>
  
              <label className="col-span-1">
                <Input
                  type="text"
                  list="Retido"
                  name="retidoNF"
                  onChange={valorInput}
                  value={data.retidoNF}
                />
                <datalist id="Retido">
                  <option value="Retida em Outro Munic."></option>
                  <option value="Tributada"></option>
                </datalist>
              </label>
  
              <p className="col-span-3"></p>
  
              <H1 className="col-span-1">Numero(CNAE)</H1>
              <H1 className="col-span-3">Atividade (CNAE)</H1>
  
              <Input
                type="number"
                name="numeroKinayNF"
                onChange={valorInput}
                value={data.numeroKinayNF}
              />
  
              <label className="col-span-3 flex flex-row">
                <Input
                  type="text"
                  list="CNAE"
                  name="KinayNF"
                  onChange={valorInput}
                  value={data.KinayNF}
                />
                <datalist id="CNAE">
                  {kinays.map((kinay) => (
                    <option
                      key={kinay.id}
                      value={`${kinay.numeroKinay} - ${kinay.descricaoKinay} - ${
                        kinay.porcentagemKinay * 100
                      }%`}
                    ></option>
                  ))}
                </datalist>
              </label>
  
              <H1 className="col-span-1">Porcentagem(CNAE)</H1>
              <H1 className="col-span-3">Imposto</H1>
  
              <Input
                type="text"
                name="porcentagemKinayNF"
                onChange={valorInput}
                value={data.porcentagemKinayNF}
              />
  
              <label className="col-span-1 flex flex-row">
                <Input
                  type="text"
                  list="IMPST"
                  name="ImpostoNF"
                  onChange={valorInput}
                  value={data.ImpostoNF}
                />
  
                <datalist id="IMPST">
                  {impostos.map((imposto) => (
                    <option
                      key={imposto.id}
                      value={`${imposto.siglaImposto} - ${
                        imposto.porcentagemImposto * 100
                      }%`}
                    ></option>
                  ))}
                </datalist>
              </label>
              <p className="col-span-2"></p>
  
              <H1 className="col-span-1">Valor Total*</H1>
              <H1 className="col-span-1">Valor Imposto</H1>
              <H1 className="col-span-2">Valor á Receber</H1>
  
              <Input
                type="text"
                name="valorNF"
                onChange={valorInput}
                onBlur={calcularImposto}
                value={data.valorNF}
              />
  
              <Input
                maxLength="10"
                type="text"
                name="valorImpostoNF"
                onChange={valorInput}
                value={data.valorImpostoNF}
              />
  
              <Input
                maxLength="10"
                type="text"
                name="valorReceberNF"
                onChange={valorInput}
                value={data.valorReceberNF}
              />
  
              <H1 className="col-span-4">Descrição do Serviço</H1>
              <textarea
                type="text"
                name="descricaoServNF"
                onChange={valorInput}
                value={data.descricaoServNF}
                rows="3"
                className="col-span-4 border-2 border-gray-300 rounded-md px-2"
              ></textarea>
  
              <H1 className="col-span-1">Situação</H1>
              <H1 className="col-span-3">Data de Lançamento</H1>
  
              <Select
                name="situacaoNF"
                onChange={valorInput}
                value={data.situacaoNF}
              >
                <option></option>
                <option value="Em Análise">Em Análise</option>
                <option value="Recebida">Recebida</option>
                <option value="Antecipada">Antecipada</option>
              </Select>
  
              <Input
                type="date"
                name="dataNF"
                onChange={valorInput}
                value={data.dataNFNF}
              />
  
              <p className="col-span-2"></p>
  
              <H1 className="col-span-4">Prazo de pagamento*</H1>
  
              <label className="col-span-2">
                <Input
                  type="text"
                  list="PRAPAG"
                  name="prazoPagamentoNF"
                  onChange={valorInput}
                  value={data.prazoPagamentoNF}
                />
                <datalist id="PRAPAG">
                  <option value="90 Dias"></option>
                  <option value="45 Dias"></option>
                  <option value="15 Dias"></option>
                  <option value="7 Dias"></option>
                </datalist>
              </label>
              <H1 className="col-span-4">Observação</H1>
              <textarea
                type="text"
                name="observacaoNF"
                onChange={valorInput}
                value={data.observacaoNF}
                rows="3"
                className="col-span-4 border-2 border-gray-300 rounded-md px-2"
              ></textarea>
            </div>
  
            <section className="w-full flex justify-end my-4">
              <Button type="submit" className="">
                Salvar
              </Button>
            </section>
          </nav>
        </Form>
      </>
    );
}