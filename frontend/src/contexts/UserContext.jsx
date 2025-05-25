import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL_SEM_APIS } from "../utils/contants";

// 1. Cria o Context
export const UserContext = createContext(null);

// 2. Cria o Componente Provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado inicial do usuário é null

    async function validaLogado() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Sem token");
            }
            const result = await fetch(
                `${API_BASE_URL_SEM_APIS}/auth/validate`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!result.ok) {
                throw new Error("Token inválido");
            }
            const userAux = await result.json();
            setUser(userAux);
            return userAux;
        } catch (error) {
            return false;
        }
    }
    // O valor fornecido pelo Provider será o estado do usuário e a função para atualizá-lo
    return (
        <UserContext.Provider value={{ user, setUser, validaLogado }}>
            {children}
        </UserContext.Provider>
    );
};

// 3. Hook customizado para consumir o Context (veja Passo 2)
// export const useUser = () => useContext(UserContext);
