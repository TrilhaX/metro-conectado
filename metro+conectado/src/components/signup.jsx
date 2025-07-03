import './signup.css'

const Signup = () => {
    return (
        <div className='bodyLogin'>
            <div class="background-image-login"></div> {/* Não mexer nesse class*/}
            <a href='home'><div class="backtoStartImg"></div></a> {/* Não mexer nesse class*/}
            <form>
                <h1>Registro</h1>
                <div className="input-container">
                    <label>Nome de Usuario</label>
                    <input type="email" placeholder="seuemail@email.com" required />
                </div>
                <div className="input-container">
                    <label>Email</label>
                    <input type="email" placeholder="seuemail@email.com" required />
                </div>
                <div className="input-container">
                    <label>Senha</label>
                    <input type="password" placeholder="•••••••" required />
                </div>
                <div className="input-container">
                    <label>Confirme a Senha</label>
                    <input type="password" placeholder="•••••••" required />
                </div>
                <button>Entrar</button>
                <h2><a href='login'>Ja tem login?</a></h2>
            </form>
        </div>
    )
}

export default Signup