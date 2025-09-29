// src/routes.jsx
import { Routes, Route } from "react-router-dom";
import {Home, Jogos, LoginDev, Play, CriarJogo, Error, CriarConta} from "./pages";
import { UserLayout } from "./layout";

export default function AppRoutes() {
  return (
    <Routes>

{/* Erro */}

      <Route path="*" element={<Error />} />



        {/* Usuario */}
        <Route path="/" element={<UserLayout />}> 
      <Route path="/" element={<Home />} />
      <Route path="/jogos" element={<Jogos />} />
      <Route path="/criarConta" element={<CriarConta />} />
</Route>
      <Route path="/play" element={<Play />} />


{/* Desenvolvedor */}
      <Route path="/Dev" element={<LoginDev />} />
      <Route path="/CriarJogo" element={<CriarJogo />} />

    </Routes>
  );
}
