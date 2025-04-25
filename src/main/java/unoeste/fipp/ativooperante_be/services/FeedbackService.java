package unoeste.fipp.ativooperante_be.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.ativooperante_be.entities.Feedback;
import unoeste.fipp.ativooperante_be.repositories.FeedbackRepository;
import java.util.List;
@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<Feedback> getAll(){
        return feedbackRepository.findAll();
    }

    public Feedback getFeedbackID(Long id){
        return feedbackRepository.findById(id).orElse(null);
    }

    public Feedback salvarFeedback(Feedback feedback){
        Feedback novoFeedback;
        try {
            novoFeedback = feedbackRepository.save(feedback);
        }catch (Exception e){
            novoFeedback = null;
        }
        return novoFeedback;
    }
    public List<Feedback> getFeedbacks(){
        return feedbackRepository.findAll();
    }

    public boolean apagarFeedback(Long id){
        Feedback feedback = feedbackRepository.findById(id).orElse(null);
        if(feedback !=null) {
            try {
                feedbackRepository.delete(feedback);
                return true;
            }catch (Exception e){
                return false;
            }
        }
        else
            return false;
    }
}
