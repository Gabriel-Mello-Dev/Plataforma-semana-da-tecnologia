import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CriarJogo.module.css";
import { useNavigate } from "react-router-dom";

const CriarJogo = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [link, setLink] = useState("");
  const [imagem, setImagem] = useState("");
  const navigate = useNavigate();

  // 🚨 Proteção de rota
  useEffect(() => {
    const logado = localStorage.getItem("devLogado");
    if (logado !== "true") {
      alert("Acesso negado! Faça login como desenvolvedor primeiro.");
      navigate("/");
    }
  }, [navigate]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImagem(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!nome || !descricao || !link || !imagem) {
      alert("Preencha todos os campos e selecione uma imagem!");
      return;
    }

    axios.post("http://localhost:3000/jogos", {
      nome,
      descricao,
      link,
      imagem,
    })
      .then(() => {
        alert("Jogo registrado com sucesso!");
        setNome("");
        setDescricao("");
        setLink("");
        setImagem("");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h1>Criar Jogo</h1>

        <input
          type="text"
          placeholder="Nome do jogo"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descrição do jogo"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />

        <input
          type="text"
          placeholder="Link do jogo"
          value={link}
          onChange={e => setLink(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        {imagem && (
          <img
            src={imagem}
            alt="Preview"
            className={styles.preview}
          />
        )}

        <button
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Registrar Jogo
        </button>
      </div>
    </div>
  );
};

export { CriarJogo };
