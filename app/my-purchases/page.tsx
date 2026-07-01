"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { OrderItem } from "../components/MyPurchasesPage/OrderItem";
import { SkeletonLoader } from "../components/MyPurchasesPage/SkeletonLoader";
import { Order } from "../components/MyPurchasesPage/MyPurchasesPage.constants";

export default function MyPurchasesPage() {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetch(`/api/my-purchases?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders ?? []);
        setLoading(false);
      });
  }, [isLoaded, user]);

  if (!isLoaded || loading) {
    return (
      <main className="min-h-screen py-20 px-4 bg-[#060606] flex items-center justify-center">
        <SkeletonLoader />
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20 px-4 bg-[#060606] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-red-800/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-white/10"
        >
          <span>←</span> Back to Home
        </Link>

        <h1 className="text-5xl font-extrabold mb-12 text-white tracking-tight">
          My <span className="text-red-600">Purchases</span>
        </h1>

        {orders.length === 0 ? (
          <div className="p-12 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md text-center">
            <p className="text-gray-400">No purchases found in your account.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <OrderItem key={order.paypal_order_id} order={order} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
