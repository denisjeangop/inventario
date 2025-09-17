import { Component, inject } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Proveedor } from "../model/proveedor.model";
import { Producto } from "../model/producto.model";
import { ProveedorService } from "../service/proveedor.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "proveedor-productos-lista-agregar",
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: "./proveedor-productos-lista-agregar.component.html"
})
export class ProveedorProductosListaAgregarComponent {
    proveedor!: Proveedor;
    producto: Producto = new Producto();

    private proveedorService = inject(ProveedorService);
    private enrutador = inject(Router);
    private ruta = inject(ActivatedRoute);

    ngOnInit() {
        const idProveedor = this.ruta.snapshot.params['id'];
        this.proveedorService.obtenerProveedorPorId(idProveedor).subscribe({
            next: (datos) => {
                console.log('Proveedor recibido:', datos);
                this.proveedor = datos;
                this.producto.proveedor = datos;
            },
            error: (error) => {
                console.error('Error al obtener el proveedor:', error);
            }
        });
    }

        ngOnSubmit() {
            this.producto.proveedor = this.proveedor;
            this.proveedorService.crearProducto(this.producto).subscribe({
                next: (datos) => {
                    console.log('Producto creado:', datos);
                    console.log('Producto a guardar:', this.producto);
                    // Redirigir a la lista de productos del proveedor tras crear
                    this.enrutador.navigate(['/productos/proveedor', this.proveedor.idProveedor]);
                },
                error: (error) => {
                    console.error('Error al crear el producto:', error);
                }
            });
    }
}
