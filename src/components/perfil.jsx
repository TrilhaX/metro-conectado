import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './perfil.css';

const BACKEND_URL = 'https://backend-metro-conectado.onrender.com';

const Perfil = () => {
    const [usuario, setUsuario] = useState(null);
    const perfilInputRef = useRef(null);
    const fundoInputRef = useRef(null);
    const [newValue, setNewValue] = useState('');
    const [confirmValue, setConfirmValue] = useState('');
    const [editingType, setEditingType] = useState(null);

    const buscarUsuario = async (userId) => {
        try {
            const res = await fetch(`${BACKEND_URL}/users/${userId}`);
            if (!res.ok) throw new Error('Erro ao buscar usuário');
            const data = await res.json();
            setUsuario(data);
            sessionStorage.setItem('sessionUser', JSON.stringify(data));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const session = sessionStorage.getItem('sessionUser');
        if (!session) {
            window.location.href = '/metro-conectado/login';
            return;
        }

        const dados = JSON.parse(session);
        setUsuario(dados);
        buscarUsuario(dados.id);
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/metro-conectado/login';
    };

    const enviarImagem = async (file, tipo) => {
        if (!usuario?.id) return;

        const formData = new FormData();
        formData.append('imagem', file);
        formData.append('tipo', tipo);

        try {
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
            setUsuario(usuarioAtualizado);
            sessionStorage.setItem('sessionUser', JSON.stringify(usuarioAtualizado));
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageChange = (e, tipo) => {
        const file = e.target.files[0];
        if (file) {
            enviarImagem(file, tipo);
        }
    };

    function handleChangeInfo(type) {
        const backgroundChangeInfo = document.querySelector(".backgroundChangeInfo");
        const changeInfo = document.querySelector(".changeInfo");

        if (type === "none") {
            backgroundChangeInfo.style.display = "none";
            changeInfo.style.display = "none";
            setNewValue('');
            setConfirmValue('');
            setEditingType(null);
        } else {
            backgroundChangeInfo.style.display = "flex";
            changeInfo.style.display = "flex";
            setEditingType(type);
            handleChangeText(type);
        }
    }

    function handleChangeText(type) {
        const text1 = document.querySelector("#text1")
        const text2 = document.querySelector("#text2")
        if (type == "email") {
            text1.innerHTML = "Digite Email Novo"
            text2.innerHTML = "Confirme o Email Novo"
        } else if (type == 'numero') {
            text1.innerHTML = "Digite o Numero Novo"
            text2.innerHTML = "Confirme o Numero Novo"
        } else if (type == 'nome') {
            text1.innerHTML = "Digite o Nome Novo"
            text2.innerHTML = "Confirme o Nome Novo"
        }
    }

    const handleUpdateSubmit = async () => {
        const updatePayload = {};
        if (editingType === 'email') {
            updatePayload.email = newValue;
        } else if (editingType === 'numero') {
            updatePayload.telefone = newValue;
        } else if (editingType === 'nome') {
            updatePayload.nome = newValue;
        }

        if (Object.keys(updatePayload).length === 0) {
            return;
        }

        try {
            const res = await fetch(`${BACKEND_URL}/users/update-data/${usuario.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatePayload),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || 'Erro ao atualizar. Tente novamente.');
            }

            const data = await res.json();
            setUsuario(data.usuario);
            sessionStorage.setItem('sessionUser', JSON.stringify(data.usuario));
            handleChangeInfo('none');

        } catch (error) {
            console.error("Erro na atualização:", error);
        }
    };

    return (
        <div className="bodyPerfil">
            <Link to="/metro-conectado">
                <div className="backtoStartImg" />
            </Link>
            <div className='backgroundChangeInfo' style={{ display: 'none' }}></div>
            <div className='changeInfo' style={{ display: 'none' }}>
                <label id='text1'></label>
                <input
                    type="text"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                />
                <label id='text2'></label>
                <input
                    type="text"
                    value={confirmValue}
                    onChange={(e) => setConfirmValue(e.target.value)}
                />
                <button onClick={handleUpdateSubmit}>Confirmar</button>
            </div>
            <div className="perfil-container">
                <div
                    className="perfil-header"
                    onClick={() => fundoInputRef.current.click()}
                    style={{
                        backgroundImage: usuario?.fotoFundo ? `url(${usuario.fotoFundo})` : 'none',
                        backgroundSize: 'cover',
                        cursor: 'pointer'
                    }}
                >
                    <div
                        className="foto-perfil"
                        onClick={(e) => { e.stopPropagation(); perfilInputRef.current.click(); }}
                    >
                        {usuario?.fotoPerfil ? (
                            <img
                                src={usuario.fotoPerfil}
                                alt="Foto de perfil"
                                style={{ width: '100%', height: '100%', borderRadius: '50%', cursor: 'pointer' }}
                            />
                        ) : (
                            <div className="placeholder-perfil" />
                        )}
                    </div>
                    <h2 onClick={() => handleChangeInfo('nome')} style={{ zIndex: 3 }}>{usuario?.nome || 'ANÔNIMO'}</h2>
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
                        <div onClick={() => handleChangeInfo('numero')} className="campo" style={{ cursor: "pointer" }}>
                            {usuario?.telefone || 'Não informado'}
                        </div>

                        <label>EMAIL</label>
                        <div onClick={() => handleChangeInfo('email')} className="campo" style={{ cursor: "pointer" }}>
                            {usuario?.email || 'Não informado'}
                        </div>
                    </div>
                    <div className="coluna">
                        <label>TIPO DO PLANO</label>
                        <div className="campo">{usuario?.plano || 'BÁSICO'}</div>
                        <label>PLANOS E MAIS</label>
                        <div className="campo">
                            <Link to="/metro-conectado/planos" style={{ textDecoration: 'none', color: 'black', fontWeight: 'Normal' }}>
                                APRIMORAR PLANO
                            </Link>
                        </div>
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