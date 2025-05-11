import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Import route components
import LoginPage from "./routes/login";
import RegisterPage from "./routes/register";
import AdminPage from "./routes/admin";
import CidadaoPage from "./routes/cidadao/cidadao";
import CidadaoCadastrarDenunciasPage from "./routes/cidadao/cidadao-cadastro-denuncia";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/cidadao" element={<CidadaoPage />} />
                <Route
                    path="/cidadao/cadastro-denuncia"
                    element={<CidadaoCadastrarDenunciasPage />}
                />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
