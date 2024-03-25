import GlobalStyle from "./styles/global";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Inicio } from "./page/Inicio";

export const Rotas = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
        </Routes>
      </Router>
      <GlobalStyle />
    </>
  );
};
