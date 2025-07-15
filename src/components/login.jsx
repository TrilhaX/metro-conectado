import { useState } from 'react';
import bcrypt from 'bcryptjs';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://backend-metro-conectado.onrender.com/users/all');
            const usuarios = await response.json();
            const usuarioEncontrado = usuarios.find(user => user.email === email);

            if (!usuarioEncontrado) {
                setErro("Usuário não encontrado!");
                return;
            }

            const senhaConfere = await bcrypt.compare(senha, usuarioEncontrado.senha);

            if (!senhaConfere) {
                setErro("Senha incorreta!");
                return;
            }

            sessionStorage.setItem("sessionUser", JSON.stringify(usuarioEncontrado));
            window.location.href = '/';

        } catch (err) {
            console.error("Erro ao fazer login:", err);
            setErro("Erro ao conectar com o servidor.");
        }
    };

    return (
        <div className='bodyLogin'>
            <div className="background-image-login"></div>
            <a href='/metro-conectado'><div className="backtoStartImg"></div></a>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="input-container">
                    <label>Email</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-container">
                    <label>Senha</label>
                    <input type="password" required value={senha} onChange={e => setSenha(e.target.value)} />
                </div>
                {erro && <label id="erroLabel" style={{ color: 'red' }}>{erro}</label>}
                <button type="submit">Entrar</button>
                <h2><a href='/metro-conectado/recoverPassword'>Esqueceu a senha?</a></h2>
                <h2><a href='/metro-conectado/signup'>Não tenho conta</a></h2>
            </form>
        </div>
    );
};

export default Login;
