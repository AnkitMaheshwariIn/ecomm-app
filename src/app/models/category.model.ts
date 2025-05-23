export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  parentId?: string; // For subcategories
  createdAt: number;
  updatedAt: number;
}
