const { select } = require("../db/connection");
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties")

const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    created_at: ["movies", null, "created_at"],
    updated_at: ["movies", null, "updated_at"],
    is_showing: ["movies_theaters", null, "is_showing"],
    theater_id: ["movies_theaters", null, "theater_id"],
  });

function list() {
    return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("m.*", "mt.*", "t.*")
    .then(reduceMovies);
    //.then(data=>data.map(reduceMovies)) returns error data.reduce is not a function
    //not getting desired result; movies and movies_theaters are in separate arrays--how to combine/group them by theater and movie id?
}

module.exports = {
    list,
}