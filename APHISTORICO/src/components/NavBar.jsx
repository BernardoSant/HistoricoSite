import { BsBuildings, BsHouse, BsList, BsBoxSeam } from "react-icons/bs";
import { useState } from "react";
import styled, { keyframes } from 'styled-components';
import { Link } from "react-router-dom";

const Button = ({ Icon }) => {
  return (
    <div className="text-[2em] z-10 bg-slate-200 rounded-full p-3 shadow-slate-400 shadow-md flex justify-center items-center w-auto"><Icon /></div>
  )
}
  const moveDown = keyframes`
  0% { transform: translateY(0);}
  100% { transform: translateY(80px);}
`;
  const moveUp = keyframes`
  0% { transform: translateY(80px);}
  100% { transform: translateY(0);}
`;
  const moveDown2 = keyframes`
  0% { transform: translateY(0);}
  100% { transform: translateY(150px);}
`;
  const moveUp2 = keyframes`
  0% { transform: translateY(150px);}
  100% { transform: translateY(0);}
`;
  const move = keyframes`
  0% { transform: translateX(60px) scale(1); }
  100% { transform: translateX(0px) scale(0); }
`;
  const moveD = keyframes`
  0% { transform: translateX(0px) scale(0); }
  100% { transform: translateX(60px) scale(1); }
`; 
const Dir = styled.button`
    display:flex;
    justify-items: center;
    align-items: center;
    padding:5px;
  position: absolute;
  animation: ${props => props.animate ? moveDown : moveUp} 0.5s forwards;
`;
  const Dir2 = styled.button`
    display:flex;
    justify-items: center;
    align-items: center;
    padding:5px; 
  position: absolute;
  animation: ${props => props.animate ? moveDown2 : moveUp2} 0.5s forwards;
`;

  const Label = styled.div`
    position: absolute;
margin-left: 1em;
  animation: ${props => props.animate ? moveD : move} 0.2s forwards;
`;
export const NavBar = ({ Tipo }) => {

 

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      {Tipo === 1 &&
        <nav className="flex flex-col gap-5 fixed p-5 z-20">
          <nav className="z-20 flex justify-center items-center gap-5">
            <div
              onClick={handleClick}
              className="text-[3em] bg-slate-200 rounded-full p-2 shadow-slate-400 shadow-md flex justify-center items-center gap-8 w-auto">
              <BsList /> </div>
            <p className="text-xl font-medium">Dashboard</p>
          </nav>

          <Link to={"/Casa"} className="absolute"><Dir animate={isClicked} title="Casa"><Button Icon={BsHouse}></Button> <Label animate={isClicked}>Casa</Label></Dir></Link>

          <Link to={"/Empresa"} className="absolute"><Dir2 animate={isClicked} title="Empresa"><Button Icon={BsBuildings}></Button><Label animate={isClicked}>Empresa</Label></Dir2></Link>

        </nav >}

      {Tipo === 2 &&
        <nav className="flex flex-col gap-5 fixed p-5 z-20">

          <nav className="z-20 flex justify-center items-center gap-5">
            <div
              onClick={handleClick}
              className="text-[3em] bg-slate-200 rounded-full p-2 shadow-slate-400 shadow-md flex justify-center items-center gap-8 w-auto">
              <BsHouse /> </div>
            <p className="text-xl font-medium">Casa</p>
          </nav>

          <Link to={"/"} className="absolute"><Dir animate={isClicked} title="Casa"><Button Icon={BsBoxSeam}></Button> <Label animate={isClicked}>Dashboard</Label></Dir></Link>

          <Link to={"/empresa"} className="absolute"><Dir2 animate={isClicked} title="Empresa"><Button Icon={BsBuildings}></Button><Label animate={isClicked}>Empresa</Label></Dir2></Link>

        </nav >}

      {Tipo === 3 &&
        <nav className="flex flex-col gap-5 fixed p-5 z-20">

          <nav className="z-20 flex justify-center items-center gap-5">
            <div
              onClick={handleClick}
              className="text-[2em] bg-slate-200 rounded-full p-4 shadow-slate-400 shadow-md flex justify-center items-center gap-8 w-auto">
              <BsBuildings /> </div>
            <p className="text-xl font-medium">Empresa</p>
          </nav>

          <Link to={"/"} className="absolute"><Dir animate={isClicked} title="Casa"><Button Icon={BsBoxSeam}></Button> <Label animate={isClicked}>Dashboard</Label></Dir></Link>

          <Link to={"/casa"} className="absolute"><Dir2 animate={isClicked} title="Empresa"><Button Icon={BsHouse}></Button><Label animate={isClicked}>Casa</Label></Dir2></Link>

        </nav >}


    </>
  )
}