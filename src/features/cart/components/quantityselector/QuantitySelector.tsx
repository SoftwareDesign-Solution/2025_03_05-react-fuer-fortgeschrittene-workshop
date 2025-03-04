import { useDispatch, useSelector } from "react-redux";
import { Product } from "@/features/products";
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