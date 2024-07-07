import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import CategoryDTO from 'src/app/models/CategoryDTO';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseURL = 'https://localhost:7050/api/Categories';
  
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(this.baseURL);
  }

  getCategoryById(id: number): Observable<CategoryDTO> {
    return this.http.get<CategoryDTO>(`${this.baseURL}/${id}`);
  }

  createCategory(categoryDTO: CategoryDTO): Observable<CategoryDTO> {
    return this.http.post<CategoryDTO>(this.baseURL, categoryDTO);
  }

  updateCategory(id: number, categoryDTO: CategoryDTO): Observable<CategoryDTO> {
    return this.http.put<CategoryDTO>(`${this.baseURL}/${id}`, categoryDTO);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }
}
