import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './planos.css';

const Planos = () => {
    const [planoUsuario, setPlanoUsuario] = useState(null);

    const planos = [
        {
            nome: "Plano Básico",
            id: 'basico',
            preco: "R$ 19,90 / mês",
            beneficios: [
                "Acesso a funcionalidades básicas",
                "Limite de 5 projetos ativos",
                "Suporte por e-mail (resposta em até 48h)",
                "Armazenamento de 10GB"
            ]
        },
        {
            nome: "Plano Intermediário",
            id: 'intermediario',
            preco: "R$ 39,90 / mês",
            beneficios: [
                "Acesso a todas as funcionalidades básicas",
                "Limite de 20 projetos ativos",
                "Suporte via chat com resposta em até 12h",
                "Armazenamento de 50GB",
                "Relatórios mensais personalizados"
            ]
        },
        {
            nome: "Plano Premium",
            id: 'premium',
            preco: "R$ 69,90 / mês",
            beneficios: [
                "Acesso total sem limites",
                "Suporte 24/7 via telefone e chat",
                "Armazenamento ilimitado",
                "Acesso a conteúdos e webinars exclusivos",
                "Consultoria mensal com especialistas"
            ]
        }
    ];

    useEffect(() => {
        const session = sessionStorage.getItem('sessionUser');
        if (session) {
            const user = JSON.parse(session);
            setPlanoUsuario(user.plano);
        }
    }, []);

    const handleAssinar = async (planoId) => {
        if (!planoUsuario) {
            return;
        }

        try {
            console.log(`Tentando assinar o plano ${planoId} para o usuário...`);
            setPlanoUsuario(planoId);
            const user = JSON.parse(sessionStorage.getItem('sessionUser'));
            sessionStorage.setItem('sessionUser', JSON.stringify({ ...user, plano: planoId }));

        } catch (error) {
            console.error("Erro ao assinar o plano:", error);
        }
    };

    return (
        <div className='bodyPerfil'>
            <Link to='/metro-conectado'><div className="backtoStartImg"></div></Link>
            <div className='containerPlanos'>
                {planos.map((plano) => (
                    <div key={plano.id} className={`carta ${plano.id === planoUsuario ? 'plano-atual' : ''}`}>
                        <h3>{plano.nome}</h3>
                        <strong>{plano.preco}</strong>
                        <ul>
                            {plano.beneficios.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <button
                            className='btnAssinar'
                            onClick={() => handleAssinar(plano.id)}
                            disabled={plano.id === planoUsuario}
                        >
                            {plano.id === planoUsuario ? 'Plano Atual' : 'Assinar'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Planos;