import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './services/auth/auth.guard';
import { DeliveriesComponent } from './pages/deliveries/deliveries.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { AddSupplierComponent } from './pages/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './pages/edit-supplier/edit-supplier.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddDeliveryComponent } from './pages/add-delivery/add-delivery.component';
import { EditDeliveryComponent } from './pages/edit-delivery/edit-delivery.component';
import { SuppliersComponent } from './pages/suppliers/suppliers/suppliers.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'suppliers', component: SuppliersComponent, canActivate: [authGuard] },
  { path: 'deliveries', component: DeliveriesComponent, canActivate: [authGuard] },
  { path: 'add-delivery', component: AddDeliveryComponent, canActivate: [authGuard] },
  { path: 'edit-delivery/:id', component: EditDeliveryComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'add-product', component: AddProductComponent, canActivate: [authGuard] },
  { path: 'edit-product/:id', component: EditProductComponent, canActivate: [authGuard] },
  { path: 'add-supplier', component: AddSupplierComponent, canActivate: [authGuard] },
  { path: 'edit-supplier/:id', component: EditSupplierComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
