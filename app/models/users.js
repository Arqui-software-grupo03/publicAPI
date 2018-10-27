import mongoose, { Schema } from 'mongoose';
// import bcrypt from 'bcrypt';


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


//hashing a password before saving it to the database
// UserSchema.pre('save', function (next) {
//     bcrypt.hash(this.password, 10, function (err, hash) {
//         if (err) {
//             return next(err);
//         }
//         this.password = hash;
//         next();
//     })
// });


// export default UserSchema;

// require plugins
// UserSchema.plugin(bcrypt); // automatically bcrypts passwords
// UserSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
// UserSchema.plugin(mongooseStringQuery); // enables query capabilities (e.g. ?foo=bar)

// UserSchema.index({ email: 1, username: 1 }); // compound index on email + username

export default mongoose.model('User', UserSchema); // export model for use