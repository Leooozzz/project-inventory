export type Product = {
  id: string;
  name: string;
  categoryId: string;
  unitPrice: number;
  unitType: string;
  quantity: string;
  minimumQuantity: string;
  maximumQuantity: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}