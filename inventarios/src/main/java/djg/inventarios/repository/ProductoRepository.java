package djg.inventarios.repository;

import djg.inventarios.model.entity.ProductoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<ProductoEntity, Integer> {
	// Consulta para obtener productos por proveedor
	List<ProductoEntity> findAllByProveedor_IdProveedor(Integer idProveedor);
}
