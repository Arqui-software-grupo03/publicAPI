import axios from 'axios';

const dir = 'http://loaclhost:8000/topics';


class TopicsControllers {
    /* eslint-disable no-param-reassign */

    async create(ctx) {
        const ans = await axios.post(`${dir}`, ctx.request.body);
        ctx.body = ans;
    }

    async delete(ctx) {
        const ans = await axios.delete(`${dir}/${ctx.params.id}`);
        ctx.body = ans;
    }

    async show(ctx) {
        const ans = await axios.get(`${dir}/${ctx.params.id}`);
        ctx.body = ans;
    }

    async all(ctx) {
        const ans = await axios.get(`${dir}`);
        ctx.body = ans;
    }
    
    async categorize(ctx) {
        const ans = await axios.post(`${dir}/${ctx.params.id}/post_ids`, ctx.request.body);
        ctx.body = ans;
    }

    async deleteCategorization(ctx) {
        const ans = await axios.delete(`${dir}/${ctx.params.id}/post_ids/${ctx.params.postId}`);
        ctx.body = ans;
    }

    async listPosts(ctx) {
        const ans = await axios.get(`${dir}/${ctx.params.id}/post_ids`);
        ctx.body = ans;
    }

    async subscribe(ctx) {
        const ans = await axios.post(`${dir}/${ctx.params.id}/subscribers`, ctx.request.body);
        ctx.body = ans;
    }

    async unsubscribe(ctx) {
        const ans = await axios.delete(`${dir}/${ctx.params.id}/subscribers/${ctx.params.userId}`);
        ctx.body = ans;
    }



    /* eslint-enable no-param-reassign */
}

export default new TopicsControllers();
