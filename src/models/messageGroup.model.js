import mongoose from 'mongoose';

const messageGroupSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    text: { 
      type: String, 
      trim: true 
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    images: [String],
    files: [
      {
        name: String,
        path: String
      }
    ],
  },
  { timestamps: true }
);

const MessageGroup = mongoose.model('MessageGroup', messageGroupSchema);

export default MessageGroup;
