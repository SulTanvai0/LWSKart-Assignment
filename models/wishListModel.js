import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const wishListSchema = new Schema(
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

export const wishListsModel =
  mongoose.models.wishLists ?? mongoose.model("wishLists", wishListSchema);
