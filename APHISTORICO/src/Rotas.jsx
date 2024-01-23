import GlobalStyle from './styles/global'
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Inicio } from './page/Inicio'
import { Casa } from './page/Casa'
import { Empresa } from './page/Empresa'


export const Rotas = () => {
  return (
    <>
      <Router>
        <Routes>

         <Route path='/' element={<Inicio/>}></Route>  
         <Route path='/casa' element={<Casa/>}></Route>  
         <Route path='/empresa' element={<Empresa/>}></Route>  

        </Routes>
      </Router>
      <GlobalStyle />
    </>
  )
}