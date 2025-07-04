import { useState } from 'react';
import bcrypt from 'bcryptjs';
import './login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const errorLabel = document.getElementById("erroLabel")

    const handleLogin = async (e) => {
        e.preventDefault();

        const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

        if (!usuarioSalvo) {
            errorLabel.innerHTML = "Usuario ainda não foi cadastrado!"
            return;
        }

        if (usuarioSalvo.email === email) {
            const senhaConfere = await bcrypt.compare(senha, usuarioSalvo.senha);
            if (senhaConfere) {
                sessionStorage.setItem("sessionUser", JSON.stringify(usuarioSalvo));
                window.location.href = '/';
            } else {
                errorLabel.innerHTML = "Sua senha está errada!"
            }
        } else {
            errorLabel.innerHTML = "Seu email está errado!"
        }
    };

    return (
        <div className='bodyLogin'>
            <div className="background-image-login"></div>
            <a href='/'><div className="backtoStartImg"></div></a>
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
                <label id="erroLabel"></label>
                <button type="submit">Entrar</button>
                <h2><a href='recoverPassword'>Esqueceu a senha?</a></h2>
                <h2><a href='signup'>Não tenho conta</a></h2>
            </form>
        </div>
    )
}

export default Login;