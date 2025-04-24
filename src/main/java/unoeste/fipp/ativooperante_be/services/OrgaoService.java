package unoeste.fipp.ativooperante_be.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.ativooperante_be.entities.Orgaos;
import unoeste.fipp.ativooperante_be.repositories.OrgaosRepository;

import java.util.List;

@Service
public class OrgaoService {
    @Autowired
    private OrgaosRepository orgaosRepository;

    public List<Orgaos> getAll(){
        return orgaosRepository.findAll();
    }

    public Orgaos getOrgaoID(Long id){
        return orgaosRepository.findById(id).orElse(null);
    }

    public Orgaos salvarOrgao(Orgaos orgao){
        Orgaos novoOrgao;
        try {
            novoOrgao = orgaosRepository.save(orgao);
        }catch (Exception e){
            novoOrgao = null;
        }
        return novoOrgao;
    }

    public List<Orgaos> getOrgaos(){
        return orgaosRepository.findAll();
    }

    public boolean apagarOrgao(Long id){
        Orgaos orgao = orgaosRepository.findById(id).orElse(null);
        if(orgao!=null) {
            try {
                orgaosRepository.delete(orgao);
                return true;
            }catch (Exception e){
                return false;
            }
        }
        else
            return false;
    }
}
