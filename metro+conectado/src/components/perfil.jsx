import { useEffect, useRef, useState } from 'react';
import './perfil.css';

const BACKEND_URL = 'https://backend-metro-conectado.onrender.com';

const Perfil = () => {
    const [usuario, setUsuario] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [fotoFundo, setFotoFundo] = useState(null);
    const [dataFotoPerfil, setDataFotoPerfil] = useState(null);
    const [dataFotoFundo, setDataFotoFundo] = useState(null);

    const perfilInputRef = useRef(null);
    const fundoInputRef = useRef(null);

    useEffect(() => {
        const dados = JSON.parse(sessionStorage.getItem("sessionUser"));
        const perfilImg = sessionStorage.getItem("fotoPerfil");
        const fundoImg = sessionStorage.getItem("fotoFundo");
        const dataPerfil = sessionStorage.getItem("dataFotoPerfil");
        const dataFundo = sessionStorage.getItem("dataFotoFundo");

        if (dados) {
            setUsuario(dados);
        } else {
            window.location.href = "login";
        }

        if (perfilImg) setFotoPerfil(perfilImg);
        if (fundoImg) setFotoFundo(fundoImg);
        if (dataPerfil) setDataFotoPerfil(dataPerfil);
        if (dataFundo) setDataFotoFundo(dataFundo);
    }, []);

    const atualizarUsuario = (usuarioAtualizado) => {
        setUsuario(usuarioAtualizado);
        sessionStorage.setItem("sessionUser", JSON.stringify(usuarioAtualizado));
    };

    const handleLogout = () => {
        sessionStorage.removeItem("sessionUser");
        sessionStorage.removeItem("fotoPerfil");
        sessionStorage.removeItem("fotoFundo");
        sessionStorage.removeItem("dataFotoPerfil");
        sessionStorage.removeItem("dataFotoFundo");
        window.location.href = "/";
    };

    const enviarImagem = async (file, tipo) => {
        if (!usuario?.id) return;

        try {
            const formData = new FormData();
            formData.append('imagem', file);
            formData.append('tipo', tipo);

            const response = await fetch(`${BACKEND_URL}/users/update/${usuario.id}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const erro = await response.json();
                console.error('Erro ao atualizar imagem:', erro);
                return;
            }

            const data = await response.json();

            if (tipo === "fotoPerfil") {
                setFotoPerfil(data.usuario.fotoPerfil);
                setDataFotoPerfil(new Date().toLocaleString());
                sessionStorage.setItem("fotoPerfil", data.usuario.fotoPerfil);
                sessionStorage.setItem("dataFotoPerfil", new Date().toLocaleString());
            } else if (tipo === "fotoFundo") {
                setFotoFundo(data.usuario.fotoFundo);
                setDataFotoFundo(new Date().toLocaleString());
                sessionStorage.setItem("fotoFundo", data.usuario.fotoFundo);
                sessionStorage.setItem("dataFotoFundo", new Date().toLocaleString());
            }

            atualizarUsuario(data.usuario);

        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const handleImageChange = (event, tipo) => {
        const file = event.target.files[0];
        if (file) {
            enviarImagem(file, tipo);
        }
    };

    const getImagemUrl = (caminho) => {
        if (!caminho) return '/defaultAnonimo.png';
        if (caminho.startsWith('http://') || caminho.startsWith('https://')) return caminho;
        return `${BACKEND_URL}${caminho}`;
    };

    return (
        <div className='bodyPerfil'>
            <a href='/'><div className="backtoStartImg"></div></a>

            <div className="perfil-container">
                <div
                    className="perfil-header"
                    onClick={() => fundoInputRef.current.click()}
                    style={{
                        backgroundImage: `url(${getImagemUrl(fotoFundo)})`,
                        backgroundSize: "cover",
                        cursor: "pointer"
                    }}
                >
                    <div className="foto-perfil" onClick={(e) => {
                        e.stopPropagation();
                        perfilInputRef.current.click();
                    }}>
                        <img
                            src={getImagemUrl(fotoPerfil)}
                            alt="Foto de perfil"
                            style={{ width: '100%', height: '100%', borderRadius: '50%', cursor: 'pointer' }}
                        />
                    </div>
                    <h2>{usuario?.nome || "ANÔNIMO"}</h2>
                </div>

                <input
                    type="file"
                    accept="image/*"
                    ref={perfilInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageChange(e, "fotoPerfil")}
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={fundoInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageChange(e, "fotoFundo")}
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

                <button className="sair" onClick={handleLogout} title="Sair">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                        <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Perfil;
