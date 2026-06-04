import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrder } from "../api/order";
import type { Order } from "../types";
import { socket } from "../socket";

const STATUSES: Order["status"][] = [
  "ORDER_RECEIVED",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const STATUS_META = {
  ORDER_RECEIVED: {
    label: "Order Received",
    description: "We've received your order",
    emoji: "✅",
  },
  PREPARING: {
    label: "Preparing",
    description: "Our kitchen is preparing your food",
    emoji: "👨‍🍳",
  },
  OUT_FOR_DELIVERY: {
    label: "Out For Delivery",
    description: "Your order is on the way",
    emoji: "🛵",
  },
  DELIVERED: {
    label: "Delivered",
    description: "Enjoy your meal!",
    emoji: "📦",
  },
};

export default function OrderTrackingPage() {
  const { id } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;

      const data = await getOrder(id);

      setOrder(data);
    };

    fetchOrder();

    if (!id) return;

    socket.emit("joinOrder", id);

    const handleStatusUpdate = ({ status }: { status: Order["status"] }) => {
      setOrder((prev) =>
        prev
          ? {
              ...prev,
              status,
            }
          : prev,
      );
    };

    socket.on("statusUpdated", handleStatusUpdate);

    return () => {
      socket.off("statusUpdated", handleStatusUpdate);
    };
  }, [id]);
  // useEffect(() => {
  //   const fetchOrder = async () => {
  //     if (!id) return;

  //     const data = await getOrder(id);

  //     setOrder(data);
  //   };

  //   fetchOrder();

  //   const interval = setInterval(
  //     fetchOrder,
  //     5000
  //   );

  //   return () => clearInterval(interval);
  // }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <h1 className="text-lg font-semibold">Loading order...</h1>
      </div>
    );
  }

  const currentIdx = STATUSES.indexOf(order.status);

  const currentMeta = STATUS_META[order.status];

  const isDelivered = order.status === "DELIVERED";

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-base font-semibold text-stone-900">
            Track Order
          </h1>

          <span className="text-xs font-mono text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full">
            #{order.id.slice(0, 8)}
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pb-10">
        <div className="mt-6 bg-white rounded-2xl border border-stone-100 p-6 text-center">
          <div className="text-5xl mb-3">{currentMeta.emoji}</div>

          <h2 className="text-xl font-semibold text-stone-900">
            {currentMeta.label}
          </h2>

          <p className="text-sm text-stone-400 mt-1">
            {currentMeta.description}
          </p>

          {!isDelivered && (
            <div className="mt-4 inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              Order in progress
            </div>
          )}
        </div>

        <div className="mt-4 bg-white rounded-2xl border border-stone-100 p-5">
          <div className="flex flex-col gap-0">
            {STATUSES.map((status, idx) => {
              const meta = STATUS_META[status];

              const done = idx <= currentIdx;

              const active = idx === currentIdx;

              const isLast = idx === STATUSES.length - 1;

              return (
                <div key={status} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        done
                          ? active
                            ? "bg-stone-900 scale-110"
                            : "bg-stone-900"
                          : "bg-stone-100"
                      }`}
                    >
                      {done ? (
                        active ? (
                          <span className="text-sm">{meta.emoji}</span>
                        ) : (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-stone-300" />
                      )}
                    </div>

                    {!isLast && (
                      <div
                        className={`w-0.5 h-8 my-0.5 ${
                          idx < currentIdx ? "bg-stone-900" : "bg-stone-100"
                        }`}
                      />
                    )}
                  </div>

                  <div className={`pt-1 ${isLast ? "" : "pb-4"}`}>
                    <p
                      className={`text-sm font-semibold ${
                        done ? "text-stone-900" : "text-stone-400"
                      }`}
                    >
                      {meta.label}
                    </p>

                    {active && (
                      <p className="text-xs text-stone-400 mt-0.5">
                        {meta.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 bg-white rounded-2xl border border-stone-100 p-5">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Current Status
          </p>

          <p className="text-lg font-semibold text-stone-900">
            {currentMeta.label}
          </p>
        </div>

        <Link
          to="/"
          className={`mt-5 w-full block text-center py-4 rounded-2xl font-semibold transition-colors ${
            isDelivered
              ? "bg-stone-900 text-white hover:bg-stone-700"
              : "border border-stone-200 text-stone-700 hover:bg-white"
          }`}
        >
          {isDelivered ? "Order Again 🍔" : "Back To Menu"}
        </Link>
      </div>
    </div>
  );
}
