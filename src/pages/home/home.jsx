import style from './home.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const toggleSenha = () => {
    setMostrarSenha(prev => !prev);
  };

  const handleLogin = () => {
    if (!usuario || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    axios.get(`http://localhost:3000/usuarios?email=${usuario}&senha=${senha}`)
      .then(response => {
        if (response.data.length > 0) {
          const user = response.data[0]; // pega o usuário retornado
          
          // Salva no localStorage
          localStorage.setItem("usuario", JSON.stringify({
            id: user.id,
            nome: user.nome || user.email // se não tiver nome, usa email
          }));

          alert("Login bem-sucedido!");
          navigate("/jogos"); // redireciona para a tela de jogos
        } else {
          alert("Usuário ou senha inválidos!");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Erro ao conectar com o servidor.");
      });
  };

  return (
    <div className={style.container}>
      <h1>Home</h1>
      <h2>Bem-vindo</h2>

      <input 
        type="text" 
        placeholder="Email" 
        value={usuario}
        onChange={e => setUsuario(e.target.value)}
      />

      <div className={style.senhaContainer}>
        <input 
          type={mostrarSenha ? "text" : "password"} 
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <button onClick={toggleSenha} className={style.toggleButton}>
          {mostrarSenha ? "🙈" : "👁"}
        </button>
      </div>
      <br />
      <a href="criarConta">Ainda não possui conta?</a>

      <button onClick={handleLogin} className={style.loginButton}>Entrar</button>


      <img src="https://cdn.pixabay.com/photo/2012/04/01/16/39/halloween-23439_1280.png" alt="" style={{width: "10vw", height: "10vw", alignSelf: "center"}} />
    </div>
  );
}

export { Home };
