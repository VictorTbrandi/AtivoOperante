package unoeste.fipp.ativooperante_be.restcontrollers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.ativooperante_be.entities.Erro;
import unoeste.fipp.ativooperante_be.entities.Feedback;
import unoeste.fipp.ativooperante_be.services.FeedbackService;
import java.util.List;

@RestController
@RequestMapping("apis/feedback")
public class FeedbackRestController {
    @Autowired
    private FeedbackService feedbackService;

    @GetMapping
    public ResponseEntity<Object> getAll(){
        List<Feedback> feedbackList = feedbackService.getAll();

        if (!feedbackList.isEmpty())
            return ResponseEntity.ok(feedbackList);
        return ResponseEntity.badRequest().body(
                new Erro("Nenhum feedback cadastrado"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getFeedback(@PathVariable(value = "id") Long id){
        Feedback feedback = feedbackService.getFeedbackID(id);
        if(feedback != null)
            return ResponseEntity.ok(feedback);
        else
            return ResponseEntity.badRequest().body(new Erro("Erro ou ID não encontrado"));
    }

    @PostMapping
    public ResponseEntity<Object> addFeedback(@RequestBody Feedback feedback){
        Feedback novoFeedback = feedbackService.salvarFeedback(feedback);
        if(novoFeedback != null)
            return ResponseEntity.ok(novoFeedback);
        else
            return ResponseEntity.badRequest().body(new Erro("Erro ao cadastrar o feedback"));
    }

    @PutMapping
    public ResponseEntity<Object> updtFeedback(@RequestBody Feedback feedback){
        Feedback novoFeedback = feedbackService.salvarFeedback(feedback);
        if(novoFeedback != null)
            return ResponseEntity.ok(novoFeedback);
        else
            return ResponseEntity.badRequest().body(new Erro("Erro ao alterar o feedback"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteFeedback(@PathVariable(value = "id") Long id){
        if(feedbackService.apagarFeedback(id))
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.badRequest().body(new Erro("Feedback não encontrado/Erro ao apagar o feedback"));
    }
}
