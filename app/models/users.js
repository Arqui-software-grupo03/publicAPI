import mongoose, { Schema } from 'mongoose';

// var mongoose = require('mongoose'),
import Id from '../models/ids.js'
// IdSchema = mongoose.model('Ids').schema

    // Role = require('./role.js'),


export const UserSchema = new Schema(
    {
        id: {
            type: Number,
            index: true,
            unique: true
        },
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
        }
    },
    { collection: 'users' },
);


UserSchema.pre('save', async function (next) {
    // Only increment when the document is new
    if (this.isNew) {
        const idObject = await Id.findOne();
        const userId = idObject.userId;
        this.id = userId;
        await Id.updateOne({ userId }, { $set: { userId: userId + 1 }} );
    } 
    next();
    
});

export default mongoose.model('User', UserSchema); // export model for use