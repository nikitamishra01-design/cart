const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  image: String,
  desc: String,
  category: String,
  qty: { type: Number, default: 1 }
});

module.exports = mongoose.model("CartItem", cartItemSchema);
