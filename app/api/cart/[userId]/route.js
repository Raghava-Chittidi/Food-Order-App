import User from "@/models/User";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const userId = params.userId;
  const data = await req.json();
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ error: "User not found!" }, { status: 422 });
  }
  user.cart.cart = data.cart;
  user.cart.totalItems = data.totalItems;
  user.cart.totalPrice = data.totalPrice;
  await user.save();
  return NextResponse.json({ message: "Success!" }, { status: 200 });
};
