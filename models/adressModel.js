import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    name: {
      required: true,
      type: String,
    },
    phone: {
      required: true,
      type: String,
    },
    title: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
  { versionKey: 0, timestamps: 0 }
);

export const addressModel =
  mongoose.models.address ?? mongoose.model("address", addressSchema);
