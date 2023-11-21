import mongoose from "mongoose"
const Schema = mongoose.Schema;

const roleSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: [50, 'Tag name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: false,
        trim: true,
        maxLength: [100, 'Tag name cannot exceed 100 characters']
    },
    status: {
        type: String,
        required: [true, 'Please enter product seller'],
        enum: [
            'active',
            'inactive'
        ],
        default: 'inactive',
        message: 'Please select correct tag for product'
    }
}, { timestamps: true });

const Role = mongoose.model("role", roleSchema);

export default Role;