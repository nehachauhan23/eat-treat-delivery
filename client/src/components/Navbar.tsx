import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

type Props = {
  brandName?: string;
  subtitle?: string;
};

export default function Navbar({
  brandName = "biteclub",
  subtitle = "delivery",
}: Props) {
  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/">
          <span className="text-xl font-semibold tracking-tight text-stone-900">
            {brandName}
          </span>

          <span className="ml-2 text-xs text-stone-400 font-medium uppercase tracking-widest">
            {subtitle}
          </span>
        </Link>

        <Link
          to="/cart"
          className="relative flex items-center gap-2 bg-stone-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-stone-700 transition-colors"
        >
          {cartCount > 0 ? (
            <>
              <span>${cartTotal.toFixed(2)}</span>

              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 text-stone-900 text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </>
          ) : (
            <span>Cart</span>
          )}
        </Link>
      </div>
    </header>
  );
}