export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isVisible?: boolean;
  categoryId: number;
  createdAt?: string;
  updatedAt?: string;
  category?: {
    id: number;
    name: string;
  };
};

export type ProductFormState = {
    name: string;
    price: string;
    description: string;
    categoryId: string;
    isVisible: boolean;
    image: File | null;
}

export type ProductFormErrors = {
    name?: string;
    price?: string;
    description?: string;
    categoryId?: string;
    image?: string;
    submit?: string;
}