import { useContext } from "react";
import { UserContext } from "../contexts/UserContext"; // Importa o Context criado

// Hook customizado para usar o Context do usuário
const useUser = () => {
    const context = useContext(UserContext);

    // Verifica se o hook está sendo usado dentro de um UserProvider
    if (context === null) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context; // Retorna o valor do Context ({ user, setUser })
};

export default useUser;
