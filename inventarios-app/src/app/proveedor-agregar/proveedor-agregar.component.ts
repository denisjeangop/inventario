import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { Proveedor } from "../model/proveedor.model";
import { ProveedorService } from "../service/proveedor.service";

@Component({
  selector: "proveedor-agregar",
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: "./proveedor-agregar.component.html"
})
export class ProveedorAgregarComponent {
    proveedor: Proveedor = new Proveedor();

    private proveedorService = inject(ProveedorService);
    private enrutador =  inject(Router);

    onSubmit() {
        this.guardarProveedor();
    }

    guardarProveedor() {
        this.proveedorService.crearProveedor(this.proveedor).subscribe({
            next: (datos) => {
                console.log('Proveedor creado:', datos);
                this.enrutador.navigate(['/proveedores']);
            },
            error: (error) => {
                console.error('Error al crear proveedor:', error);
            }
        });
    }
    }
