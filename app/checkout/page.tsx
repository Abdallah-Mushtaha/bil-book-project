"use client";

import { useState } from "react";
import Image from "next/image";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "../components/checkout/ErrorMessage";

export default function CheckoutPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);
  const email = user?.primaryEmailAddress?.emailAddress ?? "";

  return (
    <section className="h-screen w-full flex bg-[#0a0a0a] overflow-hidden relative">
      {/* قسم البيانات (فوق الصورة في الموبايل، وجانبي في الديسك توب) */}
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
              {isPaymentStarted && (
                <>
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-white/50 to-red-600 rounded-3xl blur-md opacity-25 animate-tilt"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/30 to-white/90 animate-glint"></div>
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute -inset-[100%] animate-shine bg-gradient-to-r from-transparent via-white/50 to-transparent transform-gpu rotate-12"></div>
                  </div>
                </>
              )}

              <div className="relative z-10">
                {!isLoaded ? (
                  <div className="w-full h-[50px] rounded-full bg-white/5 animate-pulse border border-white/10" />
                ) : (
                  <PayPalScriptProvider
                    options={{
                      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                      currency: "USD",
                    }}
                  >
                    <PayPalButtons
                      onClick={() => setIsPaymentStarted(true)}
                      onCancel={() => setIsPaymentStarted(false)}
                      onError={() => setIsPaymentStarted(false)}
                      style={{
                        layout: "vertical",
                        color: "white",
                        shape: "pill",
                        height: 50,
                        label: "pay",
                      }}
                      createOrder={async () => {
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
                          body: JSON.stringify({
                            orderId: data.orderID,
                            email,
                          }),
                        });
                        const result = await res.json();
                        if (result.success) {
                          sessionStorage.setItem("just_purchased", "true");
                          router.push(`/success?orderId=${result.orderId}`);
                        } else {
                          setErrorMsg("Payment error, please contact support.");
                          setIsPaymentStarted(false);
                        }
                      }}
                    />
                  </PayPalScriptProvider>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 flex-shrink-0 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            Encrypted & Secure • {new Date().getFullYear()}
          </div>
        </div>
      </div>
      {/* قسم الصورة (خلفية في الموبايل، وجانبية في الديسك توب) */}
      <div className="absolute inset-0 lg:relative lg:w-1/2 lg:rounded-l-[100px] overflow-hidden animate-pulse-shadow z-0">
        <Image
          src="/author.png"
          alt="Checkout"
          fill
          className="object-cover"
          style={{ objectPosition: "center" }}
          priority
        />
        {/* طبقة تغشية لضمان قراءة البيانات */}
        <div className="absolute inset-0 bg-black/70 lg:hidden" />
      </div>

      <style jsx global>{`
        @keyframes pulse-shadow {
          0%,
          100% {
            box-shadow: -20px 0 50px rgba(220, 38, 38, 0.2);
          }
          50% {
            box-shadow: -30px 0 70px rgba(220, 38, 38, 0.4);
          }
        }
        .animate-pulse-shadow {
          animation: pulse-shadow 4s ease-in-out infinite;
        }
        @keyframes shine {
          0% {
            transform: translate(-100%, -100%) rotate(12deg);
          }
          100% {
            transform: translate(100%, 100%) rotate(12deg);
          }
        }
        @keyframes tilt {
          0%,
          50%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1deg);
          }
          75% {
            transform: rotate(-1deg);
          }
        }
        @keyframes glint {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-shine {
          animation: shine 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-tilt {
          animation: tilt 10s linear infinite;
        }
        .animate-glint {
          animation: glint 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
