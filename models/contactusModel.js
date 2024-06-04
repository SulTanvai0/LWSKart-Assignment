import mongoose, { Schema } from "mongoose";

const contactUsSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    message: {
      type: String,
    },
  },
  { versionKey: 0, timestamps: 0 }
);

export const contactUsModel =
  mongoose.models.contactUs ?? mongoose.model("contactUs", contactUsSchema);
