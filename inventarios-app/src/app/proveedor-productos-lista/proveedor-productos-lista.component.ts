import { Component, inject } from "@angular/core";
import { ProveedorService } from "../service/proveedor.service";
import { Producto } from "../model/producto.model";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  standalone: true,
    imports: [CommonModule, ConfirmDialogComponent],
  selector: "proveedor-productos-lista",
  templateUrl: "./proveedor-productos-lista.component.html"
})
export class ProveedorProductosListaComponent {
    productos!: Producto[];
    idProveedor!: number;

    // Para el diálogo de confirmación
    showConfirm = false;
    productoAEliminar: number | null = null;

    private proveedorService = inject(ProveedorService);
    private enrutador = inject(Router);
    private ruta = inject(ActivatedRoute);

    ngOnInit() {
        this.idProveedor = this.ruta.snapshot.params['id'];
        this.obtenerProductosPorProveedor();
    }

    private obtenerProductosPorProveedor(): void {
        this.proveedorService.obtenerProductosPorProveedor(this.idProveedor).subscribe({
            next: (datos) => {
                console.log('Productos recibidos:', datos);
                this.productos = datos;
            },
            error: (error) => {
                console.error('Error al obtener la lista de productos:', error);
            }
        });
    }

    agregarProducto() {
        this.enrutador.navigate(['/productos/agregar', this.idProveedor]);
    }

    pedirConfirmacionEliminar(idProducto: number) {
        this.productoAEliminar = idProducto;
        this.showConfirm = true;
    }

    confirmarEliminar() {
        if (this.productoAEliminar != null) {
            this.proveedorService.eliminarProducto(this.productoAEliminar).subscribe({
                next: () => {
                    this.obtenerProductosPorProveedor();
                    this.showConfirm = false;
                    this.productoAEliminar = null;
                },
                error: (error) => {
                    console.error('Error al eliminar el producto:', error);
                    this.showConfirm = false;
                }
            });
        }
    }

    cancelarEliminar() {
        this.showConfirm = false;
        this.productoAEliminar = null;
    }
}
