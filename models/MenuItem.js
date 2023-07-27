const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const menuItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  vegetarian: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
});

export default mongoose.models.MenuItem ||
  mongoose.model("MenuItem", menuItemSchema);
