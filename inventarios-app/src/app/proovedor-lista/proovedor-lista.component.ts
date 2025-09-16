import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Proveedor } from "../model/proveedor.model";
import { ProveedorService } from "../service/proveedor.service";
import { Router } from "@angular/router";

@Component({
    selector: "proovedor-lista",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./proovedor-lista.component.html"
})
export class ProovedorListaComponent {
    proveedores!: Proveedor[];

    private proveedorService = inject(ProveedorService);
    private enrutador = inject(Router);

    ngOnInit() {
        this.obtenerProveedores();
    }

    private obtenerProveedores(): void{
        this.proveedorService.obtenerListaProveedores().subscribe({
            next: (datos) => {
                this.proveedores = datos;
            },
            error: (error) => {
                console.error('Error al obtener la lista de proveedores:', error);
            }
        });
    }


    editarProveedor(id: number){
        this.enrutador.navigate(['/proveedores/editar', id]);
    }

    obtenerProductosPorProovedor(id: number) {
        this.enrutador.navigate(['/productos/proveedor', id]);
    }

    eliminarProveedor(id: number) {
        this.proveedorService.eliminarProveedor(id).subscribe({
            next: () => {
                console.log('Proveedor eliminado con éxito');
                this.obtenerProveedores(); // Refrescar la lista después de eliminar
            },
            error: (error) => {
                console.error('Error al eliminar el proveedor:', error);
            }
        });
    }

}