import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryService } from 'src/app/services/delivery/delivery.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { ProductService } from 'src/app/services/product/product.service';
import DeliveryDTO from 'src/app/models/DeliveryDTO';
import SupplierDTO from 'src/app/models/SupplierDTO';
import ProductDTO from 'src/app/models/ProductDTO';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit {
  addDeliveryForm: FormGroup;
  suppliers: SupplierDTO[] = [];
  products: ProductDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    private router: Router,
    private supplierService: SupplierService,
    private productService: ProductService
  ) {
    this.addDeliveryForm = this.fb.group({
      supplierId: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      deliveryItems: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadProducts();
  }

  get deliveryItems() {
    return this.addDeliveryForm.get('deliveryItems') as FormArray;
  }
  addProductToDelivery(product: ProductDTO): void {
    const existingProduct = this.deliveryItems.controls.find(item => item.value.productId === product.productId);

    if (existingProduct) {
      const currentQuantity = existingProduct.get('quantity')!.value;
      existingProduct.get('quantity')!.setValue(currentQuantity + 1);
    } else {
      const deliveryItemForm = this.fb.group({
        productId: [product.productId, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        price: [product.price, [Validators.required, Validators.min(0)]]
      });
      this.deliveryItems.push(deliveryItemForm);
    }
  }


  addDeliveryItem() {
    const deliveryItemForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
    this.deliveryItems.push(deliveryItemForm);
  }

  removeDeliveryItem(index: number) {
    this.deliveryItems.removeAt(index);
  }

  increaseQuantity(index: number): void {
    const currentQuantity = this.deliveryItems.at(index).get('quantity')!.value;
    this.deliveryItems.at(index).get('quantity')!.setValue(currentQuantity + 1);
  }

  decreaseQuantity(index: number): void {
    const currentQuantity = this.deliveryItems.at(index).get('quantity')!.value;
    if (currentQuantity > 1) {
      this.deliveryItems.at(index).get('quantity')!.setValue(currentQuantity - 1);
    }
  }
  getProductById(productId: number): ProductDTO {
    return this.products.find(product => product.productId === productId)!;
  }

  getTotalPrice(index: number): number {
    const quantity = this.deliveryItems.at(index).get('quantity')!.value;
    const price = this.deliveryItems.at(index).get('price')!.value;
    return quantity * price;
  }

  // onSubmit() {
  //   if (this.addDeliveryForm.valid) {
  //     const delivery: DeliveryDTO = {
  //       deliveryId: 0,
  //       supplierId: this.addDeliveryForm.value.supplierId,
  //       deliveryDate: this.addDeliveryForm.value.deliveryDate,
  //       supplier: this.suppliers.find(supplier => supplier.supplierId === this.addDeliveryForm.value.supplierId) || { supplierId: 0, name: '', supplierImage: '' },
  //       deliveryItems: this.addDeliveryForm.value.deliveryItems.map((item: any) => {
  //         const product = this.products.find(product => product.productId === item.productId) || { productId: 0, name: '', description: '', image: '', price: 0, categoryId: 0 };
  //         return {
  //           deliveryItemId: 0,
  //           deliveryId: 0,
  //           productId: item.productId,
  //           quantity: item.quantity,
  //           price: item.price,
  //           product: product
  //         };
  //       })
  //     };

  //     console.log('Submitting delivery:', delivery);  // Log the payload

  //     this.deliveryService.createDelivery(delivery).subscribe({
  //       next: () => this.router.navigate(['/deliveries']),
  //       error: (error) => console.error('There was an error!', error)
  //     });
  //   }
  // }
  onSubmit() {
    if (this.addDeliveryForm.valid) {
      const delivery: DeliveryDTO = {
        deliveryId: 0,
        supplierId: this.addDeliveryForm.value.supplierId,
        deliveryDate: this.addDeliveryForm.value.deliveryDate,
        supplier: this.suppliers.find(supplier => supplier.supplierId === this.addDeliveryForm.value.supplierId) || { supplierId: 0, name: '', supplierImage: '' },
        deliveryItems: this.addDeliveryForm.value.deliveryItems.map((item: any) => ({
          deliveryItemId: 0,
          deliveryId: 0,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          product: this.products.find(product => product.productId === item.productId) || { productId: 0, name: '', description: '', image: '', price: 0, categoryId: 0 }
        }))
      };

      console.log('Submitting delivery:', delivery);  // Log the payload

      this.deliveryService.createDelivery(delivery).subscribe({
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
}
