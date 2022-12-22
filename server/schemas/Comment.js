import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        required: false,
        default: [],
    },
    isEdited: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentSchema);