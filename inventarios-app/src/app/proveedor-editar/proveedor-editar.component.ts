import { Component, inject } from "@angular/core";
import { Proveedor } from "../model/proveedor.model";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ProveedorService } from "../service/proveedor.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "proveedor-editar",
  imports: [FormsModule, RouterLink],
  templateUrl: "./proveedor-editar.component.html"
})
export class ProveedorEditarComponent {
    id!: number;
    proveedor: Proveedor = new Proveedor();
    private ruta = inject(ActivatedRoute);
    private proveedorService = inject(ProveedorService);
    private router = inject(Router);

    ngOnInit() {
        this.id = this.ruta.snapshot.params['id'];
        this.proveedorService.obtenerProveedorPorId(this.id).subscribe(proveedor => {
         this.proveedor = proveedor;
        });
    }

    onSubmit() {
        this.guardarProveedor(); 
    }

    guardarProveedor() {
        this.proveedorService.editarProveedor(this.id, this.proveedor).subscribe({
            next: (datos) => {
                console.log('Proveedor actualizado:', datos);
                this.router.navigate(['/proveedores']);
            },
            error: (error) => {
                console.error('Error al actualizar proveedor:', error);
            }
        });
    }
}
