import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../global/Global";
import { NumericFormat } from "react-number-format";
import { FaArrowDown } from "react-icons/fa";
import { Header } from "../../Componentes/Header";
import { Button } from "../../Componentes/Button";

const Form = styled.form`
  height: 100%;
  width: 100%;
  gap: 1em;
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #575757;
    border-radius: 1em;
  }
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

const InputDinheiro = styled(NumericFormat)`
  width: 100%;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  padding-left: 8px;
`;

export const TabelaAddFuncionario = () => {
  const { ip, empresa, cargo } = useGlobalContext();

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
    dataNascimento: "",
    dataAdmicaoFucionario: "",
    dataExames: "",
    dataFeriasFucionario: "",
    feriasPaga: 0,
    pisFucionario: "",
    salarioFucionario: null,
    funcaoFuncionario: "",
    horasTFucionario: "",
    CadastroEmprFuncionario: "",
    diasFaltas: 0,
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
      dataFeriasFucionario: dataFerias.toISOString().split("T")[0],
    });
  };

  const cargoCalc = cargo.find(
    (carg) => carg.nomeCargo === data.funcaoFuncionario
  );

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

    axios.put(
      ip + "/cargo/" + cargoCalc.id,
      {
        quantidadeCargo: cargoCalc.quantidadeCargo + 1,
      },
      headers
    );

    axios
      .post(ip + "/Funcionario", data, headers)
      .then((response) => {
        toast.success(response.data.message);
        setData({
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
          dataNascimento: "",
          dataAdmicaoFucionario: "",
          dataExames: "",
          dataFeriasFucionario: "",
          feriasPaga: 0,
          pisFucionario: "",
          salarioFucionario: null,
          funcaoFuncionario: "",
          horasTFucionario: "",
          CadastroEmprFuncionario: "",
          diasFaltas: 0,
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
      <Form onSubmit={sendFuncionario} className="relative">
        <Header>Adcionar Funcionario</Header>

        <div className="absolute bottom-[19%] right-2/4 z-50">
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
        <Section className="w-full overflow-auto relative pr-1" ref={navRef}>
          <div className=" grid grid-cols-5 gap-x-2">
            <H1 className="col-span-3">Nome*</H1>
            <H1 className="col-span-1">Data Nascimento*</H1>
            <H1 className="col-span-1">Gênero*</H1>

            <Input
              type="text"
              name="nameFucionario"
              onChange={valorInput}
              value={data.nameFucionario}
              className="col-span-3"
            />

            <Input
              type="date"
              name="dataNascimento"
              onChange={valorInput}
              value={data.dataNascimento}
              className="col-span-1"
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
              <option value="Solteiro">Solteiro</option>
              <option value="Casado">Casado</option>
              <option value="Separado">Separado</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Viúvo">Viúvo</option>
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

            <H1 className="col-span-1">Data Admissão*</H1>
            <H1 className="col-span-1">Data Exame</H1>
            <H1 className="col-span-4">Salário*</H1>

            <Input
              type="date"
              name="dataAdmicaoFucionario"
              onChange={valorInput}
              onBlur={calcFerias}
              value={data.dataAdmicaoFucionario}
              className="col-span-1 "
            />
            <Input
              type="date"
              name="dataExames"
              onChange={valorInput}
              value={data.dataExames}
              className="col-span-1"
            />

            <InputDinheiro
              type="text"
              value={data.salarioFucionario || ""}
              className="col-span-1"
              onValueChange={(e) => {
                setData({
                  ...data,
                  salarioFucionario: e.floatValue,
                });
              }}
              thousandSeparator="."
              decimalScale={2}
              fixedDecimalScale
              decimalSeparator=","
            />

            <p className="col-span-2"></p>
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
                <option key={cargo.id} value={cargo.nomeCargo}>
                  {cargo.nomeCargo}
                </option>
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
              <option value='Todas'>Cadastrado em Todas</option>
              {empresa.map((empresa) => (
                <option key={empresa.id} value={empresa.nameEmpresa}>
                  {empresa.nameEmpresa}
                </option>
              ))}
            </select>
          </div>
        </Section>
        <section className="w-full flex justify-end py-4">
          <Button type="submit" className="">
            Salvar
          </Button>
        </section>
      </Form>
    </>
  );
};
