/**
 * Implementación de la lógica de negocio para productos.
 * @author Denis Jean Gopanchuk
 */
package djg.inventarios.service.ServiceImpl;

import djg.inventarios.model.entity.ProductoEntity;
import djg.inventarios.repository.ProductoRepository;
import djg.inventarios.service.ProductoService;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductoServiceImpl implements ProductoService {
    private final ProductoRepository productoRepository;

    @Autowired
    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoEntity> findAll() {
        return productoRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ProductoEntity> findById(Integer id) {
        return productoRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = false)
    public ProductoEntity save(ProductoEntity producto) {
        return productoRepository.save(producto);
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteById(Integer id) {
        if (!productoRepository.existsById(id)) {
            throw new NoSuchElementException("No se encontró el producto con id: " + id);
        }
        productoRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoEntity> findAllByProveedor_IdProveedor(Integer idProveedor) {
        List<ProductoEntity> productos = productoRepository.findAllByProveedor_IdProveedor(idProveedor);
        return productos != null ? productos : java.util.Collections.emptyList();
    }
}
