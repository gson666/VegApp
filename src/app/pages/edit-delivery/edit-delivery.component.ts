import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DeliveryService } from 'src/app/services/delivery/delivery.service';
import DeliveryDTO from 'src/app/models/DeliveryDTO';
import SupplierDTO from 'src/app/models/SupplierDTO';
import ProductDTO from 'src/app/models/ProductDTO';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-edit-delivery',
  templateUrl: './edit-delivery.component.html',
  styleUrls: ['./edit-delivery.component.css']
})
export class EditDeliveryComponent implements OnInit {
  editDeliveryForm: FormGroup;
  deliveryId: number;
  suppliers: SupplierDTO[] = [];
  products: ProductDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierService,
    private productService: ProductService
  ) {
    this.deliveryId = +this.route.snapshot.params['id'];
    this.editDeliveryForm = this.fb.group({
      supplierId: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      deliveryItems: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadDelivery();
    this.loadSuppliers();
    this.loadProducts();
  }

  get deliveryItems() {
    return this.editDeliveryForm.get('deliveryItems') as FormArray;
  }

  addDeliveryItem(productId: number = 0, quantity: number = 0, price: number = 0) {
    const deliveryItemForm = this.fb.group({
      productId: [productId, Validators.required],
      quantity: [quantity, [Validators.required, Validators.min(1)]],
      price: [price, [Validators.required, Validators.min(0)]]
    });
    this.deliveryItems.push(deliveryItemForm);
  }
  removeDeliveryItem(index: number) {
    this.deliveryItems.removeAt(index);
  }

  loadDelivery(): void {
    this.deliveryService.getDeliveryById(this.deliveryId).subscribe((delivery: DeliveryDTO) => {
      // Format the date to 'yyyy-MM-dd'
      const formattedDate = new Date(delivery.deliveryDate).toISOString().split('T')[0];
      
      this.editDeliveryForm.patchValue({
        supplierId: delivery.supplierId,
        deliveryDate: formattedDate
      });

      delivery.deliveryItems.forEach(item => {
        this.addDeliveryItem(item.productId, item.quantity, item.price);
      });
    });
  }

  onSubmit() {
    if (this.editDeliveryForm.valid) {
      const updatedDelivery: DeliveryDTO = {
        deliveryId: this.deliveryId,
        supplierId: this.editDeliveryForm.value.supplierId,
        deliveryDate: this.editDeliveryForm.value.deliveryDate,
        supplier: this.suppliers.find(supplier => supplier.supplierId === this.editDeliveryForm.value.supplierId) || { supplierId: 0, name: '', supplierImage: '' },
        deliveryItems: this.editDeliveryForm.value.deliveryItems.map((item: any) => {
          const product = this.products.find(product => product.productId === item.productId) || { productId: 0, name: '', description: '', image: '', price: 0, categoryId: 0 };
          return {
            deliveryItemId: 0,
            deliveryId: this.deliveryId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            product: product
          };
        })
      };

      this.deliveryService.updateDelivery(this.deliveryId, updatedDelivery).subscribe({
        next: () => this.router.navigate(['/deliveries']),
        error: (error) => console.error('There was an error!', error)
      });
    }
  }

  loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe((data: SupplierDTO[]) => {
      this.suppliers = data;
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data: ProductDTO[]) => {
      this.products = data;
    });
  }
  goBack(){
    this.router.navigate(['/home']);
  }
}
