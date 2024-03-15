import styled from "styled-components";
import { useGlobalContext } from "../../global/Global";
import { BiCategory } from "react-icons/bi";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

const Div = styled.div`
  height: 100%;
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
  padding-top: 1em;
  display: flex;
  flex-wrap: wrap;
  max-width: 70em;
  justify-content: start;
  align-content: start;
  flex-direction: row;
`;

const Article = styled.article`
  width: 100%;
  height: 100vh;
  max-height: 65vh;
  overflow: auto;
  margin-top: 4px;
  margin-bottom: 8px;
  border-radius: 1em;
  overflow-y: auto;
  position: relative;
  padding-right: 4px;

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

const H2 = styled.h1`
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
  border-radius: 4px;
  max-width: 40em;
  padding-left: 8px;
`;

const Header = styled.header`
  width: 100%;
  border-radius: 1em;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
`;

const Button = styled.button`
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 600;
  border-radius: 9999px;
  --tw-drop-shadow: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
    drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast)
    var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate)
    var(--tw-sepia) var(--tw-drop-shadow);
`;

export const MostruarioFuncAdmitido = () => {
  const { ip, funcionario, empresa } = useGlobalContext();

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
    salarioFucionario: "",
    funcaoFuncionario: "",
    horasTFucionario: "",
    CadastroEmprFuncionario: "",
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

  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const [funcionarioEditar, setFuncionarioEditar] = useState(null);

  useEffect(() => {
    if (funcionarioSelecionado) {
      setData((prevData) => ({ ...prevData, ...funcionarioSelecionado }));
    }
  }, [funcionarioSelecionado]);

  useEffect(() => {
    if (funcionarioEditar) {
      setData((prevData) => ({ ...prevData, ...funcionarioEditar }));
    }
  }, [funcionarioEditar]);

  if (funcionarioSelecionado) {
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

    var ferias = Qferias - funcionarioSelecionado.feriasPaga;
    var dataFormatadaAdmicao = dataAdimicao.toLocaleDateString("pt-BR", opcoes);
    var dataFormatadaFerias = dataFerias.toLocaleDateString("pt-BR", opcoes);
    var dataFormatadaNasc = dataNasc.toLocaleDateString("pt-BR", opcoes);
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
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  const [dataFerias, setDataFerias] = useState({
    idFuncionario: "",
    situacaoFerias: "Ferias Vendida",
    dataInicioFerias: null,
    dataFinalizacaoFerias: null,
    valorFerias: null,
  });

  const valorInputFerias = (e) => {
    let valor = e.target.value;
    let name = e.target.name;

    if (e.target.name === "dataInicioFerias") {
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
        idFuncionario: funcionarioSelecionado.id,
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
          idFuncionario: "",
          situacaoFerias: "Ferias Vendida",
          dataInicioFerias: null,
          dataFinalizacaoFerias: null,
          valorFerias: null,
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

    axios;
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

    axios
      .put(
        ip + "/funcionario/" + funcionarioSelecionado.id,
        { statuFucionario: "Demitido" },
        headers
      )
      .then((response) => {
        toast.success("Funcionário demitido com sucesso!");
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
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
      idFuncionario: "",
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
      idFuncionario: "",
      situacaoFerias: "Ferias Vendida",
      dataInicioFerias: null,
      dataFinalizacaoFerias: null,
      valorFerias: null,
    });
  };

  return (
    <Div>
      {funcionarioEditar ? (
        <>
          <div className="flex w-full justify-end">
            <Button
              onClick={() => setFuncionarioEditar(null)}
              className="bg-red-600"
            >
              Voltar
            </Button>
          </div>
          <form
            onSubmit={updateFuncionario}
            className=" grid grid-cols-6 gap-x-2 mt-3"
          >
            <h3 className="text-3xl mb-5 font-semibold col-span-6 -ml-3">
              Identificação
            </h3>

            <p className="col-span-1 row-span-4 flex justify-center items-center">
              <img
                className="w-30 h-32 drop-shadow-lg"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///9/f398fHx4eHh2dnb8/Pz4+PiTk5P19fXw8PCFhYXy8vLs7OyJiYm/v7+fn5+ZmZnIyMjh4eGlpaWsrKzY2NjU1NS4uLixsbHW1tbOzs7Hx8ff39+Pj4/m5ua1tbVaaqWHAAAGrklEQVR4nO2d27qiMAxGpS2CyElARRR9/7ecgm5H3cihpCSd6br0Rv4vaZu0SbtaWSwWi8VisVgsFovFYrFYLBYLOdbbsGHju9hfAo+bVWVaBw5rcILIy+P9Bvuj4Ahjj3HeSHvC5A88KA7/gjHDOBL8RdsrUmZ+WmN/4TwOKefd6p4ig6PB7lrV36z3Cmf5FvtL1TgFY/S1hhSlj/210wkTMVJfq9E5Y3/wVGI2QV/rq16I/c1T2Hr980unGZlBZjxMNeAdkZiyPMZCRV9jxtqMhaOY7qFPiU6G/fXDuKm6wCYA2GMLGMJVmGPeENQlzrJgC3Er5rMFSk+9YqvooQQQKBdGujPqWXWZ+JAYUV0XrxAWbOA5tpRu1oFSJNMpcYctppMcTKB0VIph+AHKR1uFHrac37iA+iSCnp/OiEY7YdSy/hBYoMMKbEkfJIDTzEMirdAmgzahVEhrUYQ3oZxsKK0YIUy49g4pIxYaTCiNSGc6dXWYUMZuMbawJzv4eaaBRdjCnnhanFQa8YKt7EGoSaDDSmxpD2I9TiqhkgqnumzocBpxja9LH5nZ9KJnrWhgCba4lqM2J5USSQxEHTHpD4LEQNSnTw7ECludZKtvGBJZES/aVsNGYYotT1LpVOgE2PJWeqdSORCx5a105YZPhQSKifTFbK1CAsuFrtTpoZDAwX6kUyCBE+Ed3IFTNyxH3XLz59YljJGIedTm6zbgHYFXDqZ3knmRiLVfo2mL7TdYm25usJBAaUScFGOvM6l4h9UoCiHP7YcQKMHbggIdfkAQ6C/npNJNjwgKr4sqxDhp2y+1VrQKMXL906IKMeprlrUhhkKtO1C/FGJ4qZaz+68KMaprNB1td4NzRLNcWIqV6uvdZHsHpyxD71bwOzgbw/5yClGCtpXeY7V3sA7ZQKuC+0CrGHb1bpX+Be8UUV+ZyRssQDvrXminBvMguFoirkHapHmg9+DpDm61wtbRLhG7auiiWyF+D5TmochT/JqhasrdCSYKXK2yQNeyyDiFchqJW7Kxd3xM0idqKjXCq1V4rAWss3Lh5CdsWe+sQ8i1ke+3FAbgB5ClQwHJu5UAkymKDZYr0JJ9cq15dwAzDaKdzoBhOLHewydwCTFeytsPWJslkRL9DqC8lER1dydQtQuC7NUfQCsioa68T9YwCrGz+j5g3JSukwK5KdGQ7c4aIqyhGtDcKSHclE4LdwcA0TfRqPvJ/NiUQv9BH7PbLUl0OvVSzzSiINBg0c/MulrSS8WDeeXtaEXrE5hVDUY3b3plTuhG8hazX2zVFXKkqpKpKF+fyCh0jI5CdbKhv1L8sFETaIqPNiiVvDGP6A5bJyo38BG+mLWL6RG4OYPwzjqaeq8+6by3i8207ktBePfpG5sppTbCoGn0L9vxVjTRgg2j34Awbwz+4OZj4jfGDMiYvnIeLkPhKckz+9GEA57KmKFD8IWd810jE7lZgUw36+OXkikmPMPimK+455p/imTcyYnvjE7jevSY4OwO5zwqDqQ375Xws92xyJMkL+PTxqREyWL5D9kQjHFcP6viMqkFxI71RggRpEVcZRQeZHU32e6We4EQ93dGIerR2i3zZkURwqmTW5Vh2dTPzkUaOeLtBVWAk6PsNR1p1k7BorTYZYtebuJmcR44H6/DPhKFuXG027W/01iUBcn5soDbumFV1OLr47DzT8d6+lIbx42KSmewEFZ58/LtQMY3aygOPYnVeG2d73ScULn7IhrVVcGCGX9/G7PtIVWyutyDmtLfpXzQds8PUL8rfvyrbc3ITCqgSXa7S3vGXRdc7Qa5zcQL/FqRsxMUd58rdPzwRGFurxRaGWWSWcya2tbH0Y8Wf/wzm1rlu0kUj/8Zj5QvHQwLoV50wKMpd3X45YyuKemtN5XdHqlvVtkIE97Yt+HDUu113Zc/Y+XUceEXc/+09Z/j8MrhHpL5f9W8QnuctHxUEH/azul13BcBrE+5A9W6yIPxc46fwPX2sqaR8NyRCK3Dw62euAwNIMqRZrxC37v6yA+O5+q0v+z3h53MJWXGNTqGGA33Ro3GC/gfNzw2Ee+wjqwE5l+cEZOqhhfUFmSExAnHmiRh9dBYXPJSUi0MlR0teqGlHnh/xnEz3YSDR+bLXW6ljYHdMOzPA8EqNB+r0HysQvOxCs3HKjQfq9B8rELzsQrNxyo0H6vQfKxC87EKzec/V7jk2zG66L+2wPjDtcEn2jLzT9eGruGPdd4/vgBsuOE2SxxmLk7yr3TDWSwWi8VisVgsFmL8AbdYcfmss0FYAAAAAElFTkSuQmCC"
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

            <h3 className="text-3xl my-4 font-semibold col-span-5 -ml-3">
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
              <option value="Pedreiro">Pedreiro</option>
              <option value="Pintor">Pintor</option>
              <option value="Ajudante">Ajudante</option>
              <option value="Encarregado">Encarregado</option>
              <option value="Soldador">Soldador</option>
              <option value="Meio OFF.Pedreiro">Meio OFF.Pedreiro</option>
              <option value="Meio OFF.Pintor">Meio OFF.Pintor</option>
              <option value="Engenheiro">Engenheiro</option>
              <option value="Tecnico Segurança">Técnico Segurança</option>
            </select>

            <Input
              className="col-span-2"
              type="text"
              onChange={valorInput}
              name="salarioFucionario"
              value={data.salarioFucionario}
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
            <H2 className="col-span-1">{ferias}</H2>
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

            <button
              type="submit"
              className="col-span-6 mt-4 bg-orange-400 py-2 px-7 rounded-lg border-2 border-orange-500 font-semibold hover:text-white hover:scale-95 duration-500 mb-3"
            >
              Salvar
            </button>
          </form>
        </>
      ) : funcionarioSelecionado ? (
        <>
          <section className="flex w-full justify-end relative gap-2">
            <article className="w-full  flex flex-col relative items-end">
              <dir
                className={` ${
                  state.Menu &&
                  "bg-slate-200 flex flex-col  rounded-[1.5em] p-2 gap-3 absolute drop-shadow-lg"
                }`}
              >
                <div className="flex gap-3">
                  {state.Menu && (
                    <div className="flex justify-between gap-2 w-auto  rounded-full ">
                      <Button
                        className="bg-green-500 z-10"
                        onClick={() => handleClick("AddExames")}
                      >
                        Adicionar Exames
                      </Button>

                      <Button
                        className="bg-yellow-500 z-10"
                        onClick={() => handleClick("AddFerias")}
                      >
                        Adicionar Ferias
                      </Button>

                      <Button
                        onClick={demitirFuncionario}
                        className="bg-red-500 z-10"
                      >
                        Demitir
                      </Button>
                    </div>
                  )}

                  <button
                    onClick={() => handleClick("Menu")}
                    className={`bg-gray-400 text-2xl w-auto p-1 flex justify-center items-center rounded-full drop-shadow-lg ${
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
                          <H1 className="col-span-1 flex justify-center items-center">
                            Valor:
                          </H1>
                          <input
                            className="rounded-[1.5em] text-center col-span-4 shadow-inner px-2"
                            type="number"
                            placeholder="1000.00"
                            onChange={valorInputFerias}
                            name="valorFerias"
                            value={dataFerias.valorFerias}
                          />
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

                    <label class="relative inline-flex items-center cursor-pointer my-2">
                      <input
                        type="checkbox"
                        onClick={() => handleFerias("FeriasPaga")}
                        class="sr-only peer"
                      />
                      <div
                        class="text-sm group peer ring-0 bg-gradient-to-tr from-red-300 to-red-500  
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

            <article className=" inline-block">
              <div className="flex gap-3">
                <Button
                  onClick={() => setFuncionarioSelecionado(null)}
                  className={`bg-orange-600 pt-2 mt-2 ${state.Menu && "mt-0"}`}
                >
                  Voltar
                </Button>

                <Button
                  onClick={() => setFuncionarioEditar(funcionarioSelecionado)}
                  className={`bg-green-600 pt-2 mt-2 ${state.Menu && "mt-0"}`}
                >
                  Editar
                </Button>
              </div>
            </article>
          </section>

          <div className=" grid grid-cols-6 gap-x-2 mt-3">
            <h3 className="text-3xl mb-5 font-semibold col-span-6 -ml-3">
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

            <h3 className="text-3xl my-4 font-semibold col-span-5 -ml-3">
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
            <H2 className="col-span-1">{ferias}</H2>
            <H2 className="col-span-4">{data.CadastroEmprFuncionario}</H2>
          </div>
        </>
      ) : (
        <>
          <Header className="w-full bg-orange-500 drop-shadow-2xl rounded-2xl">
            <thead className="flex justify-center items-center py-4">
              <th className="text-start text-3xl pt-1">
                Funcionarios Admitidos
              </th>
            </thead>

            <thead className="grid grid-cols-6 justify-center items-center w-full rounded-b-lg drop-shadow-2xl text-lg pb-1 ">
              <th className="col-span-2">Nome</th>
              <th className="col-span-2">Cargo</th>
              <th className="col-span-1">Salario</th>
              <th className="col-span-1">Situação</th>
            </thead>
          </Header>
          <Article>
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

              return (
                <>
                  <thead className="w-auto flex justify-end ml-2">
                    <span
                      className="absolute h-6 w-6 rounded-full bg-gray-400 flex justify-center items-center cursor-pointer drop-shadow-lg"
                      onClick={() => {
                        setFuncionarioSelecionado(func);
                      }}
                    >
                      <BiCategory />
                    </span>
                  </thead>
                  <thead className="grid grid-cols-6 justify-center items-center shadow-inner bg-gray-200 rounded-2xl p-2 my-2">
                    <th className="col-span-2">{nameWithInitials}</th>
                    <th className="col-span-2">{func.funcaoFuncionario}</th>
                    <th className="col-span-1">
                      {Number(func.salarioFucionario).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </th>
                    <th className="col-span-1 ">
                      {diasRestantesFerias !== null &&
                      diasRestantesFerias <= 30 &&
                      diasRestantesFerias >= 0 ? (
                        <p className="bg-yellow-500 p-1 px-2 rounded-[9999px]">{diasRestantesFerias} dias para férias!</p>
                      ) : Qferias > 0 ? (
                        <p className="bg-yellow-600 p-1 px-2 rounded-[9999px]">Ferias Atrasada!</p>
                      ) : diasRestantesExames !== null &&
                        diasRestantesExames <= 30 &&
                        diasRestantesExames >= 0 ? (
                        <p className="bg-red-500 p-1 px-2 rounded-[9999px]">
                          {diasRestantesExames} dias para os Exames!
                        </p>
                      ) : diasRestantesExames < 0 ? (
                        <p className="bg-red-600 p-1 px-2 rounded-[9999px] ">Exame Atrasado!</p>
                      ) : diasRestantesFerias >= 0 &&
                        diasRestantesFerias <= 30 &&
                        diasRestantesExames <= 30 &&  
                        diasRestantesExames >= 0 ? (
                        <p className="bg-orange-500 p-1 px-2 rounded-[9999px]">{diasRestantesFerias} dias para férias e {diasRestantesExames} dias para Exames!</p>
                      ) : (
                        <p className="bg-green-500 p-1 px-2 rounded-[9999px]">Bom!</p>
                      )}
                    </th>
                  </thead>
                </>
              );
            })}
          </Article>
        </>
      )}
    </Div>
  );
};
