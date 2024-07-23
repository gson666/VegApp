import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SupplierDTO from 'src/app/models/SupplierDTO';
import { SupplierService } from 'src/app/services/supplier/supplier.service';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
 suppliers: SupplierDTO[] = [];

 constructor(private supplierService:SupplierService,private router:Router){ }

  ngOnInit(): void {
    this.loadSuppliers();
  }
  loadSuppliers(){
    this.supplierService.getAllSuppliers()
    .subscribe((data:SupplierDTO[])=>{
      this.suppliers = data;
    })
  }

  editSupplier(supplier:SupplierDTO){
    this.router.navigate(['/edit-supplier',supplier.supplierId]);
  }
  deleteSupplier(id: number): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.supplierService.deleteSupplier(id).subscribe(() => {
        this.loadSuppliers();
      });
    }
  }

  addSupplier(): void {
    this.router.navigate(['/add-supplier']);
  }
  goBack() {
    this.router.navigate(['/home']);
    }
}
