import { Routes, Route } from "react-router-dom";
import Home from './components/home';
import Login from './components/login';
import SignUp from "./components/signup";
import Planos from "./components/planos";
import Mapa from "./components/mapa";
import Lotacao from "./components/lotacao"
import RecSenha from "./components/recSenha"
import Perfil from "./components/perfil"

function App() {
  return (
    <Routes>
      <Route path="/metro-conectado/" element={<Home />} />
      <Route path="/metro-conectado/login" element={<Login />} />
      <Route path="/metro-conectado/perfil" element={<Perfil />} />
      <Route path="/metro-conectado/signup" element={<SignUp />} />
      <Route path="/metro-conectado/planos" element={<Planos />} />
      <Route path="/metro-conectado/mapa" element={<Mapa />} />
      <Route path="/metro-conectado/lotacao" element={<Lotacao />} />
      <Route path="/metro-conectado/recoverPassword" element={<RecSenha />} />
    </Routes>
  );
}

export default App;