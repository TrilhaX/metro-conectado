import { useState } from 'react';
import './signup.css'
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const saltRounds = 10;

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem");
            return;
        }

        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        const id = uuidv4();


        const novoUsuario = {
            id,
            username,
            email,
            senha: senhaCriptografada
        };

        localStorage.setItem('usuario', JSON.stringify(novoUsuario));
        alert("Cadastro realizado com sucesso!");

        window.location.href = 'login';
    };

    return (
        <div className='bodyLogin'>
            <div className="background-image-login"></div>
            <a href='home'><div className="backtoStartImg"></div></a>
            <form onSubmit={handleSubmit}>
                <h1>Registro</h1>
                <div className="input-container">
                    <label>Nome de Usuario</label>
                    <input type="text" required value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="input-container">
                    <label>Email</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-container">
                    <label>Senha</label>
                    <input type="password" required value={senha} onChange={e => setSenha(e.target.value)} />
                </div>
                <div className="input-container">
                    <label>Confirme a Senha</label>
                    <input type="password" required value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} />
                </div>
                <button type="submit">Entrar</button>
                <h2><a href='login'>Já tem login?</a></h2>
            </form>
        </div>
    )
}

export default Signup;