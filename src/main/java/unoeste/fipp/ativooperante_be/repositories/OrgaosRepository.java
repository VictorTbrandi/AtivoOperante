package unoeste.fipp.ativooperante_be.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import unoeste.fipp.ativooperante_be.entities.Orgaos;

@Repository
public interface OrgaosRepository extends JpaRepository<Orgaos,Long> {
    public Orgaos findByNome(String name);
}
