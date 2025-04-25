package unoeste.fipp.ativooperante_be.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import unoeste.fipp.ativooperante_be.entities.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback,Long> {
}
