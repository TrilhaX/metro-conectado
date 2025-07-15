import { useEffect, useRef, useState } from 'react';
import './perfil.css';

const BACKEND_URL = 'https://backend-metro-conectado.onrender.com';

const Perfil = () => {
    const [usuario, setUsuario] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [fotoFundo, setFotoFundo] = useState(null);
    const perfilInputRef = useRef(null);
    const fundoInputRef = useRef(null);

    // Busca dados completos do usuário (incluindo imagens)
    const buscarUsuario = async (userId) => {
        try {
            const res = await fetch(`${BACKEND_URL}/users/${userId}`);
            if (!res.ok) throw new Error('Erro ao buscar usuário');
            const data = await res.json();
            setUsuario(data);
            setFotoPerfil(data.fotoPerfil);
            setFotoFundo(data.fotoFundo);
            // Atualiza sessionStorage
            sessionStorage.setItem('sessionUser', JSON.stringify(data));
            if (data.fotoPerfil) sessionStorage.setItem('fotoPerfil', data.fotoPerfil);
            if (data.fotoFundo) sessionStorage.setItem('fotoFundo', data.fotoFundo);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const session = sessionStorage.getItem('sessionUser');
        if (!session) {
            window.location.href = '/login';
            return;
        }
        const dados = JSON.parse(session);
        // Primeiro exibe dados locais
        setUsuario(dados);
        setFotoPerfil(sessionStorage.getItem('fotoPerfil'));
        setFotoFundo(sessionStorage.getItem('fotoFundo'));
        // Busca versão atualizada do backend
        buscarUsuario(dados.id);
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/login';
    };

    const enviarImagem = async (file, tipo) => {
        if (!usuario?.id) return;
        try {
            const formData = new FormData();
            formData.append('imagem', file);
            formData.append('tipo', tipo);
            const res = await fetch(`${BACKEND_URL}/users/update/${usuario.id}`, {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) {
                const err = await res.json();
                console.error('Erro:', err);
                return;
            }
            const { usuario: usuarioAtualizado } = await res.json();
            // Atualiza estados e session
            setUsuario(usuarioAtualizado);
            if (usuarioAtualizado.fotoPerfil) setFotoPerfil(usuarioAtualizado.fotoPerfil);
            if (usuarioAtualizado.fotoFundo) setFotoFundo(usuarioAtualizado.fotoFundo);
            sessionStorage.setItem('sessionUser', JSON.stringify(usuarioAtualizado));
            sessionStorage.setItem('fotoPerfil', usuarioAtualizado.fotoPerfil || '');
            sessionStorage.setItem('fotoFundo', usuarioAtualizado.fotoFundo || '');
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageChange = (e, tipo) => {
        const file = e.target.files[0];
        if (file) enviarImagem(file, tipo);
    };

    return (
        <div className="bodyPerfil">
            <a href="/metro-conectado">
                <div className="backtoStartImg" />
            </a>
            <div className="perfil-container">
                <div
                    className="perfil-header"
                    onClick={() => fundoInputRef.current.click()}
                    style={{
                        backgroundImage: fotoFundo ? `url(${fotoFundo})` : 'none',
                        backgroundSize: 'cover',
                        cursor: 'pointer'
                    }}
                >
                    <div
                        className="foto-perfil"
                        onClick={(e) => { e.stopPropagation(); perfilInputRef.current.click(); }}
                    >
                        {fotoPerfil ? (
                            <img
                                src={fotoPerfil}
                                alt="Foto de perfil"
                                style={{ width: '100%', height: '100%', borderRadius: '50%', cursor: 'pointer' }}
                            />
                        ) : (
                            <div className="placeholder-perfil" />
                        )}
                    </div>
                    <h2>{usuario?.nome || 'ANÔNIMO'}</h2>
                </div>

                <input
                    type="file"
                    accept="image/*"
                    ref={perfilInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageChange(e, 'fotoPerfil')}
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={fundoInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageChange(e, 'fotoFundo')}
                />

                <div className="perfil-info">
                    <div className="coluna">
                        <label>NÚMERO</label>
                        <div className="campo">{usuario?.telefone || 'Não informado'}</div>

                        <label>EMAIL</label>
                        <div className="campo">{usuario?.email || 'Não informado'}</div>
                    </div>

                    <div className="coluna">
                        <label>TIPO DO PLANO</label>
                        <div className="campo">{usuario?.plano || 'BÁSICO'}</div>

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
