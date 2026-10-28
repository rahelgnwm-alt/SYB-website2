import { Injectable, signal, computed } from '@angular/core';
import { Product, ProductVariant } from '../models/product.model';

export interface CartItem {
  id: string; // unique item id (productId + variantId)
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  readonly items = signal<CartItem[]>([]);
  readonly isCartOpen = signal<boolean>(false);
  readonly discountCode = signal<string>('');
  readonly discountPercent = signal<number>(0);
  readonly freeShippingThreshold = 150000; // Free shipping if >= Rp 150.000

  // Computed values
  readonly totalItemsCount = computed(() => 
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly subtotal = computed(() => 
    this.items().reduce((sum, item) => sum + (item.variant.price * item.quantity), 0)
  );

  readonly discountAmount = computed(() => {
    const sub = this.subtotal();
    const pct = this.discountPercent();
    return Math.round((sub * pct) / 100);
  });

  readonly shippingFee = computed(() => {
    const sub = this.subtotal();
    if (sub === 0) return 0;
    return sub >= this.freeShippingThreshold ? 0 : 15000;
  });

  readonly remainingForFreeShipping = computed(() => {
    const remaining = this.freeShippingThreshold - this.subtotal();
    return remaining > 0 ? remaining : 0;
  });

  readonly freeShippingProgress = computed(() => {
    const sub = this.subtotal();
    const pct = (sub / this.freeShippingThreshold) * 100;
    return Math.min(100, Math.round(pct));
  });

  readonly grandTotal = computed(() => 
    this.subtotal() - this.discountAmount() + this.shippingFee()
  );

  // Cart operations
  openCart(): void {
    this.isCartOpen.set(true);
  }

  closeCart(): void {
    this.isCartOpen.set(false);
  }

  toggleCart(): void {
    this.isCartOpen.update(open => !open);
  }

  addToCart(product: Product, variant?: ProductVariant, quantity: number = 1): void {
    const selectedVariant = variant || product.variants[0] || {
      id: 'default',
      name: 'Standard',
      price: product.price,
      stock: product.inventory,
      sku: 'SKU-DEFAULT'
    };

    const cartItemId = `${product.id}-${selectedVariant.id}`;

    this.items.update(currentItems => {
      const existingIndex = currentItems.findIndex(i => i.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...currentItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...currentItems, {
          id: cartItemId,
          product,
          variant: selectedVariant,
          quantity
        }];
      }
    });

    this.openCart();
  }

  updateQuantity(itemId: string, newQty: number): void {
    if (newQty <= 0) {
      this.removeItem(itemId);
      return;
    }
    this.items.update(currentItems => 
      currentItems.map(item => item.id === itemId ? { ...item, quantity: newQty } : item)
    );
  }

  removeItem(itemId: string): void {
    this.items.update(currentItems => currentItems.filter(i => i.id !== itemId));
  }

  clearCart(): void {
    this.items.set([]);
    this.discountCode.set('');
    this.discountPercent.set(0);
  }

  applyVoucher(code: string): { success: boolean; message: string } {
    const cleanCode = code.toUpperCase().trim();
    if (cleanCode === 'GLOWGIRL' || cleanCode === 'SYBQUEEN') {
      this.discountCode.set(cleanCode);
      this.discountPercent.set(15);
      return { success: true, message: '🎉 Voucher cantik berhasil! Diskon 15% diterapkan!' };
    } else if (cleanCode === 'CUTE10') {
      this.discountCode.set(cleanCode);
      this.discountPercent.set(10);
      return { success: true, message: '✨ Diskon 10% berhasil dipasang!' };
    } else {
      return { success: false, message: 'Kode voucher tidak valid. Coba: GLOWGIRL atau CUTE10' };
    }
  }

  removeVoucher(): void {
    this.discountCode.set('');
    this.discountPercent.set(0);
  }
}
