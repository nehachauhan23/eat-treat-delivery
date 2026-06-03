import { Link } from "react-router-dom";

import { useCartStore } from "../store/cartStore";


const DELIVERY_FEE = 2.99;

export default function CartPage() {
  const { items, increaseQuantity, decreaseQuantity } = useCartStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const delivery = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50">

        <div className="flex flex-col items-center justify-center py-28 gap-4">
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center text-4xl">
            🛒
          </div>

          <p className="text-stone-500 text-sm font-medium">
            Your cart is empty
          </p>

          <Link
            to="/"
            className="text-sm text-stone-900 font-medium underline underline-offset-2"
          >
            Browse menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center gap-3">
          <Link
            to="/"
            className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
          >
            <svg
              className="w-4 h-4 text-stone-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>

          <h1 className="text-base font-semibold text-stone-900">Your Cart</h1>

          <span className="ml-auto text-xs text-stone-400">
            {items.reduce((sum, item) => sum + item.quantity, 0)} items
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pb-10">
        <div className="mt-6 flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-100 p-4 flex items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-xl object-cover"
              />

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-stone-900 truncate">
                  {item.name}
                </h3>

                <p className="text-xs text-stone-400 mt-0.5">
                  ${item.price.toFixed(2)} each
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M20 12H4"
                    />
                  </svg>
                </button>

                <span className="w-5 text-center text-sm font-semibold text-stone-900">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="w-7 h-7 rounded-full bg-stone-900 flex items-center justify-center text-white hover:bg-stone-700 transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>

              <div className="w-14 text-right ">
                <span className="text-sm font-semibold text-stone-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-2xl border border-stone-100 p-5">
          <h2 className="text-sm font-semibold text-stone-900 mb-4">
            Order Summary
          </h2>

          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between text-sm text-stone-500">
              <span>Subtotal</span>

              <span className="text-stone-900">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm text-stone-500">
              <span>Delivery fee</span>

              <span className="text-stone-900">${delivery.toFixed(2)}</span>
            </div>

            <div className="border-t border-stone-100 pt-2.5 flex justify-between text-sm font-semibold text-stone-900">
              <span>Total</span>

              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Link
          to="/checkout"
          className="mt-5 w-full bg-stone-900 text-white font-semibold py-4 rounded-2xl hover:bg-stone-700 transition-colors 
          flex items-center justify-between px-6 "
        >
          <span>Proceed to Checkout</span>

          <span>${total.toFixed(2)}</span>
        </Link>
      </div>
    </div>
  );
}
