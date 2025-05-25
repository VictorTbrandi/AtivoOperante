import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importar componentes placeholder (vamos criá-los em seguida)
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CidadaoPage from "./pages/CidadaoPage";
import AdminPage from "./pages/AdminPage";
import CadastroDenunciaPage from "./pages/CadastroDenunciaPage";
import LoadingPage from "./pages/LoadingPage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota Raiz com Loading */}
                <Route path="/" element={<LoadingPage />} />

                {/* Rotas de Autenticação */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Rotas Protegidas (Exemplo, você precisará adicionar Guards depois) */}
                <Route path="/cidadao" element={<CidadaoPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route
                    path="/cidadao-cadastro-denuncia"
                    element={<CadastroDenunciaPage />}
                />

                {/* Opcional: Rota raiz redirecionando para login ou outra página */}
                {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

                {/* Opcional: Rota para 404 Not Found */}
                {/* <Route path="*" element={<div>Página não encontrada (404)</div>} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
