import catchAsync from '../utils/catchAsync.js';
import Message from '../models/message.model.js';


/*
    @description     Get all Messages
    @route           GET /api/message/:chatId
    @access          Protected
*/
export const allMessages = catchAsync(async (req, res) => {
    try {
        const messages = await Message.find();

        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

export const getMessagesByConversation = catchAsync(async (req, res) => {
    const limit = req.query.limit || 10;
    const skip = req.query.skip;

    const messages = await Message.find({
        conversationId: req.params.conversationId,
    })
        .sort('-createdAt')
        .skip(skip)
        .limit(limit);

    const length = messages.length;

    res.status(200).json({
        status: 'success',
        length,
        data: { isContinue: !!length, messages },
    });
});

export const createMessage = catchAsync(async (req, res) => {
    const user = req.user;

    const { conversationId, text } = req.body;

    const message = await Message.create({
        conversationId,
        senderId: user._id,
        text,
    });

    res.status(200).json({
        status: 'success',
        data: { message },
    });
});

// Update in the future
export const deleteMessages = catchAsync(async (req, res) => { });