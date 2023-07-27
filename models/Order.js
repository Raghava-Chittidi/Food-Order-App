const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const orderSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [
    {
      id: { type: mongoose.Types.ObjectId, ref: "MenuItem" },
      quantity: Number,
    },
  ],
  totalPriceOfItems: {
    type: Number,
    required: true,
  },
  GST: {
    type: Number,
    default: 0.07,
  },
  deliveryFee: {
    type: Number,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
  paymentInfo: {
    paymentId: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
  },
  billingInfo: {
    city: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
    postal: {
      type: Number,
      required: true,
    },
    instructions: {
      type: String,
    },
  },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
