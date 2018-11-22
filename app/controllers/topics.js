import axios from 'axios';
import { updateTopicSubscribers } from '../utils/firebase-cloud-messaging';
// import { dirTopics as dir } from '../config';

const dir = 'http://topics:8080/topics';
// const dir = 'http://172.28.0.4:8080/topics';

class TopicsControllers {
    /* eslint-disable no-param-reassign */

    async create(ctx) {
        const ifTopicExists = await axios.get(dir).then(e => e.data.filter(
            dict =>  dict.title === ctx.request.body.title && dict.description === ctx.request.body.description
        ).length > 0);
        if (!ifTopicExists) {
            try {
                const ans = await axios.post(`${dir}/`, ctx.request.body);
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
        updateTopicSubscribers(ctx.request.body);
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
            ctx.request.response.status = 400;
            ctx.request.response.message = 'Bad Request';
        }
    }

    async unsubscribe(ctx) {
        let response;
        try {
            response = await axios.get(`${dir}/${ctx.params.id}/subscribers`);
        } catch(err) {
            // console.log(err);
        } finally {
            if (response) {
                const newSubscribers = response.data.filter(user => user.user_id !== +ctx.params.userId);
                try {
                    // await axios.patch(`${dir}/${ctx.params.id}/subscribers/`, {'subscribers': newSubscribers});
                    ctx.body = newSubscribers;
                } catch(err) {
                    // console.log(err)
                }

            }
        }
        // } catch(err) {
        // const ans = await axios.delete(`${dir}/${ctx.params.id}/subscribers/${ctx.params.userId}/`);
        // ctx.body = ans.data;
        // }
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
