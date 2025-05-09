package unoeste.fipp.ativooperante_be.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.ativooperante_be.entities.Denuncia;
import unoeste.fipp.ativooperante_be.entities.Feedback;
import unoeste.fipp.ativooperante_be.entities.Usuario;
import unoeste.fipp.ativooperante_be.repositories.DenunciaRepository;

import java.util.ArrayList;
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

    public List<Denuncia> getDenunciasUsuario(Long id){
        return denunciaRepository.findAllByUsuario(new Usuario(id,0L,"","",0));
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

    public boolean addFeedBack(Feedback feedback){
        try {
            denunciaRepository.addFeeBack(feedback.getId(), feedback.getTexto());
            return true;
        }
        catch (Exception e){
            return false;
        }
    }
}
