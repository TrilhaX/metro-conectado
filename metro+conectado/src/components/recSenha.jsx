import './recSenha.css'

const RecSenha = () => {
    return (
        <div className='bodyLogin'>
            <div class="background-image-login"></div> {/* Não mexer nesse class*/}
            <a href='home'><div class="backtoStartImg"></div></a> {/* Não mexer nesse class*/}
            <form>
                <h1>Recuperar<br></br>Senha</h1>
                <div className="input-container">
                    <label>Email</label>
                    <input type="email" placeholder="seuemail@email.com" required />
                </div>
                <button><a href='login' id='linkEspecificoRecoverPassword'>Entrar</a></button>
            </form>
        </div>
    )
}

export default RecSenha