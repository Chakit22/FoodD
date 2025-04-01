import { useEffect, useState } from "react";

export default function OrderStatus({ orderId }: { orderId: string }) {
  const [status, setStatus] = useState<string>("Pending");

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/order-status?orderId=${orderId}`);
      const data = await res.json();
      setStatus(data.status);
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [orderId]);

  return <h2>Order Status: {status}</h2>;
}
