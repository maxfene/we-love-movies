const { select } = require("../db/connection");
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
})

function list() {
    return knex("movies").select("*")
}

function getMoviesPlaying(){
    return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({"mt.is_showing": true})
    .groupBy("m.movie_id");
}

function read(movieId){
    return knex("movies")
    .select("*")
    .where({"movies.movie_id": movieId})
    .first();
}

function getMovieTheaters(movieId){
    return knex("movies_theaters as mt")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({"mt.movie_id": movieId});
}

function getMovieReviews(movieId) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({"r.movie_id": movieId})
    .then(data => data.map(addCritic))
    // .then((reviews)=> {
    //     return reviews.map((review)=> {
    //         addCritic
    //     })
    // })
}

module.exports = {
    list,
    getMoviesPlaying,
    read,
    getMovieTheaters,
    getMovieReviews,
};