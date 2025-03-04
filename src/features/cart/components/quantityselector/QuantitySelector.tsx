import { Product } from "@/features/products";
import { Button } from "@/components/button/Button";

const QuantitySelector = ({ product }: { product: Product}) => {
    
    const cartItem = null;

    if (!cartItem)
        return (
            <Button 
                type="button" 
                className="addtocart"
            >
                Add to Cart
            </Button>
        )

    return (
        <div className="flex gap-3">
			<Button 
                type="button" 
                className="decrease"
            >
                -
            </Button>
			<input 
                type="text" 
                className="quantity block w-12 text-center rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
			<Button 
                type="button" 
                className="increase"
            >
                +
            </Button>
		</div>
    );
};

export { QuantitySelector };