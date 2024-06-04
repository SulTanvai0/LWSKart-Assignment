const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Preorder"],
      default: "In Stock",
    },
    inStock: {
      type: Number,
    },
    quantity: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    SKU: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    detailDescription: {
      type: [String],
      required: true,
    },
    isTrending: {
      type: Boolean,
      required: true,
    },
    NewProduct: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    photosArray: {
      type: [String],
      default: [],
    },
    size: {
      type: [Object],
      default: [],
    },
  },
  { timestamps: 0, versionKey: 0 }
);

const ProductModel =
  mongoose.models.products ?? mongoose.model("products", productSchema);

module.exports = ProductModel;
