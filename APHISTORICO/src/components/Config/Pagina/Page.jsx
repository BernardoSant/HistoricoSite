import styled from "styled-components";


const Section = styled.div`
  box-shadow: -1px 2px 13px #b5b2b2, -4px -5px 13px #ffffff;
  border-bottom-right-radius: 1em;
  border-top-right-radius: 1em;
  padding-bottom: 1em;
  padding-left: 1em;
  padding-right: 1em;
  font-size: medium;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  overflow-x: auto;
  z-index: 10;
  width: 100%;
  height: 100%;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #575757;
    border-radius: 1em;
  }
`;

export const Config = () => {
  return (
    <Section className="w-full flex flex-col justify-center items-center">sxas</Section>
  );
};
