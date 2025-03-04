import { Product } from "../features/products/entities/Product";

type CartItem = {
    product: Product;
    quantity: number;
};

export { type CartItem };