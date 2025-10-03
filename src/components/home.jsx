import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./home.css";

const Home = () => {
    const [menuAberto, setMenuAberto] = useState(false);
    const [usuarioLogado, setUsuarioLogado] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const sessionUser = sessionStorage.getItem("sessionUser");
        if (sessionUser) {
            setUsuarioLogado(true);
        }
    }, [location]);

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
                    <li>
                        <Link to="/metro-conectado">
                            Início
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="30px"
                                viewBox="0 -960 960 960"
                                width="30px"
                                fill="#e3e3e3"
                            >
                                <path d="M226.67-186.67h140v-246.66h226.66v246.66h140v-380L480-756.67l-253.33 190v380ZM160-120v-480l320-240 320 240v480H526.67v-246.67h-93.34V-120H160Zm320-352Z" />
                            </svg>
                        </Link>
                    </li>
                    <hr />
                    <li>
                        <Link to="/metro-conectado/planos">
                            Planos
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="30px"
                                viewBox="0 -960 960 960"
                                width="30px"
                                fill="#e3e3e3"
                            >
                                <path d="M240-80q-50 0-85-35t-35-85v-120h120v-560h600v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-600H320v480h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h360v80H360ZM0 120v-80h360v80H360ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm0 0h-40 400-360Z" />
                            </svg>
                        </Link>
                    </li>
                    <hr />
                    <li>
                        <Link to="/metro-conectado/mapa">
                            Mapa
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z"/></svg>
                        </Link>
                    </li>
                    <hr />
                    {usuarioLogado ? (
                        <>
                            <li>
                                <Link to="/metro-conectado/perfil" className="perfil-link">
                                    <span>Perfil</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="px"
                                        viewBox="0 -960 960 960"
                                        width="30px"
                                        fill="#ffffff"
                                    >
                                        <path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.92 44.69q31.3 14.13 50.19 40.97Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Z" />
                                    </svg>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/metro-conectado/login">
                                    Login{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#e3e3e3"
                                    >
                                        <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                                    </svg>
                                </Link>
                            </li>
                            <hr />
                            <li>
                                <Link to="/metro-conectado/signup">
                                    Sign Up{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#e3e3e3"
                                    >
                                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                    </svg>
                                </Link>
                            </li>
                            <hr />
                        </>
                    )}
                </ul>
            </div>

            <main>
                <div className="containerHome">
                    <h1>METRÔ + CONECTADO</h1>
                </div>
            </main>
            <footer id="footer">
                <div className="sobreNos">
                    <h1>Sobre Nós</h1>
                    <p id="paragrafoSobrenos">
                        Somos um grupo de estudantes dedicados à criação de soluções
                        tecnológicas que melhorem a vida das pessoas nas grandes cidades.
                        Acreditamos que a mobilidade urbana precisa acompanhar os avanços da
                        tecnologia, oferecendo mais praticidade, informação em tempo real e
                        acessibilidade para os usuários do transporte público. O projeto
                        Metrô+Conectado nasceu da observação de um problema real: a falta de
                        informações claras e atualizadas sobre o funcionamento do metrô.
                        Nossa proposta é desenvolver um sistema inteligente, integrado e
                        acessível que ajude os passageiros a tomar decisões melhores no dia
                        a dia, economizando tempo e evitando transtornos. Unindo
                        conhecimentos em programação, design, análise de sistemas, IoT e
                        gestão de projetos, buscamos desenvolver um aplicativo moderno,
                        intuitivo e eficaz, com potencial para impactar positivamente
                        milhões de usuários.
                    </p>
                </div>
                <section className="contato">
                    <h1>Entre em Contato</h1>
                    <div className="info-contato">
                        <p>
                            <strong>Email:</strong> exemplo@email.com
                        </p>
                        <p>
                            <strong>WhatsApp:</strong> (11) 91234-5678
                        </p>
                        <p>
                            <strong>Localização:</strong> São Paulo - SP
                        </p>
                    </div>
                    <div className="redes-sociais">
                        <a href="https://instagram.com/seuperfil" target="_blank">
                            Instagram
                        </a>
                        <a href="https://wa.me/5511912345678" target="_blank">
                            WhatsApp
                        </a>
                        <a href="https://linkedin.com/in/seuperfil" target="_blank">
                            LinkedIn
                        </a>
                    </div>
                </section>
            </footer>
        </div>
    );
};

export default Home;
