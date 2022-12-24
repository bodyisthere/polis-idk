import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    messages: {
      type: Array,
      default: [],
    },
    members: {
      type: Array,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", conversationSchema);
