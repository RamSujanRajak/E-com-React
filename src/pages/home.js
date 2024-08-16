import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import ProductTile from "../components/product-tile";

export default function Home() {
  // State to store the list of products
  const [products, setProducts] = useState([]);
  
  // State to manage the loading state
  const [loading, setLoading] = useState(false);

  // Function to fetch the list of products from the API
  async function fetchListOfProducts() {
    setLoading(true); // Start loading spinner
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    if (data) {
      setLoading(false); // Stop loading spinner
      setProducts(data); // Update products state with fetched data
    }
  }

  // useEffect to fetch products when the component mounts
  useEffect(() => {
    fetchListOfProducts();
  }, []);

  // Create an array of placeholders if fewer than 6 products are available
  const placeholderProducts = new Array(Math.max(0, 6 - products.length)).fill(
    null
  );

  return (
    <div>
      {loading ? (
        // Show loading spinner while data is being fetched
        <div className="min-h-screen w-full flex justify-center items-center">
          <Circles
            height={"120"}
            width={"120"}
            color="rgb(127,29,29)"
            visible={true}
          />
        </div>
      ) : (
        // Display grid of products once data is loaded
        <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto p-3">
          {products.map((productItem) => (
            <ProductTile key={productItem.id} product={productItem} />
          ))}

          {/* Add placeholder tiles if there are fewer than 6 products */}
          {placeholderProducts.map((_, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-lg flex justify-center items-center"
            >
              {/* Placeholder content */}
              <p className="text-gray-500">No Product</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
