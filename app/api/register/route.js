import User from "@/models/User";
import connect from "@/util/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req, res) => {
  await connect;
  const { name, imageUrl, username, password } = await req.json();
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ error: "Username is in use!" }, { status: 422 });
  }

  const hashedPw = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    imageUrl,
    username,
    password: hashedPw,
    city: null,
    address1: null,
    address2: null,
    postal: null,
    cart: { cart: [], totalItems: 0, totalPrice: 0 },
  });
  await user.save();

  const userData = {
    id: user._id.toString(),
    name: user.name,
    imageUrl: user.imageUrl,
    cart: user.cart,
    city: user.city,
    address1: user.address1,
    address2: user.address2,
    postal: user.postal,
  };

  const token = jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });

  return NextResponse.json(
    { message: "Registered Successfully!", token, userData },
    { status: 201 }
  );
};
