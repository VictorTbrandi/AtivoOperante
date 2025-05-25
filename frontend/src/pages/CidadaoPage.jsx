import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const CidadaoPage = () => {
    const navigate = useNavigate();
    const { user, validaLogado } = useUser();

    useEffect(() => {
        async function init() {
            const validUserPerfil = await validaLogado();

            if (!validUserPerfil) {
                navigate("/login", { replace: true });
                return;
            }
            if (validUserPerfil.nivel === 1) {
                navigate("/admin", { replace: true });
                return;
            }
        }
        init();
    }, [navigate]);

    useEffect(() => {
        if (!user) navigate("/login", { replace: true });
        if (user.nivel !== 2) navigate("/admin", { replace: true });
    }, [navigate]);
    return (
        <div>
            <h1>Página do Cidadão</h1>
            {/* Conteúdo da página do cidadão */}
        </div>
    );
};

export default CidadaoPage;
