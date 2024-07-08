import styled from "styled-components";


const Section = styled.div`
  box-shadow: -1px 2px 13px #b5b2b2, -4px -5px 13px #ffffff;
  border-bottom-right-radius: 1em;
  border-top-right-radius: 1em;
  padding-top: 1em;
  padding-bottom: 1em;
  padding-left: 1em;
  padding-right: 1em;
  font-size: medium;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    <Section ><div className="bg-blue-400 w-full h-full">sjkxs</div></Section>
  );
};
