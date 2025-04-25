package unoeste.fipp.ativooperante_be.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.ativooperante_be.entities.Tipo;
import unoeste.fipp.ativooperante_be.repositories.TipoRepository;

import java.util.List;

@Service
public class TipoService {
    @Autowired
    private TipoRepository tipoRepository;

    public List<Tipo> getAll(){
        return tipoRepository.findAll();
    }

    public Tipo getTipoID(Long id){
        return tipoRepository.findById(id).orElse(null);
    }

    public Tipo salvarTipo(Tipo tipo){
        Tipo novoTipo;
        try {
            novoTipo = tipoRepository.save(tipo);
        }catch (Exception e){
            novoTipo = null;
        }
        return novoTipo;
    }
    public List<Tipo> getTipos(){
        return tipoRepository.findAll();
    }

    public boolean apagarTipo(Long id){
        Tipo tipo = tipoRepository.findById(id).orElse(null);
        if(tipo !=null) {
            try {
                tipoRepository.delete(tipo);
                return true;
            }catch (Exception e){
                return false;
            }
        }
        else
            return false;
    }
}
