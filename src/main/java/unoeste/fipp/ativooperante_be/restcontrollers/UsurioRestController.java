package unoeste.fipp.ativooperante_be.restcontrollers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.ativooperante_be.entities.Erro;
import unoeste.fipp.ativooperante_be.entities.Usuario;
import unoeste.fipp.ativooperante_be.services.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("apis/usuario")
public class UsurioRestController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<Object> getAll(){
        List<Usuario> usuarioListList = usuarioService.getAll();

        if (!usuarioListList.isEmpty())
            return ResponseEntity.ok(usuarioListList);
        return ResponseEntity.badRequest().body(
                new Erro("Nenhum usuário cadastrado"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getTipo(@PathVariable(value = "id") Long id){
        Usuario usuario = usuarioService.getUsuarioID(id);
        if(usuario != null)
            return ResponseEntity.ok(usuario);
        else
            return ResponseEntity.badRequest().body(new Erro("Erro ou ID não encontrado"));
    }

    @PostMapping
    public ResponseEntity<Object> addUsuario(@RequestBody Usuario usuario){
        Usuario novoUsuario = usuarioService.salvarUsuario(usuario);
        if(novoUsuario != null)
            return ResponseEntity.ok(novoUsuario);
        else
            return ResponseEntity.badRequest().body(new Erro("Erro ao cadastrar o usuário"));
    }

    @PutMapping
    public ResponseEntity<Object> updtUsuario(@RequestBody Usuario usuario){
        Usuario novoUsuario = usuarioService.salvarUsuario(usuario);
        if(novoUsuario != null)
            return ResponseEntity.ok(novoUsuario);
        else
            return ResponseEntity.badRequest().body(new Erro("Erro ao alterar o usuário"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTipo(@PathVariable(value = "id") Long id){
        if(usuarioService.apagarUsuario(id))
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.badRequest().body(new Erro("Usuário não encontrado/Erro ao apagar o usuário"));
    }
}
