import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Hook para navegação programática

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        setIsLoading(true);

        if (senha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            setIsLoading(false);
            return;
        }

        if (senha.length < 8 || senha.length > 16) {
            setErro("A senha deve conter entre 8 e 16 caracteres.");
            setIsLoading(false);
            return;
        }

        try {
            const novoUsuario = {
                nome: username,
                email,
                telefone,
                senha
            };

            const response = await fetch('https://backend-metro-conectado.onrender.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoUsuario)
            });

            if (response.ok) {
                navigate('/metro-conectado/login');
            } else {
                const data = await response.json();
                setErro(data.message || "Erro ao registrar. Tente novamente.");
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setErro("Erro de rede ou no servidor. Por favor, tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='bodyLogin'>
            <div className="background-image-login"></div>
            <Link to='/metro-conectado'><div className="backtoStartImg"></div></Link>
            <form onSubmit={handleSubmit}>
                <h1>Registro</h1>
                <div className="input-container-1">
                    <label htmlFor="username">Nome de Usuário</label>
                    <input id="username" type="text" required value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="input-container-1">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-container-1">
                    <label htmlFor="telefone">Telefone</label>
                    <input id="telefone" type="tel" required value={telefone} onChange={e => setTelefone(e.target.value)} />
                </div>
                <div className="input-container-1">
                    <label htmlFor="senha">Senha</label>
                    <input id="senha" type="password" required value={senha} onChange={e => setSenha(e.target.value)} />
                </div>
                <div className="input-container-1">
                    <label htmlFor="confirmarSenha">Confirme a Senha</label>
                    <input id="confirmarSenha" type="password" required value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} />
                </div>
                {erro && <label id="erroLabel" style={{ color: 'red' }}>{erro}</label>}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Registrando...' : 'Registrar'}
                </button>
                <h2><Link to='/metro-conectado/login'>Já tem login?</Link></h2>
            </form>
        </div>
    );
};

export default Signup;