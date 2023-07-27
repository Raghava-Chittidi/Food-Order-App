import Order from "@/models/Order";
import User from "@/models/User";
import connect from "@/util/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  await connect;
  const TOTAL_ITEMS_PER_PAGE = 10;
  const page = +new URL(req.url).searchParams.get("page") || 1;
  const offset = (page - 1) * TOTAL_ITEMS_PER_PAGE;
  const userId = params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json(
      { error: "User does not exist!" },
      { status: 401 }
    );
  }
  let orders;
  let totalPages;
  try {
    orders = await Order.find({ userId })
      .sort("-createdAt")
      .skip(offset)
      .limit(TOTAL_ITEMS_PER_PAGE);

    const count = await Order.count({ userId });
    totalPages = Math.ceil(count / 10);
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ orders, totalPages }, { status: 200 });
};
