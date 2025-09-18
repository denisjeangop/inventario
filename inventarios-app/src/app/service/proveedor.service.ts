import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../model/proveedor.model';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../model/producto.model';

@Injectable({ providedIn: 'root' })
export class ProveedorService {
    private urlBase: string = 'http://localhost:8080/inventario';

    constructor(private clienteHttp: HttpClient) {}

    obtenerListaProveedores(): Observable<Proveedor[]> {
        return this.clienteHttp.get<Proveedor[]>(`${this.urlBase}/proveedores`);
    }

    crearProveedor(proveedor: Proveedor): Observable<Object> {
        return this.clienteHttp.post<Proveedor>(`${this.urlBase}/proveedores/agregar`, proveedor);
    }

    obtenerProveedorPorId(id: number) {
        return this.clienteHttp.get<Proveedor>(`${this.urlBase}/proveedores/${id}`);
    }

    editarProveedor(id: number, proveedor: Proveedor): Observable<Object> {
        return this.clienteHttp.put(`${this.urlBase}/proveedores/${id}`, proveedor);
    }

    obtenerProductosPorProveedor(id: number): Observable<Producto[]> {
        return this.clienteHttp.get<Producto[]>(`${this.urlBase}/productos/proveedor/${id}`);
    }

    eliminarProveedor(id: number): Observable<void> {
        return this.clienteHttp.delete<void>(`${this.urlBase}/proveedores/${id}`);
    }

    crearProducto(producto: Producto): Observable<Object> {
        return this.clienteHttp.post<Producto>(`${this.urlBase}/productos`, producto);
    }

    eliminarProducto(id: number): Observable<void> {
        return this.clienteHttp.delete<void>(`${this.urlBase}/productos/${id}`);
    }
}
