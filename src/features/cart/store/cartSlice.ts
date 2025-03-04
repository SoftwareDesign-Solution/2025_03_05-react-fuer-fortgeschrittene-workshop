import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type CartItem } from "../entities/CartItem";
import { Product } from "@/features/products";

interface CartState {
    cartItems: CartItem[]
};

export const initialState: CartState = {
    cartItems: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {

            const cartItem = state.cartItems.find(item => item.product.id === action.payload.id) || null;

            if (!cartItem) {
                state.cartItems = [ ...state.cartItems, { product: action.payload, quantity: 1 }];
            }
            else
            {
                state.cartItems = state.cartItems.map(item => 
                    item.product.id === action.payload.id
                    ? { ...item, quantity: item.quantity + 1}
                    : item
                );
            }

        },
        removeFromCart: (state, action: PayloadAction<Product>) => {

            const cartItem = state.cartItems.find(item => item.product.id === action.payload.id) || null;
            
            if (cartItem && cartItem.quantity > 1) {
                state.cartItems = state.cartItems.map(item => 
                    item.product.id === action.payload.id
                    ? { ...item, quantity: item.quantity - 1}
                    : item
                );
            }
            else
            {
                state.cartItems = state.cartItems.filter(item => item.product.id !== action.payload.id);
            }

        }
    },
    selectors: {
        selectCartItemByProduct: (state, product: Product) => state.cartItems.find(item => item.product.id === product.id),
        selectCartItems: (state) => state.cartItems,
        selectCartItemCount: (state) => state.cartItems.reduce((total, item) => total + item.quantity, 0)
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const { selectCartItemByProduct, selectCartItemCount, selectCartItems } = cartSlice.selectors;

export default cartSlice.reducer;