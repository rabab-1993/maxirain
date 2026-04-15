export type Category = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    products?: any[];
    _count?: {
        products: number;
    };
    createdAt?: string;
    updatedAt?: string;
};