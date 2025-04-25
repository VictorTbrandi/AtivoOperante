package unoeste.fipp.ativooperante_be.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import unoeste.fipp.ativooperante_be.entities.Denuncia;
import unoeste.fipp.ativooperante_be.entities.Usuario;

import java.util.List;

public interface DenunciaRepository extends JpaRepository<Denuncia,Long> {
    public List<Denuncia> findByUsuario(Usuario usuario);
}
