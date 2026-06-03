import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrder } from "../api/order";
import type { Order } from "../types";

export default function OrderTrackingPage() {
  const { id } = useParams();

  const [order, setOrder] = useState<Order | null >(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;

      const data = await getOrder(id);

      setOrder(data);
    };

    fetchOrder();

    const interval = setInterval(
      fetchOrder,
      5000
    );

    return () => clearInterval(interval);
  }, [id]);

  if (!order) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Order Tracking</h1>

      <h2>Order #{order.id}</h2>

      <p>Status: {order.status}</p>
    </div>
  );
}