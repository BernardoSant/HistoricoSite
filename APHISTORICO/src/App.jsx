import { Rotas } from "./Rotas";
import './App.css'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <Rotas />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </>
  )
}

export default App
