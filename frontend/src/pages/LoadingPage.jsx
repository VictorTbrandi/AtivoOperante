import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { API_BASE_URL } from "../utils/contants";
import useUser from "../hooks/useUser";

const LoadingPage = () => {
    const { user, setUser, validaLogado } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("LoadingPage: Executando useEffect inicial...");
        async function init() {
            const validUserPerfil = await validaLogado();
            navigate(
                validUserPerfil
                    ? validUserPerfil.nivel === 1
                        ? "/admin"
                        : "/cidadao"
                    : "/login",
                { replace: true }
            );
        }
        init();
    }, [navigate]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <ColorRing
                visible={true}
                height="200"
                width="200"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["black", "black", "black", "black", "black", "black"]}
            />
        </div>
    );
};

export default LoadingPage;
