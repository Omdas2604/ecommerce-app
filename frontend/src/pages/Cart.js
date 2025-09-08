import React from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart({ user, updateCartQty }) {
  const [cart, setCart] = React.useState([]);
  const nav = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const load = async () => {
    setLoading(true); // start loader
    try {
      const { data } = await api.cart.get();
      console.log("LOADING CART DATA ;;", data);
      setCart(data.cart);
    } catch (e) {
      setCart([]);
    } finally {
      setLoading(false); // stop loader
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    let res = await api.cart.remove({ productId: id });
    load();
    let cartList = [];
    res?.data?.cart.forEach((c) =>
      cartList.push({ product: c?.product?._id, quantity: c?.quantity || 0 })
    );
    localStorage.setItem("cart", JSON.stringify(cartList));
    updateCartQty();
    toast.info("Item removed from cart");
  };

  const updateQty = async (id, qty) => {
    let res = await api.cart.update({ productId: id, quantity: qty });
    load();
    let cartList = [];
    res?.data?.cart.forEach((c) =>
      cartList.push({ product: c?.product?._id, quantity: c?.quantity || 0 })
    );
    localStorage.setItem("cart", JSON.stringify(cartList));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    toast.success("Checkout clicked! Proceed to payment.");
    // Integrate payment logic here
  };

  const total = cart.reduce(
    (s, i) => s + (i.product?.price || 0) * i.quantity,
    0
  );

  return (
    <div className="bg-[#FAF7F3] min-h-[calc(100vh-5rem)]">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-8">
          Your Cart
        </h2>

        {!user && (
          <div className="rounded-md bg-yellow-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Attention needed
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Please login to persist your cart across sessions.
                    <button
                      onClick={() => nav("/login")}
                      className="font-medium underline ml-2 hover:text-yellow-800"
                    >
                      Login
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <div className="flow-root">
            {loading ? (
              <div className="flex justify-center py-20">
                <svg
                  className="animate-spin h-10 w-10 text-[#FE7743]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-20">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Your cart is empty
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start adding some products to see them here.
                </p>
                <div className="mt-6">
                  <Link
                    to="/products"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FE7743] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE7743]"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            ) : (
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.product._id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={
                          item.product.image ||
                          "https://placehold.co/100x100/e2e8f0/e2e8f0"
                        }
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to={`/product/${item.product._id}`}>
                              {item.product.title}
                            </Link>
                          </h3>
                          <p className="ml-4">
                            ₹{item.product.price * item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center">
                          <label
                            htmlFor={`quantity-${item.product._id}`}
                            className="sr-only"
                          >
                            Quantity
                          </label>
                          <input
                            id={`quantity-${item.product._id}`}
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQty(item.product._id, e.target.value)
                            }
                            className="w-16 rounded-md border-gray-300 shadow-sm text-center"
                          />
                        </div>
                        <div className="flex">
                          <button
                            onClick={() => remove(item.product._id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {cart.length > 0 && !loading && (
          <div className="border-t border-gray-200 py-6 mt-8">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>₹{total}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <button
                onClick={handleCheckout}
                className="flex items-center justify-center rounded-md border border-transparent bg-[#FE7743] px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-90"
              >
                Checkout
              </button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link
                  to="/products"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Toast container */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
