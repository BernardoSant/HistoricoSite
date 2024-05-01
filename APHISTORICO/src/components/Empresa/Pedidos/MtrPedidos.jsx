import styled from "styled-components";
import { useGlobalContext } from "../../../global/Global";

const Div = styled.div`
  height: 100%;
  margin-bottom: 2em;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-content: start;
  flex-direction: row;
`;

const Article = styled.article`
  width: 100%;
  max-height: 12em;
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

const Header = styled.header`
  width: 100%;
  border-radius: 20px;
  margin-bottom: 10px;
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
  font-weight: 600;
  font-size: xx-large;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  padding-left: 1em;
  padding-right: 1em;
  margin-top: 10px;
`;

const Th = styled.div`
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MtrPedidos = ({ empresaId }) => {
  const { empresa, pedido } = useGlobalContext();

  const empresaSelecionada = empresa.find(
    (empresas) => empresas.id === empresaId
  );

  const siglaEmpresa = empresaSelecionada
    ? empresaSelecionada.siglaEmpresa
    : "N/A";

  const pedidosDaEmpresaAndamento = pedido.filter(
    (pedido) =>
      pedido.empresaPDD === empresaId && pedido.situacaoPDD === "Andamento"
  );
  const pedidosDaEmpresaFinalizada = pedido.filter(
    (pedido) =>
      pedido.empresaPDD === empresaId && pedido.situacaoPDD === "Finalizada"
  );
  const pedidosDaEmpresaCriada = pedido.filter(
    (pedido) =>
      pedido.empresaPDD === empresaId && pedido.situacaoPDD === "Criada"
  );

  const valorTotalPedidosAndamento = pedidosDaEmpresaAndamento.reduce(
    (total, pedido) => total + pedido.valorRecebidoPDD,
    0
  );
  const valorTotalPedidosFinalizada = pedidosDaEmpresaFinalizada.reduce(
    (total, pedido) => total + pedido.valorRecebidoPDD,
    0
  );
  const valorTotalPedidosCriada = pedidosDaEmpresaCriada.reduce(
    (total, pedido) => total + pedido.valorPDD,
    0
  );

  const valorTotal = valorTotalPedidosAndamento + valorTotalPedidosFinalizada;

  return (
    <Div>
      <Header>Pedidos da {siglaEmpresa}</Header>
      {pedidosDaEmpresaAndamento.length > 0 ? (
        <>
          <div className="w-full bg-orange-500 drop-shadow-2xl rounded-2xl ">
            <div className="flex justify-between items-center px-4">
              <Th className="text-start text-2xl pt-1">Pedidos em Andamento</Th>
              <nav className="bg-orange-600 px-3 rounded-full shadow-inner flex">
                <Th className="text-lg text-end pr-2">Valor Recebido: </Th>
                <Th className="text-lg text-start">
                  {Number(valorTotalPedidosAndamento).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Th>
              </nav>
            </div>

            <div className="grid grid-cols-7 justify-center items-center w-full rounded-b-lg drop-shadow-2xl text-lg pb-1">
              <Th className="col-span-1">N° Pedido</Th>
              <Th className="col-span-1">Situação</Th>
              <Th className="col-span-3">Descrição</Th>
              <Th className="col-span-1">A Receber</Th>
              <Th className="col-span-1">Recebido</Th>
            </div>
          </div>

          <Article className="w-full overflow-auto mt-2 rounded-[1em]">
            {pedidosDaEmpresaAndamento.map((pedido) => {
              return (
                <>
                  <div
                    key={pedido.id}
                    className="w-full grid grid-cols-7 justify-center items-center shadow-inner bg-gray-200 rounded-2xl p-2 my-2"
                  >
                    <Th className="col-span-1">
                      {String(pedido.numeroPDD).padStart(5, "0")}
                    </Th>

                    <Th className="col-span-1">{pedido.situacaoPDD}</Th>
                    <Th className="col-span-3">{pedido.nomePDD}</Th>

                    <Th className="col-span-1">
                      {Number(pedido.valorPDD).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Th>
                    <Th className="col-span-1">
                      {Number(pedido.valorRecebidoPDD).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Th>
                  </div>
                </>
              );
            })}
          </Article>
        </>
      ) : null}

      {pedidosDaEmpresaFinalizada.length > 0 ? (
        <>
          <div className="w-full bg-orange-500 drop-shadow-2xl rounded-2xl ">
            <div className="flex justify-between items-center px-4">
              <Th className="text-start text-2xl pt-1">Pedidos Finalizados</Th>
              <nav className="bg-orange-600 px-3 rounded-full shadow-inner flex">
                <Th className="text-lg text-end pr-2">Valor Recebido: </Th>
                <Th className="text-lg text-start">
                  {Number(valorTotalPedidosFinalizada).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Th>
              </nav>
            </div>

            <div className="grid grid-cols-7 justify-center items-center w-full rounded-b-lg drop-shadow-2xl text-lg pb-1">
              <Th className="col-span-1">N° Pedido</Th>
              <Th className="col-span-1">Situação</Th>
              <Th className="col-span-3">Descrição</Th>
              <Th className="col-span-1">A Receber</Th>
              <Th className="col-span-1">Recebido</Th>
            </div>
          </div>

          <Article className="w-full overflow-auto mt-2 rounded-[1em]">
            {pedidosDaEmpresaFinalizada.map((pedido) => {
              return (
                <>
                  <div
                    key={pedido.id}
                    className="w-full grid grid-cols-7 justify-center items-center shadow-inner bg-gray-200 rounded-2xl p-2 my-2"
                  >
                    <Th className="col-span-1">
                      {String(pedido.numeroPDD).padStart(5, "0")}
                    </Th>

                    <Th className="col-span-1">{pedido.situacaoPDD}</Th>
                    <Th className="col-span-3">{pedido.nomePDD}</Th>

                    <Th className="col-span-1">
                      {Number(pedido.valorPDD).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Th>
                    <Th className="col-span-1">
                      {Number(pedido.valorRecebidoPDD).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Th>
                  </div>
                </>
              );
            })}
          </Article>
        </>
      ) : null}

      {pedidosDaEmpresaCriada.length > 0 ? (
        <>
          <div className="w-full bg-orange-500 drop-shadow-2xl rounded-2xl ">
            <div className="flex justify-between items-center px-4">
              <Th className="text-start text-2xl pt-1">Pedidos Criados</Th>
              <nav className="bg-orange-600 px-3 rounded-full shadow-inner flex">
                <Th className="text-lg text-end pr-2">Valor Receber: </Th>
                <Th className="text-lg text-start">
                  {Number(valorTotalPedidosCriada).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Th>
              </nav>
            </div>

            <div className="grid grid-cols-7 justify-center items-center w-full rounded-b-lg drop-shadow-2xl text-lg pb-1">
              <Th className="col-span-1">N° Pedido</Th>
              <Th className="col-span-1">Situação</Th>
              <Th className="col-span-3">Descrição</Th>
              <Th className="col-span-1">A Receber</Th>
              <Th className="col-span-1">Recebido</Th>
            </div>
          </div>

          <Article className="w-full overflow-auto mt-2 rounded-[1em]">
            {pedidosDaEmpresaCriada.map((pedido) => {
              return (
                <>
                  <div
                    key={pedido.id}
                    className="w-full grid grid-cols-7 justify-center items-center shadow-inner bg-gray-200 rounded-2xl p-2 my-2"
                  >
                    <Th className="col-span-1">
                      {String(pedido.numeroPDD).padStart(5, "0")}
                    </Th>

                    <Th className="col-span-1">{pedido.situacaoPDD}</Th>
                    <Th className="col-span-3">{pedido.nomePDD}</Th>

                    <Th className="col-span-1">
                      {Number(pedido.valorPDD).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Th>
                    <Th className="col-span-1">
                      {Number(pedido.valorRecebidoPDD).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Th>
                  </div>
                </>
              );
            })}
          </Article>
        </>
      ) : null}

      <div className="w-full px-3 pb-3 sticky mt-5 bottom-0 left-0">
        <div className="w-full bg-orange-400 drop-shadow-2xl rounded-2xl ">
          <div className="flex justify-around items-center w-full rounded-b-lg drop-shadow-2xl text-lg py-1">
            <dir>
              <Th className="text-end">Valor Recebido:</Th>
              <dir className="text-start px-3">
                {Number(valorTotal).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </dir>
            </dir>
            <dir>
              <Th className="text-end">A Receber:</Th>
              <dir className="text-start px-3">
                {Number(valorTotalPedidosCriada).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </dir>
            </dir>
          </div>
        </div>
      </div>
    </Div>
  );
};
