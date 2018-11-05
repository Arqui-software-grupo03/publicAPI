import axios from 'axios';

const dir = 'http://topics:8080/topics';


class TopicsControllers {
    /* eslint-disable no-param-reassign */

    async create(ctx) {
        const ans = await axios.post(`${dir}/`, ctx.request.body);
        ctx.body = ans.data;
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
        const ans = await axios.post(`${dir}/${ctx.params.id}/post_ids/`, ctx.request.body);
        ctx.body = ans.data;
    }

    async deleteCategorization(ctx) { // tampoco. probklema de la apitopics?
        const ans = await axios.delete(`${dir}/${ctx.params.id}/post_ids/${ctx.params.postId}/`);
        ctx.body = ans.data;
    }

    async listPosts(ctx) {
        const ans = await axios.get(`${dir}/${ctx.params.id}/post_ids`);
        ctx.body = ans.data;
    }

    async subscribe(ctx) {
        const ans = await axios.post(`${dir}/${ctx.params.id}/subscribers/`, ctx.request.body);
        ctx.body = ans.data;
    }

    async unsubscribe(ctx) {
        const ans = await axios.delete(`${dir}/${ctx.params.id}/subscribers/${ctx.params.userId}/`);
        ctx.body = ans.data;
    }



    /* eslint-enable no-param-reassign */
}

export default new TopicsControllers();
