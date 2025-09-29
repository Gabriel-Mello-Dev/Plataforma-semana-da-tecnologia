import { useNavigate } from "react-router-dom";
import style from "./cardGame.module.css";
const CardGame = ({ nome, link, imagem, id}) => {
  const navigate = useNavigate(); // ✅ chamado na raiz do componente

  const PlayGame = () => {
    navigate("/play", { state: { link, id } }); // passa o link para /play
  };

  return (
   <div className={style.cardGame}>
      <h1>{nome}</h1>
      <img src={imagem} alt={nome} />
      <button onClick={PlayGame}>Jogar</button>
    </div>
  );
};

export { CardGame };
