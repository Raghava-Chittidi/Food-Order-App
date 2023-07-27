import MenuItem from "@/models/MenuItem";
import connect from "@/util/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  await connect;
  const {
    title,
    imageUrl,
    description,
    price,
    calories,
    veg,
    type,
    categories,
  } = await req.json();

  const newItem = new MenuItem({
    title,
    imageUrl,
    description,
    price,
    calories,
    vegetarian: veg,
    type,
    categories,
  });
  await newItem.save();

  return NextResponse.json(
    { message: "Added MenuItem Successfully!" },
    { status: 201 }
  );
};
