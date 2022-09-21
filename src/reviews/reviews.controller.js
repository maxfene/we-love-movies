const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
//Make a middleware function to check if review exists
async function reviewExists(req, res, next) {
    const {reviewId} = req.params;

    const review = await service.read(reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    return next({ status: 404, message: `Review cannot be found.`})
}

async function update(req, res, next) {
    const time = new Date().toISOString();
    const reviewId = res.locals.review.review_id;
    const updatedReview = {
      ...req.body.data,
      review_id: reviewId,
    };
    await service.update(updatedReview);
    const rawData = await service.updateCritic(reviewId);
    const data = { ...rawData[0], created_at: time, updated_at: time };
    res.json({ data });
}

async function destroy(req, res, next) {
    const {reviewId} = req.params
    await service.destroy(reviewId);
    res.sendStatus(204);
}

module.exports = {
    destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
}