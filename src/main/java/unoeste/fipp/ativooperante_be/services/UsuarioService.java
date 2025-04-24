package unoeste.fipp.ativooperante_be.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.ativooperante_be.entities.Usuario;
import unoeste.fipp.ativooperante_be.repositories.UsuarioRepository;

import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getAll(){
        return usuarioRepository.findAll();
    }

    public Usuario getUsuarioID(Long id){
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario salvarUsuario(Usuario usuario){
        Usuario novoUsuario;
        try {
            novoUsuario = usuarioRepository.save(usuario);
        }catch (Exception e){
            novoUsuario = null;
        }
        return novoUsuario;
    }
    public List<Usuario> getUsuarios(){
        return usuarioRepository.findAll();
    }

    public boolean apagarUsuario(Long id){
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if(usuario!=null) {
            try {
                usuarioRepository.delete(usuario);
                return true;
            }catch (Exception e){
                return false;
            }
        }
        else
            return false;
    }
}
