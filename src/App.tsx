import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./Login/login.tsx";
import {Lista} from "./Lista/Lista.tsx";
import {Cadastro} from "./cadastro/Cadastro.tsx";


function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/lista" element={<Lista />}></Route>
              <Route path="/cadastro" element={<Cadastro />}></Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
