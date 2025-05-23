export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  categoryId: string;
  subCategoryId?: string;
  images: string[]; // Array of image URLs
  stock: number;
  featured?: boolean;
  ratings?: number;
  reviewCount?: number;
  attributes?: {
    [key: string]: string;
  };
  createdAt: number;
  updatedAt: number;
}
