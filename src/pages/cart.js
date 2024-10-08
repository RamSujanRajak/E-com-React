import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartTile from "../components/cart-tile";

export default function Cart() {
  // State to manage total cart value and discount amount
  const [totalCart, setTotalCart] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Access cart state from the Redux store
  const { cart } = useSelector((state) => state);

  // Calculate the total cart value whenever the cart changes
  useEffect(() => {
    const total = cart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    setTotalCart(total);
  }, [cart]);

  // Function to apply discount based on type (fixed or percentage)
  const applyDiscount = (type, value) => {
    let discount = 0;
    if (type === "fixed") {
      discount = value; // Apply a fixed discount
    } else if (type === "percentage") {
      discount = (totalCart * value) / 100; // Apply a percentage discount
    }
    setDiscountAmount(discount); // Update the discount amount
  };

  // Calculate the final amount after discount
  const finalAmount = totalCart - discountAmount;

  return (
    // Center the content vertically and horizontally with some padding
    <div className="min-h-screen flex flex-col items-center py-10 px-5 bg-gray-100">
      {cart.length ? (
        <div className="w-full max-w-6xl grid lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 p-5 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3">
              Your Shopping Cart
            </h2>
            <div className="space-y-6">
              {/* Map over cart items and render CartTile component for each */}
              {cart.map((cartItem) => (
                <CartTile key={cartItem.id} cartItem={cartItem} />
              ))}
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className="p-5 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-5 border-b pb-3">
              Cart Summary
            </h2>
            <div className="space-y-4">
              {/* Display the number of items in the cart */}
              <p className="text-lg">
                <span className="font-semibold text-gray-600">
                  Total Items:{" "}
                </span>
                <span className="text-gray-800">{cart.length}</span>
              </p>

              {/* Display the subtotal (total price before discount) */}
              <p className="text-lg">
                <span className="font-semibold text-gray-600">Subtotal: </span>
                <span className="text-gray-800">${totalCart.toFixed(2)}</span>
              </p>

              {/* Display the discount if applicable */}
              {discountAmount > 0 && (
                <p className="text-lg">
                  <span className="font-semibold text-gray-600">
                    Discount:{" "}
                  </span>
                  <span className="text-gray-800">
                    -${discountAmount.toFixed(2)}
                  </span>
                </p>
              )}

              {/* Display the total price after discount */}
              <p className="text-lg">
                <span className="font-semibold text-gray-600">
                  Total Price:{" "}
                </span>
                <span className="text-gray-800">${finalAmount.toFixed(2)}</span>
              </p>

              {/* Buttons to apply different types of discounts */}
              <div className="space-y-3">
                <button
                  onClick={() => applyDiscount("fixed", 10)}
                  className="custom-button w-full"
                >
                  Apply $10 Discount
                </button>
                <button
                  onClick={() => applyDiscount("percentage", 10)}
                  className="custom-button w-full"
                >
                  Apply 10% Discount
                </button>
              </div>

              {/* Proceed to Checkout button */}
              <Link to="/Checkout">
                <button className="w-full mt-5 bg-red-950 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300 ">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        // Message when the cart is empty
        <div className="flex flex-col items-center justify-center space-y-5">
          <h1 className="text-gray-800 font-bold text-2xl">
            Your cart is empty
          </h1>
          <Link to="/">
            <button className="bg-red-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-red-700 transition duration-300">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
