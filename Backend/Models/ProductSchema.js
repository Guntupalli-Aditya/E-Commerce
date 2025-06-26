const mongoose = require("mongoose");
const categorys = require("./CategorySchema");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
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
    category: {
      type: mongoose.ObjectId,
      ref: "categorys",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
    createdBy: {
      type: mongoose.ObjectId,
      ref: "users", // Reference to the UserSchema
      required: true, // Ensure every product is tied to an admin
    },
  },
  { timestamps: true },
  { collection: "productsses" }
);

module.exports = mongoose.model("productsses", ProductSchema);