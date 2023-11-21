import asyncHandler from "express-async-handler"
import Message from "../models/messageGroup.model.js"
import Chat from '../models/group.model.js';
import User from '../models/user.model.js';

/*
    @description     Get all Messages
    @route           GET /api/message-group/:chatId
    @access          Protected
*/
export const allMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ group: req.params.chatId })
            .populate("sender", "firstname email")
            .populate("group");
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

/*
    @description     Create New Message
    @route           POST /api/message-group/
    @access          Protected
*/
export const sendMessage = asyncHandler(async (req, res) => {
    const { text, chatId } = req.body;

    if (!text || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        text: text,
        group: chatId,
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "firstname avatar");//.execPopulate();
        message = await message.populate("group");//.execPopulate();

        message = await User.populate(message, {
            path: "group.members",
            select: "firstname email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

