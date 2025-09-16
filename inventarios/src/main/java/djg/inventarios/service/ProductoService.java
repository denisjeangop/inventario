package djg.inventarios.service;

import djg.inventarios.model.entity.ProductoEntity;
import java.util.List;
import java.util.Optional;

public interface ProductoService {
    List<ProductoEntity> findAll();
    Optional<ProductoEntity> findById(Integer id);
    ProductoEntity save(ProductoEntity producto);
    void deleteById(Integer id);
    List<ProductoEntity> findAllByProveedor_IdProveedor(Integer idProveedor);
}
