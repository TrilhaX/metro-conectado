import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/home';
import Login from './components/login';
import SignUp from "./components/signup";
import Contato from "./components/contato";
import Planos from "./components/planos";
import Sobre from "./components/sobre";
import Mapa from "./components/mapa";
import Lotacao from "./components/lotacao"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/lotacao" element={<Lotacao />} />
      </Routes>
    </Router>
  );
}

export default App;