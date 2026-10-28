import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ShippingService } from '../../services/shipping.service';
import { AuthService } from '../../services/auth.service';
import { Product, ProductVariant } from '../../models/product.model';
import { CourierCode, ShopifyOrder } from '../../models/shipping.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent {
  readonly productService = inject(ProductService);
  readonly shippingService = inject(ShippingService);
  readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // Active Admin View: 'products' | 'shipping' | 'orders'
  readonly currentTab = signal<'products' | 'shipping' | 'orders'>('products');

  // Products table search & status filter
  searchTable = '';
  statusFilter = signal<'All' | 'Active' | 'Draft'>('All');

  // Selected products for bulk actions
  selectedProductIds = signal<Set<string>>(new Set());

  // Add Product Modal
  isAddProductOpen = signal<boolean>(false);
  newProductTitle = '';
  newProductSubtitle = '';
  newProductCategory: Product['category'] = 'Kecantikan/Perawatan Wajah';
  newProductCategoryLabel: Product['categoryLabel'] = 'Wajah';
  newProductPrice: number = 45000;
  newProductOrigPrice: number = 65000;
  newProductInventory: number = 500;
  newProductBpom = 'NA18220109999';
  newProductBadge = 'New Arrival ✨';
  newProductEmoji = '💖';

  // Shipping Calculator state
  calcOriginCity = 'Kota Surabaya (Origin)';
  calcDestCity = signal<string>('Jakarta Selatan');
  calcWeightKg = signal<number>(1);

  // Computed shipping rates
  readonly calculatedRates = computed(() => 
    this.shippingService.getEstimatedRates(this.calcDestCity(), this.calcWeightKg())
  );

  // Shipping Label modal
  isLabelModalOpen = signal<boolean>(false);
  activeLabelOrder = signal<ShopifyOrder | null>(null);

  // Quick Toast
  toastMessage = signal<string | null>(null);

  constructor() {
    this.route.url.subscribe(segments => {
      const path = segments[segments.length - 1]?.path;
      if (path === 'shipping') {
        this.currentTab.set('shipping');
      } else if (path === 'orders') {
        this.currentTab.set('orders');
      } else {
        this.currentTab.set('products');
      }
    });
  }

  setTab(tab: 'products' | 'shipping' | 'orders'): void {
    this.currentTab.set(tab);
    this.router.navigate(['/admin', tab]);
  }

  showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3500);
  }

  // Filtered Products for Admin Table
  readonly adminFilteredProducts = computed(() => {
    let list = this.productService.products();
    const query = this.searchTable.toLowerCase().trim();
    const status = this.statusFilter();

    if (status !== 'All') {
      list = list.filter(p => p.status === status);
    }

    if (query) {
      list = list.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.productType.toLowerCase().includes(query)
      );
    }

    return list;
  });

  // Selection
  toggleSelectAll(): void {
    const all = this.adminFilteredProducts();
    const set = new Set(this.selectedProductIds());
    if (set.size === all.length) {
      this.selectedProductIds.set(new Set());
    } else {
      this.selectedProductIds.set(new Set(all.map(p => p.id)));
    }
  }

  toggleSelect(id: string): void {
    const set = new Set(this.selectedProductIds());
    if (set.has(id)) {
      set.delete(id);
    } else {
      set.add(id);
    }
    this.selectedProductIds.set(set);
  }

  isAllSelected(): boolean {
    const all = this.adminFilteredProducts();
    return all.length > 0 && this.selectedProductIds().size === all.length;
  }

  // Add Product Action
  openAddProduct(): void {
    this.isAddProductOpen.set(true);
  }

  closeAddProduct(): void {
    this.isAddProductOpen.set(false);
  }

  submitNewProduct(): void {
    if (!this.newProductTitle.trim()) return;

    const id = 'syb-' + Date.now();
    const newProd: Product = {
      id,
      title: this.newProductTitle,
      subtitle: this.newProductSubtitle || 'Produk kecantikan berkualitas tinggi dari SYB Official.',
      category: this.newProductCategory,
      categoryLabel: this.newProductCategoryLabel,
      productType: this.newProductCategory,
      status: 'Active',
      inventory: this.newProductInventory,
      variantsCount: 1,
      variants: [
        { id: 'v1', name: 'Standard 100ml', stock: this.newProductInventory, price: this.newProductPrice, sku: 'SYB-NEW-' + id.slice(-4) }
      ],
      channels: 4,
      catalogs: 2,
      price: this.newProductPrice,
      originalPrice: this.newProductOrigPrice,
      rating: 5.0,
      reviewsCount: 0,
      badge: this.newProductBadge,
      bpomNumber: this.newProductBpom,
      accentColor: '#FF4D8D',
      iconEmoji: this.newProductEmoji || '💖',
      heroTagline: 'Formula baru inovasi SYB Indonesia',
      description: 'Diformulasikan secara aman dan terdaftar BPOM.',
      benefits: ['Mencerahkan kulit', 'Menutrisi secara intensif'],
      keyIngredients: ['Niacinamide', 'Collagen', 'Vitamin E'],
      howToUse: ['Gunakan secara teratur setiap hari'],
      isFeatured: false,
      isFlashSale: false
    };

    this.productService.addProduct(newProd);
    this.closeAddProduct();
    this.showToast('✅ Produk baru berhasil ditambahkan ke Shopify!');

    // Reset inputs
    this.newProductTitle = '';
    this.newProductSubtitle = '';
  }

  // Quick Stock Edit
  quickUpdateStock(product: Product, delta: number): void {
    const updated = {
      ...product,
      inventory: Math.max(0, product.inventory + delta)
    };
    this.productService.updateProduct(updated);
    this.showToast(`Stok "${product.title.slice(0, 24)}..." diperbarui.`);
  }

  // Shipping & Orders actions
  fulfillOrder(order: ShopifyOrder): void {
    const awb = this.shippingService.generateAirwayBill(order.id);
    this.showToast(`📦 Airway Bill #${awb} berhasil diterbitkan untuk pesanan ${order.orderNumber}!`);
  }

  printShippingLabel(order: ShopifyOrder): void {
    this.activeLabelOrder.set(order);
    this.isLabelModalOpen.set(true);
  }

  closeLabelModal(): void {
    this.isLabelModalOpen.set(false);
    this.activeLabelOrder.set(null);
  }

  logoutAdmin(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
