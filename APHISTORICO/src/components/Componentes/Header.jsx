import { useState } from "react";
import styled from "styled-components";
import React from "react";
import { CorClara } from "../../functions/Cor";
import { CorEscura } from "../../functions/Cor";

const Head = styled.header`
  box-shadow: inset 5px -5px 10px ${CorEscura(0.2)}, inset -5px 5px 10px ${CorClara(0.1)};
`;

export const Header = ({ children }) => {
  return (
    <Head
      className={`flex flex-row justify-between text-[1.6vw] p-3 px-[1em] font-semibold rounded-[0.4em] bg-opacity-50 md:flex-row drop-shadow-md`}
      style={{
        backgroundColor: CorClara(0),
      }}
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className={`w-full h-full relative justify-between text-3xl`}>
          {child}
        </div>
      ))}
    </Head>
  );
};
