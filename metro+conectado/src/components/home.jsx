import { useState, useEffect } from "react";
import './home.css'

const Home = () => {
    const [menuAberto, setMenuAberto] = useState(false);
    const [usuarioLogado, setUsuarioLogado] = useState(false);

    useEffect(() => {
        const sessionUser = sessionStorage.getItem("sessionUser");
        if (sessionUser) {
            setUsuarioLogado(true);
        }
    }, []);

    return (
        <div className="bodyHome">
            <div className="background-image"></div>
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
                    {
                        usuarioLogado ? (
                            <>
                                <li><a href="perfil">Perfil</a></li>
                                <hr />
                            </>
                        ) : (
                            <>
                                <li><a href="login">Login</a></li>
                                <hr/>
                                <li><a href="signup">Sign Up</a></li>
                                <hr />
                            </>
                        )
                    }
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
        </div>
    );
};

export default Home;