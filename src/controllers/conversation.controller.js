import catchAsync from '../utils/catchAsync.js';
import Conversation from '../models/conversation.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export const getAllConversations = catchAsync(async (req, res) => {
    const user = req.user;

    const conversations = await Conversation.find({
        $or: [{ senderId: ObjectId(user._id) }, { receiverId: ObjectId(user._id) }],
    });

    res.status(200).json({
        status: 'success',
        length: conversations.length,
        data: { conversations },
    });
});

export const createConversation = catchAsync(async (req, res) => {
    const user = req.user;
    const { name, receiverId } = req.body;

    const newConversation = await Conversation.create({
        name: name,
        senderId: user._id,
        receiverId,
    });

    const conversation = await Conversation.findById(newConversation._id);

    res.status(200).json({
        status: 'success',
        data: { isCreated: true, conversation },
    });
});

const getCoversation = catchAsync(async (req, res) => {
    const user = req.user;
    const { receiverId } = req.body;

    const conversation = await Conversation.findOne({
        $or: [
            {
                receiverId: user._id,
                senderId: receiverId,
            },
            {
                receiverId,
                senderId: user._id,
            },
        ],
    });

    return conversation;
});

export const getOrCreateConversation = catchAsync(async (req, res) => {
    const conversation = await getCoversation(req, res);

    if (conversation) {
        return res.status(200).json({
            status: 'success',
            data: { isCreated: false, conversation },
        });
    }

    createConversation(req, res);
});

export const updateConversation = catchAsync(async (req, res) => { });

export const deleteConversation = catchAsync(async (req, res) => {
    await Conversation.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        message: 'Delete conversation successfully!',
    });
});