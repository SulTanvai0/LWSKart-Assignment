import mongoose, { Schema } from "mongoose";

// Define the user schema
const userSchema = new Schema({
  fullName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true, // Add unique constraint for email
  },
  password: {
    type: String,
  },
  image: {
    type: String,
    default: "",
  },
});

// Create and export the user model
export const userModel =
  mongoose.models.users ?? mongoose.model("users", userSchema);
