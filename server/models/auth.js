import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  skills: { type: [String], default: [] },
  portfolio: { type: String },
  github: { type: String },
  linkedin: { type: String },
  joinedOn: { type: Date, default: Date.now },
});

export default mongoose.model("Users", userSchema);
