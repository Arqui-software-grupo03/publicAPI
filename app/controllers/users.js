
import User from '../models/users.js'
import mongoose from 'mongoose';

import axios from 'axios';

const dir = 'http://loaclhost:8000/users';


class UsersControllers {
    /* eslint-enable no-param-reassign */
    

    async all(ctx) {
        // mongoose.connection.db.dropCollection('users', function (err, result) {console.log(err, result)});

        // const user = new User({username: 'hola21', password: 'chao'})
        // await user.save();

        ctx.body = await User.find();

        // const ans = await axios.get(`${dir}`);
        // ctx.body = ans;
    }

    async create(ctx) {
        // mongoose.connection.db.dropCollection('users', function (err, result) { console.log(err, result) });
        try {
            const user = new User(ctx.request.body);
            await user.save();
            ctx.body = await User.findOne({ _id: user._id });
            // const ans = await axios.post(`${dir}`, ctx.request.body);
        } catch (e) {
            ctx.body = e;
        }
    }

    async update(ctx) {
        try {
            const user = await User.findOne({ _id: ctx.params.id }).select('password username email').exec();
            user.username = ctx.request.body.username || user.username;
            user.email = ctx.request.body.email || user.email;
            user.password = ctx.request.body.password || user.password;
            ctx.body = await User.findOne({ _id: ctx.params.id });
        } catch (e) {
            ctx.body = e;
        }
    }

    async show(ctx) {
        try {
            const user = await User.findOne({ _id: ctx.params.id });
            ctx.body = user;
        } catch (e) {
            ctx.body = e;
        }
    }

    async delete(ctx) {
        try {
            await User.remove({ _id: ctx.params.id });
            ctx.body = { message: 'success' };
        } catch (e) {
            ctx.body = e;
        }
    }

    async currentUser(ctx) {
        try {
            const _id = ctx.session.userId;
            ctx.body = await User.findOne({ _id });
        } catch (e) {
            ctx.body = e;
        }
    }

    // async followers(ctx) {
    //     const ans = await axios.get(`${dir}/${ctx.params.email}/followers`);
    //     ctx.body = ans;
    // }

    // async followed(ctx) {
    //     const ans = await axios.get(`${dir}/${ctx.params.email}/followed`);
    //     ctx.body = ans;
    // }

    async follow(ctx) {
        try {
            // const user = await User.find({ _id: ctx.body.id });
            await User.updateOne(
                { _id: ctx.params.id },
                { $push: { followers: ctx.session.userId } } // user harcoded
            );
            ctx.body = { message: 'success' };
        } catch (e) {
            ctx.body = e;
        }
    }

    async unfollow(ctx) {
        try {
            // const user = await User.find({ _id: ctx.body.id });
            console.log('hoola', ctx.params.id);
            await User.updateOne(
                { _id: ctx.params.id }, 
                { $pullAll: { followers: [ ctx.session.userId ] } }
            );
            ctx.body = { message: 'success' };
        } catch (e) {
            ctx.body = e;
        }
    }


    /* eslint-enable no-param-reassign */
}

export default new UsersControllers();
