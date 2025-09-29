import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginDev = () => {

    const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Apenas para testar se o JSON Server está funcionando
  useEffect(() => {
    axios.get("http://localhost:3000/desenvolvedores")
      .then(response => console.log(response.data))
      .catch(err => console.error(err));
  }, []);

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleLogin = () => {
    axios.get("http://localhost:3000/desenvolvedores")
      .then(res => {
        const dev = res.data.find(d => d.email === email && d.senha === senha);
        if (dev) {
          alert("Login realizado com sucesso!");
navigate("/CriarJogo");

        } else {
          alert("Email ou senha incorretos.");
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Login Desenvolvedor</h2>

      <input
        type="email"
        placeholder="Insira seu Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type={mostrarSenha ? "text" : "password"}
        placeholder="Insira sua Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />

      <button onClick={toggleMostrarSenha}>👁</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export { LoginDev };
