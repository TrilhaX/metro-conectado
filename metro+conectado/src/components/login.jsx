import './login.css'

const Login = () => {
    return(
        <>
            <div class="background-image-login"></div> {/* Não mexer nesse class*/}
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

                <h2>Esqueceu a senha?</h2>
            </form>
        </>
    )
}

export default Login