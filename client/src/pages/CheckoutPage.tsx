import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createOrder } from "../api/order";
import { useCartStore } from "../store/cartStore";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const { items, clearCart } = useCartStore();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log("You tried to place an order");
    

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Checkout</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        placeholder="Address"
        value={address}
        onChange={(e) =>
          setAddress(e.target.value)
        }
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />

      <button type="submit">
        Place Order
      </button>
    </form>
  );
}