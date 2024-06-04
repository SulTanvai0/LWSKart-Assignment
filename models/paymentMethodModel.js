import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const paymentMethodsSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    expiry: {
      type: String,
      required: true,
    },
    last4: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 4,
    },
  },
  { versionKey: false, timestamps: true }
);

export const paymentMethodsModel =
  mongoose.models.paymentMethods ??
  mongoose.model("paymentMethods", paymentMethodsSchema);
