import axios from 'axios';
import { updateRealTimeDatabase } from '../utils/firebase-cloud-messaging';
import users, { UserSchema } from '../models/users';

// const dir = 'http://topics:8080/topics';
const dir = 'http://172.28.0.2:8080/topics';

class TopicsControllers {
    /* eslint-disable no-param-reassign */

    async create(ctx) {
        const ifTopicExists = await axios.get(dir).then(e => e.data.filter(
            dict =>  dict.title === ctx.request.body.title && dict.description === ctx.request.body.description
        ).length > 0);
        if (!ifTopicExists) {
            const userId = UserSchema.decryptToken(ctx.request.header.authorization.replace(/^Bearer\s/, '')).id;
            const userEmail = await users.findOne({id: userId}).then(user => user.email);
            try {
                const ans = await axios.post(`${dir}/`, ctx.request.body);
                try {
                    updateRealTimeDatabase(`/topics/${ans.data.topic_id}`, userEmail);
                } catch (err) {
                    console.log(err);
                }
                ctx.body = ans.data;
            } catch(err) {
                ctx.request.response.status = 400;
                ctx.request.response.message = 'Bad Request: Either title or description missing';
            }
            
        } else {
            ctx.request.response.status = 400;
            ctx.request.response.message = 'Topic and description already exist. Try another name and/or description'
        }
    }

    async delete(ctx) { // not working
        const ans = await axios.delete(`${dir}/${ctx.params.id}/`);
        ctx.body = ans.data;
    }

    async show(ctx) {
        const ans = await axios.get(`${dir}/${ctx.params.id}`);
        ctx.body = ans.data;
    }

    async all(ctx) {
        const ans = await axios.get(`${dir}`);
        ctx.body = ans.data;
    }

    async categorize(ctx) {
        const ans = await axios.post(`${dir}/${ctx.params.id}/posts/`, ctx.request.body);
        ctx.body = ans.data;
    }

    async deleteCategorization(ctx) { // tampoco. probklema de la apitopics?
        const ans = await axios.delete(`${dir}/${ctx.params.id}/posts/${ctx.params.postId}/`);
        ctx.body = ans.data;
    }

    async listPosts(ctx) {
        const ans = await axios.get(`${dir}/${ctx.params.id}/posts`);
        ctx.body = ans.data;
    }

    async subscribe(ctx) {
        try {
            const ans = await axios.post(`${dir}/${ctx.params.id}/subscribers/`, ctx.request.body);
            ctx.body = ans.data;
        } catch(err) {
            // console.log(err);
        }
    }

    async unsubscribe(ctx) {
        const ans = await axios.delete(`${dir}/${ctx.params.id}/subscribers/${ctx.params.userId}/`);
        ctx.body = ans.data;
    }

    async subscribers(ctx) {
        try {
            const subscribersArray = await axios.get(`${dir}/${ctx.params.id}/subscribers`);
            ctx.body = subscribersArray.data;
        } catch(err) {
            console.log(err);
        }
    }


    /* eslint-enable no-param-reassign */
}

export default new TopicsControllers();
