import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService } from 'src/app/services/delivery/delivery.service';
import DeliveryDTO from 'src/app/models/DeliveryDTO';
import SupplierDTO from 'src/app/models/SupplierDTO';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {
  deliveries: DeliveryDTO[] = [];
  suppliers: SupplierDTO[] = [];
  selectedSupplier: SupplierDTO | null = null;
  sortAscending: boolean = true;

  constructor(
    private deliveryService: DeliveryService,
    private SupplierService:SupplierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDeliveries();
    this.loadSuppliers();
  }

  loadDeliveries(): void {
    this.deliveryService.getAllDeliveries().subscribe((data: DeliveryDTO[]) => {
      this.deliveries = data;
      this.sortDeliveries();
    });
  }
  loadSuppliers():void{
    this.SupplierService.getAllSuppliers().subscribe((data:SupplierDTO[])=>{
      this.suppliers = data;
    })
  }

  toggleSortOrder(): void {
    this.sortAscending = !this.sortAscending;
    this.sortDeliveries();
  }

  sortDeliveries(): void {
    this.deliveries.sort((a, b) => {
      const dateA = new Date(a.deliveryDate).getTime();
      const dateB = new Date(b.deliveryDate).getTime();
      return this.sortAscending ? dateA - dateB : dateB - dateA;
    });
  }

  deleteDelivery(deliveryId: number): void {
    this.deliveryService.deleteDelivery(deliveryId).subscribe(() => {
      this.loadDeliveries();
    });
  }
  getSupplierName(supplierId: number): string {
    const supplier = this.suppliers.find(s => s.supplierId === supplierId);
    return supplier ? supplier.name : 'Unknown';
  }
  showSupplierDetails(supplierId:number):void{
    this.selectedSupplier = this.suppliers.find(s => s.supplierId == supplierId) || null;
  }
  hideSupplierDetails():void{
    this.selectedSupplier = null;
  }
  getTotalCost(delivery: DeliveryDTO): number {
    return delivery.deliveryItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
