import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connect from "@/util/dbConnect";
import jwt from "jsonwebtoken";

export const POST = async (req, res) => {
  await connect;
  const { username, password } = await req.json();
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return NextResponse.json(
      { error: "Invalid credentials!" },
      { status: 422 }
    );
  }

  const isValid = await bcrypt.compare(password, existingUser.password);
  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid credentials!" },
      { status: 422 }
    );
  }

  const userData = {
    id: existingUser._id.toString(),
    name: existingUser.name,
    imageUrl: existingUser.imageUrl,
    cart: existingUser.cart,
    city: existingUser.city,
    address1: existingUser.address1,
    address2: existingUser.address2,
    postal: existingUser.postal,
  };

  const token = jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });

  return NextResponse.json(
    { message: "Login Successful!", token, userData },
    { status: 200 }
  );
};
