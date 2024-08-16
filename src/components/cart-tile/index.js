import { useDispatch } from "react-redux";
import { removeFromCart } from "../../store/slices/cart-slice";

export default function CartTile({ cartItem }) {
  const dispatch = useDispatch();

  // Function to handle the removal of an item from the cart
  function handleRemoveFromCart() {
    dispatch(removeFromCart(cartItem.id));
  }

  return (
    <div className="flex items-center p-5 justify-between bg-white shadow-md rounded-lg mb-4">
      {/* Product Image and Details */}
      <div className="flex items-center">
        <img
          src={cartItem?.image}
          className="h-28 w-28 object-cover rounded-lg"
          alt={cartItem?.title} // Alt text for the product image
        />
        <div className="ml-4">
          {/* Product Title */}
          <h1 className="text-xl font-semibold">{cartItem?.title}</h1>
          {/* Product Price */}
          <p className="text-gray-600 font-bold">
            ${cartItem?.price.toFixed(2)} {/* Format the price to 2 decimal places */}
          </p>
        </div>
      </div>

      {/* Remove Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleRemoveFromCart}
          className="bg-red-600 text-white border-2 border-red-600 rounded-lg px-4 py-2 font-bold hover:bg-red-700 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
