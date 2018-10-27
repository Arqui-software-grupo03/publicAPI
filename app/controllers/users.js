
import User from '../models/users.js'
import mongoose from 'mongoose';


class UsersControllers {
    /* eslint-enable no-param-reassign */

    async all(ctx) {
        mongoose.connection.db.dropCollection('users', function (err, result) {console.log(err, result)});

        const user = new User({username: 'hola21', password: 'chao'})
        await user.save();

        // const user2 = new User({ username: 'hola23', password: 'chao' })
        // await user2.save();

        // const user2 = await User.find({ username: 'hola2' });

        ctx.body = await User.find();
    }

    /* eslint-enable no-param-reassign */
}

export default new UsersControllers();
