/**
 * Implementación de la lógica de negocio para proveedores.
 * @author Denis Jean Gopanchuk
 */
package djg.inventarios.service.ServiceImpl;

import djg.inventarios.model.entity.ProveedorEntity;
import djg.inventarios.repository.ProveedorRepository;
import djg.inventarios.repository.ProductoRepository;
import djg.inventarios.model.entity.ProductoEntity;
import djg.inventarios.service.ProveedorService;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProveedorServiceImpl implements ProveedorService {
    private final ProveedorRepository proveedorRepository;
    private final ProductoRepository productoRepository;

    @Autowired
    public ProveedorServiceImpl(ProveedorRepository proveedorRepository, ProductoRepository productoRepository) {
        this.proveedorRepository = proveedorRepository;
        this.productoRepository = productoRepository;
    }


    @Override
    @Transactional(readOnly = true)
    public List<ProveedorEntity> findAll() {
        return proveedorRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<ProveedorEntity> findById(Integer id) {
        return proveedorRepository.findById(id);
    }


    @Override
    @Transactional(readOnly = false)
    public ProveedorEntity save(ProveedorEntity proveedor) {
        return proveedorRepository.save(proveedor);
    }

    
    @Override
    @Transactional(readOnly = false)
    public void deleteById(Integer id) {
        if (!proveedorRepository.existsById(id)) {
            throw new NoSuchElementException("No se encontró el proveedor con id: " + id);
        }
        // Recuperar todos los productos asociados a este proveedor y ponerles proveedor a null
        List<ProductoEntity> productos = productoRepository.findAllByProveedor_IdProveedor(id);
        for (ProductoEntity producto : productos) {
            producto.setProveedor(null);
        }
        productoRepository.saveAll(productos);
        proveedorRepository.deleteById(id);
    }
}
