const { select } = require("../db/connection");
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    organization_name: "critic.organization_name",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",   
})

function read(reviewId) {
    return knex("reviews")
    .select("*")
    .where({review_id: reviewId})
    .first();
}

function update(updatedReview) {
    return knex("reviews")
    .select("*")
    .where({review_id: updatedReview.review_id})
    .update(updatedReview, "*")
}

function updateCritic(reviewId) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .then(data => data.map(addCritic))
}

function destroy(reviewId) {
    return knex("reviews")
    .where({review_id: reviewId}).del();
}

module.exports = {
read,
destroy,
update,
updateCritic
}