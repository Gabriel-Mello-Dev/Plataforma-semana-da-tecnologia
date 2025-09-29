import { useState } from "react";
import axios from "axios";

const CriarJogo = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [link, setLink] = useState("");
  const [imagem, setImagem] = useState(""); // Base64

  // Converte imagem para Base64
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
      imagem
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
    <div>
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
        <img src={imagem} alt="Preview" width="150" style={{ marginTop: "10px" }} />
      )}

      <button onClick={handleSubmit}>Registrar Jogo</button>
    </div>
  );
};

export { CriarJogo };
