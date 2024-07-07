import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent {
  addSupplierForm: FormGroup;

  constructor(private fb: FormBuilder, private supplierService: SupplierService, private router: Router) {
    this.addSupplierForm = this.fb.group({
      name: ['', Validators.required],
      supplierImage: ['']
    });
  }

  onSubmit() {
    if (this.addSupplierForm.valid) {
      this.supplierService.addNewSupplier(this.addSupplierForm.value).subscribe(() => {
        this.router.navigate(['/suppliers']);
      });
    }
  }
}
