import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export const POST = async (req, res) => {
  const { token } = await req.json();
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const data = await User.findById(userId).select(
      "cart city address1 address2 postal"
    );
    const userData = {
      ...decodedToken,
      cart: data.cart,
      city: data.city,
      address1: data.address1,
      address2: data.address2,
      postal: data.postal,
    };
    return NextResponse.json({ userData }, { status: 200 });
  } catch (err) {
    // console.log(err);
    return NextResponse.json({ error: err }, { status: 401 });
  }
};
