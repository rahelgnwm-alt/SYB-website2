import { Injectable, signal, computed } from '@angular/core';
import { CourierCode, ShippingServiceOption, ShippingZone, ShopifyOrder } from '../models/shipping.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  // Available couriers
  readonly couriers: { code: CourierCode; name: string; appName: string; icon: string; color: string; defaultEta: string }[] = [
    { code: 'J&T', name: 'J&T Express Indonesia', appName: 'J&T Express Official App', icon: '🔴', color: '#ED1C24', defaultEta: '1-3 Hari' },
    { code: 'JNE', name: 'JNE Shipping & Express', appName: 'JNE Shipping Automated Plugin', icon: '🔵', color: '#005BAA', defaultEta: '1-3 Hari' },
    { code: 'SICEPAT', name: 'SiCepat Ekspres', appName: 'SiCepat HALU & Best App', icon: '🔴', color: '#D32F2F', defaultEta: '2-3 Hari' },
    { code: 'GOSEND', name: 'GoSend & Grab Instant', appName: 'Instant On-Demand Delivery', icon: '🟢', color: '#00AA13', defaultEta: '1-3 Jam' }
  ];

  // Indonesian destinations
  readonly shippingDestinations: ShippingZone[] = [
    { province: 'DKI Jakarta', city: 'Jakarta Selatan', baseRateMultiplier: 1.0, jntAvailable: true, jneAvailable: true },
    { province: 'DKI Jakarta', city: 'Jakarta Barat', baseRateMultiplier: 1.0, jntAvailable: true, jneAvailable: true },
    { province: 'Jawa Barat', city: 'Kota Bandung', baseRateMultiplier: 1.1, jntAvailable: true, jneAvailable: true },
    { province: 'Jawa Barat', city: 'Kota Bekasi', baseRateMultiplier: 1.0, jntAvailable: true, jneAvailable: true },
    { province: 'Jawa Timur', city: 'Kota Surabaya (Origin)', baseRateMultiplier: 0.8, jntAvailable: true, jneAvailable: true },
    { province: 'Jawa Timur', city: 'Kota Malang', baseRateMultiplier: 0.9, jntAvailable: true, jneAvailable: true },
    { province: 'Jawa Tengah', city: 'Kota Semarang', baseRateMultiplier: 1.1, jntAvailable: true, jneAvailable: true },
    { province: 'DI Yogyakarta', city: 'Kota Yogyakarta', baseRateMultiplier: 1.1, jntAvailable: true, jneAvailable: true },
    { province: 'Banten', city: 'Tangerang Selatan', baseRateMultiplier: 1.0, jntAvailable: true, jneAvailable: true },
    { province: 'Bali', city: 'Kota Denpasar', baseRateMultiplier: 1.5, jntAvailable: true, jneAvailable: true },
    { province: 'Sumatera Utara', city: 'Kota Medan', baseRateMultiplier: 1.9, jntAvailable: true, jneAvailable: true },
    { province: 'Riau', city: 'Kota Pekanbaru', baseRateMultiplier: 1.8, jntAvailable: true, jneAvailable: true },
    { province: 'Sulawesi Selatan', city: 'Kota Makassar', baseRateMultiplier: 2.1, jntAvailable: true, jneAvailable: true },
    { province: 'Kalimantan Timur', city: 'Kota Balikpapan', baseRateMultiplier: 2.2, jntAvailable: true, jneAvailable: true }
  ];

  // 10 initial orders matching the user's Shopify sidebar "Orders 10"
  private readonly initialOrders: ShopifyOrder[] = [
    {
      id: 'ord-1001',
      orderNumber: '#SYB-10821',
      createdAt: '28 Okt 2026, 09:15',
      customerName: 'Aulia Rahmadani',
      customerEmail: 'aulia.r@gmail.com',
      customerPhone: '081298412933',
      shippingAddress: {
        street: 'Jl. Senopati No. 42',
        city: 'Jakarta Selatan',
        province: 'DKI Jakarta',
        postalCode: '12190'
      },
      items: [
        { productId: 'syb-bibit-whitening-dna-salmon', title: 'SYB Bibit Whitening Body Lotion DNA Salmon', variantName: 'Original Salmon Glow 150ml', quantity: 2, price: 55000, emoji: '🐟' },
        { productId: 'syb-peeling-gel', title: 'NEW SYB Facial Glowing Peeling Gel', variantName: 'Original Glow 100ml', quantity: 1, price: 38000, emoji: '✨' }
      ],
      subtotal: 148000,
      shippingCost: 10000,
      discount: 15000,
      total: 143000,
      paymentStatus: 'Paid',
      fulfillmentStatus: 'Ready to Ship',
      courier: 'J&T',
      serviceName: 'J&T EZ Express',
      trackingNumber: 'JNT9281039841',
      weightGrams: 450
    },
    {
      id: 'ord-1002',
      orderNumber: '#SYB-10820',
      createdAt: '28 Okt 2026, 08:50',
      customerName: 'Bella Saphira',
      customerEmail: 'bella.saph@yahoo.com',
      customerPhone: '085718294821',
      shippingAddress: {
        street: 'Komplek Dago Asri Blok B No. 12',
        city: 'Kota Bandung',
        province: 'Jawa Barat',
        postalCode: '40135'
      },
      items: [
        { productId: 'syb-paket-ritual-malam', title: 'NEW SYB [PAKET RITUAL MALAM 3in1]', variantName: 'Paket Glow Lengkap (3in1)', quantity: 1, price: 119000, emoji: '🌙' },
        { productId: 'syb-keychain-fluffy', title: 'Gantungan Kunci Bulu - bulu Cute Fluffy', variantName: 'Baby Pink Cloud', quantity: 1, price: 15000, emoji: '🎀' }
      ],
      subtotal: 134000,
      shippingCost: 11000,
      discount: 0,
      total: 145000,
      paymentStatus: 'Paid',
      fulfillmentStatus: 'Ready to Ship',
      courier: 'JNE',
      serviceName: 'JNE REG',
      trackingNumber: 'JNE0192840192',
      weightGrams: 550
    },
    {
      id: 'ord-1003',
      orderNumber: '#SYB-10819',
      createdAt: '28 Okt 2026, 08:35',
      customerName: 'Cheryl Natasha',
      customerEmail: 'cheryl.natasha@gmail.com',
      customerPhone: '081394820194',
      shippingAddress: {
        street: 'Jl. Rungkut Asri Timur No. 8',
        city: 'Kota Surabaya (Origin)',
        province: 'Jawa Timur',
        postalCode: '60293'
      },
      items: [
        { productId: 'syb-aha-body-toner-250', title: 'NEW SYB AHA SKINBOOST BODY TONER 250 ML', variantName: 'Jumbo Bottle 250ml', quantity: 2, price: 58000, emoji: '🧪' }
      ],
      subtotal: 116000,
      shippingCost: 8000,
      discount: 10000,
      total: 114000,
      paymentStatus: 'Paid',
      fulfillmentStatus: 'Shipped',
      courier: 'J&T',
      serviceName: 'J&T EZ Express',
      trackingNumber: 'JNT9281039772',
      weightGrams: 600
    },
    {
      id: 'ord-1004',
      orderNumber: '#SYB-10818',
      createdAt: '28 Okt 2026, 08:10',
      customerName: 'Dinda Kirana',
      customerEmail: 'dinda.k@gmail.com',
      customerPhone: '082194820124',
      shippingAddress: {
        street: 'Jl. Sunset Road Gg. Melati No. 5',
        city: 'Kota Denpasar',
        province: 'Bali',
        postalCode: '80361'
      },
      items: [
        { productId: 'syb-spa-exfoliating-gel', title: 'SYB Spa Exfoliating Gel Fruity', variantName: 'Cherry Blossom 300ml', quantity: 1, price: 32000, emoji: '🍓' },
        { productId: 'syb-pomegranate-lotion', title: 'NEW SYB Pomegranate Moist Whitening', variantName: 'Pump Bottle 250ml', quantity: 1, price: 48000, emoji: '🍒' },
        { productId: 'syb-whitening-day-cream', title: 'NEW SYB [WHITENING DAY CREAM]', variantName: 'Pot 30g', quantity: 1, price: 49000, emoji: '☀️' }
      ],
      subtotal: 129000,
      shippingCost: 22000,
      discount: 0,
      total: 151000,
      paymentStatus: 'Paid',
      fulfillmentStatus: 'Shipped',
      courier: 'JNE',
      serviceName: 'JNE YES (Next Day)',
      trackingNumber: 'JNE0192840144',
      weightGrams: 850
    },
    {
      id: 'ord-1005',
      orderNumber: '#SYB-10817',
      createdAt: '28 Okt 2026, 07:45',
      customerName: 'Elvira Cindy',
      customerEmail: 'elvira.cindy@outlook.com',
      customerPhone: '081294820129',
      shippingAddress: {
        street: 'Jl. Kaliurang KM 5.5 No. 19',
        city: 'Kota Yogyakarta',
        province: 'DI Yogyakarta',
        postalCode: '55281'
      },
      items: [
        { productId: 'syb-red-jelly-serum', title: 'NEW SYB FORTE Red Jelly Serum 20ml', variantName: 'Dropper Bottle 20ml', quantity: 2, price: 45000, emoji: '🍓' },
        { productId: 'syb-aloe-vera-gel', title: 'SYB SOOTHING & MOISTURE GEL ALOE VERA', variantName: 'Tub 300ml Big Size', quantity: 1, price: 32000, emoji: '🌿' }
      ],
      subtotal: 122000,
      shippingCost: 12000,
      discount: 0,
      total: 134000,
      paymentStatus: 'Paid',
      fulfillmentStatus: 'Unfulfilled',
      courier: 'J&T',
      serviceName: 'J&T Super',
      trackingNumber: '',
      weightGrams: 420
    },
    {
      id: 'ord-1006',
      orderNumber: '#SYB-10816',
      createdAt: '28 Okt 2026, 06:30',
      customerName: 'Fiona Lestari',
      customerEmail: 'fiona.lestari@gmail.com',
      customerPhone: '081928491823',
      shippingAddress: {
        street: 'Jl. Pahlawan No. 99',
        city: 'Kota Semarang',
        province: 'Jawa Tengah',
        postalCode: '50241'
      },
      items: [
        { productId: 'syb-depilatory-cream', title: '【MINI SIZE 25GR】 SYB Depilatory Cream', variantName: 'Travel Mini 25g', quantity: 3, price: 28000, emoji: '✨' }
      ],
      subtotal: 84000,
      shippingCost: 11000,
      discount: 0,
      total: 95000,
      paymentStatus: 'Paid',
      fulfillmentStatus: 'Unfulfilled',
      courier: 'JNE',
      serviceName: 'JNE REG',
      trackingNumber: '',
      weightGrams: 150
    },
    {
      id: 'ord-1007',
      orderNumber: '#SYB-10815',
      createdAt: '27 Okt 2026, 22:15',
      customerName: 'Gisella Anastasia P.',
      customerEmail: 'gisella.anast@gmail.com',
      customerPhone: '087819283912',
      shippingAddress: {
        street: 'Jl. Gatot Subroto No. 88',
        city: 'Kota Medan',
        province: 'Sumatera Utara',
        postalCode: '20111'
      },
      items: [
        { productId: 'syb-bibit-whitening-dna-salmon', title: 'SYB Bibit Whitening Body Lotion DNA Salmon', variantName: 'Jumbo Size 300ml', quantity: 1, price: 89000, emoji: '🐟' },
        { productId: 'syb-aha-body-toner-100', title: 'NEW SYB AHA Skinboost Body Toner', variantName: '100ml Flash Sale', quantity: 1, price: 42000, emoji: '🍊' }
      ],
      subtotal: 131000,
      shippingCost: 32000,
      discount: 15000,
      total: 148000,
      paymentStatus: 'Paid',
      fulfillmentStatus: 'Delivered',
      courier: 'J&T',
      serviceName: 'J&T EZ Express',
      trackingNumber: 'JNT9281036612',
      weightGrams: 620
    },
    {
      id: 'ord-1008',
      orderNumber: '#SYB-10814',
      createdAt: '27 Okt 2026, 20:40',
      customerName: 'Hanifa Zahra',
      customerEmail: 'hanifa.z@yahoo.com',
      customerPhone: '085291829481',
      shippingAddress: {
        street: 'Jl. Boulevard Bintaro Sektor 7',
        city: 'Tangerang Selatan',
        province: 'Banten',
        postalCode: '15224'
      },
      items: [
        { productId: 'syb-paket-ritual-malam', title: 'NEW SYB [PAKET RITUAL MALAM 3in1]', variantName: 'Paket Glow Lengkap (3in1)', quantity: 2, price: 119000, emoji: '🌙' }
      ],
      subtotal: 238000,
      shippingCost: 0,
      discount: 25000,
      total: 213000,
      paymentStatus: 'Paid',
      fulfillmentStatus: 'Delivered',
      courier: 'J&T',
      serviceName: 'J&T EZ Express (Free Ongkir Promo)',
      trackingNumber: 'JNT9281035541',
      weightGrams: 900
    },
    {
      id: 'ord-1009',
      orderNumber: '#SYB-10813',
      createdAt: '27 Okt 2026, 19:20',
      customerName: 'Indah Permatasari',
      customerEmail: 'indah.permat@gmail.com',
      customerPhone: '081382948192',
      shippingAddress: {
        street: 'Jl. Boulevard Panakkukang Mas No. 15',
        city: 'Kota Makassar',
        province: 'Sulawesi Selatan',
        postalCode: '90222'
      },
      items: [
        { productId: 'syb-keychain-butterfly', title: 'Gantungan Kunci Kupu-Kupu Aesthetic', variantName: 'Aurora Hologram', quantity: 2, price: 15000, emoji: '🦋' },
        { productId: 'syb-peeling-gel', title: 'NEW SYB Facial Glowing Peeling Gel', variantName: 'Peach Bright 100ml', quantity: 1, price: 38000, emoji: '✨' }
      ],
      subtotal: 68000,
      shippingCost: 35000,
      discount: 0,
      total: 103000,
      paymentStatus: 'Pending',
      fulfillmentStatus: 'Unfulfilled',
      courier: 'JNE',
      serviceName: 'JNE REG',
      trackingNumber: '',
      weightGrams: 280
    },
    {
      id: 'ord-1010',
      orderNumber: '#SYB-10812',
      createdAt: '27 Okt 2026, 17:05',
      customerName: 'Jasmine Aurelia',
      customerEmail: 'jasmine.aur@gmail.com',
      customerPhone: '081294819284',
      shippingAddress: {
        street: 'Jl. Cempaka Putih Tengah No. 27',
        city: 'Jakarta Barat',
        province: 'DKI Jakarta',
        postalCode: '10510'
      },
      items: [
        { productId: 'syb-bibit-whitening-dna-salmon', title: 'SYB Bibit Whitening Body Lotion DNA Salmon', variantName: 'Original Salmon Glow 150ml', quantity: 1, price: 55000, emoji: '🐟' },
        { productId: 'syb-whitening-day-cream', title: 'NEW SYB [WHITENING DAY CREAM]', variantName: 'Pot 30g', quantity: 1, price: 49000, emoji: '☀️' }
      ],
      subtotal: 104000,
      shippingCost: 10000,
      discount: 0,
      total: 114000,
      paymentStatus: 'Paid',
      fulfillmentStatus: 'Delivered',
      courier: 'J&T',
      serviceName: 'J&T EZ Express',
      trackingNumber: 'JNT9281034419',
      weightGrams: 380
    }
  ];

  // State
  readonly orders = signal<ShopifyOrder[]>(this.initialOrders);
  readonly selectedCity = signal<string>('Jakarta Selatan');
  readonly selectedWeightKg = signal<number>(1);
  readonly shippingModalOrder = signal<ShopifyOrder | null>(null);

  // Computed
  readonly pendingOrdersCount = computed(() => 
    this.orders().filter(o => o.fulfillmentStatus !== 'Delivered').length
  );

  readonly readyToShipCount = computed(() => 
    this.orders().filter(o => o.fulfillmentStatus === 'Ready to Ship').length
  );

  readonly totalRevenueToday = computed(() => 
    this.orders().reduce((sum, o) => o.paymentStatus === 'Paid' ? sum + o.total : sum, 0)
  );

  // Rate calculator
  getEstimatedRates(city: string, weightKg: number): ShippingServiceOption[] {
    const dest = this.shippingDestinations.find(d => d.city === city) || this.shippingDestinations[0];
    const mult = dest.baseRateMultiplier;
    const kg = Math.max(1, weightKg);

    return [
      {
        id: 'opt-jnt-ez',
        courier: 'J&T',
        serviceName: 'EZ (Regular Standard)',
        courierFullName: 'J&T Express EZ',
        cost: Math.round(11000 * mult * kg),
        etd: '2-3 Hari',
        type: 'Regular',
        badge: 'Paling Populer ⭐',
        trackingPrefix: 'JNT'
      },
      {
        id: 'opt-jnt-super',
        courier: 'J&T',
        serviceName: 'Super (Kilat 24 Jam)',
        courierFullName: 'J&T Express Super',
        cost: Math.round(20000 * mult * kg),
        etd: '1 Hari',
        type: 'Express',
        badge: 'Cepat Tiba ⚡',
        trackingPrefix: 'JNT'
      },
      {
        id: 'opt-jne-reg',
        courier: 'JNE',
        serviceName: 'REG (Reguler)',
        courierFullName: 'JNE Regular Service',
        cost: Math.round(12000 * mult * kg),
        etd: '2-3 Hari',
        type: 'Regular',
        trackingPrefix: 'JNE'
      },
      {
        id: 'opt-jne-yes',
        courier: 'JNE',
        serviceName: 'YES (Yakin Esok Sampai)',
        courierFullName: 'JNE Express YES',
        cost: Math.round(24000 * mult * kg),
        etd: '1 Hari Besok Tiba',
        type: 'Express',
        badge: 'Garansi Uang Kembali 🛡️',
        trackingPrefix: 'JNE'
      },
      {
        id: 'opt-sicepat-halu',
        courier: 'SICEPAT',
        serviceName: 'HALU (Hemat Murah)',
        courierFullName: 'SiCepat HALU',
        cost: Math.round(9000 * mult * kg),
        etd: '3-4 Hari',
        type: 'Economy',
        trackingPrefix: 'SIC'
      }
    ];
  }

  // Fulfill order & generate AWB (airway bill / resi)
  generateAirwayBill(orderId: string): string {
    const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000);
    const order = this.orders().find(o => o.id === orderId);
    const prefix = order?.courier === 'JNE' ? 'JNE' : 'JNT';
    const newAwb = `${prefix}${randomDigits}`;

    this.orders.update(list => 
      list.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            trackingNumber: newAwb,
            fulfillmentStatus: 'Shipped'
          };
        }
        return o;
      })
    );

    return newAwb;
  }

  updateOrderStatus(orderId: string, status: ShopifyOrder['fulfillmentStatus']): void {
    this.orders.update(list => 
      list.map(o => o.id === orderId ? { ...o, fulfillmentStatus: status } : o)
    );
  }

  openShippingModal(order: ShopifyOrder): void {
    this.shippingModalOrder.set(order);
  }

  closeShippingModal(): void {
    this.shippingModalOrder.set(null);
  }
}
