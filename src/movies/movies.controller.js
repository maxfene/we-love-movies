const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { whereNotExists } = require("../db/connection");

//Create MiddleWare to check if movie id exists


async function list(req, res) {
    const { is_showing } = req.query
    if (is_showing) {
        res.json({ data: await service.getMoviesPlaying()})
    } else {
        res.json({ data: await service.list() });
    }
}

async function read(req, res, next) {
    const { movieId } = req.params;

    const data = await service.read(movieId);
    if (data) {
        res.json({ data });
    } else {
        return next({status: 404, message: 'Movie cannot be found.'});
    }
}

async function getMovieTheaters(req, res, next) {
    const { movieId } = req.params;

    const data = await service.getMovieTheaters(movieId);
    return res.json({ data });
}

async function getMovieReviews(req, res, next) {
    const { movieId } = req.params;

    const data = await service.getMovieReviews(movieId);
    return res.json({data});
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: asyncErrorBoundary(read),
    getMovieTheaters: asyncErrorBoundary(getMovieTheaters),
    getMovieReviews: asyncErrorBoundary(getMovieReviews),
};