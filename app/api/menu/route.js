import MenuItem from "@/models/MenuItem";
import connect from "@/util/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  await connect;
  let menu;
  try {
    menu = await MenuItem.find();
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ menu }, { status: 200 });
};
