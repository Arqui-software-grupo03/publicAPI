import mongoose, { Schema } from 'mongoose';


export const UserSchema = new Schema(
    {
        email: {
            type: String,
            lowercase: true,
            required: [ true, "can't be blank" ], 
            match: [ /\S+@\S+\.\S+/, 'is invalid' ], 
            index: true
        },
        username: { 
            type: String, 
            lowercase: true, 
            required: [ true, "can't be blank" ], 
            match: [ /^[a-zA-Z0-9]+$/, 'is invalid' ], 
            index: true ,
            unique: true
        },
        password: {
            type: String,
            required: true,
            bcrypt: true,
            select: false
        },
        followers: { 
            type: [] 
        },
        posts: {
            type: []
        },
        topics: {
            type: []
        }
    },
    { collection: 'users' },
);

export default mongoose.model('User', UserSchema); // export model for use