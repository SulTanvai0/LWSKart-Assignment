import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const ordersSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    invoiceId: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "oder received",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false, timestamps: true }
);

export const ordersModel =
  mongoose.models.ordersList ?? mongoose.model("ordersList", ordersSchema);
