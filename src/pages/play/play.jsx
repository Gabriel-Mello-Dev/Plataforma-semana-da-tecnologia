import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from './play.module.css';

const Play = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {}; 
  const [game, setGame] = useState(null);
  const [comentario, setComentario] = useState(""); 
  const [comentarios, setComentarios] = useState([]); 

  // 🚨 Proteção de rota
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      alert("Você precisa estar logado para jogar!");
      navigate("/");
      return;
    }

    if (!id) {
      alert("Nenhum jogo selecionado!");
      navigate("/jogos");
      return;
    }

    axios.get(`http://localhost:3000/jogos/${id}`)
      .then(response => {
        setGame(response.data);
        setComentarios(response.data.comentarios || []);
      })
      .catch(err => console.error(err));
  }, [id, navigate]);

  if (!game) return <p>Carregando o jogo...</p>;

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const enviarComentario = () => {
    if (!comentario) return;

    const novoComentario = { nome: usuario.nome, texto: comentario };
    const novosComentarios = [...comentarios, novoComentario];

    axios.patch(`http://localhost:3000/jogos/${id}`, {
      comentarios: novosComentarios
    })
    .then(() => {
      setComentarios(novosComentarios);
      setComentario("");
    })
    .catch(err => console.error(err));
  };

  return (
    <div className={style.container}>
      <a href="/jogos" className={style.backButton}>Voltar</a>

      <div className={style.gameColumn}>
        <iframe 
          src={game.link} 
          title={game.nome} 
          className={style.iframe}
        ></iframe>
      </div>

      <div className={style.sideColumn}>
        <h1 className={style.title}>{game.nome}</h1>
        <p className={style.description}>{game.descricao}</p>

        <div className={style.comentarios}>
          <h3>Comentários</h3>
          <ul>
            {comentarios.map((c, i) => (
              <li key={i}><strong>{c.nome}:</strong> {c.texto}</li>
            ))}
          </ul>
          <input 
            type="text" 
            placeholder="Escreva um comentário..." 
            value={comentario}
            onChange={e => setComentario(e.target.value)}
            onKeyDown={e => { if(e.key === "Enter") enviarComentario(); }}
          />
          <button onClick={enviarComentario}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export { Play };
