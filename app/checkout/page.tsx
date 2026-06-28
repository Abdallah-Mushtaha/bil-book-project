// app/checkout/page.tsx
"use client";
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { CheckoutCard } from "../components/checkout/CheckoutCard";
import { ErrorMessage } from "../components/checkout/ErrorMessage";

export default function CheckoutPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const email = user?.primaryEmailAddress?.emailAddress ?? "";

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#060606]">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-red-700 animate-bounce [animation-delay:0ms]" />
          <div className="w-1.5 h-1.5 rounded-full bg-red-700 animate-bounce [animation-delay:150ms]" />
          <div className="w-1.5 h-1.5 rounded-full bg-red-700 animate-bounce [animation-delay:300ms]" />
        </div>
      </main>
    );
  }

  return (
    <CheckoutCard email={email}>
      <ErrorMessage message={errorMsg} />

      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}
      >
        <PayPalButtons
          style={{ layout: "vertical", color: "black", shape: "pill" }}
          createOrder={async () => {
            setErrorMsg("");
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, userId: user?.id }),
            });
            const data = await res.json();
            return data.orderId;
          }}
          onApprove={async (data) => {
            const res = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderID, email }),
            });
            const result = await res.json();
            if (result.success) {
              sessionStorage.setItem("just_purchased", "true");
              router.push(
                `/success?downloadUrl=${encodeURIComponent(result.downloadUrl)}`,
              );
            } else {
              setErrorMsg(
                "Payment was processed but something went wrong. Please contact support.",
              );
            }
          }}
          onError={() => {
            setErrorMsg(
              "Payment failed. Please try again or use a different payment method.",
            );
          }}
          onCancel={() => {
            setErrorMsg(
              "Payment cancelled. You can try again whenever you're ready.",
            );
          }}
        />
      </PayPalScriptProvider>
    </CheckoutCard>
  );
}
