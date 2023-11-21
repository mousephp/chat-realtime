import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
    {
        isGroupChat: { 
            type: Boolean, 
            default: false 
        },
        name: {
            type: String,
            trim: true
        },
        picture: {
            type: String,
            trim: true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MessageGroup",
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true,
    }
);

const Group = mongoose.model('Group', groupSchema);

export default Group;