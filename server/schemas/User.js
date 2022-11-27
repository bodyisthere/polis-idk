import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    friendList: {
      type: Array,
      required: false,
      default: [],
    },
    status: {
      type: String,
      required: false,
    },
    avatarUrl: {
      type: String,
      required: false,
      default: "/no-photo.jpg",
    },
    posts: {
      type: Array,
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
