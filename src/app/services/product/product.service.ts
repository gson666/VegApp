// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import ProductDTO from 'src/app/models/ProductDTO';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private baseUrl = 'https://localhost:7050/api/Products';
  
//   constructor(private http: HttpClient) { }

//   getAllProducts(): Observable<ProductDTO[]> {
//     return this.http.get<ProductDTO[]>(this.baseUrl);
//   }

//   getProductById(id: number): Observable<ProductDTO> {
//     return this.http.get<ProductDTO>(`${this.baseUrl}/${id}`);
//   }

//   createProduct(product: ProductDTO): Observable<ProductDTO> {
//     return this.http.post<ProductDTO>(this.baseUrl, product);
//   }

//   updateProduct(id: number, product: ProductDTO): Observable<ProductDTO> {
//     return this.http.put<ProductDTO>(`${this.baseUrl}/${id}`, product);
//   }

//   deleteProduct(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.baseUrl}/${id}`);
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ProductDTO from 'src/app/models/ProductDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = 'https://localhost:7050/api/Products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<[]>(this.baseURL);
  }

  getProductById(id: number): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(`${this.baseURL}/${id}`);
  }

  createProduct(product: ProductDTO): Observable<any> {
    return this.http.post(this.baseURL, product);
  }

  updateProduct(id: number, product: ProductDTO): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}

