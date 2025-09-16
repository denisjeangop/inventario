import { Proveedor } from "./proveedor.model";

/**
 * Modelo que representa un producto en el sistema de inventario (frontend).
 * Basado en la entidad ProductoEntity del backend.
 */
export class Producto {
  idProducto!: number;
  descripcion!: string;
  precio!: number;
  existencia!: number;
  proveedor!: Proveedor;
}
