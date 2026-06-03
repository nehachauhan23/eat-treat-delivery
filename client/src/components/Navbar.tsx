import { Link } from "react-router-dom";

import { useCartStore } from "../store/cartStore";

export default function Navbar() {
  const items = useCartStore((state) => state.items);

  const count = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav>
      <Link to="/">Menu</Link>

      <Link to="/cart">
        Cart ({count})
      </Link>
    </nav>
  );
}