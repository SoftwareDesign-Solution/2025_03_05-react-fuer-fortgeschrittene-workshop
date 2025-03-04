import { Product } from "../../entities/Product";

const ProductDetailsPage = () => {

    const productId = 0;
    const product: Product | undefined = { id: 1, name: 'Artikel', description: 'Beschreibung', price: 1.0, type: 'Artikel' };
    
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