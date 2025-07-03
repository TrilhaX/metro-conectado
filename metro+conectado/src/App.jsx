import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/home';
import Login from './components/login';
import SignUp from "./components/signup";
import Contato from "./components/contato";
import Planos from "./components/planos";
import Sobre from "./components/sobre";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </Router>
  );
}

export default App;