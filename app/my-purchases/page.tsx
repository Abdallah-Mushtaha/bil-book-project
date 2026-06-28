"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type Order = {
  id: string;
  paypal_order_id: string;
  status: string;
  download_url: string | null;
  download_expires_at: string | null;
  created_at: string;
};

export default function MyPurchasesPage() {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) return;

    fetch(`/api/my-purchases?email=${encodeURIComponent(email)}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders ?? []);
        setLoading(false);
      });
  }, [isLoaded, user]);

  if (!isLoaded || loading) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, #060606 0%, #0f0608 50%, #080808 100%)",
        }}
      >
        <p style={{ color: "var(--gray-mid)" }}>Loading...</p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen px-4 py-20"
      style={{
        background:
          "linear-gradient(135deg, #060606 0%, #0f0608 50%, #080808 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-3"
          style={{ color: "var(--crimson)" }}
        >
          My Library
        </p>
        <h1
          className="font-display text-4xl font-bold mb-10"
          style={{ color: "var(--off-white)" }}
        >
          My Purchases
        </h1>

        {orders.length === 0 ? (
          <p style={{ color: "var(--gray-mid)" }}>No purchases yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => {
              const expired =
                order.download_expires_at &&
                new Date(order.download_expires_at) < new Date();

              return (
                <div
                  key={order.id}
                  className="p-6 rounded-2xl border flex items-center justify-between"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <div>
                    <p
                      className="font-display italic text-lg mb-1"
                      style={{ color: "var(--off-white)" }}
                    >
                      Because I Loved
                    </p>
                    <p className="text-xs" style={{ color: "var(--gray-mid)" }}>
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {order.download_url && !expired ? (
                    <a
                      href={order.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 rounded-full text-xs tracking-wide uppercase transition-all duration-300"
                      style={{
                        background: "rgba(139,26,26,0.5)",
                        border: "1px solid rgba(192,57,43,0.7)",
                        color: "var(--off-white)",
                      }}
                    >
                      Download
                    </a>
                  ) : (
                    <span
                      className="text-xs"
                      style={{ color: "var(--gray-mid)" }}
                    >
                      Link expired
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
