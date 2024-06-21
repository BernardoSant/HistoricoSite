import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useGlobalContext } from "../../../global/Global";
import { Header } from "../../Componentes/Header";
import { Button } from "../../Componentes/Button";
import { NumericFormat } from "react-number-format";


const Form = styled.form`
  height: 100%;
  width: 100%;
  gap: 1em;
  display: flex;
  justify-content: start;
  align-content: start;
  flex-direction: column;
`;

const InputDinheiro = styled(NumericFormat)`
  width: 100%;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  padding-left: 8px;
`;

const TelaGrid = styled.div`
  width: 100%;
  gap: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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

export const AddTransporte = () => {
  const { ip } = useGlobalContext();
  const [deveCalcular, setDeveCalcular] = useState(true);

  const [data, setData] = useState({
    nomeTransporte: "",
    placaTransporte: "",
    renavamTransporte: "",
    anoTransporte: "",
    modeloTransporte: "",
    capacidadeTransporte: "",
    kmRodadoTransporte: "",
    kmPorLitroTransporte: "",
    kmPorDiaTransporte: "",
    tanqueTransporte: "",
  });

  const [calculo, setCalculo] = useState({
    kmInicial: "",
    kmFinal: "",
    Dias: "",
    totalAbastecido: "",
  });

  const valorTransporteInput = (e) => {
    let valor = e.target.value;
    setData({ ...data, [e.target.name]: valor });
  };

  const valorCalculoInput = (e) => {
    let valor = e.target.value;
    setCalculo({ ...calculo, [e.target.name]: valor });
  };

  const calcularKilometragem = (event) => {
    event.preventDefault();
    const diferencaKm = Number(calculo.kmFinal) - Number(calculo.kmInicial);
    const dias = Number(calculo.Dias);
    const kmPorDia = diferencaKm / dias;
    const kmPorLitro = diferencaKm / calculo.totalAbastecido;

    if (
      calculo.Dias === "" ||
      calculo.kmFinal === "" ||
      calculo.kmInicial === "" ||
      calculo.totalAbastecido === ""
    ) {
      toast.error("Preencha todos os campos para calcular!");
      return;
    }

    setData({
      ...data,
      kmPorLitroTransporte: kmPorLitro,
      kmPorDiaTransporte: kmPorDia,
    });

    setDeveCalcular(false);
  };

  const addTransporte = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (
      data.nomeTransporte === "" ||
      data.placaTransporte === "" ||
      data.modeloTransporte === "" ||
      data.anoTransporte === ""
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    axios
      .post(ip + "/transporte", data, headers)
      .then((response) => {
        toast.success(response.data.message);
        setData({
          nomeTransporte: "",
          placaTransporte: "",
          renavamTransporte: "",
          anoTransporte: "",
          modeloTransporte: "",
          capacidadeTransporte: "",
          kmRodadoTransporte: "",
          kmPorLitroTransporte: "",
          kmPorDiaTransporte: "",
          tanqueTransporte: "",
        });

        setCalculo({
          kmInicial: "",
          kmFinal: "",
          Dias: "",
          totalAbastecido: "",
        });
        setDeveCalcular(true);
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };

  return (
    <div className="w-full h-full ">
      <Header>Adicionar Transporte</Header>
      <Form id="addTransporte" onSubmit={addTransporte}>
        <TelaGrid>
          <h1 className="col-span-5 text-2xl font-bold px-2 mt-2">
            Caracteristicas do Veiculo
          </h1>

          <div className="col-span-3">
            <H1>Nome:</H1>
            <Input
              type="text"
              onChange={valorTransporteInput}
              value={data.nomeTransporte}
              name="nomeTransporte"
            ></Input>
          </div>

          <div className="col-span-1">
            <H1>Placa:</H1>
            <Input
              type="text"
              maxLength={7}
              onChange={valorTransporteInput}
              value={data.placaTransporte}
              name="placaTransporte"
            ></Input>
          </div>

          <div className="col-span-1">
            <H1>Renavam:</H1>
            <Input
              type="text"
              onChange={valorTransporteInput}
              value={data.renavamTransporte}
              name="renavamTransporte"
            ></Input>
          </div>

          <div className="col-span-1">
            <H1>Ano:</H1>
            <Input
              maxLength={4}
              type="text"
              onChange={valorTransporteInput}
              value={data.anoTransporte}
              name="anoTransporte"
            ></Input>
          </div>

          <div className="col-span-1">
            <H1>Modelo:</H1>
            <Input
              list="Modelos"
              type="text"
              onChange={valorTransporteInput}
              value={data.modeloTransporte}
              name="modeloTransporte"
            ></Input>
          </div>

          <datalist id="Modelos">
            <option value="Hatch"></option>
            <option value="Sedã"></option>
            <option value="SUV"></option>
            <option value="Picapes"></option>
            <option value="Crossover"></option>
            <option value="Perua"></option>
            <option value="Minivan"></option>
            <option value="Furgão"></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </datalist>

          <div className="col-span-1">
            <H1>Capacidade:</H1>
            <Input
              maxLength={2}
              type="text"
              onChange={valorTransporteInput}
              value={data.capacidadeTransporte}
              name="capacidadeTransporte"
            ></Input>
          </div>
        </TelaGrid>

        {deveCalcular ? (
          <div className="h-auto bg-CorSecundariaTBLA my-5 rounded-[0.8em] flex drop-shadow-md ">
            <p className="bg-CorPrimariaBT h-full w-3 rounded-tl-[0.8em] rounded-bl-[0.8em]"></p>
            <h1 className="flex gap-x-5 flex-col font-bold w-full p-2 pb-3 drop-shadow-md">
              <p className="flex justify-between text-2xl pr-3 pl-5 items-center text-black">
                <h1>Calcular Kilometragem</h1>
                <AiOutlineEllipsis />
              </p>

              <p className="grid grid-cols-6 px-3 gap-x-3">
                <div className="col-span-2">
                  <H1>Km Inicial:</H1>
                  <InputDinheiro
                    type="text"
                    placeholder="1000.00"
                    value={calculo.kmInicial || ""}
                    onValueChange={(e) => {
                      setCalculo({
                        ...calculo,
                        kmInicial: e.floatValue,
                      });
                    }}
                    thousandSeparator="."
                    decimalScale={0}
                    fixedDecimalScale
                    decimalSeparator=","
                  ></InputDinheiro>
                </div>

                <div className="col-span-2">
                  <H1>Km Final:</H1>
                  <InputDinheiro
                  type="text"
                  placeholder="1000.00"
                  value={calculo.kmFinal || ""}
                  onValueChange={(e) => {
                    setCalculo({
                      ...calculo,
                      kmFinal: e.floatValue,
                    });
                  }}
                  thousandSeparator="."
                  decimalScale={0}
                  fixedDecimalScale
                  decimalSeparator=","
                  ></InputDinheiro>
                </div>

                <div className="col-span-1">
                  <H1>Q/dias:</H1>
                  <Input
                    type="number"
                    onChange={valorCalculoInput}
                    name="Dias"
                    value={calculo.Dias}
                    placeholder="14 dias"
                  ></Input>
                </div>

                <div className="col-span-1"></div>

                <div className="col-span-2">
                  <H1>Total Abastecido:</H1>
                  <Input
                    type="number"
                    placeholder="10.00 Litros"
                    onChange={valorCalculoInput}
                    name="totalAbastecido"
                    value={calculo.totalAbastecido}
                  ></Input>
                </div>

                <div className="col-span-3"></div>

                <div className="col-span-1 flex justify-center items-center relative">
                  <button
                    onClick={calcularKilometragem}
                    className="py-2 px-6 rounded-[0.5em] bg-CorPrimariaBT absolute bottom-0 right-0"
                  >
                    Calcular
                  </button>
                </div>
              </p>
            </h1>
          </div>
        ) : (
          <>
            <h1 className="col-span-5 text-2xl font-bold px-2 mt-2">
              Kilometragem do Veiculo
            </h1>
            <TelaGrid>
              <div className="col-span-1">
                <H1>Km Rodados:</H1>
                <Input
                  type="number"
                  onChange={valorTransporteInput}
                  name="kmRodadoTransporte"
                  value={data.kmRodadoTransporte}
                ></Input>
              </div>

              <div className="col-span-1">
                <H1>Km/Litro:</H1>
                <Input
                  defaultValue={data.kmPorLitroTransporte.toFixed(2)}
                  readOnly
                ></Input>
              </div>

              <div className="col-span-1">
                <H1>Km/Dia:</H1>
                <Input
                  defaultValue={data.kmPorDiaTransporte.toFixed(2)}
                  readOnly
                ></Input>
              </div>

              <div className="col-span-1">
                <H1>L/Tanque:</H1>
                <Input
                  type="number"
                  onChange={valorTransporteInput}
                  value={data.tanqueTransporte}
                  name="tanqueTransporte"
                ></Input>
              </div>
            </TelaGrid>
          </>
        )}

        {!deveCalcular && (
          <div className="w-full flex justify-end">
            <Button form="addTransporte" type="submit" className="">
              Salvar
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};
