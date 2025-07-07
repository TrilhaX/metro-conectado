import { useEffect, useRef, useState } from 'react';
import './perfil.css';

const Perfil = () => {
    const [usuario, setUsuario] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [fotoFundo, setFotoFundo] = useState(null);

    const perfilInputRef = useRef(null);
    const fundoInputRef = useRef(null);

    useEffect(() => {
        const dados = JSON.parse(sessionStorage.getItem("sessionUser"));
        const perfilImg = sessionStorage.getItem("fotoPerfil");
        const fundoImg = sessionStorage.getItem("fotoFundo");

        if (dados) {
            setUsuario(dados);
        } else {
            window.location.href = "login";
        }

        if (perfilImg) setFotoPerfil(perfilImg);
        if (fundoImg) setFotoFundo(fundoImg);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("sessionUser");
        sessionStorage.removeItem("fotoPerfil");
        sessionStorage.removeItem("fotoFundo");
        window.location.href = "/";
    };

    const handleImageChange = (event, tipo) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (tipo === "perfil") {
                    setFotoPerfil(e.target.result);
                    sessionStorage.setItem("fotoPerfil", e.target.result);
                } else if (tipo === "fundo") {
                    setFotoFundo(e.target.result);
                    sessionStorage.setItem("fotoFundo", e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='bodyPerfil'>
            <a href='/'><div className="backtoStartImg"></div></a>

            <div
                className="perfil-container"
            >
                <div
                    className="perfil-header"
                    onClick={() => fundoInputRef.current.click()}
                    style={{
                        backgroundImage: `url(${fotoFundo || "/defaultFundo.png"})`,
                        backgroundSize: "cover",
                        cursor: "pointer"
                    }}
                >
                    <div className="foto-perfil" onClick={(e) => {
                        e.stopPropagation(); // evita disparar o clique do fundo
                        perfilInputRef.current.click();
                    }}>
                        <img
                            src={fotoPerfil || "/defaultPerfil.png"}
                            alt="Foto de perfil"
                            style={{ width: '100%', height: '100%', borderRadius: '50%', cursor: 'pointer' }}
                        />
                    </div>
                    <h2>{usuario?.username || "ANÔNIMO"}</h2>
                </div>

                {/* Inputs ocultos */}
                <input
                    type="file"
                    accept="image/*"
                    ref={perfilInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageChange(e, "perfil")}
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={fundoInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageChange(e, "fundo")}
                />

                <div className="perfil-info">
                    <div className="coluna">
                        <label>NÚMERO</label>
                        <div className="campo">{usuario?.telefone || "Não informado"}</div>

                        <label>EMAIL</label>
                        <div className="campo">{usuario?.email || "Não informado"}</div>
                    </div>

                    <div className="coluna">
                        <label>TIPO DO PLANO</label>
                        <div className="campo">{usuario?.plano || "BÁSICO"}</div>

                        <label>PLANOS E MAIS</label>
                        <div className="campo">APRIMORAR PLANO</div>
                    </div>
                </div>

                <button className="sair" onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                        <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Perfil;
