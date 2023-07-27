import Order from "@/models/Order";
import connect from "@/util/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  await connect;
  const userId = params.userId;
  const orderId = params.orderId;

  let order;
  try {
    order = await Order.findById(orderId).populate("items.id");
    if (!order) {
      return NextResponse.json(
        { error: "Order ID does not exist!" },
        { status: 422 }
      );
    }
    if (order.userId.toString() !== userId) {
      return NextResponse.json({ error: "Not authorised!" }, { status: 403 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }

  return NextResponse.json({ order }, { status: 200 });
};
