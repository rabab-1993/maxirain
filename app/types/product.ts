export type Product = {
    id: number;
    name: string;
    price: number;
    description?: string;
    isVisible?: boolean;
    imageUrl?: string;
    categoryId?: number;
    createdAt?: string;
}

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