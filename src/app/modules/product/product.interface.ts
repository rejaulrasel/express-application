export type Variant = {
    type: string;
    color: string;
}

export type Inventory = {
    quantity: string;
    inStock: boolean
}

export type Product = {
    name: string;
    description: string;
    price: string;
    category: string;
    tags: string[];
    variants: Variant[];
    inventory: Inventory;
}
