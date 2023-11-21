import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            maxlength: 20,
            minlength: 2,
            trim: true,
        },
        lastname: {
            type: String,
            maxlength: 20,
            minlength: 2,
            trim: true,
        },
        email: {
            match: /^\S+@\S+\.\S+$/,
            trim: true,
            lowercase: true,
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        avatar: {
            type: String,
            default:
                'http://res.cloudinary.com/demo/image/upload/v1675397560/docs_uploading_example/images_grzbhz.png',
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [5, 'Length of password must be greater than 8'],
            select: false,
        },
        passwordConfirm: {
            type: String
        },
        passwordChangedAt: {
            type: Date,
            select: false,
        },
        passwordResetToken: String,
        passwordResetExpired: Date,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "role"
            }
        ]
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
});

userSchema.pre('save', async function (next) {
    if (!this.$isNew && this.isModified('password'))
        this.passwordChangedAt = Date.now();

    next();
});

userSchema.methods.correctPassword = async function (password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpired = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;