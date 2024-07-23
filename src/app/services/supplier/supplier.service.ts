import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import SupplierDTO from 'src/app/models/SupplierDTO';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private baseURL = 'https://localhost:7050/api/Suppliers';
  
  constructor(private http: HttpClient) { }

  getAllSuppliers(): Observable<SupplierDTO[]> {
    return this.http.get<SupplierDTO[]>(this.baseURL);
  }

  getSupplierById(id: number): Observable<SupplierDTO> {
    return this.http.get<SupplierDTO>(`${this.baseURL}/${id}`);
  }

  addNewSupplier(supplier: SupplierDTO): Observable<any> {
    return this.http.post<any>(this.baseURL, supplier);
  }

  updateSupplier(id: number, supplier: SupplierDTO): Observable<any> {
    return this.http.put<any>(`${this.baseURL}/${id}`, supplier);
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }
}
