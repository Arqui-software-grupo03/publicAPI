import mongoose, { Schema } from 'mongoose';


export const IdSchema = new Schema(
    {
        userId: {
            type: Number,
            required: [ true, "can't be blank" ], 
            index: true,
            unique: true
        },
    },
    { collection: 'ids' },
);


export default mongoose.model('Id', IdSchema); // export model for use