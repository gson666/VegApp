import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import CategoryDTO from 'src/app/models/CategoryDTO';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  categories:CategoryDTO[] =[];
  
  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router,private categoryService:CategoryService ) {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      image: [''],
      price: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadCategories();
  }

  onSubmit() {
    if (this.addProductForm.valid) {
      this.productService.createProduct(this.addProductForm.value).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data: CategoryDTO[]) => {
      this.categories = data;
    });
  }
}
