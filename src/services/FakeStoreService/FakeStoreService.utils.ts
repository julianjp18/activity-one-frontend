export interface ProductI {
    id: string;
    title: string;
    price: number;
    picture: string;
    description?: string;
    category_id?: string | number;
}

export interface ServiceI {
    data: ProductI[] | null;
    categories?: any;
    statusCode: number;
    error?: string | null;
}