import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            const response = await fetch('https://backend-metro-conectado.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErro(errorData.message || 'Erro ao fazer login. Verifique suas credenciais.');
                return;
            }

            const usuarioEncontrado = await response.json();
            sessionStorage.setItem("sessionUser", JSON.stringify(usuarioEncontrado));
            window.location.href = '/metro-conectado/';

        } catch (err) {
            console.error("Erro ao fazer login:", err);
            setErro("Erro ao conectar com o servidor.");
        }
    };

    return (
        <div className='bodyLogin'>
            <div className="background-image-login"></div>
            <Link to='/metro-conectado'><div className="backtoStartImg"></div></Link>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-container">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="senha" required value={senha} onChange={e => setSenha(e.target.value)} />
                </div>
                {erro && <label id="erroLabel" style={{ color: 'red' }}>{erro}</label>}
                <button type="submit">Entrar</button>
                <h2><Link to='/metro-conectado/recoverPassword'>Esqueceu a senha?</Link></h2>
                <h2><Link to='/metro-conectado/signup'>Não tenho conta</Link></h2>
            </form>
        </div>
    );
};

export default Login;