import React, { useEffect } from "react";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate();
    const { user, validaLogado } = useUser();

    useEffect(() => {
        async function init() {
            const validUserPerfil = await validaLogado();
            if (!validUserPerfil) {
                navigate("/login", { replace: true });
                return;
            }
            if (validUserPerfil.nivel === 2) {
                navigate("/cidadao", { replace: true });
                return;
            }
        }
        init();
    }, [navigate]);
    return (
        <div>
            <h1>Página do Administrador</h1>
            {/* Conteúdo da página do administrador */}
        </div>
    );
};

export default AdminPage;
