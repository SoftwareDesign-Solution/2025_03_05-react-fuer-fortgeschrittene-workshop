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