
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const CartItem = require("./models/CartItem");

const app = express();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect("mongodb://127.0.0.1:27017/cartDB", {
  
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


app.get("/api/cart", async (req, res) => {
  const items = await CartItem.find();
  res.json(items);
});

app.post("/api/cart", async (req, res) => {
  try {
    const product = req.body;

    
    let existing = await CartItem.findOne({ id: product.id });
    if (existing) {
      existing.qty += 1;
      await existing.save();
      return res.status(200).json(existing);
    }

    const newItem = new CartItem(product);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
});


app.delete("/api/cart/:id", async (req, res) => {
  try {
    await CartItem.deleteOne({ id: req.params.id });
    res.status(200).json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item" });
  }
});


app.delete("/api/cart", async (req, res) => {
  try {
    await CartItem.deleteMany();
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
