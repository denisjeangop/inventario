import { Routes } from '@angular/router';
import { ProovedorListaComponent } from './proovedor-lista/proovedor-lista.component';
import { ProveedorAgregarComponent } from './proveedor-agregar/proveedor-agregar.component';
import { ProveedorEditarComponent } from './proveedor-editar/proveedor-editar.component';
import { ProveedorProductosListaComponent } from './proveedor-productos-lista/proveedor-productos-lista.component';
import { ProveedorProductosListaAgregarComponent } from './proveedor-productos-lista-agregar/proveedor-productos-lista-agregar.component';

export const routes: Routes = [
	{ path: 'proveedores', component: ProovedorListaComponent },
	{ path: 'proveedores/agregar', component: ProveedorAgregarComponent },
	{ path: 'proveedores/editar/:id', component: ProveedorEditarComponent },
	{ path: 'productos/proveedor/:id', component: ProveedorProductosListaComponent },
	{ path: 'productos/agregar/:id', component: ProveedorProductosListaAgregarComponent },
	{ path: '', pathMatch: 'full', redirectTo: 'proveedores' },
];
