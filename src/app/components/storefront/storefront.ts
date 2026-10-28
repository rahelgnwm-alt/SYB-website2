import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product, ProductVariant } from '../../models/product.model';

@Component({
  selector: 'app-storefront',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './storefront.html',
  styleUrl: './storefront.css'
})
export class StorefrontComponent {
  readonly productService = inject(ProductService);
  readonly cartService = inject(CartService);
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Login form state
  loginIdentifier = 'admin@sybindonesia.com';
  loginPassword = 'admin123';
  showPassword = false;

  // Selected variant per product map
  readonly selectedVariants = signal<Record<string, ProductVariant>>({});

  // Search input
  searchInputValue = '';

  // Voucher input
  voucherInput = '';
  voucherAlert = signal<{ success: boolean; text: string } | null>(null);

  // Routine Step
  readonly activeRoutineStep = signal<number>(1);

  // Skin Quiz State
  readonly isQuizOpen = signal<boolean>(false);
  readonly quizStep = signal<number>(1);
  readonly quizSkinType = signal<string>('Kering & Kusam');
  readonly quizConcern = signal<string>('Kulit Belang & Noda Hitam');
  readonly quizGoal = signal<string>('Glass Skin Glowing Cepat');
  readonly quizResultProduct = signal<Product | null>(null);

  // Checkout modal
  readonly isCheckoutOpen = signal<boolean>(false);
  readonly checkoutSuccess = signal<boolean>(false);
  checkoutName = 'Aulia Rahma';
  checkoutPhone = '081298412933';
  checkoutAddress = 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan';
  checkoutCourier = 'J&T';

  // Categories
  readonly categories = ['All', 'Wajah', 'Tubuh', 'Makeup', 'Paket Ritual', 'Aksesoris'];

  // Routine steps definition
  readonly routineSteps = [
    {
      step: 1,
      title: 'Gentle Peeling',
      productName: 'NEW SYB Facial Glowing Peeling Gel',
      tagline: 'Angkat daki & sel kulit mati dalam 60 detik tanpa perih',
      time: '2-3x Seminggu',
      badge: 'Step 1: Prep & Exfoliate',
      emoji: '✨',
      accent: '#FF6897',
      benefit: 'Membuka jalan agar serum menyerap 3x lebih cepat dan merata.'
    },
    {
      step: 2,
      title: 'Acid Hydrate & Tone',
      productName: 'NEW SYB AHA Skinboost Body Toner',
      tagline: 'Mencerahkan siku, lutut, dan lipatan kusam seketika',
      time: 'Pagi & Malam',
      badge: 'Step 2: Deep Balance',
      emoji: '🍊',
      accent: '#FF7A00',
      benefit: 'Eksfoliasi kimiawi lembut Glycolic Acid meratakan kulit belang.'
    },
    {
      step: 3,
      title: 'Intensive Jelly Repair',
      productName: 'NEW SYB FORTE Red Jelly Serum 20ml',
      tagline: 'Serum jelly konsentrat tinggi Astaxanthin & Niacinamide',
      time: 'Malam Hari',
      badge: 'Step 3: Core Nutrition',
      emoji: '🍓',
      accent: '#FF1744',
      benefit: 'Meremajakan sel kulit rusak dan menenangkan kemerahan.'
    },
    {
      step: 4,
      title: 'DNA Salmon Glow Lock',
      productName: 'SYB Bibit Whitening Body Lotion DNA Salmon',
      tagline: 'Kunci kelembapan 24 jam dengan keharuman mewah tahan lama',
      time: 'Setiap Hari',
      badge: 'Step 4: Seal & Protect',
      emoji: '🐟',
      accent: '#FF4D8D',
      benefit: 'Mencerahkan tone kulit hingga 3 tingkat lebih cerah natural.'
    }
  ];

  getSelectedVariant(product: Product): ProductVariant {
    return this.selectedVariants()[product.id] || product.variants[0];
  }

  selectVariant(product: Product, variant: ProductVariant): void {
    this.selectedVariants.update(map => ({
      ...map,
      [product.id]: variant
    }));
  }

  handleSearch(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchInputValue = val;
    this.productService.setSearchQuery(val);
  }

  clearSearch(): void {
    this.searchInputValue = '';
    this.productService.setSearchQuery('');
  }

  onAddToCart(product: Product): void {
    const variant = this.getSelectedVariant(product);
    this.cartService.addToCart(product, variant, 1);
  }

  applyVoucher(): void {
    if (!this.voucherInput.trim()) return;
    const res = this.cartService.applyVoucher(this.voucherInput);
    this.voucherAlert.set({ success: res.success, text: res.message });
    setTimeout(() => {
      this.voucherAlert.set(null);
    }, 4000);
  }

  // Quiz methods
  openQuiz(): void {
    this.isQuizOpen.set(true);
    this.quizStep.set(1);
    this.quizResultProduct.set(null);
  }

  closeQuiz(): void {
    this.isQuizOpen.set(false);
  }

  finishQuiz(): void {
    // Recommend best match based on choice
    const products = this.productService.products();
    if (this.quizConcern().includes('Noda Hitam') || this.quizGoal().includes('Glass Skin')) {
      const match = products.find(p => p.id === 'syb-paket-ritual-malam') || products[0];
      this.quizResultProduct.set(match);
    } else if (this.quizConcern().includes('Badan')) {
      const match = products.find(p => p.id === 'syb-bibit-whitening-dna-salmon') || products[1];
      this.quizResultProduct.set(match);
    } else {
      const match = products.find(p => p.id === 'syb-peeling-gel') || products[0];
      this.quizResultProduct.set(match);
    }
    this.quizStep.set(4);
  }

  // Checkout modal
  openCheckout(): void {
    this.cartService.closeCart();
    this.isCheckoutOpen.set(true);
    this.checkoutSuccess.set(false);
  }

  closeCheckout(): void {
    this.isCheckoutOpen.set(false);
  }

  confirmOrder(): void {
    this.checkoutSuccess.set(true);
    setTimeout(() => {
      this.cartService.clearCart();
    }, 1500);
  }

  // Auth methods
  async handleLogin(): Promise<void> {
    const success = await this.authService.login(this.loginIdentifier, this.loginPassword);
    if (success) {
      const returnUrl = this.authService.getReturnUrl();
      if (returnUrl) {
        this.router.navigateByUrl(returnUrl);
      }
    }
  }

  fillDemoAdmin(): void {
    this.loginIdentifier = 'admin@sybindonesia.com';
    this.loginPassword = 'admin123';
  }

  handleLogout(): void {
    this.authService.logout();
  }

  tryAccessAdmin(path: string = '/admin/products'): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([path]);
    } else {
      this.authService.openLoginModal(path);
    }
  }
}
