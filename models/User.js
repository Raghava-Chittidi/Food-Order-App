const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: false,
  },
  address1: {
    type: String,
    required: false,
  },
  address2: {
    type: String,
    required: false,
  },
  postal: {
    type: Number,
    required: false,
  },
  cart: {
    type: {
      cart: [
        {
          id: { type: mongoose.Types.ObjectId, ref: "MenuItem" },
          quantity: Number,
        },
      ],
      totalItems: Number,
      totalPrice: Number,
    },
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
