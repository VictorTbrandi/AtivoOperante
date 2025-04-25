package unoeste.fipp.ativooperante_be.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.ativooperante_be.entities.Denuncia;
import unoeste.fipp.ativooperante_be.entities.Usuario;
import unoeste.fipp.ativooperante_be.repositories.DenunciaRepository;

import java.util.Collections;
import java.util.List;

@Service
public class DenunciaService {
    @Autowired
    private DenunciaRepository denunciaRepository;
    @Autowired
    private UsuarioService usuarioService;

    public List<Denuncia> getAll(){
        return denunciaRepository.findAll();
    }

    public Denuncia getDenunciaID(Long id){
        return denunciaRepository.findById(id).orElse(null);
    }

    public List<Denuncia> getDenunciasPorUsuario(Long usuarioId) {
        Usuario usuario = usuarioService.getUsuarioID(usuarioId);
        if (usuario == null)
            return Collections.emptyList();
        return denunciaRepository.findByUsuario(usuario);
    }

    public Denuncia salvarDenuncia(Denuncia denuncia){
        Denuncia novaDenuncia;
        try {
            novaDenuncia = denunciaRepository.save(denuncia);
        }catch (Exception e){
            novaDenuncia = null;
        }
        return novaDenuncia;
    }
    public List<Denuncia> getDenuncia(){
        return denunciaRepository.findAll();
    }

    public boolean apagarDenuncia(Long id){
        Denuncia denuncia = denunciaRepository.findById(id).orElse(null);
        if(denuncia !=null) {
            try {
                denunciaRepository.delete(denuncia);
                return true;
            }catch (Exception e){
                return false;
            }
        }
        else
            return false;
    }
}
