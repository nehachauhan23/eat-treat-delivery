import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createOrder } from "../api/order";
import { useCartStore } from "../store/cartStore";
import axios from "axios";

const DELIVERY_FEE = 2.99;

export default function CheckoutPage() {
  const navigate = useNavigate();

  const { items, clearCart } = useCartStore();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const total = subtotal + DELIVERY_FEE;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      alert("Name must be at least 2 characters");
      return;
    }

    if (address.trim().length < 5) {
      alert("Please enter a valid address");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be 10 digits");
      return;
    }
    try {
      const order = await createOrder({
        customer: {
          name,
          address,
          phone,
        },
        items: items.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
      });

      clearCart();

      navigate(`/orders/${order.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data?.errors;

        if (errors && Array.isArray(errors)) {
          alert(errors.map((err) => err.message).join("\n"));
        } else {
          alert(error.response?.data?.message ?? "Failed to place order");
        }
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold">Your cart is empty</h1>

          <Link to="/" className="inline-block mt-4 text-stone-900 underline">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center gap-3">
          <Link
            to="/cart"
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

          <h1 className="text-base font-semibold text-stone-900">Checkout</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pb-10">
        <div className="mt-6 bg-white rounded-2xl border border-stone-100 p-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 bg-stone-900 rounded-full flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            <h2 className="text-sm font-semibold text-stone-900">
              Delivery Details
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5">
                Delivery Address
              </label>

              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St"
                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5">
                Phone Number
              </label>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-2xl border border-stone-100 p-5">
          <h2 className="text-sm font-semibold text-stone-900 mb-4">
            Order Summary
          </h2>

          <div className="flex flex-col gap-2.5">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-stone-600">
                  {item.name}
                  <span className="text-stone-400"> ×{item.quantity}</span>
                </span>

                <span className="font-medium text-stone-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="border-t border-stone-100 pt-2.5 mt-1 flex flex-col gap-2">
              <div className="flex justify-between text-sm text-stone-500">
                <span>Subtotal</span>
                <span className="text-stone-900">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-stone-500">
                <span>Delivery</span>
                <span className="text-stone-900">
                  ${DELIVERY_FEE.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-stone-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 px-4 py-3 bg-amber-50 rounded-xl border border-amber-100">
          <svg
            className="w-4 h-4 text-amber-600 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>

          <span className="text-xs text-amber-700 font-medium">
            Cash on delivery · Pay when your order arrives
          </span>
        </div>

        <button
          type="submit"
          className="mt-5 w-full bg-stone-900 text-white font-semibold py-4 rounded-2xl hover:bg-stone-700 transition-colors flex items-center justify-between px-6"
        >
          <span>Place Order</span>

          <span>${total.toFixed(2)}</span>
        </button>
      </div>
    </form>
  );
}
