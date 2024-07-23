import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import ProductDTO from 'src/app/models/ProductDTO';
import CategoryDTO from 'src/app/models/CategoryDTO';
import { CategoryService } from 'src/app/services/category/category.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: ProductDTO[] = [];
  filteredProducts: ProductDTO[] = [];
  categories: CategoryDTO[] = [];
  selectedCategory: number | null = null;


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private location:Location
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data: ProductDTO[]) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data: CategoryDTO[]) => {
      this.categories = data;
    });
  }

  filterProducts(): void {
    if (this.selectedCategory === null) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        (product) => product.categoryId === this.selectedCategory
      );
    }
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.categoryId === categoryId);
    return category ? category.name : 'Unknown';
  }
  

  editProduct(product: ProductDTO): void {
    this.router.navigate(['/edit-product', product.productId]);
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts();
    });
  }
  
  addProduct(): void {
    this.router.navigate(['/add-product']);
  }
  goBack() {
    this.router.navigate(['/home']);
    }
}
