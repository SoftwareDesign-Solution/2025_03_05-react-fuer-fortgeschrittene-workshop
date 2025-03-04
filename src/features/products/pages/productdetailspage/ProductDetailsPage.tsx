import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Product } from "../../entities/Product";

const ProductDetailsPage = () => {

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
            
            {!product && <div className="mt-2 text-red-600">Produkt mit ID {productId} wurde nicht gefunden</div>}

            {product && (
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
            )}

        </>
    );
};

export { ProductDetailsPage };