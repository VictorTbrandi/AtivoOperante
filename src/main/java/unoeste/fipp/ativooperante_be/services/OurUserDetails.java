package unoeste.fipp.ativooperante_be.services;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import unoeste.fipp.ativooperante_be.entities.Usuario;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class OurUserDetails implements UserDetails {

    private Usuario usuario;

    public OurUserDetails(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Mapeia o nível do usuário para uma GrantedAuthority
        String role = (usuario.getNivel() == 1) ? "ROLE_ADMIN" : "ROLE_USER";
        return Collections.singletonList(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return usuario.getSenha(); // Assumindo que sua entidade Usuario tem um método getSenha()
    }

    @Override
    public String getUsername() {
        return usuario.getEmail(); // Assumindo que sua entidade Usuario tem um método getEmail()
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Usuario getUsuario() {
        return usuario;
    }
}