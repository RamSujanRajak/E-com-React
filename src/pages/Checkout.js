import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/slices/cart-slice"; // Adjust the import path as needed

export default function Checkout() {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch(clearCart()); // Clear the cart
    navigate("/Confirmation"); // Redirect to confirmation page
  };

  // Calculate total with discount
  const total = cart.reduce(
    (total, item) =>
      total + (item.discountedPrice || item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout Page</h1>
      {cart.length > 0 ? (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
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
          <div className="mt-4 flex justify-between">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              {total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Complete Purchase
          </button>
        </div>
      ) : (
        <p className="text-lg">Your cart is empty.</p>
      )}
    </div>
  );
}
