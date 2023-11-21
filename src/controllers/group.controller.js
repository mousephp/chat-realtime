
import asyncHandler from "express-async-handler"
import Chat from "../models/group.model.js"
import User from "../models/user.model.js"

/*
    @description     Create or fetch One to One Chat
    @route           POST /api/chat/
    @access          Protected
*/
export const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { members: { $elemMatch: { $eq: req.user._id } } },
            { members: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("members", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "firstname avatar email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            name: "sender",
            isGroupChat: false,
            members: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "members",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

/*
    @description     Fetch all chats for a user
    @route           GET /api/chat/
    @access          Protected
*/
export const fetchChats = asyncHandler(async (req, res) => {
    console.log("req.user._id::"+req.user._id)
    try {
        Chat.find({ members: { $elemMatch: { $eq: req.user._id } } })
            .populate("members", "-password")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "firstname email",
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

/*
    @description     Create New Group Chat
    @route           POST /api/chat/group
    @access          Protected
*/
export const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.members || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
    }

    var members = JSON.parse(req.body.members);

    if (members.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }

    members.push(req.user);

    try {
        const groupChat = await Chat.create({
            name: req.body.name,
            members: members,
            isGroupChat: true,
            admin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("members", "-password")
            .populate("admin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

/*
    @desc    Rename Group
    @route   PUT /api/chat/rename
    @access  Protected
*/
export const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, name } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            name: name,
        },
        {
            new: true,
        }
    )
        .populate("members", "-password")
        .populate("admin", "-password");
    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
});

/*
    @desc    Remove user from Group
    @route   PUT /api/chat/groupremove
    @access  Protected
*/
export const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { members: userId },
        },
        {
            new: true,
        }
    )
        .populate("members", "-password")
        .populate("admin", "-password");

    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
});

/*
    @desc    Add user to Group / Leave
    @route   PUT /api/chat/groupadd
    @access  Protected
*/
export const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { members: userId },
        },
        {
            new: true,
        }
    )
        .populate("members", "-password")
        .populate("admin", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
});

