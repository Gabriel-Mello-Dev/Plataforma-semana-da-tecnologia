import { Outlet, useNavigate, useLocation } from "react-router-dom";
import style from './userLayout.module.css';

const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Pega a rota atual

  const handleLogout = () => {
    localStorage.removeItem("usuario"); // remove o usuário
    navigate("/"); // redireciona para a tela de login/home
  };

  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1>Bem Vindo</h1>

        {/* 👇 Só mostra o botão se não estiver na página "/" */}
        {location.pathname !== "/" && (
          <button onClick={handleLogout} className={style.logoutButton}>
            Logout
          </button>
        )}
      </header>

      <main>
        <Outlet /> {/* Renderiza a rota filha */}
      </main>

      <footer>Rodapé</footer>
    </div>
  );
};

export { UserLayout };
