import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../../global/Global';

const Article = styled.article`
  height: 100%;
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
  padding-top: 1em;
  display: flex;
  flex-wrap: wrap;
  max-width: 50em;
  justify-content: start;
  align-content: start;
  flex-direction: row;
`;

const Div = styled.div`
border-top-right-radius: 1em;
border-top-left-radius: 1em;
display: flex;
flex-direction: column;
justify-content: space-between;
align-content: center;
padding: 0.7em;
padding-left: 1em;
padding-right: 1em;
background: #ea580c;
box-shadow: inset 5px -0px 10px #a15d26,
            inset -5px 7px 10px #ffc752;
font-weight: 600;

`;
export const ResumoEmpresa = () => {

    return(
        <Article>

            <Div>

            </Div>

            <Div>
                
            </Div>
            
            <Div>

            </Div>

            <Div>

            </Div>
        ola
        </Article>
    )
}