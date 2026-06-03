import { Link } from "react-router-dom";

import { useCartStore } from "../store/cartStore";

export default function CartPage() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return <h1>Your cart is empty</h1>;
  }

  return (
    <div>
      <h1>Cart</h1>

      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>

          <button
            onClick={() =>
              decreaseQuantity(item.id)
            }
          >
            -
          </button>

          {item.quantity}

          <button
            onClick={() =>
              increaseQuantity(item.id)
            }
          >
            +
          </button>
        </div>
      ))}

      <h2>Total: ${total.toFixed(2)}</h2>

      <Link to="/checkout">
        Checkout
      </Link>
    </div>
  );
}