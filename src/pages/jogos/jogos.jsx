import style from './jogos.module.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { CardGame } from "../../components";
const Jogos = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/jogos")
      .then(response => {
        console.log(response.data);
        setGames(response.data);
      })
      .catch(error => {  
        console.error("There was an error fetching the jogos!", error);
      });
  }, []);

  return (
   <div className={style.container}>
      <h1>Jogos Disponíveis</h1>
      <div className={style.cardsGrid}>
        {games.map(game => (
          <CardGame 
            key={game.id}
            id= {game.id}
            nome={game.nome}
            link={game.link}
            imagem={game.imagem}
          />
        ))}
      </div>
    </div>
  );
}

export { Jogos }
