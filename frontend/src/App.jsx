import AppRoutes from "./AppRoutes"; // Importe o componente de rotas
import { UserProvider } from "./contexts/UserContext"; // Importe o UserProvider

function App() {
    return (
        // Envolve as rotas com o UserProvider
        <UserProvider>
            <AppRoutes />
        </UserProvider>
    );
}

export default App;
