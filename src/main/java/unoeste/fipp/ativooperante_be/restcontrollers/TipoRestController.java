package unoeste.fipp.ativooperante_be.restcontrollers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.ativooperante_be.entities.Erro;
import unoeste.fipp.ativooperante_be.entities.Tipo;
import unoeste.fipp.ativooperante_be.services.TipoService;
import java.util.List;

@RestController
@RequestMapping("apis/tipo")
public class TipoRestController {
    @Autowired
    private TipoService tipoService;

    @GetMapping
    public ResponseEntity <Object> getAll(){
        List<Tipo> tipoList = tipoService.getAll();

        if (!tipoList.isEmpty())
            return ResponseEntity.ok(tipoList);
        return ResponseEntity.badRequest().body(
                new Erro("Nenhum tipo cadastrado"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getTipo(@PathVariable(value = "id") Long id){
        Tipo tipo = tipoService.getTipoID(id);
        if(tipo != null)
            return ResponseEntity.ok(tipo);
        else
            return ResponseEntity.badRequest().body(new Erro("Erro ou ID não encontrado"));
    }

    @PostMapping
    public ResponseEntity<Object> addTipo(@RequestBody Tipo tipo){
        Tipo novoTipo = tipoService.salvarTipo(tipo);
        if(novoTipo != null)
            return ResponseEntity.ok(novoTipo);
        else
            return ResponseEntity.badRequest().body(new Erro("Erro ao cadastrar o tipo"));
    }

    @PutMapping
    public ResponseEntity<Object> updtTipo(@RequestBody Tipo tipo){
        Tipo novoTipo = tipoService.salvarTipo(tipo);
        if(novoTipo != null)
            return ResponseEntity.ok(novoTipo);
        else
            return ResponseEntity.badRequest().body(new Erro("Erro ao alterar o tipo"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTipo(@PathVariable(value = "id") Long id){
        if(tipoService.apagarTipo(id))
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.badRequest().body(new Erro("Tipo não encontrado/Erro ao apagar o tipo"));
    }
}
