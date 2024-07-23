import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import SupplierDTO from 'src/app/models/SupplierDTO';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit {
  editSupplierForm: FormGroup;
  supplierId: number;

  constructor(private fb: FormBuilder, private supplierService: SupplierService, private route: ActivatedRoute, private router: Router) {
    this.editSupplierForm = this.fb.group({
      supplierId: [''],
      name: ['', Validators.required],
      supplierImage: ['']
    });
    this.supplierId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadSupplier();
  }

  loadSupplier(): void {
    this.supplierService.getSupplierById(this.supplierId).subscribe((data: SupplierDTO) => {
      this.editSupplierForm.patchValue(data);
    });
  }

  onSubmit() {
    if (this.editSupplierForm.valid) {
      this.supplierService.updateSupplier(this.supplierId, this.editSupplierForm.value).subscribe(() => {
        this.router.navigate(['/suppliers']);
      });
    }
  }
}
