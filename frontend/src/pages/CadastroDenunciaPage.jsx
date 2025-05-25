import React from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const CadastroDenunciaPage = () => {
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
    return (
        <div>
            <h1>Página de Cadastro de Denúncia</h1>
            {/* Formulário de cadastro de denúncia */}
        </div>
    );
};

export default CadastroDenunciaPage;
