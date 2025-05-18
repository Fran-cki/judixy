import { useEffect, useRef } from "react";

const PayPalButton = () => {
  const paypalRef = useRef();

  useEffect(() => {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", // Montant à payer
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Paiement effectué par ${details.payer.name.given_name}`);
            console.log(details);
          });
        },
        onError: (err) => {
          console.error("Erreur PayPal : ", err);
        },
      }).render(paypalRef.current);
    }
  }, []);

  return <div ref={paypalRef}>Teste</div>;
};

export default PayPalButton;
