import { useEffect, useState } from 'react';
import './perfil.css';

const Perfil = () => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const dados = JSON.parse(sessionStorage.getItem("sessionUser"));
        if (dados) {
            setUsuario(dados);
        } else {
            window.location.href = "login";
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("sessionUser");
        window.location.href = "/";
    };

    return (
        <div className='bodyPerfil'>
            <a href='/'><div className="backtoStartImg"></div></a>
            <div className="perfil-container">
                <div className="perfil-header">
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Foto de Perfil" className="foto-perfil" />
                    <h2>{usuario?.username || "ANÔNIMO"}</h2>
                </div>

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

                <button className="sair" onClick={handleLogout}>SAIR DA CONTA</button>
            </div>
        </div>
    );
}

export default Perfil;