package unoeste.fipp.ativooperante_be.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import unoeste.fipp.ativooperante_be.entities.Usuario;
import unoeste.fipp.ativooperante_be.services.OurUserDetailsService;
import unoeste.fipp.ativooperante_be.services.OurUserDetails;
import unoeste.fipp.ativooperante_be.util.JwtUtil;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthRestController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private OurUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
            throws Exception {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtUtil.generateToken(userDetails);

        Usuario usuario = null;
        if (userDetails instanceof OurUserDetails) {
            usuario = ((OurUserDetails) userDetails).getUsuario();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("jwt", jwt);

        if (usuario != null) {
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", usuario.getId());
            userData.put("cpf", usuario.getCpf());
            userData.put("email", usuario.getEmail());
            userData.put("nivel", usuario.getNivel());
            response.put("user", userData);
        }

        return ResponseEntity.ok(response);
    }

    // Classe interna para representar a requisição de autenticação
    static class AuthenticationRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

}