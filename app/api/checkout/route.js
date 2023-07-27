import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
  const { items, userId, billingInfo } = await req.json();

  let success_url = `${process.env.API_URL}/cart?success=true`;
  if (userId === "GUEST") {
    success_url = `${process.env.API_URL}/checkout/payment`;
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    metadata: { billingInfo: JSON.stringify(billingInfo) },
    line_items: items.map((item) => {
      return {
        price_data: {
          currency: "sgd",
          product_data: {
            name: item.title,
            metadata: { id: item.id },
          },
          unit_amount: parseFloat((item.price * 100).toFixed(2)),
        },
        quantity: item.quantity,
      };
    }),
    success_url: success_url,
    cancel_url: `${process.env.API_URL}/checkout?success=false`,
    client_reference_id: userId,
  });

  return NextResponse.json({ url: session.url });
};
