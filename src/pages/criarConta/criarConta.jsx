import { useState } from "react";
import axios from "axios";
import style from './criarConta.module.css';
import { useNavigate } from "react-router-dom";

const CriarConta = () => {

const navigate = useNavigate(); 
    const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = () => {
    if (!nome || !email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    axios.post("http://localhost:3000/usuarios", {
      nome,
      email,
      senha
    })
    .then(() => {
      alert("Conta criada com sucesso!");
      navigate("/");
      setNome("");
      setEmail("");
      setSenha("");
    })
    .catch(err => console.error(err));
  };

  return (
    <div className={style.container}>
      <h1>Criar Conta</h1>

      <input 
        type="text" 
        placeholder="Nome" 
        value={nome} 
        onChange={e => setNome(e.target.value)} 
      />

      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />

      <input 
        type="password" 
        placeholder="Senha" 
        value={senha} 
        onChange={e => setSenha(e.target.value)} 
      />

      <button onClick={handleSubmit}>Criar Conta</button>
    </div>
  );
};

export { CriarConta };
