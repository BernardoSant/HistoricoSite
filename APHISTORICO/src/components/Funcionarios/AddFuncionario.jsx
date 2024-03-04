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

export const TabelaAddFuncionario = () => {
  const { empresa, cargo } = useGlobalContext();

  const [data, setData] = useState({
    statuFucionario: "Admitido",
    nameFucionario: "",
    generoFucionario: "",
    cpfFucionario: "",
    rgFucionario: "",
    estadoCivilFucionario: "",
    paiFucionario: "",
    maeFucionario: "",
    ruaFucionario: "",
    numFucionario: "",
    municipioFucionario: "",
    estadoFucionario: "",
    bairroFucionario: "",
    complFucionario: "",
    ctpsFucionario: "",
    titEleitorFucionario: "",
    dataAdmicaoFucionario: "",
    dataFeriasFucionario: "",
    pisFucionario: "",
    salarioFucionario: "",
    funcaoFuncionario: "",
    horasTFucionario: "",
    CadastroEmprFuncionario: "",
  });

  // Receber os dados dos campos do formulário
  const valorInput = (e) => {
    let valor = e.target.value;
    if (e.target.name === "cpfFucionario") {
      valor = valor.replace(/\D/g, "");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else if (e.target.name === "cpfConjugueFucionario") {
      valor = valor.replace(/\D/g, "");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else if (e.target.name === "rgFucionario") {
      valor = valor.replace(/\D/g, "");
      valor = valor.replace(/(\d{2})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else if (e.target.name === "salarioFucionario") {
      valor = valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
    setData({ ...data, [e.target.name]: valor });
  };

  const calcFerias = () => {
    const dataAdmissao = data.dataAdmicaoFucionario;
    const dataFerias = new Date(dataAdmissao);
    dataFerias.setFullYear(dataFerias.getFullYear() + 1);

    setData({
      ...data,
      dataFeriasFucionario: dataFerias.toISOString().split('T')[0],
    });
  };
  
  const sendFuncionario = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (
      data.nameFucionario === "" ||
      data.cpfFucionario === "" ||
      data.rgFucionario === ""
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    axios
      .post("http://localhost:3030/Funcionario", data, headers)
      .then((response) => {
        toast.success(response.data.message);
        setData({
          nameFucionario: "",
          generoFucionario: "",
          cpfFucionario: "",
          rgFucionario: "",
          estadoCivilFucionario: "",
          paiFucionario: "",
          maeFucionario: "",
          ruaFucionario: "",
          numFucionario: "",
          municipioFucionario: "",
          estadoFucionario: "",
          bairroFucionario: "",
          complFucionario: "",
          ctpsFucionario: "",
          titEleitorFucionario: "",
          dataAdmicaoFucionario: "",
          dataFeriasFucionario: "",
          pisFucionario: "",
          salarioFucionario: "",
          funcaoFuncionario: "",
          horasTFucionario: "",
          CadastroEmprFuncionario: "",
        });
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  return (
    <>
      <Form onSubmit={sendFuncionario}>
        <Header>Adcionar Funcionario</Header>

        <nav className="flex flex-col justify-center ">
          <div className=" grid grid-cols-4 gap-x-2">
            <H1 className="col-span-3">Nome*</H1>
            <H1 className="col-span-1">Gênero*</H1>

            <Input
              type="text"
              name="nameFucionario"
              onChange={valorInput}
              value={data.nameFucionario}
              className="col-span-3 "
            />

            <select
              id="generoFucionario"
              name="generoFucionario"
              onChange={valorInput}
              value={data.generoFucionario}
              className="col-span-1 border-2 border-gray-300 rounded-md px-2 "
            >
              <option></option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>

          <div className=" grid grid-cols-3 gap-x-2">
            <H1 className="col-span-1">CPF*</H1>
            <H1 className="col-span-1">RG*</H1>
            <H1 className="col-span-1">Estado Civil*</H1>

            <Input
              type="text"
              maxLength="14"
              name="cpfFucionario"
              onChange={valorInput}
              value={data.cpfFucionario}
              className="col-span-1"
            />

            <Input
              type="text"
              maxLength="12"
              name="rgFucionario"
              onChange={valorInput}
              value={data.rgFucionario}
              className="col-span-1"
            />

            <select
              id="estadoCivilFucionario"
              name="estadoCivilFucionario"
              onChange={valorInput}
              value={data.estadoCivilFucionario}
              className="border-2 border-gray-300 rounded-md px-2 "
            >
              <option></option>
              <option value="Casado">Casado</option>
              <option value="Solteiro">Solteiro</option>
            </select>
          </div>

          <div className="grid grid-cols-4 gap-x-2">
            <H1 className="col-span-4">Pai*</H1>

            <Input
              type="text"
              name="paiFucionario"
              onChange={valorInput}
              value={data.paiFucionario}
              className="col-span-4 "
            />

            <H1 className="col-span-4">Mãe*</H1>

            <Input
              type="text"
              name="maeFucionario"
              onChange={valorInput}
              value={data.maeFucionario}
              className="col-span-4 "
            />
          </div>

          {/* Cadastro de endereço*/}
          <div className="grid grid-cols-4 gap-x-2">
            <H1 className="col-span-3">Rua*</H1>
            <H1 className="col-span-1">Numero*</H1>

            <Input
              type="text"
              name="ruaFucionario"
              onChange={valorInput}
              value={data.ruaFucionario}
              className="col-span-3 "
            />

            <Input
              type="number"
              name="numFucionario"
              onChange={valorInput}
              value={data.numFucionario}
              className="col-span-1 "
            />

            <H1 className="col-span-2">Munícipio*</H1>
            <H1 className="col-span-2">Estado*</H1>

            <Input
              type="text"
              name="municipioFucionario"
              onChange={valorInput}
              value={data.municipioFucionario}
              className="col-span-2 "
            />

            <Input
              type="text"
              name="estadoFucionario"
              onChange={valorInput}
              value={data.estadoFucionario}
              className="col-span-2 "
            />

            <H1 className="col-span-2">Bairro*</H1>
            <H1 className="col-span-2">Complemento*</H1>

            <Input
              type="text"
              name="bairroFucionario"
              onChange={valorInput}
              value={data.bairroFucionario}
              className="col-span-2 "
            />

            <Input
              type="text"
              name="complFucionario"
              onChange={valorInput}
              value={data.complFucionario}
              className="col-span-2"
            />
          </div>

          {/* Cadastro de Documentos*/}
          <div className="grid grid-cols-6 gap-x-2">
            <H1 className="col-span-2">CTPS*</H1>
            <H1 className="col-span-4">PIS*</H1>

            <Input
              maxLength="14"
              type="text"
              name="ctpsFucionario"
              onChange={valorInput}
              value={data.ctpsFucionario}
              className="col-span-2"
            />

            <Input
              maxLength="14"
              type="text"
              name="pisFucionario"
              onChange={valorInput}
              value={data.pisFucionario}
              className="col-span-2 "
            />

            <p className="col-span-2"></p>

            <H1 className="col-span-2">Data Admissão*</H1>
            <H1 className="col-span-4">Salário*</H1>

            <Input
              type="date"
              name="dataAdmicaoFucionario"
              onChange={valorInput}
              onBlur={calcFerias}
              value={data.dataAdmicaoFucionario}
              className="col-span-2 "
            />

            <Input
              type="text"
              name="salarioFucionario"
              onChange={valorInput}
              value={data.salarioFucionario}
              className="col-span-2"
            />
          </div>

          <div className="grid grid-cols-5 gap-x-2">
            <H1 className="col-span-1">Função*</H1>
            <H1 className="col-span-2">Horário de Trabalho*</H1>
            <H1 className="col-span-2">Cadastro Empresa</H1>

            <select
              id="funcaoFuncionario"
              name="funcaoFuncionario"
              onChange={valorInput}
              value={data.funcaoFuncionario}
              className="col-span-1 border-2 border-gray-300 rounded-md  py-[0.2em]"
            >
              <option></option>
              {cargo.map((cargo) => (
                <option key={cargo.id} value={cargo.nomeCargo}>{cargo.nomeCargo}</option>
              ))}
            </select>

            <select
              id="horasTFucionario"
              name="horasTFucionario"
              onChange={valorInput}
              value={data.horasTFucionario}
              className="col-span-2 border-2 border-gray-300 rounded-md px-3 py-[0.2em]"
            >
              <option></option>
              <option value="7:00h ás 16:00h">7:00h ás 16:00h</option>
            </select>

            <select
              id="CadastroEmprFuncionario"
              name="CadastroEmprFuncionario"
              onChange={valorInput}
              value={data.CadastroEmprFuncionario}
              className="col-span-2 border-2 border-gray-300 rounded-md px-3 py-[0.2em]"
            >
              <option></option>
              {empresa.map((empresa) => (
                <option key={empresa.id} value={empresa.nameEmpresa}>
                  {empresa.nameEmpresa}
                </option>
              ))}
            </select>
          </div>

          <section className="w-full flex justify-end py-4">
            <Button type="submit" className="">
              Salvar
            </Button>
          </section>
        </nav>
      </Form>
    </>
  );
};
