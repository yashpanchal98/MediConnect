import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://imgs.search.brave.com/iWOUSGf_JhAAys2TRvELYP-nx4SA12c7437rYTqDQUo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2hvbWVw/YWdlLWZlYXR1cmUt/Y2FyZC9TdGlja2Vy/LVBORy5qcGc", // placeholder image
    },
    address: {
      type : Object,
      default : {line1: '', line2: ''}
    },
    gender: { type: String, default: "Not Selected" },
    dob: { type: String, default: "Not Selected" },
    phone: { type: String, default: "0000000000" },
  },
  { timestamps: true }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;