package unoeste.fipp.ativooperante_be.restcontrollers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import unoeste.fipp.ativooperante_be.entities.Usuario;
import unoeste.fipp.ativooperante_be.services.OurUserDetails;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    /**
     * Endpoint simples para validar um token e retornar dados do usuário
     * autenticado.
     * Se a requisição chegar aqui, significa que o JwtRequestFilter validou o
     * token.
     */
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken() {
        // Se chegamos aqui, o token foi validado com sucesso pelo filtro.

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            // Isso não deveria acontecer se o filtro funcionou corretamente,
            // mas é uma verificação de segurança.
            return ResponseEntity.status(401).body("Usuário não autenticado");
        }

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof OurUserDetails)) {
            // O principal não é do tipo esperado
            return ResponseEntity.status(500).body("Detalhes do usuário não disponíveis");
        }

        OurUserDetails userDetails = (OurUserDetails) principal;
        Usuario usuario = userDetails.getUsuario();

        // Construa um mapa com os dados do usuário para retornar
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", usuario.getId());
        userData.put("cpf", usuario.getCpf());
        userData.put("email", usuario.getEmail());
        userData.put("nivel", usuario.getNivel());
        // Adicione outros campos do usuário que você queira retornar

        return ResponseEntity.ok(userData);
    }
}