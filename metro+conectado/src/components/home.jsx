import { useState } from "react";
import './home.css'

const Home = () => {
    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <>
            <div class="background-image"></div> {/* Não mexer nesse class*/}
            <div
                className={`botaoMenu ${menuAberto ? "moverBotao" : ""}`}
                onClick={() => setMenuAberto(!menuAberto)}
            >
                ☰
            </div>
            <div className={`sidebar ${menuAberto ? "aberta" : ""}`}>
                <ul>
                    <hr />
                    <li><a href="home">Início</a></li>
                    <hr/>
                    <li><a href="sobre">Sobre</a></li>
                    <hr/>
                    <li><a href="contato">Contato</a></li>
                    <hr/>
                    <li><a href="planos">Planos</a></li>
                    <hr/>
                    <li><a href="login">Login</a></li>
                    <hr/>
                    <li><a href="signup">Sign Up</a></li> 
                    <hr />
                </ul>
            </div>
            <main>
                <div className="containerHome">
                    <h1>METRÔ + CONECTADO</h1>
                    <div className="buttonsHome">
                        <button id="mapasButton"><a href="mapa">Mapa</a></button>
                        <button id="lotacaoButton"><a href="lotacao">Lotação</a></button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
