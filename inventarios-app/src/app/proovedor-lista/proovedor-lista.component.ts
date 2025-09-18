import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { Proveedor } from "../model/proveedor.model";
import { ProveedorService } from "../service/proveedor.service";
import { Router } from "@angular/router";

@Component({
    selector: "proovedor-lista",
    standalone: true,
    imports: [CommonModule, ConfirmDialogComponent],
    templateUrl: "./proovedor-lista.component.html"
})
export class ProovedorListaComponent {
    proveedores!: Proveedor[];

    showConfirm = false;
    proveedorAEliminar: number | null = null;

    private proveedorService = inject(ProveedorService);
    private enrutador = inject(Router);

    ngOnInit() {
        this.obtenerProveedores();
    }

    private obtenerProveedores(): void {
        this.proveedorService.obtenerListaProveedores().subscribe({
            next: (datos) => {
                this.proveedores = datos;
            },
            error: (error) => {
                console.error('Error al obtener la lista de proveedores:', error);
            }
        });
    }

    editarProveedor(id: number) {
        this.enrutador.navigate(['/proveedores/editar', id]);
    }

    obtenerProductosPorProovedor(id: number) {
        this.enrutador.navigate(['/productos/proveedor', id]);
    }

    pedirConfirmacionEliminar(id: number) {
        this.proveedorAEliminar = id;
        this.showConfirm = true;
    }

    confirmarEliminar() {
        if (this.proveedorAEliminar != null) {
            this.proveedorService.eliminarProveedor(this.proveedorAEliminar).subscribe({
                next: () => {
                    console.log('Proveedor eliminado con éxito');
                    this.obtenerProveedores();
                    this.showConfirm = false;
                    this.proveedorAEliminar = null;
                },
                error: (error) => {
                    console.error('Error al eliminar el proveedor:', error);
                    this.showConfirm = false;
                }
            });
        }
    }

    cancelarEliminar() {
        this.showConfirm = false;
        this.proveedorAEliminar = null;
    }
}