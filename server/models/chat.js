import mongoose from "mongoose";

const chatschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatschema) || mongoose.models.Chat ;

export default Chat;
