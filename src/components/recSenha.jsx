import { useState } from 'react';
import { Link } from 'react-router-dom';
import './recSenha.css';

const BACKEND_URL = 'https://backend-metro-conectado.onrender.com';

const RecSenha = () => {
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    const handleRecuperarSenha = async (e) => {
        e.preventDefault();
        setMensagem('');
        setErro('');

        try {
            const response = await fetch(`${BACKEND_URL}/auth/recover-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao solicitar a recuperação de senha.');
            }

            setMensagem('Um link de recuperação de senha foi enviado para o seu email.');
        } catch (err) {
            console.error("Erro na recuperação de senha:", err);
            setErro(err.message || "Erro ao conectar com o servidor.");
        }
    };

    return (
        <div className='bodyLogin'>
            <div className="background-image-login"></div>
            <Link to='/metro-conectado'><div className="backtoStartImg"></div></Link>
            <form onSubmit={handleRecuperarSenha}>
                <h1>Recuperar<br/>Senha</h1>
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seuemail@email.com" 
                        required 
                    />
                </div>
                {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}
                {erro && <p className="mensagem-erro">{erro}</p>}
                <button type="submit">Enviar Link de Recuperação</button>
                <div className="links-adicionais">
                    <Link to='/metro-conectado/login'>Lembrei minha senha!</Link>
                </div>
            </form>
        </div>
    );
}

export default RecSenha;