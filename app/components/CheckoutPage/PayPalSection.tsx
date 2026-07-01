import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const PayPalSection = ({
  isLoaded,
  email,
  userId,
  setIsPaymentStarted,
  setErrorMsg,
  router,
}: any) => (
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
          onClick={() => {
            setErrorMsg("");
            setIsPaymentStarted(true);
          }}
          onCancel={() => setIsPaymentStarted(false)}
          onError={() => {
            setIsPaymentStarted(false);
            setErrorMsg("Payment error.");
          }}
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
              body: JSON.stringify({ email, userId }),
            });
            const data = await res.json();
            if (!res.ok) {
              setErrorMsg(data.error || "Failed");
              setIsPaymentStarted(false);
              throw new Error(data.error);
            }
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
              router.push(`/success?orderId=${result.orderId}`);
            } else {
              setErrorMsg("Payment error.");
              setIsPaymentStarted(false);
            }
          }}
        />
      </PayPalScriptProvider>
    )}
  </div>
);
