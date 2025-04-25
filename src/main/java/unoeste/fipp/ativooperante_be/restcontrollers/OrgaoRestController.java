package unoeste.fipp.ativooperante_be.restcontrollers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.ativooperante_be.entities.Erro;
import unoeste.fipp.ativooperante_be.entities.Orgaos;
import unoeste.fipp.ativooperante_be.services.OrgaoService;

import java.util.List;

@RestController
@RequestMapping("apis/orgao")
public class OrgaoRestController {
    @Autowired
    private OrgaoService orgaoService;

    @GetMapping
    public ResponseEntity<Object> getAll(){
        List<Orgaos> orgaoList = orgaoService.getAll();

        if (!orgaoList.isEmpty())
            return ResponseEntity.ok(orgaoList);
        return ResponseEntity.badRequest().body(
                new Erro("Nenhum orgão cadastrado"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOrgao(@PathVariable(value = "id") Long id){
        Orgaos orgao = orgaoService.getOrgaoID(id);
        if(orgao != null)
            return ResponseEntity.ok(orgao);
        else
            return ResponseEntity.badRequest().body(new Erro("Erro ou ID não encontrado"));
    }

    @PostMapping
    public ResponseEntity<Object> addOrgao(@RequestBody Orgaos orgao){
        Orgaos novoOrgao = orgaoService.salvarOrgao(orgao);
        if(novoOrgao != null)
            return ResponseEntity.ok(novoOrgao);
        else
            return ResponseEntity.badRequest().body(new Erro("Erro ao cadastrar o orgão"));
    }

    @PutMapping
    public ResponseEntity<Object> updtOrgao(@RequestBody Orgaos orgao){
        Orgaos novoOrgao = orgaoService.salvarOrgao(orgao);
        if(novoOrgao != null)
            return ResponseEntity.ok(novoOrgao);
        else
            return ResponseEntity.badRequest().body(new Erro("Erro ao alterar o orgão"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteOrgao(@PathVariable(value = "id") Long id){
        if(orgaoService.apagarOrgao(id))
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.badRequest().body(new Erro("Orgão não encontrado/Erro ao apagar o orgão"));
    }
}
