import axios from 'axios';
import { dirPosts as dir } from '../config';
// const dir = 'http://posts:8100/posts';
// const dir = 'http://172.28.0.3:8100/posts';

class PostsControllers {

    async all(ctx) {
        const ans = await axios.get(`${dir}`);
        ctx.body = ans.data;
    }


    async findById(ctx) {
        const ans = await axios.get(`${dir}/${ctx.params.id}`);
        ctx.body = ans.data;
    }


    async add(ctx) {
        try {
            const ans = await axios.post(`${dir}/`, ctx.request.body);
            ctx.body = ans.data;
        } catch(err) {
            console.log('Error adding post')
        }
    }


    async update(ctx) {
        const ans = await axios.patch(`${dir}/${ctx.params.id}/`, ctx.request.body);
        ctx.body = ans.data;
    }


    async delete(ctx) { 
        const ans = await axios.delete(`${dir}/${ctx.params.id}/`);
        ctx.body = ans.data;
    }

    async allAnswers(ctx) {
        const ans = await axios.get(`${dir}/${ctx.params.id}/answers`);
        ctx.body = ans.data;
    }

    async addAnswer(ctx) {
        const ans = await axios.post(`${dir}/${ctx.params.id}/answers/`, ctx.request.body);
        ctx.body = ans.data;
    }

    async updateAnswer(ctx) {
        const ans = await axios.patch(`${dir}/${ctx.params.id}/answers/${ctx.params.answerId}/`, ctx.request.body);
        ctx.body = ans.data;
    }

    async deleteAnswer(ctx) {
        const ans = await axios.delete(`${dir}/${ctx.params.id}/answers/${ctx.params.answerId}/`);
        ctx.body = ans.data;
    }

    async getUserPosts(ctx) {
        try {
            const posts = await axios.get(`${dir}/user/${ctx.params.id}/`);
            ctx.body = posts.data;
        } catch(err) {
            // console.log(err);
        }
    }

    /* eslint-enable no-param-reassign */
}

export default new PostsControllers();
