import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
// A simple Toast notification component

const Toast = ({ message, type }) => {
  if (!message) return null;

  const baseClasses =
    "fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white transition-opacity duration-300 z-50";
  const typeClasses = type === "success" ? "bg-green-500" : "bg-red-500";

  return <div className={`${baseClasses} ${typeClasses}`}>{message}</div>;
};

export default function ProductList({ updateCartQty }) {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("100000"); // Set an initial max for the slider
  const [category, setCategory] = useState("");
  const [q, setQ] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // --- MINIMAL CHANGE 1: Add observer refs for intersection observer ---
  const observer = useRef();
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // We've reached the last element, so fetch more.
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  // --- MINIMAL CHANGE 2: Update fetch logic to handle pagination ---
  const fetchProducts = useCallback(
    async (isNewSearch = false) => {
      setLoading(true);
      try {
        const searchPage = isNewSearch ? 1 : page;
        const { data } = await api.products.list({
          minPrice,
          maxPrice,
          category,
          q,
          page: searchPage,
        });

        // If it's a new search, replace the products. Otherwise, append.
        setProducts((prevProducts) =>
          isNewSearch ? data.products : [...prevProducts, ...data.products]
        );
        setTotal(data.total);

        // Stop fetching if the API returns fewer items than the limit, or none.
        if (data.products.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        showNotification("Failed to load products.", "error");
      } finally {
        setLoading(false);
      }
    },
    [page, minPrice, maxPrice, category, q]
  ); // Add dependencies

  // --- MINIMAL CHANGE 3: useEffect now fetches based on page changes ---
  useEffect(() => {
    // This effect handles both the initial load and subsequent page fetches for infinite scroll.
    if (page === 1) return; // The initial fetch is handled by handleFilter on mount.
    fetchProducts();
  }, [page]);

  // Initial load effect
  useEffect(() => {
    handleFilter(); // Perform initial search on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- MINIMAL CHANGE 4: handleFilter now resets for a new search ---
  const handleFilter = (e) => {
    if (e) e.preventDefault();
    setPage(1); // Reset page to 1 for a new search
    setProducts([]); // Clear existing products
    setHasMore(true); // Allow fetching again
    fetchProducts(true); // Pass true to indicate it's a new search
  };

  const addToCart = async (id) => {
    try {
      let res = await api.cart.add({ productId: id, quantity: 1 });
      showNotification("Added to cart successfully!", "success");
      let cartList = [];
      res?.data?.cart.forEach((c) =>
        cartList.push({ product: c?.product?._id, quantity: c?.quantity || 0 })
      );
      localStorage.setItem("cart", JSON.stringify(cartList));
      if (updateCartQty) updateCartQty();
    } catch (e) {
      showNotification("Please login to add items to your cart.", "error");
    }
  };

  return (
    <div className="bg-[#FAF7F3]">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Products
        </h2>
        {/* Filters Section */}
        <form
          onSubmit={handleFilter}
          className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 items-end"
        >
          {/* Your Filter JSX remains unchanged */}
          <div>
            <label
              htmlFor="max-price"
              className="block text-sm font-medium text-gray-700"
            >
              Max Price:{" "}
              <span className="font-bold text-gray-900">₹{maxPrice}</span>
            </label>
            <input
              id="max-price"
              type="range"
              min="0"
              max="100000"
              step="100"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FE7743]"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              className="w-half rounded-md border-gray-300 shadow-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
            </select>
            <button
              type="submit"
              className="w-full sm:w-auto justify-center rounded-md border border-transparent bg-[#FE7743] py-2 px-4 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FE7743] focus:ring-offset-2"
            >
              Filter
            </button>
          </div>
        </form>
        <div className="mt-6 text-sm text-gray-500">
          Showing {products.length} of {total} products
        </div>
        {/* Product Grid */}
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((p, index) => (
            // --- MINIMAL CHANGE 5: Attach the ref to the last element ---
            <div
              ref={products.length === index + 1 ? lastProductElementRef : null}
              key={p._id}
              className="group relative flex flex-col"
            >
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={p.image || "https://placehold.co/400x400/e2e8f0/e2e8f0"}
                  alt={p.title}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/product/${p._id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{p.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">₹{p.price}</p>
              </div>
              <div className="mt-auto pt-4">
                <button
                  onClick={() => addToCart(p._id)}
                  className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-[#FE7743] py-2 px-4 text-sm font-medium text-white hover:opacity-90 focus:z-10"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Loading State Indicator */}
        {loading && (
          <div className="text-center py-10">Loading more products...</div>
        )}
        {/* End of List Message */}
        {!hasMore && products.length > 0 && (
          <div className="text-center py-10 text-gray-500">
            You've reached the end of the list!
          </div>
        )}
      </div>
      <Toast message={notification.message} type={notification.type} />
    </div>
  );
}
