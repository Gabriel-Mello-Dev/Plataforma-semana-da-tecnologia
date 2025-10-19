// CriarDev.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./CriarDev.module.css";

const CriarDev = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const toggleMostrarSenha = () => setMostrarSenha(!mostrarSenha);

  const handleCriarConta = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      alert("Preencha todos os campos!");
      return;
    }
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const novoDev = { nome, email, senha };

    axios.post("http://localhost:3000/desenvolvedores", novoDev)
      .then(() => {
        alert("Desenvolvedor criado com sucesso!");
        navigate("/Dev");
      })
      .catch(err => {
        console.error(err);
        alert("Erro ao criar conta. Verifique o servidor.");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2>Criar Conta de Desenvolvedor</h2>

        <input
          type="text"
          placeholder="Seu Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="Seu Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <div className={styles.senhaContainer}>
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Crie uma Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={toggleMostrarSenha}
          >
            👁
          </button>
        </div>

        <input
          type={mostrarSenha ? "text" : "password"}
          placeholder="Confirme a Senha"
          value={confirmarSenha}
          onChange={e => setConfirmarSenha(e.target.value)}
        />

        <button
          className={styles.createButton}
          onClick={handleCriarConta}
        >
          Criar Conta
        </button>

        <p className={styles.linkText}>
          Já tem uma conta?{" "}
          <span
            className={styles.link}
            onClick={() => navigate("/Dev")}
          >
            Fazer Login
          </span>
        </p>
      </div>
    </div>
  );
};

export { CriarDev };
