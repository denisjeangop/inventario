/**
 * Controlador REST para exponer los endpoints de productos y proveedores.
 * @author Denis Jean Gopanchuk
 */
package djg.inventarios.controller;

import djg.inventarios.model.entity.ProductoEntity;
import djg.inventarios.model.entity.ProveedorEntity;
import djg.inventarios.service.ProductoService;
import djg.inventarios.service.ProveedorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/inventario")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class InventarioController {
    private final ProductoService productoService;
    private final ProveedorService proveedorService;

    private static final Logger logger = LoggerFactory.getLogger(InventarioController.class);

    @Autowired
    public InventarioController(ProductoService productoService, ProveedorService proveedorService) {
        this.productoService = productoService;
        this.proveedorService = proveedorService;
    }

    // --- PRODUCTOS ---
    @GetMapping("/productos")
    public List<ProductoEntity> getAllProductos() {
        List<ProductoEntity> productos = productoService.findAll();
        logger.info("productos obtenidos: ");
        productos.forEach((producto -> logger.info(producto.toString())));
        return productos;
    }

    @GetMapping("/productos/{id}")
    public ResponseEntity<ProductoEntity> getProductoById(@PathVariable Integer id) {
        return productoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/productos")
    public ProductoEntity createProducto(@RequestBody ProductoEntity producto) {
        return productoService.save(producto);
    }

    @PutMapping("/productos/{id}")
    public ResponseEntity<ProductoEntity> updateProducto(@PathVariable Integer id, @RequestBody ProductoEntity producto) {
        if (!productoService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        producto.setIdProducto(id);
        return ResponseEntity.ok(productoService.save(producto));
    }

    @DeleteMapping("/productos/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Integer id) {
        productoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/productos/proveedor/{idProveedor}")
    public List<ProductoEntity> getProductosByProveedor(@PathVariable Integer idProveedor) {
        return productoService.findAllByProveedor_IdProveedor(idProveedor);
    }

    // --- PROVEEDORES ---
    @GetMapping("/proveedores")
    public List<ProveedorEntity> getAllProveedores() {
        return proveedorService.findAll();
    }

    @GetMapping("/proveedores/{id}")
    public ResponseEntity<ProveedorEntity> getProveedorById(@PathVariable Integer id) {
        return proveedorService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/proveedores/agregar")
    public ProveedorEntity createProveedor(@RequestBody ProveedorEntity proveedor) {
        return proveedorService.save(proveedor);
    }

    @PutMapping("/proveedores/{id}")
    public ResponseEntity<ProveedorEntity> updateProveedor(@PathVariable Integer id, @RequestBody ProveedorEntity proveedor) {
        if (!proveedorService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        proveedor.setIdProveedor(id);
        return ResponseEntity.ok(proveedorService.save(proveedor));
    }

    @DeleteMapping("/proveedores/{id}")
    public ResponseEntity<Void> deleteProveedor(@PathVariable Integer id) {
        proveedorService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
