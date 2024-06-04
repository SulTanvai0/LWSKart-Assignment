import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    products: {
      type: [Object],
      ref: "products",
      required: true,
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    billingAddress: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Payment Done",
    },
    shippingCost: {
      type: Number,
      default: 110,
      required: true,
    },
    tax: {
      type: Number,
      default: 45,
      required: true,
    },
    paidFrom: {
      type: Object,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false, timestamps: true }
);

export const invoiceModel =
  mongoose.models.invoiceLists ?? mongoose.model("invoiceLists", invoiceSchema);
