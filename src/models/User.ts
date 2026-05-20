// src/models/User.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["customer", "seller"], // Sirf in do mein se koi ek
    default: "customer" 
  }
});

export default mongoose.models.User || mongoose.model("User", userSchema);