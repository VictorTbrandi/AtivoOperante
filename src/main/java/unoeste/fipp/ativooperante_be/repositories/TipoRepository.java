package unoeste.fipp.ativooperante_be.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import unoeste.fipp.ativooperante_be.entities.Tipo;

@Repository
public interface TipoRepository extends JpaRepository<Tipo,Long> {
    public Tipo findByNome(String name);
}
