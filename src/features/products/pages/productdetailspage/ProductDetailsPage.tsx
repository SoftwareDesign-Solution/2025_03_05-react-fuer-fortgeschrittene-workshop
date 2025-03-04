import { useSelector } from "react-redux";
import { selectProductById } from "../../store/productsSlice";
import { RootState } from "@/store";
import { useParams } from "react-router";

const ProductDetailsPage = () => {

    const { productId } = useParams();
    
    const product = useSelector((state: RootState) => selectProductById(state, Number(productId)))

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