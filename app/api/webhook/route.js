import Order from "@/models/Order";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const getCartItems = async (line_items) => {
  return new Promise((resolve, reject) => {
    let cartItems = [];

    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const id = product.metadata.id;

      cartItems.push({
        title: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        id,
      });

      if (cartItems.length === line_items?.data.length) {
        resolve(cartItems);
      }
    });
  });
};

export const POST = async (req, res) => {
  try {
    const rawBody = await req.json();

    if (rawBody.type === "checkout.session.completed") {
      const session = rawBody.data.object;
      const line_items = await stripe.checkout.sessions.listLineItems(
        rawBody.data.object.id
      );
      const orderItems = await getCartItems(line_items);
      const amountPaid = session.amount_total / 100;
      const userId = session.client_reference_id;
      const paymentId = session.payment_intent;
      if (userId !== "GUEST") {
        const allFoodItems = orderItems.filter((item) => item.id !== undefined);

        let totalPriceOfItems = 0;
        for (const item of allFoodItems) {
          totalPriceOfItems += item.price * item.quantity;
        }
        const items = allFoodItems.map((item) => {
          return {
            id: item.id,
            quantity: item.quantity,
          };
        });

        const billingInfo = JSON.parse(session.metadata.billingInfo);

        const orderData = {
          userId,
          items,
          totalPriceOfItems: +totalPriceOfItems.toFixed(2),
          deliveryFee: orderItems.find((item) => item.title === "Delivery Fee")
            .price,
          paymentInfo: {
            paymentId,
            amountPaid,
          },
          billingInfo,
        };
        const order = new Order(orderData);
        await order.save();
        const user = await User.findById(userId);
        user.cart = { cart: [], totalItems: 0, totalPrice: 0 };
        await user.save();
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Webhook error!" }, { status: 400 });
  }

  return NextResponse.json({ message: "Success!" }, { status: 200 });
};
