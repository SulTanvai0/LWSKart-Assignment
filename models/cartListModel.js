import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const cartListSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    productId: {
      type: ObjectId,
      ref: "products",
      required: true,
    },
  },
  { versionKey: 0, timeseries: 0 }
);

export const cartLists =
  mongoose.models.cartLists ?? mongoose.model("cartLists", cartListSchema);
