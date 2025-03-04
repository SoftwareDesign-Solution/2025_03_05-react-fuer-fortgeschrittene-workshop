import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../entities/Product";
import { fetchProducts } from "./productsActions";

interface ProductsState {
    products: Product[],
    loading: boolean;
    error: string | unknown;
};

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: ''
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchProducts.rejected, (state, action: PayloadAction<string | unknown>) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[] | unknown>) => {
            state.loading = false;
            state.products = action.payload as Product[];
        });

    },
    selectors: {
        selectError: (state) => state.error,
        selectLoading: (state) => state.loading,
        selectProducts: (state) => state.products,
        selectProductById: (state, productId: number) => state.products.find((product: Product) => product.id === productId)

    }
});

// Selectors exportieren
export const { selectError, selectLoading, selectProducts, selectProductById } = productsSlice.selectors;

export default productsSlice.reducer;