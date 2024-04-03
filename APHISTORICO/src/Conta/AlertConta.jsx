import styled from "styled-components";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../global/Global";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

const BlackAlert = styled.div`
  width: 20%;
  background-color: aqua;
  border-radius: 1em;
  border-top-right-radius: 1.3em;
  border-top-left-radius: 1.3em;
  background-color: #d8d6d679;
`;

const TiltAlert = styled.div`
  border-top-right-radius: 1em;
  border-top-left-radius: 1em;
  display: flex;
  padding-top: 0.6em;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 0.3em;
  flex-direction: column;
  align-content: center;
  background: #f97316;
  box-shadow: inset 3px -3px 10px #9f4a0e, inset -5px 5px 10px #ff9c1e;
  z-index: 10;
`;

const PrinTiltAlert = styled.div``;

const SubTiltAlert = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DescrAlert = styled.div`
  padding-top: 0.6em;
  padding-left: 1em;
  padding-right: 1em;

`;

const ContasAlert = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1em;
  border-bottom:solid 2px #9ca3af ;
`;

const H1SubTilt = styled.h1`
  width: 100%;
  text-align: center;
`;

const H1Contas = styled.h1`
  width: 100%;
  text-align: center;
`;

export const AlertConta = () => {
  const { ip, conta } = useGlobalContext();

  const ContasEmpresa = conta.filter((cont) => cont.tipoConta === "Empresa");

  const ContasCasa = conta.filter((cont) => cont.tipoConta === "Casa");

  const FiltCasa = ContasCasa.filter(
    (cont) => cont.estadoConta === "Recorrente"
  );
  const FiltCasaRecor = FiltCasa.filter((cont) => cont.frequenciaConta === 1);
  const FiltCasaParcel = ContasCasa.filter(
    (cont) => cont.estadoConta === "Parcelada"
  );

  const FiltEmpresa = ContasEmpresa.filter(
    (cont) => cont.estadoConta === "Recorrente"
  );
  const FiltEmpresaRecor = FiltEmpresa.filter(
    (cont) => cont.frequenciaConta === 1
  );
  const FiltEmpresaParcel = ContasEmpresa.filter(
    (cont) => cont.estadoConta === "Parcelada"
  );

 

  FiltCasaParcel.sort((a, b) => new Date(a.dataNF) - new Date(b.dataNF));

  return (
    <BlackAlert>
      <TiltAlert>
        <PrinTiltAlert>Contas</PrinTiltAlert>
        <SubTiltAlert>
          <H1SubTilt>Descrição</H1SubTilt>
          <H1SubTilt>Parcela</H1SubTilt>
          <H1SubTilt>Valor</H1SubTilt>
        </SubTiltAlert>
      </TiltAlert>
      <DescrAlert>
        {FiltCasa.length > 0 ? (
          <>
            {FiltCasa.map((Cs) => {
              return (
                <ContasAlert key={Cs.id}>
                  <H1Contas>{Cs.descricaoConta}</H1Contas>
                  <H1Contas>{Cs.parcelasConta}</H1Contas>
                  <H1Contas>
                    {Number(Cs.valorConta).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </H1Contas>
                </ContasAlert>
              );
            })}
          </>
        ) : null}

        {FiltCasaRecor.length > 0 ? (
          <>
            {FiltCasaRecor.map((Cs) => {
              return (
                <ContasAlert key={Cs.id}>
                  <H1Contas>{Cs.descricaoConta}</H1Contas>
                  <H1Contas>{Cs.parcelasConta}</H1Contas>
                  <H1Contas>
                    {Number(Cs.valorConta).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </H1Contas>
                </ContasAlert>
              );
            })}
          </>
        ) : null}

        {FiltCasaParcel.length > 0 ? (
          <>
            {FiltCasaParcel.map((Cs) => {
              return (
                <ContasAlert key={Cs.id}>
                  <H1Contas>{Cs.descricaoConta}</H1Contas>
                  <H1Contas>{Cs.parcelasConta}</H1Contas>
                  <H1Contas>
                    {Number(Cs.valorConta).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </H1Contas>
                </ContasAlert>
              );
            })}
          </>
        ) : null}

        {FiltEmpresa.length > 0 ? (
          <>
            {FiltEmpresa.map((Cs) => {
              return (
                <ContasAlert key={Cs.id}>
                  <H1Contas>{Cs.descricaoConta}</H1Contas>
                  <H1Contas>{Cs.parcelasConta}</H1Contas>
                  <H1Contas>
                    {Number(Cs.valorConta).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </H1Contas>
                </ContasAlert>
              );
            })}
          </>
        ) : null}

        {FiltEmpresaRecor.length > 0 ? (
          <>
            {FiltEmpresaRecor.map((Cs) => {
              return (
                <ContasAlert key={Cs.id}>
                  <H1Contas>{Cs.descricaoConta}</H1Contas>
                  <H1Contas>{Cs.parcelasConta}</H1Contas>
                  <H1Contas>
                    {Number(Cs.valorConta).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </H1Contas>
                </ContasAlert>
              );
            })}
          </>
        ) : null}

        {FiltEmpresaParcel.length > 0 ? (
          <>
            {FiltEmpresaParcel.map((Cs) => {
              return (
                <ContasAlert key={Cs.id}>
                  <H1Contas>{Cs.descricaoConta}</H1Contas>
                  <H1Contas>{Cs.parcelasConta}</H1Contas>
                  <H1Contas>
                    {Number(Cs.valorConta).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </H1Contas>
                </ContasAlert>
              );
            })}
          </>
        ) : null}
      </DescrAlert>
    </BlackAlert>
  );
};
