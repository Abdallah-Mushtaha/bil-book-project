"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "../components/checkout/ErrorMessage";
import { AlreadyPurchased } from "../components/CheckoutPage/AlreadyPurchased";
import { PayPalSection } from "../components/CheckoutPage/PayPalSection";

export default function CheckoutPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);
  const email = user?.primaryEmailAddress?.emailAddress ?? "";

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      setIsChecking(false);
      return;
    }

    fetch(`/api/check-purchase?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.purchased) {
          setAlreadyPurchased(true);
        }
        setIsChecking(false);
      });
  }, [isLoaded, user]);

  return (
    <section className="h-screen w-full flex bg-[#0a0a0a] overflow-hidden relative">
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-20 overflow-hidden relative z-10 w-full lg:w-1/2">
        <div className="w-full max-w-md flex flex-col max-h-full">
          <div className="mb-12 flex-shrink-0">
            <div className="text-white text-4xl font-black tracking-tighter">
              CHECK<span className="text-red-600">OUT</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <h2 className="text-3xl font-bold text-white mb-2">
              Secure Payment
            </h2>
            <p className="text-gray-400 mb-8">
              Complete your transaction with ease.
            </p>
            <ErrorMessage message={errorMsg} />

            {isChecking ? (
              <div className="text-gray-400 text-sm animate-pulse">
                Loading...
              </div>
            ) : alreadyPurchased ? (
              <AlreadyPurchased
                onNavigate={() => router.push("/my-purchases")}
              />
            ) : (
              <>
                <div className="mb-8 border-b border-white/10 pb-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                    Billing Email
                  </span>
                  <p className="text-white font-medium mt-1 text-lg">
                    {email || "your@email.com"}
                  </p>
                </div>

                <div
                  className={`mt-8 p-4 rounded-2xl transition-all duration-700 ease-in-out ${isPaymentStarted ? "relative group overflow-hidden bg-white/80 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.3)] border border-white/40" : "bg-transparent border border-transparent"}`}
                >
                  <PayPalSection
                    isLoaded={isLoaded}
                    email={email}
                    userId={user?.id}
                    setIsPaymentStarted={setIsPaymentStarted}
                    setErrorMsg={setErrorMsg}
                    router={router}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 lg:relative lg:w-1/2 lg:rounded-l-[100px] overflow-hidden z-0">
        <Image
          src="/author.png"
          alt="Checkout"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70 lg:hidden" />
      </div>
    </section>
  );
}
