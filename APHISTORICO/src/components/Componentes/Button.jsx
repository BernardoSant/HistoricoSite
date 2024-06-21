import styled from "styled-components";
import { CorEscura, CorClara } from "../../functions/Cor";

export const Button = styled.button`
  width: auto;
  border-radius: 10px;
  background: ${CorClara(0)};
  box-shadow: inset 5px -5px 10px ${CorEscura(0.2)}, inset -5px 5px 10px ${CorClara(0.1)};
  font-weight: 600;
  font-size: x-large;
  display: flex;
  justify-content: center;
  padding: 3px;
  padding-left: 2em;
  padding-right: 2em;
  transition-duration: 200ms;

  &:hover {
    cursor: pointer;
    color: white;
    scale: 97%;
  }
`;
