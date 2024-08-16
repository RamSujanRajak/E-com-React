import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/slices/cart-slice";


export default function ProductTile({ product }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);

  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  function handleRemoveFromCart() {
    dispatch(removeFromCart(product.id));
  }

  // Helper function to format the price as currency
  function formatPrice(price) {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  // Determine button classes based on cart state
  const isInCart = cart.some((item) => item.id === product.id);
  const buttonClass = isInCart
    ? "bg-red-600 text-white border-red-200 neon-red"
    : "bg-green-500 text-white border-green-600 neon-green";
  return (
    <div>
      <div className="group flex flex-col items-center border-2 border-white-900 gap-3 p-4 h-[400px] mt-10 ml-5 rounded-xl card-hover ">
        {/* Product Image */}
        <div className="h-[180px]">
          <img
            src={product?.image}
            alt={product?.title}
            className="object-cover h-full w-full"
          />
        </div>

        {/* Product Title */}
        <div>
          <h1 className="w-40 truncate mt-3 text-gray-100 font-bold text-lg">
            {product?.title}
          </h1>
        </div>

        {/* Product Price */}
        <div>
          <h2 className="text-gray-500 font-semibold">
            {formatPrice(product?.price)}
          </h2>
        </div>

        {/* Add/Remove Button */}
        <div className="flex items-center justify-center w-full mt-5">
          <button
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            className={`border-2 rounded-lg font-bold p-2 ${buttonClass}`}
          >
            {isInCart ? "Remove from cart" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
