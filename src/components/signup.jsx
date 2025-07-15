import { useState } from 'react';
import './signup.css';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const saltRounds = 10;

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (senha.length < 8 || senha.length > 16) {
            setErro("A senha deve conter entre 8 e 16 caracteres");
            return;
        }

        if (senha !== confirmarSenha) {
            setErro("As senhas não coincidem");
            return;
        }

        try {
            const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
            const id = uuidv4();

            const novoUsuario = {
                id,
                nome: username,
                email,
                telefone,
                plano: "BÁSICO",
                senha: senhaCriptografada
            };

            const response = await fetch('https://backend-metro-conectado.onrender.com/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoUsuario)
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = 'login';
            } else {
                setErro(data.erro || "Erro ao registrar.");
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setErro("Erro de rede ou no servidor.");
        }
    };

    return (
        <div className='bodyLogin'>
            <div className="background-image-login"></div>
            <a href='/'><div className="backtoStartImg"></div></a>
            <form onSubmit={handleSubmit}>
                <h1>Registro</h1>
                <div className="input-container-1">
                    <label>Nome de Usuário</label>
                    <input type="text" required value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="input-container-1">
                    <label>Email</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-container-1">
                    <label>Telefone</label>
                    <input type="tel" required value={telefone} onChange={e => setTelefone(e.target.value)} />
                </div>
                <div className="input-container-1">
                    <label>Senha</label>
                    <input type="password" required value={senha} onChange={e => setSenha(e.target.value)} />
                </div>
                <div className="input-container-1">
                    <label>Confirme a Senha</label>
                    <input type="password" required value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} />
                </div>
                {erro && <label id="erroLabel" style={{ color: 'red' }}>{erro}</label>}
                <button type="submit">Entrar</button>
                <h2><a href='login'>Já tem login?</a></h2>
            </form>
        </div>
    );
}

export default Signup;