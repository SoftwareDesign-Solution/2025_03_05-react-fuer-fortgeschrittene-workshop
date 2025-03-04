- [4. Redux Toolkit](#4-redux-toolkit)
  - [4.1 Store anlegen](#41-store-anlegen)
  - [4.2 AuthReducer erstellen](#42-authreducer-erstellen)
  - [4.3 CartReducer erstellen](#43-cartreducer-erstellen)
  - [4.4 ProductReducer erstellen](#44-productreducer-erstellen)
  - [4.5 Actions & Selectors in der Anwendung nutzen](#45-actions--selectors-in-der-anwendung-nutzen)
  - [4.6 Store in localStorage & Cookies speichern](#46-store-in-localstorage--cookies-speichern)

Bearbeitungszeit: 60 Minuten

The solution branch for the whole lab is `solution-4-redux-toolkit`

# 4. Redux Toolkit

Redux Toolkit bietet eine effizientere und weniger fehleranfällige Möglichkeit, einen Redux Store zu erstellen und zu verwalten. In dieser Aufgabe werden wir schrittweise einen Store mit verschiedenen Reducern aufbauen und ihn in unsere Anwendung integrieren.

## 4.1 Store anlegen

Um mit Redux Toolkit zu arbeiten, muss zuerst der Store erstellt werden. Installieren Sie dazu Redux Toolkit und React-Redux mit folgendem Befehl:

```bash
npm install @reduxjs/toolkit react-redux
```

Erstellen Sie anschließend eine Datei `store.ts` im `src`-Verzeichnis und initialisieren Sie den Store mit configureStore aus Redux Toolkit. Der Store sollte zudem die Typen `RootState` und `AppDispatch` exportieren, damit der Zustand und die Dispatch-Funktion in der gesamten Anwendung korrekt genutzt werden können. Abschließend binden Sie den Store in `main.tsx` mit `Provider` ein.

**Hinweise:**

- `configureStore` vereinfacht die Erstellung eines Redux Stores und ermöglicht direkt die Nutzung von `redux-thunk`.
- Der Store benötigt mindestens einen Reducer. Dieser wird später hinzugefügt.

<details>
<summary>Show solution</summary>
<p>

**/src/store/index.ts**

```typescript
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {}
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
```

**/src/main.tsx**

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

// React Routing
import { createBrowserRouter, RouterProvider} from 'react-router';
import { routes } from './routes';

// Redux Store
import { Provider } from 'react-redux'
import { store } from './store'


const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
```

</p>
</details>

## 4.2 AuthReducer erstellen

Die Benutzerverwaltung (`AuthReducer`) soll mithilfe von Redux Toolkit umgesetzt werden. Die Authentifizierung erfolgt über API-Aufrufe für Login und Registrierung. Der Zustand der Authentifizierung soll im Redux-Store gespeichert werden. Implementieren Sie dazu die folgenden Schritte:

**Aufgabe:**

1. Erstellen Sie eine neue Datei `authSlice.ts` im `src/features/auth/store`-Verzeichnis.
2. Erstellen Sie eine neue Datei `authActions.ts` im selben Verzeichnis und implementieren Sie die Funktionen `loginUser` und `registerUser` mit `createAsyncThunk`.
   - `loginUser`: Sendet eine Anfrage mit E-Mail und Passwort an die API und speichert bei Erfolg das accessToken sowie die Benutzerdaten im Redux-Store.
   - `registerUser`: Sendet eine Anfrage mit den Benutzerdaten an die API und gibt bei Erfolg eine Erfolgsmeldung zurück.
3. Verwenden Sie `createSlice`, um den auth-Slice zu definieren. Der initiale Zustand enthält:
   - `user`: Das eingeloggte Benutzerobjekt (`null`, falls nicht eingeloggt).
   - `authenticated`: Ein boolean, das angibt, ob der Benutzer eingeloggt ist.
   - `token`: Das Access-Token (`null`, falls nicht vorhanden).
   - `error`: Eine potenzielle Fehlermeldung.
   - `success`: Ein boolean, das den Erfolg der Operation angibt.
4. Integrieren Sie `loginUser` und `registerUser` als asynchrone Aktionen im `authSlice.ts`:
   - `loginUser.fulfilled`: Setzt `authenticated` auf `true`, speichert das `accessToken` und die Benutzerdaten.
   - `loginUser.rejected`: Speichert eine Fehlermeldung in `error`.
   - `registerUser.fulfilled`: Setzt `success` auf `true`, gibt aber keine Benutzerinformationen zurück.
   - `registerUser.rejected`: Speichert eine Fehlermeldung in `error`.
5. Implementieren Sie eine `logoutUser`-Funktion, die den Zustand zurücksetzt.
6. Erstellen Sie Selektoren für die Abfrage des Authentifizierungsstatus:
   - `selectAuthenticated`: Gibt zurück, ob der Benutzer eingeloggt ist.
   - `selectToken`: Gibt das gespeicherte accessToken zurück.
   - `selectUser`: Gibt die Benutzerdaten zurück.
7. Exportieren Sie die `logoutUser`-Action sowie die Selektoren (`selectAuthenticated`, `selectToken`, `selectUser`).
8. Machen Sie den `auth`-Store über die `index.ts` in features/auth öffentlich verfügbar.
9. Registrieren Sie den `authReducer` unter `auth` in `store.ts`.

**Hinweise:**

- Nutzen Sie `extraReducers`, um den Zustand anhand der `loginUser`- und `registerUser`-Thunks zu aktualisieren.
- Falls die API-Anfrage fehlschlägt, sollte eine sinnvolle Fehlermeldung gespeichert werden.
- Authentifizierungsdaten sollten nicht dauerhaft in `localStorage` gespeichert werden, sondern in Cookies.

<details>
<summary>Show solution</summary>
<p>

**/src/features/auth/store/authActions.ts**

```typescript
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { User } from "../entities/User";

const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string, password: string}, { rejectWithValue }) => {

        try {

            const { data } = await axios.post("http://localhost:3001/login", {
                email: email,
                password: password,
            });

            return data;

        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message);
                } else {
                    return rejectWithValue(error.message);
                }
            }
        }

    }
);

const registerUser = createAsyncThunk(
    'auth/register',
    async (user: Omit<User, 'id'>, { rejectWithValue}) => {

        try {

            await axios.post("http://localhost:3001/register", user);

        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message);
                } else {
                    return rejectWithValue(error.message);
                }
            }
        }

    }
);

export { loginUser, registerUser };
```

**/src/features/auth/store/authSlice.ts**

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../entities/User";
import { loginUser, registerUser } from "./authActions";

interface AuthState {
    user: User | null;
    authenticated: boolean;
    token: string | null;
    error: unknown,
    success: boolean
};

const initialState: AuthState = {
    user: null,
    authenticated: false,
    token: null,
    error: null,
    success: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.authenticated = false;
            state.token = null;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<{ accessToken: string, user: User }>) => {
            state.authenticated = true;
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
            state.success = true;
        });

        builder.addCase(loginUser.rejected, (state, action: PayloadAction<string | unknown>) => {
            state.success = true;
            state.error = action.payload;
        });

        builder.addCase(registerUser.fulfilled, (state) => {
            state.success = true;
        });

        builder.addCase(registerUser.rejected, (state, action: PayloadAction<string | unknown>) => {
            state.success = true;
            state.error = action.payload;
        });

    },
    selectors: {
        selectAuthenticated: (state) => state.authenticated,
        selectToken: (state) => state.token,
        selectUser: (state) => state.user,
    }
});

export const { logoutUser } = authSlice.actions;

export const { selectAuthenticated, selectToken, selectUser } = authSlice.selectors;

export default authSlice.reducer;
```

**/src/features/auth/index.ts**

```typescript
// Store
export * from './store/authActions';
export * from './store/authSlice';
export { default as authReducer } from './store/authSlice';
```

**/src/store/index.ts**

```typescript
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authReducer } from '@/features/auth';

const store = configureStore({
    reducer: {
        auth: authReducer
    }
});
```

</p>
</details>

## 4.3 CartReducer erstellen

Der Warenkorb (`CartReducer`) soll mithilfe von Redux Toolkit umgesetzt werden. Dabei soll es möglich sein, Produkte zum Warenkorb hinzuzufügen, zu entfernen und den aktuellen Warenkorbinhalt abzufragen. Implementieren Sie dazu die folgenden Schritte:

**Aufgabe**:

1. Erstellen Sie eine neue Datei `cartSlice.ts` im `src/features/cart`-Verzeichnis.
2. Verwenden Sie `createSlice`, um den `cart`-Slice zu definieren. Der initiale Zustand enthält ein leeres `cartItems`-Array.
3. Implementieren Sie die `addToCart`- und `removeFromCart`-Reducer:
   - `addToCart`: Falls das Produkt noch nicht im Warenkorb ist, soll es mit einer Menge von `1` hinzugefügt werden. Falls es bereits vorhanden ist, soll die Menge erhöht werden.
   - `removeFromCart`: Falls das Produkt mehrfach vorhanden ist, soll die Menge reduziert werden. Falls nur noch ein Exemplar existiert, soll es entfernt werden.
4. Erstellen Sie Selektoren für die Abfrage des Warenkorbs:
   - `selectCartItemByProduct`: Gibt das `CartItem` für ein bestimmtes Produkt zurück.
   - `selectCartItems`: Gibt alle `CartItems` im Warenkorb zurück.
   - `selectCartItemCount`: Gibt die Gesamtanzahl aller Artikel im Warenkorb zurück.
5. Exportieren Sie die Actions (`addToCart`, `removeFromCart`) sowie die Selektoren (`selectCartItemByProduct`, `selectCartItems`, `selectCartItemCount`).
6. Registrieren Sie den `cartReducer` unter `cart` in `store.ts`.

**Hinweise:**

- Nutzen Sie `find()` und `map()`, um bestehende Produkte im Warenkorb zu finden und Mengen anzupassen.

<details>
<summary>Show solution</summary>
<p>

**/src/features/cart/store/cartSlice.ts**

```typescript
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
```

**/src/features/cart/index.ts**

```typescript
// Store
export * from './store/cartSlice';
export { default as cartReducer } from './store/cartSlice';
```

**/src/store/index.ts**

```typescript
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authReducer } from '@/features/auth';
import { cartReducer } from '@/features/cart';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    }
});
```

</p>
</details>

## 4.4 ProductReducer erstellen

Die Produktverwaltung (`ProductsReducer`) soll mithilfe von Redux Toolkit umgesetzt werden. Die Produktliste soll aus einer API geladen und im Redux-Store gespeichert werden. Implementieren Sie dazu die folgenden Schritte:

**Aufgabe:**

1. Erstellen Sie eine neue Datei `productsSlice.ts` im `src/features/products`-Verzeichnis.
2. Verwenden Sie `createSlice`, um den `products`-Slice zu definieren. Der initiale Zustand enthält ein leeres `products`-Array sowie `loading`- und `error`-Zustände.
3. Erstellen Sie eine neue Datei `productsActions.ts` im selben Verzeichnis und implementieren Sie die Funktionen `fetchProducts` mit `createAsyncThunk`, um die Produktliste aus einer API zu laden:
   - Während die Daten geladen werden (`pending`), soll `loading` auf `true` gesetzt werden.
   - Falls der Abruf fehlschlägt (`rejected`), soll `loading` auf `false` und `error` entsprechend gesetzt werden.
   - Falls der Abruf erfolgreich ist (`fulfilled`), soll `loading` auf `false` gesetzt und die `products`-Liste aktualisiert werden.
   - Falls die URL <http://localhost:3001/660/products> genutzt wird, muss die API-Anfrage mit einem Authorization-Header versehen werden. Dazu wird der `token` aus dem `auth`-Store über `getState` abgefragt und als Bearer-Token in den Header eingefügt.
4. Erstellen Sie Selektoren für die Abfrage der Produktliste:
   - `selectProducts`: Gibt die aktuelle Liste der Produkte zurück.
   - `selectLoading`: Gibt den Ladezustand (`true` oder `false`) zurück.
   - `selectError`: Gibt eine etwaige Fehlermeldung zurück.
   - `selectProductById`: Gibt ein Produkt anhand seiner ID zurück.
5. Exportieren Sie die Selektoren (`selectProducts`, `selectLoading`, `selectError`, `selectProductById`).
6. Registrieren Sie den `productsReducer` unter `products` in `store.ts`.

**Hinweise:**

- Nutzen Sie `extraReducers`, um den Zustand anhand des `fetchProducts`-Thunks zu aktualisieren.
- Falls die API-Anfrage fehlschlägt, sollte eine sinnvolle Fehlermeldung gespeichert werden.
- Die Daten sollten im Redux-Store gehalten werden, um unnötige API-Aufrufe zu vermeiden.

<details>
<summary>Show solution</summary>
<p>

**/src/features/products/store/productsActions.ts**

```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError} from 'axios';
import { Product } from '../entities/Product';

const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (_, { rejectWithValue }) => {

        const state = getState() as RootState;
        const { token } = state.auth;
        
        try {
            const response = await axios.get<Product[]>('http://localhost:3001/products', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const products = response.data;
            return products;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message);
                } else {
                    return rejectWithValue(error.message);
                }
            }
        }
    }
);

export {
    fetchProducts
};
```

**/src/store/products/productsSlice.ts**

```typescript
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
```

**/src/features/products/index.ts**

```typescript
// Store
export * from './store/productsActions';
export * from './store/productsSlice';
export { default as productsReducer } from './store/productsSlice';
```

**/src/store/index.ts**

```typescript
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authReducer } from '../features/auth';
import { cartReducer } from '../features/cart';
import { productsReducer } from '../features/products';

const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      products: productsReducer
    }
});
```

</p>
</details>

## 4.5 Actions & Selectors in der Anwendung nutzen

Nachdem die Redux-Reducer und Actions definiert wurden, müssen diese nun in der Anwendung integriert werden. Die folgenden Komponenten sollen die jeweiligen Actions und Selektoren verwenden:

**Aufgabe:**

1. RegisterPage.tsx
   - Implementieren Sie ein Formular, das nach dem Absenden die `registerUser(data)`-Action dispatcht, um eine neue Registrierung auszuführen.
2. LoginPage.tsx
   - Implementieren Sie ein Formular, das nach dem Absenden die `loginUser(data)`-Action dispatcht, um die Anmeldung durchzuführen.
3. ProductsPage.tsx
   - Nutzen Sie `useDispatch`, um `fetchProducts()` beim Laden der Seite zu dispatchen.
   - Verwenden Sie `useSelector`, um den Fehlerstatus (`selectError`), den Ladezustand (`selectLoading`) und die Produktliste (`selectProducts`) aus dem Store abzurufen.
4. ProductDetailsPage.tsx
   - Nutzen Sie `useParams`, um die `productid` aus der URL auszulesen.
   - Verwenden Sie `useSelector`, um das entsprechende Produkt über `selectProductById` aus dem Store zu laden.
   - Zeigen Sie die Produktdetails an.
5. QuantitySelector.tsx
   - Nutzen Sie `useDispatch`, um `addToCart` und `removeFromCart` zu dispatchen.
   - Verwenden Sie `useSelector`, um das jeweilige Produkt im Warenkorb über `selectCartItemByProduct` abzurufen.
6. NavBar.tsx
   - Nutzen Sie `useSelector`, um die Anzahl der Artikel im Warenkorb (`selectCartItemCount`) anzuzeigen.
   - Nutzen Sie `useSelector`, um den Authentifizierungsstatus (`selectAuthenticated`) aus dem Store abzurufen.
   - Falls `authenticated` auf `true` steht, soll in der Navbar anstelle von "Log in" der Text "Log out" angezeigt werden.
   - Bei Klick auf "Log out" soll die `logoutUser`-Action aus dem `auth`-Store dispatcht oder der Benutzer zur Login-Seite (`/login`) weitergeleitet werden.
7. ProtectedRoute.tsx
   - Nutzen Sie `useSelector`, um `selectToken` und `selectAuthenticated` aus dem Store abzurufen.
   - Falls beide Werte `null` bzw. `false` sind, soll `<Navigate to={'/login'} />` ausgeführt werden, um nicht authentifizierte Nutzer zur Login-Seite weiterzuleiten.

**Hinweise**:

- Nutzen Sie `useDispatch` aus `react-redux`, um Actions zu dispatchen.
- Wenn man TypeScript verwendet, erscheint bei der Verwendung von `dispatch` ein Type-Fehler. `dispatch` wird mit `const dispatch = useDispatch()` erstellt. Hier sollte man stattdessen `const dispatch: AppDispatch = useDispatch()` verwenden, um den korrekten Typ zu setzen.
- Nutzen Sie `useSelector`, um Daten aus dem Redux-Store zu beziehen.
- Achten Sie darauf, dass die abgerufenen Daten korrekt in den jeweiligen Komponenten verwendet werden.

Nachdem wir die Reducer von Redux auf Redux Toolkit umgestellt haben, müssen wir deren Verwendung noch in den Komponenten `QuantitySelector`, `Login`, `Register` & `Products` anpassen. In Aufgabe 3.5 haben wir eine geschützte Route erstellt, die nur nach erfolgreicher Authentifizierung aufrufbar ist. Die Authentifizierung wurde durch AuthContext durchgeführt. Dies soll nun mit Hilfe des Selektor `getAccessToken` durchgeführt werden.

<details>
<summary>Show solution</summary>
<p>

**/src/features/auth/pages/registerpage/RegisterPage.tsx**

```typescript
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { registerUser } from "../../store/authActions";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string
};

const RegisterPage = () => {

    const dispatch: AppDispatch = useDispatch();

    const onSubmit = async (data: FormData) => {
        
        console.log(data);

        await dispatch(registerUser(data));

        reset();

    };

};

export { RegisterPage };
```

**/src/features/auth/pages/loginpage/LoginPage.tsx**

```typescript
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { loginUser } from "../../store/authActions";

type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {

    const dispatch: AppDispatch = useDispatch();

    const onSubmit = async (data: FormData) => {
        
        console.log(data);

        await dispatch(loginUser(data));

        reset();

    };

};

export { LoginPage };
```

**/src/features/products/pages/productspage/ProductsPage.tsx**

```typescript
import { useEffect, useMemo } from "react";
import { Link, Outlet, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../entities/Product";
import { StyledBadge } from "@/components/styledbadge/StyledBadge";
import { QuantitySelector } from "@/features/cart";
import { AppDispatch } from "@/store";
import { fetchProducts } from "../../store/productsActions";
import { selectError, selectLoading, selectProducts } from "../../store/productsSlice";

const ProductsPage = () => {

    const dispatch: AppDispatch = useDispatch();

    const error = useSelector(getError);
    const loading = useSelector(getLoading);
    const products = useSelector(getProducts);

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedType = searchParams.get('type');
    
    const filteredProducts = useMemo(() => {
        return selectedType ? products.filter((p: Product) => p.type === selectedType) : products;
      }, [products, selectedType]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    
    const handleTypeClick = (type?: string) => {
        setSearchParams(type ? { type } : {}); // Leere Parameter setzen, um den Filter zu entfernen
    };

    return (
        <>
            <h1>Products</h1>
            <div className="grid grid-cols-2">
                <div>

                    {/* ... */}
                    
                    {loading && (<div className="pt-10">
                        Produkte werden geladen...
                    </div>)}

                    {error && (<div className="pt-10 text-red-600">
                        {error}
                    </div>)}

                    {/* ... */}

                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    )
};

export { ProductsPage };
```

**/src/features/products/pages/productdetailspage/ProductDetailsPage.tsx**

```typescript
import { useSelector } from "react-redux";
import { selectProductById } from "../../store/productsSlice";
import { RootState } from "@/store";

const ProductDetailsPage = () => {

    const { productId } = useParams();

    const product = useSelector((state: RootState) => selectProductById(state, Number(productId)))

};
```

**/src/features/cart/components/quantityselector/QuantitySelector.tsx**

```typescript
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../entities/Product";
import { AppDispatch, RootState } from "@/store";
import { Button } from "@/components/button/Button";
import { addToCart, removeFromCart, selectCartItemByProduct } from "../../store/cartSlice";

const QuantitySelector = ({ product }: { product: Product}) => {
    
    const dispatch: AppDispatch = useDispatch();

    const cartItem = useSelector((state: RootState) => selectCartItemByProduct(state, product));

    if (!cartItem)
        return (
            <Button 
                type="button" 
                className="addtocart"
                onClick={() => dispatch(addToCart(product))}
            >
                Add to Cart
            </Button>
        )

    return (
        <div className="flex gap-3">
			<Button 
                type="button" 
                className="decrease"
                onClick={() => dispatch(removeFromCart(product))}
            >
                -
            </Button>
			<input 
                type="text" 
                className="quantity block w-12 text-center rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={cartItem.quantity}
            />
			<Button 
                type="button" 
                className="increase"
                onClick={() => dispatch(addToCart(product))}
            >
                +
            </Button>
		</div>
    );
};

export { QuantitySelector };
```

**/src/components/navbar/NavBar.tsx**

```typescript
import { Link, useNavigate } from "react-router";
import { Button } from "../button/Button";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "@/features/cart";

const NavBar = () => {

    const navigate = useNavigate();

    const itemcount = useSelector(selectCartItemCount);

    return (
        <nav className="flex justify-between p-4 border-b-2 border-gray-300">
            
            {/* ... */}
            
            <div className="flex gap-2 justify-center">
                
                {/* ... */}
                
                <Button id="nav-login" onClick={handleLogin}>
                    {authenticated ? 'Log out' : 'Log in'}
                </Button>

            </div>
        </nav>
    );

};
```

**/src/components/protectedroute/ProtectedRoute.tsx**

```typescript
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectAuthenticated, selectToken } from "@/features/auth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    
    const authenticated = useSelector(selectAuthenticated);
    const token = useSelector(selectToken);

    if ((!authenticated) || (!token)) {
        return <Navigate to={'/login'} />;
    }

    return children;
};

export { ProtectedRoute };
```

</p>
</details>

## 4.6 Store in localStorage & Cookies speichern

Beim Start der Anwendung wird der vorherige Zustand aus `localStorage` geladen und als `preloadedState` in `configureStore` übergeben. Änderungen am Store sollten über `store.subscribe` überwacht werden, um relevante Teile des Zustands automatisch in `localStorage` zu speichern. Achten Sie darauf, dass nur nicht-sensitive Daten gespeichert werden. Der `auth-store` sollte aus Sicherheitsgründen in einem Cookie gespeichert werden.

**Hinweis:**

Die in dieser Aufgabe erstellten reducer sollen nach folgendem Schema gespeichert werden

- auth = auth-store
- cart = cart-store
- products = products-store

Nutzen Sie zum laden & speichern die nachfolgenden Hilfsfunktionen

```typescript
const loadState = (sliceName: string) => {
    try {
      const serializedState = localStorage.getItem(sliceName);
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
      console.error(`Fehler beim Laden des Zustands für ${sliceName}`, err);
      return undefined;
    }
};

localStorage.setItem('cart-store', JSON.stringify({}));

const loadCookie = (sliceName: string) => {
    try {
        
      const serializedState = CookieUtils.get(sliceName);
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
      console.error(`Fehler beim Laden des Zustands für ${sliceName}`, err);
      return undefined;
    }
};

const expires = new Date();
expires.setDate(expires.getDate() + 7); // Ablaufdatum in 7 Tagen

const cookieOptions = {
    expires: expires
};

CookieUtils.set('auth-store', {}, cookieOptions);
```

<details>
<summary>Show solution</summary>
<p>

**/src/store/index.ts**

```typescript
const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        products: productsReducer,
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

```

</p>
</details>
