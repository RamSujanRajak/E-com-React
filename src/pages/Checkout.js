import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/slices/cart-slice"; // Adjust the import path as needed

export default function Checkout() {
  // Access the cart state from the Redux store
  const { cart } = useSelector((state) => state);
  
  // Dispatch function to trigger Redux actions
  const dispatch = useDispatch();
  
  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Handle the checkout process
  const handleCheckout = () => {
    dispatch(clearCart()); // Clear the cart after checkout
    navigate("/Confirmation"); // Redirect to confirmation page
  };

  // Calculate the total price, considering any discounts
  const total = cart.reduce(
    (total, item) =>
      total + (item.discountedPrice || item.price) * item.quantity,
    0
  );

  return (
    // Center the content vertically and horizontally on the screen
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6">Checkout Page</h1>
      
      {/* Display cart items if there are any */}
      {cart.length > 0 ? (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          
          {/* List each item in the cart */}
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="border-b py-2">
                <div className="flex justify-between">
                  <span>{item.title}</span>
                  <span>
                    {item.quantity} x{" "}
                    {(item.discountedPrice || item.price).toLocaleString(
                      "en-US",
                      { style: "currency", currency: "USD" }
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* Display the total amount */}
          <div className="mt-4 flex justify-between">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              {total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>

          {/* Button to complete the purchase */}
          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Complete Purchase
          </button>
        </div>
      ) : (
        // Display a message if the cart is empty
        <p className="text-lg">Your cart is empty.</p>
      )}
    </div>
  );
}
