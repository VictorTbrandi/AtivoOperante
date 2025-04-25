package unoeste.fipp.ativooperante_be.restcontrollers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.ativooperante_be.entities.Denuncia;
import unoeste.fipp.ativooperante_be.entities.Erro;
import unoeste.fipp.ativooperante_be.services.DenunciaService;
import java.util.List;

@RestController
@RequestMapping("apis/denuncia")
public class DenunciaRestController {
    @Autowired
    private DenunciaService denunciaService;

    @GetMapping
    public ResponseEntity<Object> getAll(){
        List<Denuncia> denunciaList = denunciaService.getAll();

        if (!denunciaList.isEmpty())
            return ResponseEntity.ok(denunciaList);
        return ResponseEntity.badRequest().body(
                new Erro("Nenhuma denúncia cadastrado"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getDenuncia(@PathVariable(value = "id") Long id){
        Denuncia denuncia = denunciaService.getDenunciaID(id);
        if(denuncia != null)
            return ResponseEntity.ok(denuncia);
        else
            return ResponseEntity.badRequest().body(new Erro("Erro ou ID não encontrado"));
    }

    @PostMapping
    public ResponseEntity<Object> addDenuncia(@RequestBody Denuncia denuncia){
        Denuncia novaDenuncia = denunciaService.salvarDenuncia(denuncia);
        if(novaDenuncia != null)
            return ResponseEntity.ok(novaDenuncia);
        else
            return ResponseEntity.badRequest().body(new Erro("Erro ao cadastrar a denúncia"));
    }

    @PutMapping
    public ResponseEntity<Object> updateDenuncia(@RequestBody Denuncia denuncia){
        Denuncia novaDenuncia = denunciaService.salvarDenuncia(denuncia);
        if(novaDenuncia != null)
            return ResponseEntity.ok(novaDenuncia);
        else
            return ResponseEntity.badRequest().body(new Erro("Erro ao alterar a denúncia"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteDenuncia(@PathVariable(value = "id") Long id){
        if(denunciaService.apagarDenuncia(id))
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.badRequest().body(new Erro("Denúncia não encontrado/Erro ao apagar a denúncia"));
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<Object> getDenunciasPorUsuario(@PathVariable(value = "id") Long id){
        List<Denuncia> denuncias = denunciaService.getDenunciasPorUsuario(id);
        if (!denuncias.isEmpty())
            return ResponseEntity.ok(denuncias);
        return ResponseEntity.badRequest().body(new Erro("Nenhuma denúncia encontrada para o usuário"));
    }
}
