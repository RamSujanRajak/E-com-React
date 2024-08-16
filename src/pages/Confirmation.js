import React from "react";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">
        Thank You for Shopping with Us!
      </h1>
      <p className="text-lg mb-4">
        We appreciate your purchase. Feel free to revisit our website anytime.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
      >
        Go to Homepage
      </button>
    </div>
  );
}
