import { Component, inject } from "@angular/core";
import { ProveedorService } from "../service/proveedor.service";
import { Producto } from "../model/producto.model";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: "proveedor-productos-lista",
  templateUrl: "./proveedor-productos-lista.component.html"
})
export class ProveedorProductosListaComponent {
    productos!: Producto[];

    private proveedorService = inject(ProveedorService);
    private enrutador = inject(Router);
    private ruta = inject(ActivatedRoute);

    ngOnInit() {
        this.obtenerProductosPorProveedor();
    }

    private obtenerProductosPorProveedor(): void {
        const idProveedor = this.ruta.snapshot.params['id'];
        this.proveedorService.obtenerProductosPorProveedor(idProveedor).subscribe({
            next: (datos) => {
                console.log('Productos recibidos:', datos);
                this.productos = datos;
            },
            error: (error) => { 
                console.error('Error al obtener la lista de productos:', error);
            }
        });
    }

}
