package djg.inventarios.service;

import djg.inventarios.model.entity.ProveedorEntity;
import java.util.List;
import java.util.Optional;

public interface ProveedorService {
    List<ProveedorEntity> findAll();
    Optional<ProveedorEntity> findById(Integer id);
    ProveedorEntity save(ProveedorEntity proveedor);
    void deleteById(Integer id);
}
