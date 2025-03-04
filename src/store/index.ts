import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authReducer } from '@/features/auth';
import { cartReducer } from '@/features/cart';
import { productsReducer } from '@/features/products';
import { CookieUtils } from "@/utils/CookieUtils";

const loadState = (sliceName: string) => {
    try {
      const serializedState = localStorage.getItem(sliceName);
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
      console.error(`Fehler beim Laden des Zustands für ${sliceName}`, err);
      return undefined;
    }
};

const loadCookie = (sliceName: string) => {
    try {
        
      const serializedState = CookieUtils.get(sliceName);
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
      console.error(`Fehler beim Laden des Zustands für ${sliceName}`, err);
      return undefined;
    }
};

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        products: productsReducer
    },
    preloadedState: {
        auth: loadCookie('auth-store'),
        cart: loadState('cart-store'),
        products: loadState('products-store')
    },
});

store.subscribe(() => {

    const state = store.getState();

    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // Ablaufdatum in 7 Tagen

    const cookieOptions = {
        expires: expires
    };
    
    CookieUtils.set('auth-store', state.auth, cookieOptions);
    
    localStorage.setItem('cart-store', JSON.stringify(state.cart));
    localStorage.setItem('products-store', JSON.stringify(state.products));

});

// Wird für TypeScript benötigt
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export { store };