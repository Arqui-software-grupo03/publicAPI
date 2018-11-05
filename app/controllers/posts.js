import axios from 'axios';

const dir = 'http://arquitran_posts:8100/posts';

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
        const ans = await axios.post(`${dir}/`, ctx.request.body);
        ctx.body = ans.data;
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

    /* eslint-enable no-param-reassign */
}

export default new PostsControllers();
