
class PostsControllers {


    /**
     * Get all cities
     * @param {ctx} Koa Context
     */
    async all(ctx) {
        ctx.body = {message: 'many posts'};
    }

    /**
     * Find a city
     * @param {ctx} Koa Context
     */
    async findById(ctx) {
        try {
            const city = await City.findById(ctx.params.id);
            if (!city) {
                ctx.throw(404);
            }
            ctx.body = city;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    /**
     * Add a city
     * @param {ctx} Koa Context
     */
    async add(ctx) {
        try {
            const city = await new City(ctx.request.body).save();
            ctx.body = city;
        } catch (err) {
            ctx.throw(422);
        }
    }

    /**
     * Update a city
     * @param {ctx} Koa Context
     */
    async update(ctx) {
        try {
            const city = await City.findByIdAndUpdate(
                ctx.params.id,
                ctx.request.body
            );
            if (!city) {
                ctx.throw(404);
            }
            ctx.body = city;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    /**
     * Delete a city
     * @param {ctx} Koa Context
     */
    async delete(ctx) {
        try {
            const city = await City.findByIdAndRemove(ctx.params.id);
            if (!city) {
                ctx.throw(404);
            }
            ctx.body = city;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    /* eslint-enable no-param-reassign */
}

export default new PostsControllers();
