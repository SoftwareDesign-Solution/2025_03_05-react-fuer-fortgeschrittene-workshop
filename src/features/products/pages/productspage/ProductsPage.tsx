import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useSearchParams } from 'react-router';
import axios from "axios";
import { Product } from "../../entities/Product";
import { StyledBadge } from "@/components/styledbadge/StyledBadge";
import { QuantitySelector } from "@/features/cart";

const ProductsPage = () => {

    const error = '';
    const loading = false;
    const [products, setProducts] = useState<Product[]>([]);
    
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedType = searchParams.get('type');

    useEffect(() => {

        const fetchProducts = async () => {
            const response = await axios.get<Product[]>("http://localhost:3001/products");
            setProducts(response.data);
        };
    
        fetchProducts();

    }, [])

    const filteredProducts = useMemo(() => {
        return selectedType ? products.filter((p: Product) => p.type === selectedType) : products;
      }, [products, selectedType]);

    const handleTypeClick = (type?: string) => {
        setSearchParams(type ? { type } : {}); // Leere Parameter setzen, um den Filter zu entfernen
    };

    return (
        <div>
            
            <h1 id="title" className="text-2xl">Products</h1>

            <div className="grid grid-cols-2">

                <div>
                    <div className="flex flex-wrap gap-x-6 gap-y-4 pt-10">
                        <StyledBadge onClick={() => handleTypeClick()}>Alle</StyledBadge>
                        {!loading && (products) && products.length && Array.from(new Set(products.map((product: Product) => product.type))).map((type) => (
                            <StyledBadge key={type} className={type} onClick={() => handleTypeClick(type as string)}>{type as string}</StyledBadge>
                        ))}
                    
                    </div>
                    
                    {loading && (<div id="loading-message" className="pt-10">
                        Produkte werden geladen...
                    </div>)}
                    
                    {error && (<div id="error-message" className="pt-10 text-red-600">
                        {error}
                    </div>)}

                    {!loading && filteredProducts && filteredProducts.length && (<div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 sm:px-6 lg:px-8">
                                <table id="products" className="divide-y divide-gray-300" data-testid="products">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        
                                        {(filteredProducts.length > 0) && filteredProducts.map((product: Product) => (
                                        <tr key={product.id}>
                                            <td className="product-name whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                <Link to={`${product.id}`}>
                                                    {product.name}
                                                </Link>
                                            </td>
                                            <td className="product-price whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.price} EUR</td>
                                            <td className="cart-quantity relative whitespace-nowrap py-4 pl-3 pr-4 min-w-[140px] text-right text-sm font-medium sm:pr-0">
                                                <QuantitySelector product={product} />
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>)}
                </div>

                <div>
                    <Outlet />
                </div>

            </div>
            
        </div>
    );
};

export { ProductsPage };