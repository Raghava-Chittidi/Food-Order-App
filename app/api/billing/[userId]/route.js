import User from "@/models/User";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const userId = params.userId;
  const { city, address1, address2, postal } = await req.json();
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ error: "User not found!" }, { status: 422 });
  }
  user.city = city;
  user.address1 = address1;
  user.address2 = address2;
  user.postal = postal;
  await user.save();
  return NextResponse.json({ message: "Success!" }, { status: 200 });
};
