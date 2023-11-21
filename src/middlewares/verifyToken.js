import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';

export const protect = catchAsync(async (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    let token;

    if (tokenHeader && tokenHeader.startsWith('Bearer')) {
        token = tokenHeader.split(' ')[1];
    }

    if (!token) next(new AppError('You have to login before accessing it.'));

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id).select('+password');
    if (!user) next(new AppError('There is no user with this ID.'));

    req.user = user;
    next();
});