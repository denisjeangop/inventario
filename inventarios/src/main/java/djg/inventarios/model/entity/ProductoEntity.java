/**
 * Entidad que representa un producto en el sistema de inventario.
 * @author Denis Jean Gopanchuk
 */
package djg.inventarios.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
// ...existing code...

@Entity
public class ProductoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idProducto;
    String descripcion;
    Double precio;
    Integer existencia;

    @ManyToOne(optional = true)
    @JoinColumn(name = "idProveedor")
    ProveedorEntity proveedor;

    public ProductoEntity() {
    }

    public ProductoEntity(Integer idProducto) {
        this.idProducto = idProducto;
    }

    public ProductoEntity(Integer existencia, Double precio, String descripcion, ProveedorEntity proveedor) {
        this.existencia = existencia;
        this.precio = precio;
        this.descripcion = descripcion;
        this.proveedor = proveedor;
    }

    public ProductoEntity(Integer idProducto, String descripcion, Double precio, Integer existencia, ProveedorEntity proveedor) {
        this.idProducto = idProducto;
        this.descripcion = descripcion;
        this.precio = precio;
        this.existencia = existencia;
        this.proveedor = proveedor;
    }

    public Integer getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Integer idProducto) {
        this.idProducto = idProducto;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getExistencia() {
        return existencia;
    }

    public void setExistencia(Integer existencia) {
        this.existencia = existencia;
    }

    public ProveedorEntity getProveedor() {
        return proveedor;
    }

    public void setProveedor(ProveedorEntity proveedor) {
        this.proveedor = proveedor;
    }

    @Override
    public String toString() {
        return "ProductoEntity{" +
                "idProducto=" + idProducto +
                ", descripcion='" + descripcion + '\'' +
                ", precio=" + precio +
                ", existencia=" + existencia +
                ", proveedor=" + (proveedor != null ? proveedor.toString() : "null") +
                '}';
    }
}
