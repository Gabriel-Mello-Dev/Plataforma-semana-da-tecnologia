import { Outlet } from "react-router-dom";
import style from './userLayout.module.css';

const UserLayout = () => {
  return (
    <div className={style.container}>
      <header>
<h1>Bem Vindo</h1>

<br />


      <a href="/">Voltar</a>


      </header>
      <main>
        <Outlet />  {/* Renderiza a rota filha */}
      </main>
      <footer>Rodapé</footer>
    </div>
  );
};

export { UserLayout };
