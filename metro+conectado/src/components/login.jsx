import './login.css'

const Login = () => {
    return(
        <div className='bodyLogin'>
            <div className="background-image-login"></div> {/* Não mexer nesse class*/}
            <a href='home'><div class="backtoStartImg"></div></a> {/* Não mexer nesse class*/}
            <form>
                <h1>Login</h1>

                <div className="input-container">
                    <label>Email</label>
                    <input type="email" placeholder="seuemail@email.com" required />
                </div>

                <div className="input-container">
                    <label>Senha</label>
                    <input type="password" placeholder="•••••••" required />
                </div>
                <button>Entrar</button>
                <h2><a href='recoverPassword'>Esqueceu a senha?</a></h2>
                <h2><a href='signup'>Não tenho conta</a></h2>
            </form>
        </div>
    )
}

export default Login