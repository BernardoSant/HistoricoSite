import styled from "styled-components";
import { useGlobalContext } from "../../../global/Global";
import { BiCategory } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { TbPencilCog, TbAlignLeft, TbArrowForward } from "react-icons/tb";
import { LoaderClin } from "../../Loaders/LoaderClin";
import { NumericFormat } from "react-number-format";
import { dateFormat } from "../../../functions/dateFormat";
import { FaArrowDown } from "react-icons/fa";
import { Header } from "../../Componentes/Header";
import { Button } from "../../Componentes/Button";

const Div = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Article = styled.article`
  width: 100%;
  height: 100%;
  overflow: auto;
  margin-top: 4px;
  margin-bottom: 8px;
  border-radius: 1em;
  overflow: auto;
  position: relative;
  padding-right: 4px;
  padding-bottom: 3em;

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
  font-size: 1.1vw;
  @media (min-width: 1640px) {
    font-size: 0.7vw;
  }
`;

const H2 = styled(H1)`
  font-weight: 500;
  margin-top: 5px;
  background-color: #d1d5db7d;
  padding-left: 7px;
  padding-right: 7px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 4px;
`;

const Input = styled.input`
  width: 100%;
  border: 2px solid #d1d5db;
  max-width: 40em;
  padding-left: 8px;
`;
const InputDinheiro = styled(NumericFormat)`
  width: 100%;
  border: 2px solid #d1d5db;
  max-width: 40em;
  padding-left: 8px;
`;

const Buttonn = styled.button`
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 600;
  font-size: 1.1vw;
  @media (min-width: 1280px) {
    font-size: 0.6vw;
  }
  border-radius: 9999px;
  --tw-drop-shadow: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
    drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast)
    var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate)
    var(--tw-sepia) var(--tw-drop-shadow);
`;

export const MostruarioFuncAdmitido = () => {
  const { ip, funcionario, empresa, ferias, cargo, impostos } =
    useGlobalContext();
  const [carregando, setCarregando] = useState(false);

  const FuncionariosAdmitidos = funcionario.filter(
    (funcionario) => funcionario.statuFucionario === "Admitido"
  );

  FuncionariosAdmitidos.sort((a, b) =>
    a.nameFucionario.localeCompare(b.nameFucionario)
  );

  function getInitials(name) {
    const splitName = name.trim().split(" ");

    if (splitName.length === 1) {
      return splitName[0];
    } else if (splitName.length === 2) {
      return `${splitName[0]} ${splitName[1]}`;
    } else {
      return `${splitName[0]} ${splitName[1]} .${splitName[2]
        .charAt(0)
        .toUpperCase()}`;
    }
  }

  const [data, setData] = useState({
    nameFucionario: "",
    cpfFucionario: "",
    rgFucionario: "",
    estadoCivilFucionario: "",
    ruaFucionario: "",
    numFucionario: "",
    municipioFucionario: "",
    estadoFucionario: "",
    bairroFucionario: "",
    complFucionario: "",
    ctpsFucionario: "",
    dataAdmicaoFucionario: "",
    dataExames: "",
    dataExamesNew: "",
    dataFeriasFucionario: "",
    pisFucionario: "",
    salarioFucionario: null,
    funcaoFuncionario: "",
    horasTFucionario: "",
    CadastroEmprFuncionario: "",
    diasFaltas: 0,
  });

  const valorInput = (e) => {
    let valor = e.target.value;
    if (e.target.name === "cpfFucionario") {
      valor = valor.replace(/\D/g, "");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else if (e.target.name === "rgFucionario") {
      valor = valor.replace(/\D/g, "");
      valor = valor.replace(/(\d{2})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else if (e.target.name === "ctpsFucionario") {
      valor = valor.replace(/\D/g, "");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else if (e.target.name === "pisFucionario") {
      valor = valor.replace(/\D/g, "");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{5})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{2})(\d{1,2})$/, "$1-$2");
    }
    setData({ ...data, [e.target.name]: valor });
  };

  const cargoCalc = cargo.find(
    (carg) => carg.nomeCargo === data.funcaoFuncionario
  );

  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const [funcionarioEditar, setFuncionarioEditar] = useState(null);

  useEffect(() => {
    if (funcionarioSelecionado) {
      setData((prevData) => ({ ...prevData, ...funcionarioSelecionado }));
      setDataFerias({
        ...dataFerias,
        idFuncionario: funcionarioSelecionado.id,
      });
    }
  }, [funcionarioSelecionado]);

  useEffect(() => {
    if (funcionarioEditar) {
      setData((prevData) => ({ ...prevData, ...funcionarioEditar }));
    }
  }, [funcionarioEditar]);

  if (funcionarioSelecionado) {
    const FuncionarioFerias = ferias.filter(
      (ferias) => ferias.idFuncionario === funcionarioSelecionado.id
    );
    const hoje = new Date();
    const dataAdimicao = new Date(funcionarioSelecionado.dataAdmicaoFucionario);
    const dataFerias = new Date(dataAdimicao);
    dataFerias.setFullYear(dataFerias.getFullYear() + 1);
    const dataNasc = new Date(funcionarioSelecionado.dataNascimento);
    const dataExames = new Date(funcionarioSelecionado.dataExames);

    const opcoes = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    // Cálculo da idade
    var idade = hoje.getFullYear() - dataNasc.getFullYear();
    const mesIdade = hoje.getMonth() - dataNasc.getMonth();
    if (
      mesIdade < 0 ||
      (mesIdade === 0 && hoje.getDate() < dataNasc.getDate())
    ) {
      idade--;
    }

    // Cálculo da quantidade de férias
    let Qferias = hoje.getFullYear() - dataAdimicao.getFullYear();
    const mesFerias = hoje.getMonth() - dataAdimicao.getMonth();
    if (
      mesFerias < 0 ||
      (mesFerias === 0 && hoje.getDate() < dataAdimicao.getDate())
    ) {
      Qferias--;
    }

    for (let i = 0; i < Qferias; i++) {
      dataFerias.setFullYear(dataFerias.getFullYear() + 1);
    }

    var feriass = Qferias - FuncionarioFerias.length;
    var dataFormatadaAdmicao = dataAdimicao.toLocaleDateString("pt-BR", opcoes);
    var dataFormatadaFerias = dataFerias.toLocaleDateString("pt-BR", opcoes);
    var dataFormatadaNasc = dateFormat(dataNasc);
    var dataFormatadaExames = dataExames.toLocaleDateString("pt-BR", opcoes);
  }

  const updateFuncionario = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .put(ip + "/funcionario/" + funcionarioSelecionado.id, data, headers)
      .then((response) => {
        toast.success(response.data.message);
        setFuncionarioEditar(null);
        setCarregando(true);
        setTimeout(() => {
          setCarregando(false);
        }, 3500);
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  const [dataFerias, setDataFerias] = useState({
    idFuncionario: null,
    situacaoFerias: "Ferias Vendida",
    dataInicioFerias: null,
    dataFinalizacaoFerias: null,
    valorFerias: null,
  });

  const valorInputFerias = (e) => {
    let valor = e.target.value;
    let name = e.target.name;

    if (
      e.target.name === "dataInicioFerias" &&
      feriasPaga.FeriasPaga === false
    ) {
      const dataInicio = new Date(valor);
      const dataFinalizacao = new Date(dataInicio);

      dataFinalizacao.setMonth(dataFinalizacao.getMonth() + 1);
      setDataFerias({
        ...dataFerias,
        situacaoFerias: "Em Ferias",
        idFuncionario: funcionarioSelecionado.id,
        dataInicioFerias: dataInicio.toISOString().split("T")[0],
        dataFinalizacaoFerias: dataFinalizacao.toISOString().split("T")[0],
      });
    } else {
      setDataFerias({
        ...dataFerias,
        [e.target.name]: valor,
      });
    }
  };

  const sendFerias = async (e) => {
    e.preventDefault();
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(ip + "/ferias", dataFerias, headers)
      .then((response) => {
        setDataFerias({
          idFuncionario: funcionarioSelecionado.id,
          situacaoFerias: "Ferias Vendida",
          dataInicioFerias: "",
          dataFinalizacaoFerias: null,
          valorFerias: "",
        });
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
    axios.put(
      ip + "/funcionario/" + funcionarioSelecionado.id,
      { feriasPaga: funcionarioSelecionado.feriasPaga + 1 },
      headers
    );
  };

  const sendExames = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .put(
        ip + "/funcionario/" + funcionarioSelecionado.id,
        { dataExames: data.dataExamesNew },
        headers
      )
      .then((response) => {
        setDataFerias({
          dataExamesNew: "",
        });
        toast.success("Data de exames enviada com sucesso!");
      })
      .catch((err) => {
        toast.info("ERRO: Data de exames não foi enviada com sucesso!");
      });
  };

  const demitirFuncionario = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios.put(
      ip + "/cargo/" + cargoCalc.id,
      {
        quantidadeCargo: cargoCalc.quantidadeCargo - 1,
      },
      headers
    );

    axios
      .put(
        ip + "/funcionario/" + funcionarioSelecionado.id,
        { statuFucionario: "Demitido" },
        headers
      )
      .then((response) => {
        toast.success("Funcionário demitido com sucesso!");
        handleClick("Alerta");
        setFuncionarioSelecionado(null);
        setCarregando(true);
        setTimeout(() => {
          setCarregando(false);
        }, 3500);
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  const AddFalta = (idFuncionario, valor, diasFaltas) => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (valor === 1) {
      var TotalFaltas = diasFaltas + 1;
      axios.put(
        ip + "/funcionario/" + idFuncionario,
        { diasFaltas: TotalFaltas },
        headers
      );
    } else if (valor === 2 && diasFaltas != 0) {
      var TotalFaltas = diasFaltas - 1;
      axios.put(
        ip + "/funcionario/" + idFuncionario,
        { diasFaltas: TotalFaltas },
        headers
      );
    }
  };

  const [feriasPaga, setFeriasPaga] = useState({
    FeriasPaga: false,
  });

  const handleFerias = (key) => {
    setFeriasPaga((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      ...(key !== "FeriasPaga" && {
        FeriasPaga: false,
      }),
    }));

    setDataFerias({
      idFuncionario: funcionarioSelecionado.id,
      situacaoFerias: "Ferias Vendida",
      dataInicioFerias: null,
      dataFinalizacaoFerias: null,
      valorFerias: null,
    });
  };

  const [state, setState] = useState({
    Menu: false,
    AddFerias: false,
    TipoFerias: false,
    AddExames: false,
    Alerta: false,
  });
  const handleClick = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      ...(key !== "FeriasPaga" && {
        FeriasPaga: false,
      }),
      ...(key !== "AddFerias" && {
        AddFerias: false,
      }),
      ...(key !== "AddExames" && {
        AddExames: false,
      }),
    }));

    setFeriasPaga((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      ...(key !== "FeriasPaga" && {
        FeriasPaga: false,
      }),
    }));

    setDataFerias({
      idFuncionario: funcionarioSelecionado.id,
      situacaoFerias: "Ferias Vendida",
      dataInicioFerias: null,
      dataFinalizacaoFerias: null,
      valorFerias: null,
    });
  };

  const impostoSalarioINSS = impostos.find(
    (imposto) => imposto.siglaImposto.toLowerCase() === "salarioinss"
  );

  let impostoSalario = 0;
  if (!impostoSalarioINSS) {
    impostoSalario = 0;
    toast.info("Imposto salarioINSS não encontrado, crie na pagina (OUTROS)!");
  } else {
    impostoSalario = impostoSalarioINSS.porcentagemImposto;
  }

  const valorTotalSalario = FuncionariosAdmitidos.reduce((total, func) => {
    const salarioTotal = func.salarioFucionario;
    const salarioDia = salarioTotal / 30;
    const salarioMes = salarioDia * 30;
    const salarioMesImposto = salarioMes - salarioMes * impostoSalario;
    const descontoPorFalta = salarioDia * func.diasFaltas;

    return total + salarioMesImposto - descontoPorFalta;
  }, 0);

  const adiantamentoSalario = FuncionariosAdmitidos.reduce((total, func) => {
    const salarioTotal = func.salarioFucionario;
    const salarioDia = salarioTotal / 30;
    const salarioMes = salarioDia * 30;
    const procentagemAdiantamento = 0.4;
    const adiantamento = salarioMes * procentagemAdiantamento; // 0.4 E IGUAL A PORCENTAGEM DE ADIANTAMENTO

    return total + adiantamento;
  }, 0);

  const impostoSalarioFGTS = impostos.find(
    (imposto) => imposto.siglaImposto.toLowerCase() === "fgts"
  );

  let impostoFGTS = 0;
  if (!impostoSalarioFGTS) {
    impostoFGTS = 0;
    toast.info("Imposto FGTS não encontrado, crie na pagina (OUTROS)!");
  } else {
    impostoFGTS = impostoSalarioFGTS.porcentagemImposto;
  }

  const fgtsSalario = FuncionariosAdmitidos.reduce((total, func) => {
    const salarioTotal = func.salarioFucionario;
    const salarioDia = salarioTotal / 30;
    const salarioMes = salarioDia * 30;
    const descontoPorFalta = salarioDia * func.diasFaltas;
    const salarioFunc = salarioMes - descontoPorFalta;
    const inssSobSalario = salarioFunc * impostoFGTS;

    return total + inssSobSalario;
  }, 0);

  const valorSalario = FuncionariosAdmitidos.reduce((total, func) => {
    return valorTotalSalario - adiantamentoSalario;
  }, 0);

  function renderInfo(title, value) {
    return (
      <div>
        <h1 className="col-span-1 text-center text-[1.3vw] xl:text-[0.8vw] font-bold">
          {title}:
        </h1>
        <h1 className="col-span-1 text-center px-3 text-[1.3vw] xl:text-[0.8vw] ">
          {Number(value.toFixed(2)).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h1>
      </div>
    );
  }

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

  const handleClickEnd = () => {
    const navElement = navRef.current;
    if (navElement) {
      navElement.scrollTop = navElement.scrollHeight;
    }
  };

  const [funcState, setFuncState] = useState({});

  const ButtoSelecao = (id) => {
    const novoEstado = Object.keys(funcState).reduce((obj, key) => {
      obj[key] = false;
      setState((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
      return obj;
    }, {});

    novoEstado[id] = true;
    novoEstado[id] = !funcState[id];

    setFuncState(novoEstado);
  };

  return (
    <Div>
      {state.Alerta && (
        <p className="absolute top-0 right-0 bg-[#7a7a7a67] w-full h-full z-20 flex justify-center items-center">
          <div className="w-2/4 h-1/3 bg-slate-100 rounded-[1em] shadow-lg border-4 border-CorSecundariaBT flex flex-col justify-center items-center relative">
            <h1 className="text-[1.5vw] font-semibold">ALERTA!</h1>
            <h2 className="text-[1.1vw]">
              Você tem certeza que deseja Demitir este funcionario(a)?
            </h2>
            <dir className="absolute bottom-0 right-0 p-5 px-6 flex gap-3">
              <botton
                className="bg-slate-300 drop-shadow-sm px-4 py-1 rounded-[0.5em] text-[0.9vw] font-semibold cursor-pointer"
                onClick={() => handleClick("Alerta")}
              >
                NÃO
              </botton>
              <botton
                className="bg-CorPrimariaBT drop-shadow-sm px-4 py-1 rounded-[0.5em] text-[0.9vw] font-semibold cursor-pointer"
                onClick={demitirFuncionario}
              >
                SIM
              </botton>
            </dir>
          </div>
        </p>
      )}

      {carregando ? (
        <LoaderClin></LoaderClin>
      ) : funcionarioEditar ? (
        <Article className="relative">
          <div className="flex w-full justify-end fixed top-10 right-10 z-50">
            <div
              onClick={() => setFuncionarioEditar(null)}
              className="bg-red-600 text-[1.2vw] p-1 rounded-full cursor-pointer
              "
            >
              <TbArrowForward />
            </div>
          </div>
          <form
            onSubmit={updateFuncionario}
            className=" grid grid-cols-6 gap-x-2 mt-3 relative"
          >
            <h3 className="text-3xl mb-5 font-semibold col-span-6 ml-3">
              Identificação
            </h3>
            <p className="col-span-1 row-span-4 flex justify-center items-center">
              <img
                className="w-30 h-32 drop-shadow-lg"
                src="data:image/png;base64,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"
                alt=""
              />
            </p>
            <H1 className="col-span-3">Nome</H1>
            <H1 className="col-span-1">Idade</H1>
            <H1 className="col-span-1">Data Nasc.</H1>
            <Input
              className="col-span-3"
              type="text"
              onChange={valorInput}
              name="nameFucionario"
              value={data.nameFucionario}
            />
            <H2>{idade}</H2>
            <H2>{dataFormatadaNasc}</H2>
            <H1 className="col-span-1">Gênero</H1>
            <H1 className="col-span-1">CPF</H1>
            <H1 className="col-span-2">RG</H1>
            <H1 className="col-span-1">Estado Civil</H1>
            <H2>{data.generoFucionario}</H2>
            <Input
              maxLength="14"
              className="col-span-1"
              type="text"
              onChange={valorInput}
              name="cpfFucionario"
              value={data.cpfFucionario}
            />
            <Input
              maxLength="12"
              className="col-span-2"
              type="text"
              onChange={valorInput}
              name="rgFucionario"
              value={data.rgFucionario}
            />
            <select
              id="estadoCivilFucionario"
              name="estadoCivilFucionario"
              onChange={valorInput}
              value={data.estadoCivilFucionario}
              className="col-span-1 border-2 border-gray-300 rounded-md px-2 "
            >
              <option></option>
              <option value="Casado">Casado</option>
              <option value="Solteiro">Solteiro</option>
            </select>
            <p className="mt-3 col-span-6"></p>
            <H1 className="col-span-3">Pai</H1>
            <H1 className="col-span-3">Mãe</H1>
            <H2 className="col-span-3">{data.paiFucionario}</H2>
            <H2 className="col-span-3">{data.maeFucionario}</H2>
            <H1 className="col-span-2">Lougradouro</H1>
            <H1 className="col-span-3">Bairro</H1>
            <H1 className="col-span-1">Número</H1>
            <Input
              className="col-span-2"
              type="text"
              onChange={valorInput}
              name="ruaFucionario"
              value={data.ruaFucionario}
            />
            <Input
              className="col-span-3"
              type="text"
              onChange={valorInput}
              name="bairroFucionario"
              value={data.bairroFucionario}
            />
            <Input
              className="col-span-1"
              type="number"
              onChange={valorInput}
              name="numFucionario"
              value={data.numFucionario}
            />
            <H1 className="col-span-1">Cidade</H1>
            <H1 className="col-span-5">Estado</H1>
            <Input
              className="col-span-1"
              type="text"
              onChange={valorInput}
              name="municipioFucionario"
              value={data.municipioFucionario}
            />
            <Input
              className="col-span-1"
              type="text"
              onChange={valorInput}
              name="municipioFucionario"
              value={data.municipioFucionario}
            />
            <h3 className="text-3xl my-4 font-semibold col-span-5 ml-3">
              Documentos
            </h3>
            <H1 className="col-span-2">CTPS</H1>
            <H1 className="col-span-4">PIS</H1>
            <Input
              maxLength="14"
              className="col-span-2"
              type="text"
              onChange={valorInput}
              name="ctpsFucionario"
              value={data.ctpsFucionario}
            />
            <Input
              maxLength="14"
              className="col-span-2"
              type="text"
              onChange={valorInput}
              name="pisFucionario"
              value={data.pisFucionario}
            />
            <p className=" col-span-2"></p>
            <H1 className="col-span-2">Função</H1>
            <H1 className="col-span-2">Salario</H1>
            <H1 className="col-span-1">Horas trabalhada</H1>
            <H1 className="col-span-1">Data Admição</H1>
            <select
              id="funcaoFuncionario"
              name="funcaoFuncionario"
              onChange={valorInput}
              value={data.funcaoFuncionario}
              className="col-span-2 border-2 border-gray-300 rounded-md  py-[0.2em]"
            >
              <option></option>
              {cargo.map((crg) => (
                <option value={crg.nomeCargo}>{crg.nomeCargo}</option>
              ))}
            </select>

            <InputDinheiro
              className="col-span-2"
              type="text"
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
              value={data.salarioFucionario || ""}
            />
            <Input
              className="col-span-1"
              type="text"
              onChange={valorInput}
              name="horasTFucionario"
              value={data.horasTFucionario}
            />
            <H2 className="col-span-1">{data.dataAdmicaoFucionario}</H2>
            <H1 className="col-span-1">Data Ferias</H1>
            <H1 className="col-span-1">Quant Ferias</H1>
            <H1 className="col-span-4">Cadastro em Empresa</H1>
            <H2 className="col-span-1">{dataFormatadaFerias}</H2>
            <H2 className="col-span-1">{feriass}</H2>
            <select
              id="CadastroEmprFuncionario"
              name="CadastroEmprFuncionario"
              onChange={valorInput}
              value={data.CadastroEmprFuncionario}
              className="col-span-4 border-2 border-gray-300 rounded-md px-3 py-[0.2em]"
            >
              <option></option>
              {empresa.map((empresa) => (
                <option key={empresa.id} value={empresa.nameEmpresa}>
                  {empresa.nameEmpresa}
                </option>
              ))}
            </select>
            <div className="col-span-6 flex justify-end fixed bottom-10 right-12">
              <Button
                type="submit"
                className=" mt-4  font-semibold hover:text-white hover:scale-95 duration-500 mb-3"
              >
                Salvar
              </Button>
            </div>
          </form>
        </Article>
      ) : funcionarioSelecionado ? (
        <Article className="w-full relative">
          <section className="flex w-full justify-end top-10 right-10 gap-2 fixed">
            <article className="w-full flex flex-col relative items-end">
              <dir
                className={` ${
                  state.Menu &&
                  "bg-slate-200 flex flex-col  rounded-[1.5em] p-2 gap-3 absolute drop-shadow-lg"
                }`}
              >
                <div className="flex gap-3">
                  {state.Menu && (
                    <div className="flex justify-between gap-2 w-auto  rounded-full ">
                      <Buttonn
                        className="bg-green-500 z-10"
                        onClick={() => handleClick("AddExames")}
                      >
                        Adicionar Exames
                      </Buttonn>

                      <Buttonn
                        className="bg-yellow-500 z-10"
                        onClick={() => handleClick("AddFerias")}
                      >
                        Adicionar Ferias
                      </Buttonn>

                      <Buttonn
                        onClick={() => handleClick("Alerta")}
                        className="bg-red-500 z-10"
                      >
                        Demitir
                      </Buttonn>
                    </div>
                  )}

                  <button
                    onClick={() => handleClick("Menu")}
                    className={`bg-gray-400 text-[1.2vw] w-auto p-1 flex justify-center items-center rounded-full drop-shadow-lg ${
                      state.Menu ? "mt-0 " : "mt-2"
                    }`}
                  >
                    {state.Menu ? <AiOutlineRight /> : <AiOutlineLeft />}
                  </button>
                </div>
                {state.AddFerias ? (
                  <div className="bg-slate-300 rounded-[1.5em] drop-shadow-lg grid grid-cols-5">
                    {feriasPaga.FeriasPaga ? (
                      <>
                        <form
                          onSubmit={sendFerias}
                          id="fromFeriasPaga"
                          className=" p-2 px-4 grid grid-cols-5 col-span-5 gap-2"
                        >
                          <div className=" grid grid-cols-5 col-span-5">
                            <H1 className="col-span-1 flex justify-center items-center">
                              Valor:
                            </H1>
                            <InputDinheiro
                              className="rounded-[1.5em] text-center col-span-4 shadow-inner px-2"
                              type="text"
                              placeholder="1000.00"
                              value={dataFerias.valorFerias || ""}
                              onValueChange={(e) => {
                                setDataFerias({
                                  ...dataFerias,
                                  valorFerias: e.floatValue,
                                });
                              }}
                              thousandSeparator="."
                              decimalScale={2}
                              fixedDecimalScale
                              decimalSeparator=","
                            />
                          </div>
                          <div className=" grid grid-cols-5 col-span-5 gap-2">
                            <H1 className="col-span-1 flex justify-center items-center">
                              Data:
                            </H1>
                            <Input
                              className="rounded-[1.5em] text-center col-span-4 shadow-inner px-2"
                              type="date"
                              value={dataFerias.dataInicioFerias}
                              name="dataInicioFerias"
                              onChange={valorInputFerias}
                            />
                          </div>
                        </form>
                      </>
                    ) : (
                      <>
                        <form
                          onSubmit={sendFerias}
                          id="fromFerias"
                          className=" p-2 px-4 grid grid-cols-5 col-span-5 gap-2"
                        >
                          <H1 className="col-span-1 flex justify-center items-center">
                            Dé:
                          </H1>
                          <input
                            className="rounded-[1.5em] text-center col-span-4 shadow-inner px-2"
                            type="date"
                            onChange={valorInputFerias}
                            name="dataInicioFerias"
                            value={dataFerias.dataInicioFerias}
                          />
                          <H1 className="col-span-1 flex justify-center items-center">
                            Ate:
                          </H1>
                          <input
                            className="rounded-[1.5em] text-center col-span-4 shadow-inner px-2"
                            type="date"
                            onChange={valorInputFerias}
                            name="dataFinalizacaoFerias"
                            value={dataFerias.dataFinalizacaoFerias}
                          />
                        </form>
                      </>
                    )}

                    <H1 className="col-span-3 flex justify-center items-center">
                      Vender Ferias
                    </H1>

                    <label className="relative inline-flex items-center cursor-pointer my-2">
                      <input
                        type="checkbox"
                        onClick={() => handleFerias("FeriasPaga")}
                        className="sr-only peer"
                      />
                      <div
                        className="text-sm group peer ring-0 bg-gradient-to-tr from-red-300 to-red-500  
                      rounded-full outline-none duration-300 after:duration-300 w-12 h-6  shadow-md peer-checked:bg-green-500  
                      peer-focus:outline-none   after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-5
                      after:w-5 after:top-0.5 after:left-0.5 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 
                      peer-hover:after:scale-95 peer-checked:after:rotate-0 peer-checked:bg-gradient-to-tr peer-checked:from-green-300
                     peer-checked:to-lime-500"
                      ></div>
                    </label>

                    <button
                      form={
                        feriasPaga.FeriasPaga ? "fromFeriasPaga" : "fromFerias"
                      }
                      type="submit"
                      className="col-span-5 bg-orange-600 font-bold rounded-full text-lg p-0.7 shadow-inner m-2"
                    >
                      Salvar
                    </button>
                  </div>
                ) : state.AddExames ? (
                  <div className="bg-slate-300 rounded-[1.5em] drop-shadow-lg flex flex-col">
                    <form
                      onSubmit={sendExames}
                      id="fromExames"
                      className=" p-2 px-4 flex flex-row gap-5 justify-center items-center"
                    >
                      <H1 className="col-span-1 flex justify-center items-center">
                        Data Exame:
                      </H1>
                      <input
                        className="rounded-[1.5em] text-center col-span-4 shadow-inner px-2"
                        type="date"
                        onChange={valorInput}
                        name="dataExamesNew"
                        value={data.dataExamesNew}
                      />
                    </form>
                    <p className="flex justify-center items-center ">
                      <button
                        form={
                          feriasPaga.FeriasPaga
                            ? "fromFeriasPaga"
                            : state.AddExames
                            ? "fromExames"
                            : "fromFerias"
                        }
                        type="submit"
                        className="w-full px-10 bg-orange-600 font-bold rounded-full text-lg p-0.7 shadow-inner m-2"
                      >
                        Salvar
                      </button>
                    </p>
                  </div>
                ) : null}
              </dir>
            </article>

            <article className="mt-2">
              <div className="flex gap-2">
                <div
                  onClick={() => setFuncionarioEditar(funcionarioSelecionado)}
                  className={`bg-green-600 p-1 text-[1.2vw] rounded-full flex justify-center items-center${
                    state.Menu && "mt-0"
                  }`}
                  title="Editar Funcionário"
                >
                  <TbPencilCog />
                </div>
                <div
                  onClick={() => setFuncionarioSelecionado(null)}
                  className={`bg-orange-600 p-1 text-[1.2vw] rounded-full flex justify-center items-center ${
                    state.Menu && "mt-0"
                  }`}
                  title="Fechar"
                >
                  <TbArrowForward />
                </div>
              </div>
            </article>
          </section>

          <div className="pb-3 grid grid-cols-6 gap-x-2 mt-3">
            <h3 className="text-3xl mb-5 font-semibold col-span-6 ml-3">
              Identificação
            </h3>

            <p className="col-span-1 row-span-4 flex justify-center items-center">
              <img
                className="w-30 h-32 drop-shadow-lg"
                src="data:image/png;base64,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"
                alt=""
              />
            </p>
            <H1 className="col-span-3">Nome</H1>
            <H1 className="col-span-1">Idade</H1>
            <H1 className="col-span-1">Data Nasc.</H1>
            <H2 className="col-span-3">{data.nameFucionario}</H2>
            <H2 className="col-span-1">{idade}</H2>
            <H2 className="col-span-1">{dataFormatadaNasc}</H2>

            <H1 className="col-span-1">Gênero</H1>
            <H1 className="col-span-1">CPF</H1>
            <H1 className="col-span-2">RG</H1>
            <H1 className="col-span-1">Estado Civil</H1>

            <H2 className="col-span-1">{data.generoFucionario}</H2>
            <H2 className="col-span-1">{data.cpfFucionario}</H2>
            <H2 className="col-span-2">{data.rgFucionario}</H2>
            <H2 className="col-span-1">{data.estadoCivilFucionario}</H2>

            <p className="mt-3 col-span-6"></p>

            <H1 className="col-span-3">Pai</H1>
            <H1 className="col-span-3">Mãe</H1>

            <H2 className="col-span-3">{data.paiFucionario}</H2>
            <H2 className="col-span-3">{data.maeFucionario}</H2>

            <H1 className="col-span-2">Lougradouro</H1>
            <H1 className="col-span-3">Bairro</H1>
            <H1 className="col-span-1">Número</H1>

            <H2 className="col-span-2">{data.ruaFucionario}</H2>
            <H2 className="col-span-3">{data.bairroFucionario}</H2>
            <H2 className="col-span-1">{data.numFucionario}°</H2>

            <H1 className="col-span-1">Cidade</H1>
            <H1 className="col-span-5">Estado</H1>
            <H2 className="col-span-1">{data.municipioFucionario}</H2>
            <H2 className="col-span-1">{data.estadoFucionario}</H2>

            <h3 className="text-3xl my-4 font-semibold col-span-5 ml-3">
              Documentos
            </h3>

            <H1 className="col-span-2">CTPS</H1>
            <H1 className="col-span-4">PIS</H1>

            <H2 className="col-span-2">{data.ctpsFucionario}</H2>
            <H2 className="col-span-2">{data.pisFucionario}</H2>
            <p className=" col-span-2"></p>

            <H1 className="col-span-2">Função</H1>
            <H1 className="col-span-1">Salario</H1>
            <H1 className="col-span-1">Horas trabalhada</H1>
            <H1 className="col-span-1">Data Admição</H1>
            <H1 className="col-span-1">Data Exame</H1>

            <H2 className="col-span-2">{data.funcaoFuncionario}</H2>
            <H2 className="col-span-1">
              {Number(data.salarioFucionario).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </H2>
            <H2 className="col-span-1">{data.horasTFucionario}</H2>
            <H2 className="col-span-1">{dataFormatadaAdmicao}</H2>
            <H2 className="col-span-1">{dataFormatadaExames}</H2>

            <H1 className="col-span-1">Ferias</H1>
            <H1 className="col-span-1">Quant Ferias</H1>
            <H1 className="col-span-4">Cadastro em Empresa</H1>

            <H2 className="col-span-1">{dataFormatadaFerias}</H2>
            <H2 className="col-span-1">{feriass}</H2>
            <H2 className="col-span-4">{data.CadastroEmprFuncionario}</H2>
          </div>
        </Article>
      ) : (
        <>
          <div className="absolute bottom-[11%] right-2/4 z-50">
            {isScrollable && !isScrolledToBottom && (
              <div className="flex flex-col justify-center items-center">
                <h1
                  className="text-xl bg-gray-400 p-1 rounded-full opacity-60"
                  onClick={handleClickEnd}
                >
                  <FaArrowDown />
                </h1>
              </div>
            )}
            {/* O resto do seu conteúdo vai aqui */}
          </div>

          <Header>
            <div className="flex flex-col">
              <div className="flex items-center w-full">
                <th className="text-start text-3xl ">Funcionarios Admitidos</th>
              </div>

              <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] justify-center items-center w-full rounded-b-lg drop-shadow-2xl pb-1 text-center text-[1.4vw] xl:text-[0.95vw]">
                <th className="col-span-2">Faltas</th>
                <th className="col-span-3">Nome</th>
                <th className="col-span-2">Cargo</th>
                <th className="col-span-2">Adiantamento</th>
                <th className="col-span-2">Salario</th>
                <th className="col-span-2">Salario.Liq</th>
                <th className="col-span-3">Situação</th>
              </div>
            </div>
          </Header>
          <Article ref={navRef}>
            {FuncionariosAdmitidos.map((func) => {
              const dataAdimicao = new Date(func.dataAdmicaoFucionario);
              let opcoes = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              };
              let dataFormatada = dataAdimicao.toLocaleDateString(
                "pt-BR",
                opcoes
              );
              let nameWithInitials = getInitials(func.nameFucionario);

              const hoje = new Date();

              const dataFerias = new Date(dataAdimicao);
              dataFerias.setFullYear(dataFerias.getFullYear() + 1);

              const dataExames = new Date(func.dataExames);
              dataExames.setFullYear(dataExames.getFullYear() + 1);

              let Qferias = hoje.getFullYear() - dataAdimicao.getFullYear();
              const mesFerias = hoje.getMonth() - dataAdimicao.getMonth();
              if (
                mesFerias < 0 ||
                (mesFerias === 0 && hoje.getDate() < dataAdimicao.getDate())
              ) {
                Qferias--;
              }

              for (let i = 0; i < Qferias; i++) {
                dataFerias.setFullYear(dataFerias.getFullYear() + 1);
              }

              const diferenca = dataFerias - hoje;
              const diferencaExame = dataExames - hoje;

              // Converte a diferença para dias
              let diasRestantesFerias = Math.ceil(
                diferenca / (24 * 60 * 60 * 1000)
              );

              let diasRestantesExames = Math.ceil(
                diferencaExame / (24 * 60 * 60 * 1000)
              );

              const feriasAndamento = ferias.filter(
                (f) =>
                  f.situacaoFerias === "Em Ferias" &&
                  f.idFuncionario === func.id
              );

              const feriasEmAndamento = feriasAndamento.some((f) => {
                const inicioFerias = new Date(f.dataInicioFerias);
                const finalFerias = new Date(f.dataFinalizacaoFerias);
                return inicioFerias <= hoje && hoje <= finalFerias;
              });

              const salarioTotal = func.salarioFucionario;
              const salarioDia = salarioTotal / 30;
              const salarioMes = salarioDia * 30;
              const salarioMesImposto =
                salarioMes - salarioMes * impostoSalario;
              const descontoPorFalta = salarioDia * func.diasFaltas;

              var restoSalario = 0;

              var salarioFunc = salarioMesImposto - descontoPorFalta;
              var adiantamento = salarioMes * 0.4;
              var salarioLiquidoFunc = salarioFunc - adiantamento;
              restoSalario = salarioLiquidoFunc;

              if (salarioLiquidoFunc < 0 && restoSalario < 0) {
                salarioLiquidoFunc = 0;
                adiantamento = salarioMes * 0.4 + restoSalario;
              } else {
                salarioLiquidoFunc = salarioFunc - adiantamento;
              }

              if (adiantamento < 0) {
                adiantamento = 0;
              }

              return (
                <div
                  className={`text-[1.1vw] xl:text-[0.9vw] `}
                  key={func.id}
                  onClick={() => ButtoSelecao(func.id)}
                >
                  <div className="w-auto flex justify-end ml-2"></div>

                  <div
                    className={`grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-3 justify-center items-center shadow-inner ${
                      funcState[func.id] && "bg-gray-300"
                    } bg-gray-200 rounded-2xl p-2 my-2`}
                  >
                    <th className="col-span-2 flex justify-center items-center gap-1 relative">
                      <div className="absolute -left-2 -top-3 2xl:left-0 2xl:top-2">
                        <spa
                          className="absolute text-[0.8vw] p-1 rounded-full bg-gray-400 flex justify-center items-center cursor-pointer drop-shadow-lg"
                          onClick={() => {
                            setFuncionarioSelecionado(func);
                          }}
                        >
                          <TbAlignLeft />
                        </spa>
                      </div>
                      <button
                        className={`w-5 h-5 rounded-[50em] bg-slate-300 flex justify-center items-center cursor-pointer ${
                          funcState[func.id] && "border-2 border-white"
                        }`}
                        onClick={() => {
                          AddFalta(func.id, 1, func.diasFaltas);
                        }}
                      >
                        <p>+</p>
                      </button>
                      <th
                        className={`w-10 h-10 rounded-[50em]  bg-slate-300 flex justify-center items-center cursor-pointer ${
                          funcState[func.id] && "border-2 border-white"
                        }`}
                      >
                        {func.diasFaltas}
                      </th>
                      <button
                        className={`w-5 h-5 rounded-[50em] bg-slate-300 flex justify-center items-center cursor-pointer ${
                          funcState[func.id] && "border-2 border-white"
                        }`}
                        onClick={() => {
                          AddFalta(func.id, 2, func.diasFaltas);
                        }}
                      >
                        <p>-</p>
                      </button>
                    </th>

                    <th className="col-span-3">{nameWithInitials}</th>
                    <th className="col-span-2">{func.funcaoFuncionario}</th>

                    <th className="col-span-2">
                      {Number(adiantamento).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </th>

                    <th className="col-span-2">
                      {Number(salarioLiquidoFunc).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </th>

                    <th className="col-span-2">
                      {Number(salarioFunc).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </th>

                    <th className="col-span-3 ">
                      {diasRestantesFerias !== null &&
                      diasRestantesFerias <= 30 &&
                      diasRestantesFerias >= 0 ? (
                        <p className="bg-yellow-500 p-1 px-2 rounded-[9999px]">
                          {diasRestantesFerias} dias para férias!
                        </p>
                      ) : diasRestantesExames !== null &&
                        diasRestantesExames <= 30 &&
                        diasRestantesExames >= 0 ? (
                        <p className="bg-yellow-500 p-1 px-2 rounded-[9999px]">
                          {diasRestantesExames} dias para os Exames!
                        </p>
                      ) : diasRestantesExames < 0 ? (
                        <p className="bg-red-600 p-1 px-2 rounded-[9999px] ">
                          Exame Atrasado!
                        </p>
                      ) : diasRestantesFerias >= 0 &&
                        diasRestantesFerias <= 30 &&
                        diasRestantesExames <= 30 &&
                        diasRestantesExames >= 0 ? (
                        <p className="bg-orange-500 p-1 px-2 rounded-[9999px]">
                          {diasRestantesFerias} dias para férias e{" "}
                          {diasRestantesExames} dias para Exames!
                        </p>
                      ) : feriasEmAndamento ? (
                        <p className="bg-orange-600 p-1 px-2 rounded-[9999px]">
                          Esta de ferias!
                        </p>
                      ) : (
                        <p className="bg-green-500 p-1 px-2 rounded-[9999px]">
                          Bom!
                        </p>
                      )}
                    </th>
                  </div>
                </div>
              );
            })}
          </Article>
        </>
      )}

      {funcionarioSelecionado || funcionarioEditar || carregando ? null : (
        <div className="w-full ">
          <div className="w-full bg-CorSecundariaBT drop-shadow-2xl rounded-[0.7em] mb-1 sticky">
            <div className="grid grid-cols-4 justify-center items-center w-full rounded-b-lg drop-shadow-2xl text-lg py-1">
              {renderInfo("Total FGTS", fgtsSalario)}
              {renderInfo("Salario Total do Mês", valorTotalSalario)}
              {renderInfo("Adiantamento Total", adiantamentoSalario)}
              {renderInfo("Salario Final Total", valorSalario)}
            </div>
          </div>
        </div>
      )}
    </Div>
  );
};
