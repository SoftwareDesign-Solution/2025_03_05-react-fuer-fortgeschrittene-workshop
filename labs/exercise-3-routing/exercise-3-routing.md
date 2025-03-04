- [3. Routing](#3-routing)
  - [3.1 Routen definieren](#31-routen-definieren)
  - [3.2 Erweitern Sie die `NavBar.tsx` um die Routen](#32-erweitern-sie-die-navbartsx-um-die-routen)
  - [3.3 Artikel filtern mit URL-Suchparameter](#33-artikel-filtern-mit-url-suchparameter)
  - [3.4 Produktdetails laden](#34-produktdetails-laden)
  - [3.5 Geschützte Route mit ProtectedRoute](#35-geschützte-route-mit-protectedroute)
  - [3.6 404 Route](#36-404-route)

Bearbeitungszeit: 30 Minuten

The solution branch for the whole lab is `solution-3-routing`

# 3. Routing

Wir verwenden in dem Schulungsprojekt json-server mit der Middleware json-server-auth. json-server wird mit Hilfe des NPM-Pakets concurrently parallel zur React App gestartet.

## 3.1 Routen definieren

Um eine einheitliche Routing-Struktur innerhalb der features-Verzeichnisse zu ermöglichen, sollen die Authentifizierungs- und Produktseiten eigene Routing-Konfigurationen erhalten.

**Aufgabe:**

1. Features Folder Structure anpassen
   - Erstellen Sie in `features/auth` eine eigene Routing-Konfiguration für `login` und `register`.
   - Machen Sie diese Konfiguration über die `index.ts` in features/auth öffentlich verfügbar.
   - Erstellen Sie in `features/products` eine eigene Routing-Konfiguration für `products`.
   - Machen Sie diese Konfiguration über die `index.ts` in `features/products` öffentlich verfügbar.
2. Routen definieren
   - Erstellen Sie im Verzeichnis `routes` die Konfiguration nach der Variante 4.
   - Die Routen sollen als Nested Routes angelegt werden, dabei soll `<App />` als Layout-Komponente dienen.
   - Erweitern Sie danach die `main.tsx` um den `RouterProvider`.
   - In der `App.tsx` soll anstatt des Grid Containers die Routenansicht mit `<Outlet />` angezeigt werden.
3. Folgende Routen sollen definiert werden:
   - `/login`
   - `/register`
   - `/products`

**Hinweise:**

- Nutzen Sie `createRoutesFromElements` und `RouterProvider`, um die Routen zu definieren.
- Stellen Sie sicher, dass `features/auth` und `features/products` ihre Routing-Konfigurationen sauber exportieren, sodass sie in `routes/index.tsx` eingebunden werden können.

<details>
<summary>Show Solution</summary>
<p>

**/src/features/auth/routes/index.tsx**

```typescript
import { RouteObject } from "react-router";
import { LoginPage } from "../pages/loginpage/LoginPage";
import { RegisterPage } from "../pages/registerpage/RegisterPage";

const routes: RouteObject[] = [
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    }
];

export { routes };
```

**/src/features/auth/index.ts**

```typescript
// Routes
export { routes as authRoutes } from './routes';
```

**/src/features/products/routes/index.tsx**

```typescript
import { RouteObject } from "react-router";
import { ProductsPage } from "../pages/productspage/ProductsPage";

const routes: RouteObject[] = [
    {
        path: '/products',
        element: <ProductsPage />
    },
];

export { routes };
```

**/src/features/products/index.ts**

```typescript
// Routes
export { routes as productsRoutes } from './routes';
```

**/src/routes/index.tsx**

```typescript
import { RouteObject } from "react-router";
import App from "../App";
import { authRoutes } from "@/features/auth";
import { productsRoutes } from "@/features/products";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            ...authRoutes,
            ...productsRoutes
        ]
    }
];

export { routes };
```

**src/App.tsx**

```typescript
import { Outlet } from 'react-router';

function App() {
  return (
    <>
        <header>
            <NavBar />
        </header>

        <main className="p-10">
            <Outlet />
        </main>
    </>
  );
}
```

**src/main.tsx**

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// React Routing
import { createBrowserRouter, RouterProvider} from 'react-router';
import { routes } from './routes';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

</p>
</details>

## 3.2 Erweitern Sie die `NavBar.tsx` um die Routen

Nutzen Sie bei Products, Playground & Admin die Komponente `Link`. Bei den Buttons Register & Login arbeiten Sie mit dem useNavigate-Hook.

<details>
<summary>Show Solution</summary>
<p>

**/src/components/navbar/NavBar.tsx**

```typescript
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {

    const navigate = useNavigate();

    return (
        <nav className="flex justify-between p-4 border-b-2 border-gray-300">
            <div className="flex gap-2 justify-start mt-2">

                {/* Aufgabe: Home-Icon soll "http://localhost:5173/" aufrufen */}
                <Link to={'/'} id="nav-home">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </Link>

                <div className="flex space-x-8 ml-10">

                    {/* Aufgabe: Products soll "http://localhost:5173/products" aufrufen */}
                    <Link to={'/products'} id="nav-products">Products</Link>

                    {/* Aufgabe: Admin soll "http://localhost:5173/admin" nur aufrufen, wenn der Benutzer angemeldet ist */}
                    <Link to={'/admin'} id="nav-admin">Admin</Link>

                </div>

            </div>

            <div className="flex gap-2 justify-center">

                {/* ... */}

                {/* Aufgabe: Register-Button soll "http://localhost:5173/register" aufrufen. Verwenden Sie hierzu den useNavigate-Hook */}
                <Button id="nav-register" onClick={() => navigate('/register')}>
                    Register
                </Button>

                {/* Aufgabe: Login-Button soll "http://localhost:5173/login" aufrufen. Verwenden Sie hierzu den useNavigate-Hook */}
                <Button id="nav-login" onClick={() => navigate('/login')}>
                    Log in
                </Button>

            </div>

        </nav>
    )

};
```

</p>
</details>

## 3.3 Artikel filtern mit URL-Suchparameter

Über der Produktliste werden die einzelnen Kategorien als Badges angezeigt. Nutzen Sie den useSearchParams Hook um die Produkte nach der angeklickten Kategorie zu filtern. Wenn der Badge "Alle" angeklickt wird, soll der URL-Suchparameter entfernt werden.

<details>
<summary>Show Solution</summary>
<p>

**/src/features/products/pages/productspage/ProductsPage.tsx**

```typescript
import { useSearchParams } from 'react-router';

const Products = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedType = searchParams.get('type');

    const handleTypeClick = (type?: string) => {
        setSearchParams(type ? { type } : {}); // Leere Parameter setzen, um den Filter zu entfernen
    };

    // ...

};
```

</p>
</details>

## 3.4 Produktdetails laden

1. ProductsPage.tsx
   - Der `product.name`-Text soll als Link zu `/products/:productid` führen.
   - Nutzen Sie `Outlet`, um die ProductDetailsPage.tsx in der zweiten Spalte des Grid-Layouts anzuzeigen.

2. ProductDetailsPage.tsx
   - Nutzen Sie den `useParams`-Hook aus `react-router`, um den `productid`-Parameter auszulesen.
   - Rufen Sie das zugehörige Produkt mit `axios.get` von <http://localhost:3001/products/:productid> ab.
   - Zeigen Sie die Produktdetails an.

3. features/products/routes/index.tsx
   - Ergänzen Sie den Eintrag für `/products`, sodass `ProductDetailsPage.tsx` als Nested Route innerhalb von `ProductsPage.tsx` gerendert wird.

<details>
<summary>Show Solution</summary>
<p>

**/src/features/products/routes/index.tsx**

```typescript
import { RouteObject } from "react-router";
import { ProductsPage } from "../pages/productspage/ProductsPage";
import { ProductDetailsPage } from "../pages/productdetailspage/ProductDetailsPage";

const routes: RouteObject[] = [
    {
        path: '/products',
        element: <ProductsPage />,
        children: [
            {
                path: ':productId',
                element: <ProductDetailsPage />
            }
        ]
    },
];

export { routes };
```

**src/features/products/pages/productspage/ProductsPage.tsx**

```typescript
import { Link, Outlet, useSearchParams } from 'react-router';

const ProductsPage = () => {
    
    // ...

    return (
        <>
            <h1>Products</h1>
            <div className="grid grid-cols-2">
                {/* ... */}
                <tr key={product.id}>
                    <td className="product-name whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <Link to={`${product.id}`}>
                            {product.name}
                        </Link>
                    </td>
                    <td className="product-price whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.price} EUR</td>
                    <td className="cart-quantity relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <QuantitySelector product={product} />
                    </td>
                </tr>
                {/* ... */}
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    );
};
```

**src/features/products/pages/productdetailspage/ProductDetailsPage.tsx**

```typescript
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Product } from "../../entities/Product";

const ProductsDetailsPage = () => {

    const [product, setProduct] = useState<Product | null>(null);

    const { productId } = useParams();

    useEffect(() => {

        const fetchProduct = async () => {
            const response = await axios.get<Product>(`http://localhost:3001/products/${productId}`);
            setProduct(response.data);
        }

        fetchProduct();

    }, [productId])

    return (
        <>
            <h1 id="product-title" className="text-2xl">Produkt: {product?.id}</h1>
            <div className="grid grid-cols-1 gap-2 pt-5">
                <div>
                    <span className="font-bold">Name: </span> {product?.name}
                </div>
                <div>
                    <span className="font-bold">Beschreibung: </span> {product?.description}
                </div>
                <div>
                    <span className="font-bold">Preis: </span> {product?.price} EUR
                </div>
            </div>
        </>
    );
};

export { ProductsDetailsPage };
```

</p>
</details>

## 3.5 Geschützte Route mit ProtectedRoute

Um sicherzustellen, dass bestimmte Seiten nur von authentifizierten Benutzern aufgerufen werden können, soll eine `ProtectedRoute.tsx` erstellt und in die Routen eingebunden werden.

**Aufgabe:**

1. ProtectedRoute.tsx erstellen
   - Definieren Sie zwei Variablen `authenticated` und token mit Standardwerten (false bzw. null).
   - Falls einer der beiden Werte `null` oder `false` ist, soll `<Navigate to={'/login'} />` zurückgegeben werden.
   - Falls der Benutzer authentifiziert ist, soll das übergebene children-Element gerendert werden.
2. routes/index.tsx erweitern
   - Fügen Sie eine Route `/admin` hinzu, die auf die `AdminPage` verweist.
   - Diese Route soll nur über ProtectedRoute.tsx erreichbar sein.

**Hinweise:**

- `ProtectedRoute` fungiert als Wrapper für geschützte Routen.
- Nutzen Sie `Navigate` aus `react-router`, um unautorisierte Nutzer auf die Login-Seite weiterzuleiten.
- In späteren Aufgaben wird `authenticated` und `token` durch Werte aus dem `auth-Store` ersetzt.

<details>
<summary>Show Solution</summary>
<p>

**/src/components/protectedRoute/ProtectedRoute.tsx**

```typescript
import { ReactNode } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    
    const authenticated = false;
    const token = null;

    if ((!authenticated) || (!token)) {
        return <Navigate to={'/login'} />;
    }

    return children;
};

export { ProtectedRoute };
```

**src/routes/index.tsx**

```typescript
import { ProtectedRoute } from "@/components/protectedRoute/ProtectedRoute";
import { Admin } from "@/pages/adminpage/AdminPage";


const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            // ...
            {
                path: "/admin",
                element: (
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                ),
            }
            // ...
        ]
    }
];

```

</p>
</details>

## 3.6 404 Route

Um Benutzer auf eine eigene Fehlerseite zu leiten, wenn eine nicht existierende Route aufgerufen wird, soll eine NotFoundPage.tsx erstellt und in die Routen eingebunden werden.

**Aufgabe:**

1. NotFoundPage.tsx erweitern
   - Anzeigen der Meldung `Page not found: {pathname}`. Der nicht existierende Pfad soll dabei aus `useLocation().pathname` ausgelesen werden.
   - Der **Zurück**-Button soll zur vorherigen Seite navigieren. Nutzen Sie dazu `useNavigate()` mit `navigate(-1)`. `useNavigate()` ist die empfohlene Methode für Navigationsbefehle, da `useHistory()` veraltet ist.
   - Der **Zurück zur Startseite**-Button soll zur `/`-Route navigieren.
2. routes/index.tsx erweitern
   - Ergänzen Sie eine `*`-Route, die auf `NotFoundPage.tsx` verweist, sodass nicht definierte Routen abgefangen werden.

<details>
<summary>Show Solution</summary>
<p>

**/src/pages/notfoundpage/NotFoundPage.tsx**

```typescript
import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/button/Button";

const NotFoundPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <div className="w-full h-full min-h-screen flex items-center justify-center flex-col">
                <div className="max-w-2xl text-center">
                    <h1 className="text-9xl font-semibold mb-2">404</h1>
                    <p className="text-2xl md:text-4xl mb-8">Page not found: {location.pathname}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button onClick={() => navigate(-1)}>
                            Zurück
                        </Button>
                        <Button onClick={() => navigate('/')}>
                            Zurück zur Startseite
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export { NotFoundPage };
```

**/src/routes/index.tsx**

```typescript
import { NotFound } from "../pages/notfoundpage/NotFoundPage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            // ...
            {
                path: "*",
                element: <NotFoundPage />,
            }
            // ...
        ]
    }
];
```

</p>
</details>
