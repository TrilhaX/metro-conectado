import './planos.css';

const Planos = () => {
    const planos = [
        {
            nome: "Plano Básico",
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

    return (
        <div className='bodyPerfil'>
            <a href='/'><div className="backtoStartImg"></div></a>
            {planos.map((plano, index) => (
                <div key={index} className='carta'>
                    <h1>{plano.nome}</h1>
                    <strong>{plano.preco}</strong>
                    <ul>
                        {plano.beneficios.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                    <button className='btnAssinar'>Assinar</button>
                </div>
            ))}
        </div>
    );
}

export default Planos;