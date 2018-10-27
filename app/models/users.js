import mongoose, { Schema } from 'mongoose';


export const UserSchema = new Schema(
    {
        // email: {
        //     type: String,
        //     lowercase: true,
        //     trim: true,
        //     index: true,
        //     unique: true,
        //     // required: true,
        // },
        username: {
            type: String,
            lowercase: true,
            trim: true,
            index: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            bcrypt: true,
            select: false,
        },
        // name: {
        //     type: String,
        //     trim: true,
        //     // required: true,
        // },
        // admin: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    { collection: 'users' },
);

export default mongoose.model('User', UserSchema); // export model for use