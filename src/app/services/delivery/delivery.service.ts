import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import DeliveryDTO from 'src/app/models/DeliveryDTO';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private baseURL = 'https://localhost:7050/api/Deliveries';

  constructor(private http:HttpClient) { }

  getAllDeliveries(): Observable<DeliveryDTO[]>{
    return this.http.get<DeliveryDTO[]>(this.baseURL);
  }
  getDeliveryById(id:number): Observable<DeliveryDTO>{
    return this.http.get<DeliveryDTO>(`${this.baseURL}/${id}`);
  }
  createDelivery(delivery:DeliveryDTO): Observable<DeliveryDTO>{
    return this.http.post<DeliveryDTO>(this.baseURL,delivery);
  }
  updateDelivery(id:number,delivery:DeliveryDTO): Observable<DeliveryDTO>{
    return this.http.put<DeliveryDTO>(`${this.baseURL}/${id}`,delivery);
  }
  deleteDelivery(id:number): Observable<void>{
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }
}
