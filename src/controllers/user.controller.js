import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import User from '../models/user.model.js';

/*
    @description     Get or Search all users
    @route           GET /api/user?search=
    @access          Public
*/
export const users = catchAsync(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    
    res.send(users);
});

export const getAllUsers = catchAsync(async (req, res) => {
    const user = req.user;
    const users = await User.find({ _id: { $ne: user._id } });

    res.status(200).json({
        status: 'success',
        length: users.length,
        data: { users },
    });
});

export const getUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: { user },
    });
});

export const updateUser = catchAsync(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
    });

    res.status(200).json({
        status: 'success',
        message: 'Update info successfully!',
        user,
    });
});

export const deleteUser = catchAsync(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
    });
});

export const deleteAllUsers = catchAsync(async (req, res) => {
    await User.deleteMany();

    res.status(204).json({
        status: 'success',
    });
});