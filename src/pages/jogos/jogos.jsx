import style from './jogos.module.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { CardGame } from "../../components";
import { useNavigate } from "react-router-dom";

const Jogos = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 🚨 Verifica login
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
      alert("Você precisa estar logado para acessar esta página!");
      navigate("/");
      return;
    }

    axios.get("http://localhost:3000/jogos")
      .then(response => {
        console.log(response.data);
        setGames(response.data);
      })
      .catch(error => {  
        console.error("Erro ao buscar jogos!", error);
      });
  }, [navigate]);

  return (
    <div className={style.container}>
      <h1>Jogos Disponíveis</h1>
      <div className={style.cardsGrid}>
        {games.map(game => (
          <CardGame 
            key={game.id}
            id={game.id}
            nome={game.nome}
            link={game.link}
            imagem={game.imagem}
          />
        ))}
      </div>
    </div>
  );
};

export { Jogos };
