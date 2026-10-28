import { Routes } from '@angular/router';
import { StorefrontComponent } from './components/storefront/storefront';
import { AdminComponent } from './components/admin/admin';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: StorefrontComponent, title: 'SYB Official • Glowing & Cute Skincare Indonesia' },
  { path: 'admin', redirectTo: 'admin/products', pathMatch: 'full' },
  { path: 'admin/products', component: AdminComponent, canActivate: [authGuard], title: 'Products • Shopify Admin SYBofficial' },
  { path: 'admin/shipping', component: AdminComponent, canActivate: [authGuard], title: 'Shipping & Delivery • Shopify Admin SYBofficial' },
  { path: 'admin/orders', component: AdminComponent, canActivate: [authGuard], title: 'Orders (10) • Shopify Admin SYBofficial' },
  { path: '**', redirectTo: '' }
];
