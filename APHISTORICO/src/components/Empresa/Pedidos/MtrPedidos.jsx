import styled from "styled-components";
import { useGlobalContext } from "../../../global/Global";

const Div = styled.div`
  height: 100%;
  width: 100%;
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
  background: #f97316;
  box-shadow: inset 5px -5px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
  font-weight: 600;
  font-size: xx-large;
  display: flex;
  justify-content: center;
  padding: 5px;
`;

const Th = styled.th``;

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
      <Header className="font-semibold w-full h-auto flex justify-center items-center text-3xl mb-5">
        Pedidos da {siglaEmpresa}
      </Header>
      {pedidosDaEmpresaAndamento.length > 0 ? (
        <>
          <table className="w-full bg-orange-500 drop-shadow-2xl rounded-2xl ">
            <thead className="flex justify-between items-center px-4">
              <Th className="text-start text-2xl pt-1">Pedidos em Andamento</Th>
              <nav className="bg-orange-600 px-3 rounded-full shadow-inner">
                <Th className="text-lg text-end pr-2">Valor Recebido: </Th>
                <Th className="text-lg text-start">
                  {Number(valorTotalPedidosAndamento).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Th>
              </nav>
            </thead>

            <thead className="grid grid-cols-7 justify-center items-center w-full rounded-b-lg drop-shadow-2xl text-lg pb-1">
              <Th className="col-span-1">N° Pedido</Th>
              <Th className="col-span-1">Situação</Th>
              <Th className="col-span-3">Descrição</Th>
              <Th className="col-span-1">A Receber</Th>
              <Th className="col-span-1">Recebido</Th>
            </thead>
          </table>

          <Article className="w-full overflow-auto mt-2 rounded-[1em]">
            {pedidosDaEmpresaAndamento.map((pedido) => {
              return (
                <>
                  <thead
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
                  </thead>
                </>
              );
            })}
          </Article>
        </>
      ) : null}

      {pedidosDaEmpresaFinalizada.length > 0 ? (
        <>
          <table className="w-full bg-orange-500 drop-shadow-2xl rounded-2xl ">
            <thead className="flex justify-between items-center px-4">
              <Th className="text-start text-2xl pt-1">Pedidos Finalizados</Th>
              <nav className="bg-orange-600 px-3 rounded-full shadow-inner">
                <Th className="text-lg text-end pr-2">Valor Recebido: </Th>
                <Th className="text-lg text-start">
                  {Number(valorTotalPedidosFinalizada).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Th>
              </nav>
            </thead>

            <thead className="grid grid-cols-7 justify-center items-center w-full rounded-b-lg drop-shadow-2xl text-lg pb-1">
              <Th className="col-span-1">N° Pedido</Th>
              <Th className="col-span-1">Situação</Th>
              <Th className="col-span-3">Descrição</Th>
              <Th className="col-span-1">A Receber</Th>
              <Th className="col-span-1">Recebido</Th>
            </thead>
          </table>

          <Article className="w-full overflow-auto mt-2 rounded-[1em]">
            {pedidosDaEmpresaFinalizada.map((pedido) => {
              return (
                <>
                  <thead
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
                  </thead>
                </>
              );
            })}
          </Article>
        </>
      ) : null}

      {pedidosDaEmpresaCriada.length > 0 ? (
        <>
          <table className="w-full bg-orange-500 drop-shadow-2xl rounded-2xl ">
            <thead className="flex justify-between items-center px-4">
              <Th className="text-start text-2xl pt-1">Pedidos Criados</Th>
              <nav className="bg-orange-600 px-3 rounded-full shadow-inner">
                <Th className="text-lg text-end pr-2">Valor Receber: </Th>
                <Th className="text-lg text-start">
                  {Number(valorTotalPedidosCriada).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Th>
              </nav>
            </thead>

            <thead className="grid grid-cols-7 justify-center items-center w-full rounded-b-lg drop-shadow-2xl text-lg pb-1">
              <Th className="col-span-1">N° Pedido</Th>
              <Th className="col-span-1">Situação</Th>
              <Th className="col-span-3">Descrição</Th>
              <Th className="col-span-1">A Receber</Th>
              <Th className="col-span-1">Recebido</Th>
            </thead>
          </table>

          <Article className="w-full overflow-auto mt-2 rounded-[1em]">
            {pedidosDaEmpresaCriada.map((pedido) => {
              return (
                <>
                  <thead
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
                  </thead>
                </>
              );
            })}
          </Article>
        </>
      ) : null}

      <table className="w-full bg-orange-600 drop-shadow-2xl rounded-2xl ">
        <thead className="grid grid-cols-4 justify-center items-center w-full rounded-b-lg drop-shadow-2xl text-lg py-1">
          <Th className="col-span-1 text-end">Valor Recebido:</Th>
          <Th className="col-span-1 text-start px-3">
            {Number(valorTotal).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Th>
          <Th className="col-span-1 text-end">A Receber:</Th>
          <Th className="col-span-1 text-start px-3">
            {Number(valorTotalPedidosCriada).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Th>
        </thead>
      </table>
    </Div>
  );
};
