import { Category } from '../../app/models/category.model';

// Store type enum to define different types of stores
export enum StoreType {
  KIRANA = 'kirana',
  APPAREL = 'apparel',
  ELECTRONICS = 'electronics',
  PHARMACY = 'pharmacy',
  GENERAL = 'general'
}

// Extended Category interface with translation keys and SVG content
export interface CategoryWithSVG extends Omit<Category, 'id'> {
  id: string;
  nameKey: string; // Translation key for name
  descriptionKey?: string; // Translation key for description
  svgIcon: string; // Inline SVG content
  storeTypes: StoreType[]; // Which store types this category applies to
  order: number; // For custom ordering
  subcategories?: CategoryWithSVG[]; // For hierarchical structure
}

// Timestamp for created/updated fields
const timestamp = new Date().getTime();

// Kirana (Grocery) Categories
export const KIRANA_CATEGORIES: CategoryWithSVG[] = [
  {
    id: 'staples-grains',
    name: 'Staples & Grains',
    nameKey: 'categories.staplesGrains',
    descriptionKey: 'categories.staplesGrainsDesc',
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <path d="M9 2h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
      <path d="M12 11h.01"/>
      <path d="M12 16h.01"/>
    </svg>`,
    storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
    order: 1,
    createdAt: timestamp,
    updatedAt: timestamp,
    subcategories: [
      {
        id: 'atta-flours',
        name: 'Atta & Flours',
        nameKey: 'categories.attaFlours',
        descriptionKey: 'categories.attaFloursDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <path d="M9 2h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 1,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: 'rice-products',
        name: 'Rice & Rice Products',
        nameKey: 'categories.riceProducts',
        descriptionKey: 'categories.riceProductsDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 16v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/>
          <path d="M22 6l-10.59 10.59a2 2 0 0 1-2.82 0l-4.18-4.18a2 2 0 0 1 0-2.82L14.8 0"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 2,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: 'pulses-lentils',
        name: 'Pulses & Lentils',
        nameKey: 'categories.pulsesLentils',
        descriptionKey: 'categories.pulsesLentilsDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a9 9 0 0 0 9 9 9 9 0 0 0-9 9 9 9 0 0 0-9-9 9 9 0 0 0 9-9z"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 3,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ]
  },
  {
    id: 'packaged-foods',
    name: 'Packaged Foods',
    nameKey: 'categories.packagedFoods',
    descriptionKey: 'categories.packagedFoodsDesc',
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"/>
      <path d="M3 8v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8"/>
      <path d="M10 2v4"/>
      <path d="M14 2v4"/>
    </svg>`,
    storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
    order: 2,
    createdAt: timestamp,
    updatedAt: timestamp,
    subcategories: [
      {
        id: 'biscuits-cookies',
        name: 'Biscuits & Cookies',
        nameKey: 'categories.biscuitsCookies',
        descriptionKey: 'categories.biscuitsCookiesDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 1,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: 'instant-foods',
        name: 'Instant Foods',
        nameKey: 'categories.instantFoods',
        descriptionKey: 'categories.instantFoodsDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 2h8"/>
          <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 2,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: 'namkeen-snacks',
        name: 'Namkeen & Snacks',
        nameKey: 'categories.namkeenSnacks',
        descriptionKey: 'categories.namkeenSnacksDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/>
          <circle cx="12" cy="10" r="3"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 3,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ]
  },
  {
    id: 'dairy-bread',
    name: 'Dairy & Bread',
    nameKey: 'categories.dairyBread',
    descriptionKey: 'categories.dairyBreadDesc',
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <path d="M3 6h18"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>`,
    storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
    order: 2,
    createdAt: timestamp,
    updatedAt: timestamp,
    subcategories: [
      {
        id: 'milk-products',
        name: 'Milk Products',
        nameKey: 'categories.milkProducts',
        descriptionKey: 'categories.milkProductsDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 2h8"/>
          <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 1,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: 'bread-bakery',
        name: 'Bread & Bakery',
        nameKey: 'categories.breadBakery',
        descriptionKey: 'categories.breadBakeryDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 7H5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z"/>
          <path d="M3 7V5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v2"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 2,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ]
  },
  {
    id: 'snacks-beverages',
    name: 'Snacks & Beverages',
    nameKey: 'categories.snacksBeverages',
    descriptionKey: 'categories.snacksBeveragesDesc',
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 2h8"/>
      <path d="M18 8H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z"/>
      <path d="M12 2v6"/>
    </svg>`,
    storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
    order: 3,
    createdAt: timestamp,
    updatedAt: timestamp,
    subcategories: [
      {
        id: 'soft-drinks',
        name: 'Soft Drinks & Juices',
        nameKey: 'categories.softDrinks',
        descriptionKey: 'categories.softDrinksDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 2h8"/>
          <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 1,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: 'tea-coffee',
        name: 'Tea & Coffee',
        nameKey: 'categories.teaCoffee',
        descriptionKey: 'categories.teaCoffeeDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
          <line x1="6" y1="1" x2="6" y2="4"/>
          <line x1="10" y1="1" x2="10" y2="4"/>
          <line x1="14" y1="1" x2="14" y2="4"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 2,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: 'chips-crisps',
        name: 'Chips & Crisps',
        nameKey: 'categories.chipsCrisps',
        descriptionKey: 'categories.chipsCrispsDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/>
          <circle cx="12" cy="10" r="3"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 3,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ]
  },

  {
    id: 'household-items',
    name: 'Household Items',
    nameKey: 'categories.householdItems',
    descriptionKey: 'categories.householdItemsDesc',
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>`,
    storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
    order: 5,
    createdAt: timestamp,
    updatedAt: timestamp,
    subcategories: [
      {
        id: 'cleaning-essentials',
        name: 'Cleaning Essentials',
        nameKey: 'categories.cleaningEssentials',
        descriptionKey: 'categories.cleaningEssentialsDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 22v-3.92a2.98 2.98 0 0 1 .6-1.8C5.5 14.6 7.8 13 10.5 13s5 1.6 6.9 3.28a2.98 2.98 0 0 1 .6 1.8V22"/>
          <path d="M17 22H3"/>
          <path d="M10.5 13V5.5"/>
          <path d="M8 6l2.5-2.5L13 6"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 1,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: 'personal-care',
        name: 'Personal Care',
        nameKey: 'categories.personalCare',
        descriptionKey: 'categories.personalCareDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 2,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: 'pooja-needs',
        name: 'Pooja Needs',
        nameKey: 'categories.poojaNeeds',
        descriptionKey: 'categories.poojaNeedsDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 3,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: 'stationery',
        name: 'Stationery',
        nameKey: 'categories.stationery',
        descriptionKey: 'categories.stationeryDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"/>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
          <path d="M2 2l7.586 7.586"/>
          <circle cx="11" cy="11" r="2"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 4,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ]
  },
  {
    id: 'cooking-essentials',
    name: 'Cooking Essentials',
    nameKey: 'categories.cookingEssentials',
    descriptionKey: 'categories.cookingEssentialsDesc',
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2"/>
      <path d="M8 9h8"/>
      <path d="M20 18c0 1-1 2-2 2H6c-1 0-2-1-2-2V8c0-1 1-2 2-2h12c1 0 2 1 2 2v10Z"/>
    </svg>`,
    storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
    order: 6,
    createdAt: timestamp,
    updatedAt: timestamp,
    subcategories: [
      {
        id: 'oils-ghee',
        name: 'Oils & Ghee',
        nameKey: 'categories.oilsGhee',
        descriptionKey: 'categories.oilsGheeDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 2h8"/>
          <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 1,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: 'spices-masalas',
        name: 'Spices & Masalas',
        nameKey: 'categories.spicesMasalas',
        descriptionKey: 'categories.spicesMasalasDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/>
          <path d="M5 8h14"/>
          <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
          <path d="M12 12v6"/>
          <path d="M9 15h6"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 2,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: 'sauces-pickles',
        name: 'Sauces & Pickles',
        nameKey: 'categories.saucesPickles',
        descriptionKey: 'categories.saucesPicklesDesc',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/>
          <path d="M5 8h14"/>
          <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
        </svg>`,
        storeTypes: [StoreType.KIRANA, StoreType.GENERAL],
        order: 3,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ]
  }
];

// Apparel Categories
export const APPAREL_CATEGORIES: CategoryWithSVG[] = [
  {
    id: 'mens-clothing',
    name: 'Men\'s Clothing',
    nameKey: 'categories.mensClothing',
    descriptionKey: 'categories.mensClothingDesc',
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
    </svg>`,
    storeTypes: [StoreType.APPAREL],
    order: 1,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'womens-clothing',
    name: 'Women\'s Clothing',
    nameKey: 'categories.womensClothing',
    descriptionKey: 'categories.womensClothingDesc',
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 2H8l-4 6h3.5l-3 10h4l2-8h1l2 8h4l-3-10H16l-4-6z"/>
    </svg>`,
    storeTypes: [StoreType.APPAREL],
    order: 2,
    createdAt: timestamp,
    updatedAt: timestamp
  }
];

// Electronics Categories
export const ELECTRONICS_CATEGORIES: CategoryWithSVG[] = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    nameKey: 'categories.smartphones',
    descriptionKey: 'categories.smartphonesDesc',
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12" y2="18"/>
    </svg>`,
    storeTypes: [StoreType.ELECTRONICS],
    order: 1,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'laptops',
    name: 'Laptops',
    nameKey: 'categories.laptops',
    descriptionKey: 'categories.laptopsDesc',
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="2" y1="20" x2="22" y2="20"/>
    </svg>`,
    storeTypes: [StoreType.ELECTRONICS],
    order: 2,
    createdAt: timestamp,
    updatedAt: timestamp
  }
];

// Get categories based on store type
export function getCategoriesByStoreType(storeType: StoreType): CategoryWithSVG[] {
  let categories: CategoryWithSVG[] = [];
  
  switch(storeType) {
    case StoreType.KIRANA:
      categories = KIRANA_CATEGORIES;
      break;
    case StoreType.APPAREL:
      categories = APPAREL_CATEGORIES;
      break;
    case StoreType.ELECTRONICS:
      categories = ELECTRONICS_CATEGORIES;
      break;
    case StoreType.GENERAL:
      // For general store, combine categories from multiple types
      categories = [
        ...KIRANA_CATEGORIES.filter(cat => cat.storeTypes.includes(StoreType.GENERAL)),
        ...APPAREL_CATEGORIES.filter(cat => cat.storeTypes.includes(StoreType.GENERAL)),
        ...ELECTRONICS_CATEGORIES.filter(cat => cat.storeTypes.includes(StoreType.GENERAL))
      ];
      break;
    default:
      categories = KIRANA_CATEGORIES; // Default to Kirana
  }
  
  // Sort by order field
  return categories.sort((a, b) => a.order - b.order);
}

// Flatten categories to get all categories and subcategories in a single array
export function getAllCategories(storeType: StoreType): CategoryWithSVG[] {
  const categories = getCategoriesByStoreType(storeType);
  const allCategories: CategoryWithSVG[] = [];
  
  // Helper function to flatten the category hierarchy
  function flattenCategories(cats: CategoryWithSVG[]) {
    cats.forEach(cat => {
      // Add the main category
      allCategories.push(cat);
      
      // Add subcategories if they exist
      if (cat.subcategories && cat.subcategories.length > 0) {
        flattenCategories(cat.subcategories);
      }
    });
  }
  
  flattenCategories(categories);
  return allCategories;
}
