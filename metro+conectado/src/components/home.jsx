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
                    <hr />
                    <li><a href="planos">Planos</a></li>
                    <hr />
                    {
                        usuarioLogado ? (
                            <>
                                <li><a href="perfil">Perfil</a></li>
                                <hr />
                            </>
                        ) : (
                            <>
                                <li><a href="login">Login</a></li>
                                <hr />
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
            <footer id="footer">
                <div className="sobreNos">
                    <h1>
                        Sobre Nós
                    </h1>
                    <p id="paragrafoSobrenos">
                        Somos um grupo de estudantes dedicados à criação de soluções tecnológicas que melhorem a vida das pessoas nas grandes cidades. Acreditamos que a mobilidade urbana precisa acompanhar os avanços da tecnologia, oferecendo mais praticidade, informação em tempo real e acessibilidade para os usuários do transporte público.

                        O projeto Metrô+Conectado nasceu da observação de um problema real: a falta de informações claras e atualizadas sobre o funcionamento do metrô. Nossa proposta é desenvolver um sistema inteligente, integrado e acessível que ajude os passageiros a tomar decisões melhores no dia a dia, economizando tempo e evitando transtornos.

                        Unindo conhecimentos em programação, design, análise de sistemas, IoT e gestão de projetos, buscamos desenvolver um aplicativo moderno, intuitivo e eficaz, com potencial para impactar positivamente milhões de usuários.
                    </p>
                </div>
                <section class="contato">
                    <h2>Entre em Contato</h2>
                    <div class="info-contato">
                        <p><strong>Email:</strong> exemplo@email.com</p>
                        <p><strong>WhatsApp:</strong> (11) 91234-5678</p>
                        <p><strong>Localização:</strong> São Paulo - SP</p>
                    </div>
                    <div class="redes-sociais">
                        <a href="https://instagram.com/seuperfil" target="_blank">Instagram</a>
                        <a href="https://wa.me/5511912345678" target="_blank">WhatsApp</a>
                        <a href="https://linkedin.com/in/seuperfil" target="_blank">LinkedIn</a>
                    </div>
                </section>
            </footer>
        </div>
    );
};

export default Home;