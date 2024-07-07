import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import ProductDTO from 'src/app/models/ProductDTO';
import CategoryDTO from 'src/app/models/CategoryDTO';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  productId: number;
  categories: CategoryDTO[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService, private route: ActivatedRoute, private router: Router,private categoryService:CategoryService) {
    this.editProductForm = this.fb.group({
      productId: [''],
      name: ['', Validators.required],
      description: [''],
      image: [''],
      price: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
    this.productId = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadProduct();
    this.loadCategories();
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe((product:ProductDTO) => {
      this.editProductForm.patchValue(product);
    });
  }

  onSubmit() {
    if (this.editProductForm.valid) {
      this.productService.updateProduct(this.productId, this.editProductForm.value).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (error) => console.error('There was an error!', error)
      });
    }
  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
