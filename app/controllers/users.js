import jwt from 'jsonwebtoken';
import User from '../models/users.js'
import Id from '../models/ids'

// import mongoose from 'mongoose';

// import axios from 'axios';

// const dir = 'http://loaclhost:8000/users';


class UsersControllers {
    /* eslint-enable no-param-reassign */
    

    async all(ctx) {
        // mongoose.connection.db.dropCollection('users', function (err, result) {console.log(err, result)});

        // const user = new User({username: 'hola21', password: 'chao'})
        // await user.save();
        // await User.remove({});
        // await Id.remove({});
        ctx.body = await User.find();

        // const ans = await axios.get(`${dir}`);
        // ctx.body = ans;
    }

    async create(ctx) {
        try {
            const user = new User(ctx.request.body);
            await user.save();
            ctx.body = await User.findOne({ id: user.id });
            // const ans = await axios.post(`${dir}`, ctx.request.body);
        } catch (e) {
            ctx.body = e;
        }
    }

    async update(ctx) {
        try {
            const allowed = ['username', 'email', 'password'];
            const body = {};

            allowed.forEach(key => {
                if (ctx.request.body[key]) {
                    body[ key ] = ctx.request.body[ key ];
                }
            });

            await User.update({ id: ctx.params.id }, { $set: body });
            // const user = await User.findOne({ id: ctx.params.id }).select('password username email').exec();
            ctx.body = await User.findOne({ id: ctx.params.id });
        } catch (e) {
            ctx.body = e;
        }
    }

    async show(ctx) {
        try {
            const user = await User.findOne({ id: ctx.params.id });
            ctx.body = user;
        } catch (e) {
            ctx.body = e;
        }
    }

    async delete(ctx) {
        try {
            await User.remove({ id: ctx.params.id });
            ctx.body = { message: 'success' };
        } catch (e) {
            ctx.body = e;
        }
    }

    async currentUser(ctx) {
        try {
            // const id = ctx.session.userId;
            const token = ctx.request.header.authorization.replace(/^Bearer\s/, '');;
            try {
                const decoded = jwt.verify(token, 'MyVerySecretKey');
                const email = decoded.data;
                const user = await User.findOne({email});
                ctx.body = user;
              } catch(err) {
                // err
                console.log(err);
              }
        } catch (e) {
            ctx.body = e;
        }
    }
    async currentUserByEmail(ctx) {
        try {
            const email = ctx.request.body.email;
            ctx.body = await User.find({ email: email });
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
            // const user = await User.find({ id: ctx.body.id });
            await User.updateOne(
                { id: ctx.params.id },
                { $push: { followers: ctx.session.userId } } 
            );
            ctx.body = { message: 'success' };
        } catch (e) {
            ctx.body = e;
        }
    }

    async unfollow(ctx) {
        try {
            // const user = await User.find({ id: ctx.body.id });
            await User.updateOne(
                { id: ctx.params.id }, 
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
